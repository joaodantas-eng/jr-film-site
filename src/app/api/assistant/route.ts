import { NextRequest, NextResponse } from "next/server";
import { getAssistantAnswer } from "@/services/ai/assistant";
import { sanitizeUserMessage } from "@/services/ai/utils/sanitize";
import { ASSISTANT_ERROR_MESSAGE } from "@/services/ai/prompts/constants";
import { AssistantMessage, VehicleInfo } from "@/services/ai/types";

// Executa em Node.js (não Edge) — o SDK do Gemini precisa do runtime Node.
export const runtime = "nodejs";

const MAX_HISTORY_ITEMS = 12;

interface AssistantRequestBody {
  message?: unknown;
  history?: unknown;
  vehicleInfo?: unknown;
}

function isVehicleInfo(value: unknown): value is VehicleInfo {
  if (!value || typeof value !== "object") return false;
  const keys: (keyof VehicleInfo)[] = ["brand", "model", "year", "engine", "mileage", "fuel"];
  return keys.every((key) => typeof (value as Record<string, unknown>)[key] === "string");
}

function isAssistantMessage(value: unknown): value is AssistantMessage {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (v.role === "user" || v.role === "assistant") && typeof v.id === "string";
}

// Toda a comunicação com o Gemini acontece aqui — no servidor. A chave
// (GEMINI_API_KEY) só é lida dentro de services/ai/, nunca chega ao bundle
// do cliente.
export async function POST(request: NextRequest) {
  let body: AssistantRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const sanitizedMessage = sanitizeUserMessage(body.message);
  if (!sanitizedMessage) {
    return NextResponse.json({ error: "Mensagem vazia." }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history.filter(isAssistantMessage).slice(-MAX_HISTORY_ITEMS) : [];

  const vehicleInfo = isVehicleInfo(body.vehicleInfo) ? body.vehicleInfo : undefined;

  try {
    const answer = await getAssistantAnswer(sanitizedMessage, history, { vehicleInfo });
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[api/assistant] falha ao consultar o assistente:", error);
    return NextResponse.json({ error: ASSISTANT_ERROR_MESSAGE }, { status: 502 });
  }
}
