"use client";

import { useCallback, useState } from "react";
import { AssistantMessage, VehicleInfo } from "@/services/ai/types";
import { requestAssistantAnswer } from "@/services/ai/assistantClient";
import { ASSISTANT_WELCOME_MESSAGE, ASSISTANT_WARNING } from "@/services/ai/prompts/constants";

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function createWelcomeMessage(): AssistantMessage {
  return { id: "welcome", role: "assistant", content: ASSISTANT_WELCOME_MESSAGE, createdAt: Date.now() };
}

// Guarda o histórico da conversa durante a sessão (em memória — reinicia ao
// recarregar a página). Toda resposta vem de /api/assistant — este hook
// nunca fala diretamente com um provider de IA.
export function useAssistantChat(vehicleInfo?: VehicleInfo | null) {
  const [messages, setMessages] = useState<AssistantMessage[]>(() => [createWelcomeMessage()]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMessage: AssistantMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const answer = await requestAssistantAnswer(trimmed, messages, vehicleInfo);
        setMessages((prev) => [
          ...prev,
          { id: createId(), role: "assistant", content: "", answer, createdAt: Date.now() },
        ]);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Não foi possível falar com o assistente agora.";
        setError(message);
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "assistant",
            content: "",
            answer: { possibleCauses: [], recommendation: message, warning: ASSISTANT_WARNING },
            createdAt: Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, vehicleInfo],
  );

  const startNewConversation = useCallback(() => {
    setMessages([createWelcomeMessage()]);
    setError(null);
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, startNewConversation, clearConversation };
}
