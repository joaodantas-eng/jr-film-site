"use client";

import { AssistantAnswer, AssistantMessage } from "@/services/ai/types";
import { AssistantErrorCode } from "@/services/ai/limits";
import { ASSISTANT_ERROR_MESSAGES } from "@/services/ai/prompts/constants";

// Único ponto de contato do navegador com a camada de IA. Nunca importa
// assistant.ts, providers/ nem nada que leia GEMINI_API_KEY — só faz fetch
// para a Route Handler, que roda no servidor. Usa multipart/form-data para
// poder anexar a imagem junto da mensagem, na mesma requisição.

const CLIENT_TIMEOUT_MS = 45_000;

export class AssistantRequestError extends Error {
  constructor(
    public code: AssistantErrorCode | "network",
    public retryAfterSeconds?: number,
  ) {
    super(ASSISTANT_ERROR_MESSAGES[code] ?? ASSISTANT_ERROR_MESSAGES.unavailable);
    this.name = "AssistantRequestError";
  }
}

// O servidor só aproveita texto e, no máximo, a foto mais recente do
// histórico — enviar o resto seria peso inútil na requisição.
function historyForRequest(history: AssistantMessage[]) {
  let imageIncluded = false;
  const trimmed = history
    .filter((m) => m.id !== "welcome")
    .slice(-10)
    .reverse()
    .map((m) => {
      const content = m.role === "assistant" ? m.answer?.message || m.content : m.content;
      const includeImage = m.role === "user" && m.image && !imageIncluded;
      if (includeImage) imageIncluded = true;
      return { role: m.role, content, ...(includeImage ? { image: m.image } : {}) };
    })
    .reverse();
  return trimmed;
}

export async function requestAssistantAnswer(
  message: string,
  history: AssistantMessage[],
  imageFile?: Blob | null,
  captchaToken?: string | null,
): Promise<AssistantAnswer> {
  const formData = new FormData();
  formData.set("message", message);
  formData.set("history", JSON.stringify(historyForRequest(history)));
  if (imageFile) {
    formData.set("image", imageFile, "foto.jpg");
  }
  if (captchaToken) {
    formData.set("captchaToken", captchaToken);
  }

  let response: Response;
  try {
    response = await fetch("/api/assistant", {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(CLIENT_TIMEOUT_MS),
    });
  } catch (error) {
    const isTimeout = error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError");
    throw new AssistantRequestError(isTimeout ? "timeout" : "network");
  }

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: AssistantErrorCode; detail?: string } | null;
    if (data?.detail) {
      // Só existe fora de produção — ajuda a depurar pelo devtools, nunca vai para a tela.
      console.error("[assistant] detalhe técnico do erro:", data.detail);
    }
    const retryAfter = Number(response.headers.get("Retry-After") ?? "") || undefined;
    throw new AssistantRequestError(data?.error ?? "unavailable", retryAfter);
  }

  const data = (await response.json()) as { answer?: AssistantAnswer };
  if (!data.answer || typeof data.answer.message !== "string") throw new AssistantRequestError("unavailable");
  return data.answer;
}
