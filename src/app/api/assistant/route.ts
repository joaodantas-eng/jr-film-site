import { NextRequest, NextResponse } from "next/server";
import { getAssistantAnswer } from "@/services/ai/assistant";
import { sanitizeUserMessage } from "@/services/ai/utils/sanitize";
import { isRateLimited } from "@/services/ai/utils/rateLimit";
import { ASSISTANT_ERROR_MESSAGE } from "@/services/ai/prompts/constants";
import { AssistantMessage, ImageAttachment } from "@/services/ai/types";

// Executa em Node.js (não Edge) — o SDK do Gemini precisa do runtime Node.
export const runtime = "nodejs";

const MAX_HISTORY_ITEMS = 20;
const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

function isAssistantMessage(value: unknown): value is AssistantMessage {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (v.role === "user" || v.role === "assistant") && typeof v.id === "string";
}

async function fileToImageAttachment(file: File): Promise<ImageAttachment> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return { mimeType: file.type, base64Data: buffer.toString("base64") };
}

// Toda a comunicação com o Gemini acontece aqui — no servidor. A chave
// (GEMINI_API_KEY) só é lida dentro de services/ai/, nunca chega ao bundle
// do cliente. Recebe multipart/form-data (mensagem + histórico em JSON +
// imagem opcional) — mesma requisição carrega texto e foto, como pedido.
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Muitas mensagens em pouco tempo. Aguarde um instante e tente de novo." }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const sanitizedMessage = sanitizeUserMessage(formData.get("message"));

  let history: AssistantMessage[] = [];
  const historyRaw = formData.get("history");
  if (typeof historyRaw === "string") {
    try {
      const parsed = JSON.parse(historyRaw);
      if (Array.isArray(parsed)) {
        history = parsed.filter(isAssistantMessage).slice(-MAX_HISTORY_ITEMS);
      }
    } catch {
      // histórico malformado é ignorado, não é motivo para recusar a requisição
    }
  }

  const imageFile = formData.get("image");
  let image: ImageAttachment | undefined;
  if (imageFile instanceof File) {
    if (imageFile.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json({ error: "A imagem enviada é muito grande (máximo 8MB)." }, { status: 400 });
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(imageFile.type)) {
      return NextResponse.json({ error: "Formato de imagem não suportado." }, { status: 400 });
    }
    image = await fileToImageAttachment(imageFile);
  }

  if (!sanitizedMessage && !image) {
    return NextResponse.json({ error: "Mensagem vazia." }, { status: 400 });
  }

  try {
    const answer = await getAssistantAnswer(sanitizedMessage, history, { image });
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[api/assistant] falha ao consultar o assistente:", error);

    const isProduction = process.env.NODE_ENV === "production";
    const detail = error instanceof Error ? error.message : String(error);

    // Em desenvolvimento, devolve o erro real do provider (ex: nome de modelo
    // inválido, chave sem permissão) em vez de mascarar com a mensagem
    // genérica — facilita depurar a integração. Em produção, só a mensagem
    // amigável sai na resposta; o detalhe fica só no log do servidor.
    return NextResponse.json(
      isProduction ? { error: ASSISTANT_ERROR_MESSAGE } : { error: ASSISTANT_ERROR_MESSAGE, detail },
      { status: 502 },
    );
  }
}
