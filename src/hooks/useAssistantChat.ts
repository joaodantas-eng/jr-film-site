"use client";

import { useCallback, useState } from "react";
import { AssistantMessage, VehicleInfo } from "@/services/ai/types";
import { getAssistantAnswer } from "@/services/ai/assistant";
import { ASSISTANT_WELCOME_MESSAGE } from "@/services/ai/prompt";

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function createWelcomeMessage(): AssistantMessage {
  return { id: "welcome", role: "assistant", content: ASSISTANT_WELCOME_MESSAGE, createdAt: Date.now() };
}

// Guarda o histórico da conversa durante a sessão (em memória — reinicia ao
// recarregar a página). Aceita opcionalmente os dados do veículo (coletados
// na Central de Diagnóstico) para enriquecer a resposta do provider.
export function useAssistantChat(vehicleInfo?: VehicleInfo | null) {
  const [messages, setMessages] = useState<AssistantMessage[]>(() => [createWelcomeMessage()]);
  const [isLoading, setIsLoading] = useState(false);

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

      try {
        const answer = await getAssistantAnswer(trimmed, messages, {
          vehicleInfo: vehicleInfo ?? undefined,
        });
        const assistantMessage: AssistantMessage = {
          id: createId(),
          role: "assistant",
          content: "",
          answer,
          createdAt: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, vehicleInfo],
  );

  const addSystemNote = useCallback((content: string) => {
    setMessages((prev) => [...prev, { id: createId(), role: "assistant", content, createdAt: Date.now() }]);
  }, []);

  return { messages, isLoading, sendMessage, addSystemNote };
}
