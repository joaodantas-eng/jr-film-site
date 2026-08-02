"use client";

import { AssistantAnswer, AssistantMessage } from "@/services/ai/types";
import { ASSISTANT_ERROR_MESSAGE, ASSISTANT_IMAGE_ERROR_MESSAGE } from "@/services/ai/prompts/constants";

// Único ponto de contato do navegador com a camada de IA. Nunca importa
// assistant.ts, providers/ nem nada que leia GEMINI_API_KEY — só faz fetch
// para a Route Handler, que roda no servidor. Usa multipart/form-data para
// poder anexar a imagem junto da mensagem, na mesma requisição.
export async function requestAssistantAnswer(
  message: string,
  history: AssistantMessage[],
  imageFile?: File | null,
): Promise<AssistantAnswer> {
  const formData = new FormData();
  formData.set("message", message);
  formData.set("history", JSON.stringify(history));
  if (imageFile) {
    formData.set("image", imageFile);
  }

  let response: Response;
  try {
    response = await fetch("/api/assistant", { method: "POST", body: formData });
  } catch {
    throw new Error(imageFile ? ASSISTANT_IMAGE_ERROR_MESSAGE : ASSISTANT_ERROR_MESSAGE);
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const detail = typeof data?.detail === "string" && data.detail ? data.detail : null;
    if (detail) {
      // Ajuda a depurar durante o desenvolvimento, só no console do navegador
      // (devtools) — nunca aparece na tela do chat, mesmo em desenvolvimento.
      console.error("[assistant] detalhe técnico do erro:", detail);
    }
    // A tela do chat sempre recebe só a mensagem amigável — nunca texto
    // técnico, stack trace ou código de erro. Falha com imagem tem uma
    // mensagem própria, mais honesta sobre o que não funcionou.
    throw new Error(imageFile ? ASSISTANT_IMAGE_ERROR_MESSAGE : ASSISTANT_ERROR_MESSAGE);
  }

  const data = await response.json();
  return data.answer as AssistantAnswer;
}
