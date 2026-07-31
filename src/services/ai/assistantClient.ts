"use client";

import { AssistantAnswer, AssistantMessage, VehicleInfo } from "@/services/ai/types";
import { ASSISTANT_ERROR_MESSAGE } from "@/services/ai/prompts/constants";

// Único ponto de contato do navegador com a camada de IA. Nunca importa
// assistant.ts, providers/ nem nada que leia GEMINI_API_KEY — só faz fetch
// para a Route Handler, que roda no servidor.
export async function requestAssistantAnswer(
  message: string,
  history: AssistantMessage[],
  vehicleInfo?: VehicleInfo | null,
): Promise<AssistantAnswer> {
  let response: Response;
  try {
    response = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, vehicleInfo: vehicleInfo ?? undefined }),
    });
  } catch {
    throw new Error(ASSISTANT_ERROR_MESSAGE);
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(typeof data?.error === "string" ? data.error : ASSISTANT_ERROR_MESSAGE);
  }

  const data = await response.json();
  return data.answer as AssistantAnswer;
}
