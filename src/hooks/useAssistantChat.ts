"use client";

import { useCallback, useState } from "react";
import { AssistantMessage } from "@/services/ai/types";
import { getAssistantAnswer } from "@/services/ai/assistant";
import { ASSISTANT_WELCOME_MESSAGE } from "@/services/ai/prompt";

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function createWelcomeMessage(): AssistantMessage {
  return { id: "welcome", role: "assistant", content: ASSISTANT_WELCOME_MESSAGE, createdAt: Date.now() };
}

// Guarda o histórico da conversa durante a sessão (em memória — reinicia ao
// recarregar a página, como pedido na V3). Preparado para futuramente persistir
// esse histórico (ex: por usuário logado) sem mudar a interface do hook.
export function useAssistantChat() {
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
        const answer = await getAssistantAnswer(trimmed, messages);
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
    [isLoading, messages],
  );

  return { messages, isLoading, sendMessage };
}
