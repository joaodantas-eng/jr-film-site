import "server-only";
import { ASSISTANT_INPUT_LIMITS } from "./limits";

// Configuração operacional do assistente — tudo lido de variáveis de ambiente
// do SERVIDOR (nunca NEXT_PUBLIC_*). Valores padrão conservadores: se nada for
// configurado, o assistente funciona com limites baixos de consumo.
//
// Alterar qualquer variável na Vercel exige um novo deploy para valer.

function readInt(name: string, fallback: number, min: number, max: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function readFlag(name: string, fallback: boolean): boolean {
  const raw = process.env[name]?.trim().toLowerCase();
  if (!raw) return fallback;
  return !["false", "0", "off", "no", "nao", "não"].includes(raw);
}

export const assistantConfig = {
  // Interruptor geral: ASSISTANT_ENABLED=false desliga o assistente sem tirar o
  // site do ar — a API responde 503 e a página mostra o contato pelo WhatsApp.
  enabled: readFlag("ASSISTANT_ENABLED", true),
  // ASSISTANT_IMAGES_ENABLED=false mantém o chat de texto e bloqueia fotos
  // (imagens são a parte mais cara de cada chamada).
  imagesEnabled: readFlag("ASSISTANT_IMAGES_ENABLED", true),

  model: process.env.GEMINI_MODEL?.trim() || "gemini-3.6-flash",
  maxOutputTokens: readInt("GEMINI_MAX_OUTPUT_TOKENS", 1024, 256, 4096),
  timeoutMs: readInt("GEMINI_TIMEOUT_MS", 25_000, 5_000, 60_000),

  // Limites por visitante (identificado por hash do IP).
  limits: {
    perMinute: readInt("ASSISTANT_LIMIT_PER_MINUTE", 5, 1, 60),
    perHour: readInt("ASSISTANT_LIMIT_PER_HOUR", 30, 1, 500),
    perDay: readInt("ASSISTANT_LIMIT_PER_DAY", 60, 1, 2000),
    // Teto diário somado de TODOS os visitantes — a principal trava de custo.
    // Só é exato com o Upstash configurado; em memória vale por instância.
    globalPerDay: readInt("ASSISTANT_GLOBAL_LIMIT_PER_DAY", 800, 10, 100_000),
    // Requisições simultâneas (por instância do servidor).
    concurrentPerVisitor: 1,
    concurrentPerInstance: readInt("ASSISTANT_MAX_CONCURRENT", 8, 1, 100),
  },

  input: ASSISTANT_INPUT_LIMITS,
} as const;

export function hasGeminiKey(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}
