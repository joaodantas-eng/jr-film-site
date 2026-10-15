"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AssistantMessage, ImageAttachment } from "@/services/ai/types";
import { AssistantRequestError, requestAssistantAnswer } from "@/services/ai/assistantClient";
import { ASSISTANT_ERROR_MESSAGES, ASSISTANT_WELCOME_MESSAGE } from "@/services/ai/prompts/constants";
import { blobToBase64 } from "@/lib/compressImage";
import { trackEvent } from "@/lib/analytics";

// Guarda a conversa no sessionStorage da aba (só texto — fotos ficam apenas
// em memória). Assim o visitante não perde o histórico ao abrir um serviço
// relacionado e voltar; tudo some ao fechar a aba. Toda resposta vem de
// /api/assistant — este hook nunca fala diretamente com um provider de IA.
const STORAGE_KEY = "jrfilm-assistant-conversation";

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function createWelcomeMessage(): AssistantMessage {
  return { id: "welcome", role: "assistant", content: ASSISTANT_WELCOME_MESSAGE, createdAt: Date.now() };
}

function loadStoredMessages(): AssistantMessage[] | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AssistantMessage[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function storeMessages(messages: AssistantMessage[]) {
  try {
    const withoutImages = messages.map(({ image, ...rest }) => (image ? { ...rest, imageOmitted: true } : rest));
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(withoutImages));
  } catch {
    // armazenamento indisponível (aba anônima, cota cheia): segue só em memória
  }
}

interface FailedRequest {
  text: string;
  image?: { blob: Blob; attachment: ImageAttachment };
  history: AssistantMessage[];
}

export interface ChatError {
  message: string;
  canRetry: boolean;
}

const NON_RETRYABLE = new Set(["disabled", "images_disabled", "invalid_image", "image_too_large", "invalid_request"]);

// Integração com o CAPTCHA (Turnstile): o hook pede o token atual a cada
// envio e avisa quando ele foi usado (para gerar outro) ou recusado.
export interface CaptchaBridge {
  getToken: () => string | null;
  onTokenUsed: () => void;
  onVerified: () => void;
  onRejected: () => void;
}

export function useAssistantChat(captcha?: CaptchaBridge) {
  const [messages, setMessages] = useState<AssistantMessage[]>(() => [createWelcomeMessage()]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const inFlightRef = useRef(false);
  const failedRef = useRef<FailedRequest | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    const stored = loadStoredMessages();
    if (stored) setMessages(stored);
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (hydratedRef.current) storeMessages(messages);
  }, [messages]);

  const performRequest = useCallback(
    async (request: FailedRequest) => {
      inFlightRef.current = true;
      setIsLoading(true);
      setIsAnalyzingImage(Boolean(request.image));
      setError(null);

      const captchaToken = captcha?.getToken() ?? null;
      try {
        const answer = await requestAssistantAnswer(request.text, request.history, request.image?.blob, captchaToken);
        captcha?.onVerified();
        failedRef.current = null;
        setMessages((prev) => [
          ...prev,
          { id: createId(), role: "assistant", content: "", answer, createdAt: Date.now() },
        ]);
        trackEvent("assistant_answer_received", { with_image: Boolean(request.image) });
      } catch (err) {
        const code = err instanceof AssistantRequestError ? err.code : "unavailable";
        const message = err instanceof AssistantRequestError ? err.message : ASSISTANT_ERROR_MESSAGES.unavailable!;
        const canRetry = !NON_RETRYABLE.has(code);
        if (code === "captcha_required") captcha?.onRejected();
        failedRef.current = canRetry ? request : null;
        setError({ message, canRetry });
        trackEvent("assistant_error", { error_code: code });
      } finally {
        // Token do Turnstile é de uso único: pede outro em segundo plano.
        if (captchaToken) captcha?.onTokenUsed();
        inFlightRef.current = false;
        setIsLoading(false);
        setIsAnalyzingImage(false);
      }
    },
    [captcha],
  );

  const sendMessage = useCallback(
    async (text: string, image?: Blob | null) => {
      const trimmed = text.trim();
      // A ref bloqueia cliques repetidos antes mesmo de o estado re-renderizar.
      if ((!trimmed && !image) || inFlightRef.current) return;
      inFlightRef.current = true;

      let attachment: ImageAttachment | undefined;
      if (image) {
        try {
          attachment = { mimeType: image.type || "image/jpeg", base64Data: await blobToBase64(image) };
        } catch {
          inFlightRef.current = false;
          setError({ message: ASSISTANT_ERROR_MESSAGES.invalid_image!, canRetry: false });
          return;
        }
      }

      const userMessage: AssistantMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        image: attachment,
        createdAt: Date.now(),
      };

      const history = messages;
      if (!history.some((m) => m.role === "user")) {
        trackEvent("assistant_conversation_start", { with_image: Boolean(image) });
      }
      setMessages((prev) => [...prev, userMessage]);
      await performRequest({
        text: trimmed,
        image: image && attachment ? { blob: image, attachment } : undefined,
        history,
      });
    },
    [messages, performRequest],
  );

  const retryLastMessage = useCallback(() => {
    const failed = failedRef.current;
    if (!failed || inFlightRef.current) return;
    void performRequest(failed);
  }, [performRequest]);

  const startNewConversation = useCallback(() => {
    if (inFlightRef.current) return;
    failedRef.current = null;
    setMessages([createWelcomeMessage()]);
    setError(null);
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  return {
    messages,
    isLoading,
    isAnalyzingImage,
    error,
    sendMessage,
    retryLastMessage,
    startNewConversation,
    dismissError,
  };
}
