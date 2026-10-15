import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { logServerError } from "@/lib/serverLog";

// CAPTCHA do assistente com Cloudflare Turnstile.
//
// Fluxo: na primeira mensagem, o navegador envia o token do Turnstile; o
// servidor confere o token na Cloudflare e, se for válido, devolve um cookie
// de sessão assinado (HttpOnly) que dispensa nova verificação por
// SESSION_MINUTES. Assim o visitante não precisa resolver um desafio a cada
// mensagem, mas scripts que chamam a API direto precisam passar pelo
// Turnstile primeiro.
//
// Sem TURNSTILE_SECRET_KEY configurada, a verificação fica desligada (útil em
// desenvolvimento) e um aviso é registrado em produção.

export const CAPTCHA_COOKIE = "jr_assistant_session";
const SESSION_MINUTES = 30;
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EXPECTED_ACTION = "assistant";

let warnedDisabled = false;

function secretKey(): string | null {
  return process.env.TURNSTILE_SECRET_KEY?.trim() || null;
}

export function isCaptchaEnabled(): boolean {
  const enabled = secretKey() !== null;
  if (!enabled && process.env.NODE_ENV === "production" && !warnedDisabled) {
    warnedDisabled = true;
    console.warn("[captcha] TURNSTILE_SECRET_KEY ausente: assistente sem verificação de CAPTCHA.");
  }
  return enabled;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

// Cookie = "<expira em ms>.<assinatura>", ligado ao visitante (hash do IP).
export function createSessionCookieValue(visitorKey: string): { value: string; maxAge: number } {
  const secret = secretKey();
  if (!secret) throw new Error("CAPTCHA não configurado.");
  const expiresAt = Date.now() + SESSION_MINUTES * 60_000;
  return { value: `${expiresAt}.${sign(`${visitorKey}:${expiresAt}`, secret)}`, maxAge: SESSION_MINUTES * 60 };
}

export function hasValidSession(cookieValue: string | undefined, visitorKey: string): boolean {
  const secret = secretKey();
  if (!secret || !cookieValue) return false;
  const [expiresRaw, signature] = cookieValue.split(".");
  const expiresAt = Number(expiresRaw);
  if (!signature || !Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const expected = Buffer.from(sign(`${visitorKey}:${expiresAt}`, secret));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export type CaptchaResult = { ok: true } | { ok: false; reason: "invalid" | "unavailable" };

export async function verifyTurnstileToken(token: unknown, remoteIp?: string): Promise<CaptchaResult> {
  const secret = secretKey();
  if (!secret) return { ok: true };
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return { ok: false, reason: "invalid" };

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`Turnstile respondeu ${response.status}.`);
    const data = (await response.json()) as { success?: boolean; action?: string; "error-codes"?: string[] };

    // Tokens de outra ação (ou outro site com a mesma chave) são recusados.
    if (data.success && (!data.action || data.action === EXPECTED_ACTION)) return { ok: true };
    return { ok: false, reason: "invalid" };
  } catch (error) {
    // Sem resposta da Cloudflare, a mensagem é recusada (falha fechada): é
    // melhor pedir para tentar de novo do que abrir a API sem verificação.
    logServerError("captcha", error);
    return { ok: false, reason: "unavailable" };
  }
}
