"use client";

import { useCallback, useState } from "react";
import { AssistantMessage } from "@/services/ai/types";
import { requestAssistantAnswer } from "@/services/ai/assistantClient";
import { ASSISTANT_WELCOME_MESSAGE, ASSISTANT_ERROR_MESSAGE, ASSISTANT_IMAGE_ERROR_MESSAGE } from "@/services/ai/prompts/constants";
import { fileToBase64 } from "@/lib/fileToBase64";

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function createWelcomeMessage(): AssistantMessage {
  return { id: "welcome", role: "assistant", content: ASSISTANT_WELCOME_MESSAGE, createdAt: Date.now() };
}

// Guarda o histórico da conversa durante a sessão (em memória — reinicia ao
// recarregar a página, sem depender de banco de dados). Toda resposta vem de
// /api/assistant — este hook nunca fala diretamente com um provider de IA.
export function useAssistantChat() {
  const [messages, setMessages] = useState<AssistantMessage[]>(() => [createWelcomeMessage()]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string, imageFile?: File | null) => {
      const trimmed = text.trim();
      if ((!trimmed && !imageFile) || isLoading) return;

      const image = imageFile ? { mimeType: imageFile.type, base64Data: await fileToBase64(imageFile) } : undefined;

      const userMessage: AssistantMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        image,
        createdAt: Date.now(),
      };

      const historyForRequest = messages;
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setIsAnalyzingImage(Boolean(imageFile));
      setError(null);

      try {
        const answer = await requestAssistantAnswer(trimmed, historyForRequest, imageFile);
        setMessages((prev) => [
          ...prev,
          { id: createId(), role: "assistant", content: "", answer, createdAt: Date.now() },
        ]);
      } catch (err) {
        // requestAssistantAnswer só lança a mensagem amigável (nunca detalhe
        // técnico) — exibida como um balão de texto simples, sem card.
        const fallback = imageFile ? ASSISTANT_IMAGE_ERROR_MESSAGE : ASSISTANT_ERROR_MESSAGE;
        const message = err instanceof Error ? err.message : fallback;
        setError(message);
        setMessages((prev) => [...prev, { id: createId(), role: "assistant", content: message, createdAt: Date.now() }]);
      } finally {
        setIsLoading(false);
        setIsAnalyzingImage(false);
      }
    },
    [isLoading, messages],
  );

  const startNewConversation = useCallback(() => {
    setMessages([createWelcomeMessage()]);
    setError(null);
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, isAnalyzingImage, error, sendMessage, startNewConversation, clearConversation };
}
