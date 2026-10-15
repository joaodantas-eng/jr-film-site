import { NextRequest, NextResponse } from "next/server";
import { assistantConfig } from "@/services/ai/config";
import { clientIpFromRequest, visitorKeyFromRequest } from "@/services/ai/utils/rateLimit";
import {
  CAPTCHA_COOKIE,
  createSessionCookieValue,
  isCaptchaEnabled,
  SESSION_COOKIE_OPTIONS,
  verifyTurnstileToken,
} from "@/services/ai/utils/captcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Verificação de entrada do assistente: recebe o token do Turnstile, confere
// na Cloudflare e devolve o cookie de sessão (30 min) que libera o chat.
// Não chama o Gemini e não conta no limite de mensagens.
function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isSameOrigin(request: NextRequest): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!assistantConfig.enabled) return json({ error: "disabled" }, 503);
  if (!isSameOrigin(request)) return json({ error: "forbidden" }, 403);
  if (!isCaptchaEnabled()) return json({ ok: true, captcha: false });

  let token: unknown;
  try {
    token = ((await request.json()) as { token?: unknown }).token;
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  const result = await verifyTurnstileToken(token, clientIpFromRequest(request.headers));
  if (!result.ok) {
    return result.reason === "unavailable"
      ? json({ error: "captcha_unavailable" }, 503)
      : json({ error: "captcha_required" }, 403);
  }

  const session = createSessionCookieValue(visitorKeyFromRequest(request.headers));
  const response = json({ ok: true, expiresInSeconds: session.maxAge });
  response.cookies.set(CAPTCHA_COOKIE, session.value, { ...SESSION_COOKIE_OPTIONS, maxAge: session.maxAge });
  return response;
}
