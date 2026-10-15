import "server-only";
import { createHash } from "node:crypto";
import { assistantConfig } from "../config";
import { logServerError } from "@/lib/serverLog";

// Limitação de uso do assistente, em duas camadas:
//
// 1. Contadores por janela de tempo (minuto / hora / dia por visitante + teto
//    diário global). Com UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN
//    configurados, os contadores ficam no Upstash Redis e valem para todas as
//    instâncias da Vercel. Sem eles, ficam na memória da instância: ajuda a
//    conter picos, mas NÃO é confiável em produção — cada instância conta
//    separado e o contador zera a cada cold start.
// 2. Concorrência (sempre em memória, por instância): no máximo uma requisição
//    em andamento por visitante e um teto de chamadas simultâneas.
//
// O visitante é identificado por um hash do IP (o IP em si não é guardado).
// Limite por IP não é proteção perfeita: redes compartilhadas (empresa, 4G)
// podem dividir o mesmo IP, e quem troca de IP contorna o limite por
// visitante — por isso existe também o teto global diário.

type Window = "minute" | "hour" | "day" | "global";

export type RateLimitResult =
  | { ok: true }
  | { ok: false; reason: Window; retryAfterSeconds: number }
  // Contador distribuído indisponível ou não configurado em produção.
  | { ok: false; reason: "store_unavailable"; retryAfterSeconds: number };

// Em produção, contagem só em memória NÃO é aceita: na Vercel cada instância
// teria o próprio contador e o limite não valeria de verdade. Sem Upstash, o
// assistente fica indisponível (falha fechada). A variável
// ASSISTANT_ALLOW_MEMORY_RATE_LIMIT=true libera o modo em memória por conta e
// risco — por exemplo, para um teste rápido. Em desenvolvimento, memória é o padrão.
function memoryStoreAllowed(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return process.env.ASSISTANT_ALLOW_MEMORY_RATE_LIMIT?.trim().toLowerCase() === "true";
}

const WINDOW_SECONDS: Record<Exclude<Window, "global">, number> = { minute: 60, hour: 3600, day: 86_400 };

// Na Vercel, x-real-ip / x-forwarded-for são definidos pela própria
// plataforma (valores enviados pelo cliente são sobrescritos).
export function clientIpFromRequest(headers: Headers): string | undefined {
  return headers.get("x-real-ip")?.trim() || headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
}

export function visitorKeyFromRequest(headers: Headers): string {
  const ip = clientIpFromRequest(headers) ?? "unknown";
  const salt = process.env.RATE_LIMIT_SALT || "jrfilm-assistant";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 24);
}

function windowBuckets(now: number) {
  const day = new Date(now).toISOString().slice(0, 10);
  return {
    minute: Math.floor(now / 60_000),
    hour: Math.floor(now / 3_600_000),
    day,
  };
}

function secondsUntilWindowEnds(window: Window, now: number): number {
  const size = window === "global" ? 86_400 : WINDOW_SECONDS[window];
  const elapsed = Math.floor(now / 1000) % size;
  return Math.max(1, size - elapsed);
}

// ---------- Upstash Redis (REST, sem SDK) ----------

function upstashCredentials() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function incrementUpstash(keys: { key: string; ttl: number }[]): Promise<number[]> {
  const credentials = upstashCredentials();
  if (!credentials) throw new Error("Upstash não configurado.");

  const commands = keys.flatMap(({ key, ttl }) => [
    // SET ... NX cria a chave com validade só na primeira vez da janela.
    ["SET", key, "0", "EX", String(ttl), "NX"],
    ["INCR", key],
  ]);

  const response = await fetch(`${credentials.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${credentials.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
    signal: AbortSignal.timeout(1500),
  });
  if (!response.ok) throw new Error(`Upstash respondeu ${response.status}.`);

  const data = (await response.json()) as { result?: unknown; error?: string }[];
  return keys.map((_, index) => {
    const entry = data[index * 2 + 1];
    if (!entry || entry.error || typeof entry.result !== "number") throw new Error("Resposta inesperada do Upstash.");
    return entry.result;
  });
}

// ---------- Memória da instância (fallback) ----------

const memoryCounters = new Map<string, { count: number; expiresAt: number }>();
let warnedAboutMemoryStore = false;

function incrementMemory(keys: { key: string; ttl: number }[], now: number): number[] {
  if (memoryCounters.size > 5000) {
    for (const [key, value] of memoryCounters) {
      if (value.expiresAt <= now) memoryCounters.delete(key);
    }
  }
  return keys.map(({ key, ttl }) => {
    const current = memoryCounters.get(key);
    if (!current || current.expiresAt <= now) {
      memoryCounters.set(key, { count: 1, expiresAt: now + ttl * 1000 });
      return 1;
    }
    current.count += 1;
    return current.count;
  });
}

export async function checkRateLimit(visitorKey: string): Promise<RateLimitResult> {
  const now = Date.now();
  const buckets = windowBuckets(now);
  const { limits } = assistantConfig;

  const checks: { window: Window; key: string; ttl: number; limit: number }[] = [
    { window: "minute", key: `rl:${visitorKey}:m:${buckets.minute}`, ttl: 60, limit: limits.perMinute },
    { window: "hour", key: `rl:${visitorKey}:h:${buckets.hour}`, ttl: 3600, limit: limits.perHour },
    { window: "day", key: `rl:${visitorKey}:d:${buckets.day}`, ttl: 86_400, limit: limits.perDay },
    { window: "global", key: `rl:global:d:${buckets.day}`, ttl: 86_400, limit: limits.globalPerDay },
  ];

  let counts: number[];
  if (upstashCredentials()) {
    try {
      counts = await incrementUpstash(checks);
    } catch (error) {
      logServerError("rateLimit", error);
      if (!memoryStoreAllowed()) return { ok: false, reason: "store_unavailable", retryAfterSeconds: 30 };
      counts = incrementMemory(checks, now);
    }
  } else {
    if (!memoryStoreAllowed()) {
      if (!warnedAboutMemoryStore) {
        warnedAboutMemoryStore = true;
        console.error(
          "[rateLimit] UPSTASH_REDIS_REST_URL/TOKEN ausentes: assistente bloqueado em produção até configurar o rate limit distribuído.",
        );
      }
      return { ok: false, reason: "store_unavailable", retryAfterSeconds: 60 };
    }
    counts = incrementMemory(checks, now);
  }

  for (let index = 0; index < checks.length; index++) {
    const check = checks[index]!;
    if ((counts[index] ?? 0) > check.limit) {
      return { ok: false, reason: check.window, retryAfterSeconds: secondsUntilWindowEnds(check.window, now) };
    }
  }
  return { ok: true };
}

// ---------- Concorrência (por instância) ----------

const inFlightByVisitor = new Map<string, number>();
let inFlightTotal = 0;

export function acquireConcurrencySlot(visitorKey: string): (() => void) | null {
  const { concurrentPerVisitor, concurrentPerInstance } = assistantConfig.limits;
  const current = inFlightByVisitor.get(visitorKey) ?? 0;
  if (current >= concurrentPerVisitor || inFlightTotal >= concurrentPerInstance) return null;

  inFlightByVisitor.set(visitorKey, current + 1);
  inFlightTotal += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    inFlightTotal = Math.max(0, inFlightTotal - 1);
    const remaining = (inFlightByVisitor.get(visitorKey) ?? 1) - 1;
    if (remaining <= 0) inFlightByVisitor.delete(visitorKey);
    else inFlightByVisitor.set(visitorKey, remaining);
  };
}

export function isDistributedRateLimitConfigured(): boolean {
  return upstashCredentials() !== null;
}
