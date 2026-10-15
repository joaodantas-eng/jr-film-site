import { NextRequest, NextResponse } from "next/server";
import { getAssistantAnswer, AssistantTimeoutError } from "@/services/ai/assistant";
import { assistantConfig } from "@/services/ai/config";
import { sanitizeUserMessage } from "@/services/ai/utils/sanitize";
import {
  acquireConcurrencySlot,
  checkRateLimit,
  clientIpFromRequest,
  visitorKeyFromRequest,
} from "@/services/ai/utils/rateLimit";
import {
  CAPTCHA_COOKIE,
  createSessionCookieValue,
  hasValidSession,
  isCaptchaEnabled,
  SESSION_COOKIE_OPTIONS,
  verifyTurnstileToken,
} from "@/services/ai/utils/captcha";
import { parseHistory, validateImageFile } from "@/services/ai/utils/validation";
import { AssistantErrorCode } from "@/services/ai/limits";
import { ImageAttachment } from "@/services/ai/types";
import { describeError, logServerError } from "@/lib/serverLog";

// Executa em Node.js (não Edge) — o SDK do Gemini precisa do runtime Node.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Teto de execução da função na Vercel (segundos). O timeout do Gemini é menor.
export const maxDuration = 60;

// Toda a comunicação com o Gemini acontece aqui — no servidor. A chave
// (GEMINI_API_KEY) só é lida dentro de services/ai/, nunca chega ao bundle
// do cliente. Ordem das verificações: das mais baratas para as mais caras,
// para que abuso seja recusado antes de qualquer processamento pesado.

function errorResponse(code: AssistantErrorCode, status: number, headers?: Record<string, string>, devDetail?: string) {
  // Só um código estável sai na resposta — nunca mensagem técnica, stack trace
  // ou detalhe do provedor. A tela escolhe o texto amigável a partir do código.
  // Fora de produção, um resumo do erro vai junto (só aparece no console do
  // navegador, nunca na tela do chat) para não esconder falhas durante o desenvolvimento.
  const body =
    process.env.NODE_ENV !== "production" && devDetail ? { error: code, detail: devDetail } : { error: code };
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

// Bloqueia chamadas feitas a partir de outros sites. Não impede scripts que
// forjam o cabeçalho Origin — por isso o rate limit continua sendo necessário.
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
  if (!assistantConfig.enabled) return errorResponse("disabled", 503);
  if (!isSameOrigin(request)) return errorResponse("forbidden", 403);

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("multipart/form-data")) return errorResponse("invalid_request", 415);

  // Sem Content-Length, o limite de corpo da própria Vercel (~4,5 MB) ainda vale.
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > assistantConfig.input.maxBodyBytes) return errorResponse("image_too_large", 413);

  const visitorKey = visitorKeyFromRequest(request.headers);
  const rate = await checkRateLimit(visitorKey);
  if (!rate.ok) {
    if (rate.reason === "store_unavailable") {
      return errorResponse("unavailable", 503, { "Retry-After": String(rate.retryAfterSeconds) });
    }
    return errorResponse("rate_limited", 429, { "Retry-After": String(rate.retryAfterSeconds) });
  }

  const release = acquireConcurrencySlot(visitorKey);
  if (!release) return errorResponse("busy", 429, { "Retry-After": "5" });

  // Depois de um CAPTCHA válido, o cookie de sessão vai em QUALQUER resposta
  // (inclusive de erro), para o token de uso único não ser desperdiçado.
  let issueSessionCookie = false;
  const withSession = (response: NextResponse) => {
    if (issueSessionCookie) {
      const session = createSessionCookieValue(visitorKey);
      response.cookies.set(CAPTCHA_COOKIE, session.value, { ...SESSION_COOKIE_OPTIONS, maxAge: session.maxAge });
    }
    return response;
  };

  try {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return errorResponse("invalid_request", 400);
    }

    // CAPTCHA (Turnstile): vale o cookie de sessão já verificado OU um token
    // novo enviado pelo navegador. Feito antes de qualquer processamento de
    // imagem e de qualquer chamada ao Gemini.
    if (isCaptchaEnabled() && !hasValidSession(request.cookies.get(CAPTCHA_COOKIE)?.value, visitorKey)) {
      const captcha = await verifyTurnstileToken(formData.get("captchaToken"), clientIpFromRequest(request.headers));
      if (!captcha.ok) {
        return captcha.reason === "unavailable"
          ? errorResponse("captcha_unavailable", 503)
          : errorResponse("captcha_required", 403);
      }
      issueSessionCookie = true;
    }

    const message = sanitizeUserMessage(formData.get("message"));
    const { history } = parseHistory(formData.get("history"));

    const imageFile = formData.get("image");
    let image: ImageAttachment | undefined;
    if (imageFile instanceof File && imageFile.size > 0) {
      if (!assistantConfig.imagesEnabled) return withSession(errorResponse("images_disabled", 403));
      const result = await validateImageFile(imageFile);
      if (!result.ok) return withSession(errorResponse(result.code, result.code === "image_too_large" ? 413 : 400));
      image = result.image;
    }

    // Com fotos desativadas, imagens antigas do histórico também não são enviadas.
    const safeHistory = assistantConfig.imagesEnabled ? history : history.map(({ image: _image, ...rest }) => rest);

    if (!message && !image) return withSession(errorResponse("invalid_request", 400));

    const answer = await getAssistantAnswer(message, safeHistory, { image });
    return withSession(NextResponse.json({ answer }, { headers: { "Cache-Control": "no-store" } }));
  } catch (error) {
    if (error instanceof AssistantTimeoutError) return withSession(errorResponse("timeout", 504));
    logServerError("api/assistant", error);
    return withSession(errorResponse("unavailable", 502, undefined, describeError(error).message));
  } finally {
    release();
  }
}

// Qualquer outro método recebe 405 automaticamente pelo Next.js.
