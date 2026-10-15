"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CaptchaBridge, useAssistantChat } from "@/hooks/useAssistantChat";
import { TURNSTILE_SITE_KEY } from "./TurnstileWidget";
import { CaptchaGate } from "./CaptchaGate";
import { MessageBubble } from "./MessageBubble";
import { QuickSuggestions } from "./QuickSuggestions";
import { ChatInput } from "./ChatInput";
import { LoadingIndicator } from "./LoadingIndicator";
import { buildWhatsAppLink } from "@/services/whatsapp";
import { AssistantAvatar } from "./AssistantAvatar";
import { RotateCcw, AlertTriangle, MessageCircle } from "lucide-react";

const VERIFIED_KEY = "jrfilm-assistant-verified-until";

// Interface única de conversa — texto e foto no mesmo lugar, ao estilo de um
// app de mensagens. Sem telas separadas, sem formulários.
export function ChatWindow({ imagesEnabled = true }: { imagesEnabled?: boolean }) {
  // CAPTCHA (Turnstile): o chat fica atrás de uma tela de verificação até o
  // servidor liberar a sessão (cookie de 30 min). Se a sessão expirar, a API
  // responde "captcha_required" e a tela volta, sem perder a conversa.
  // Sem NEXT_PUBLIC_TURNSTILE_SITE_KEY, o CAPTCHA fica desligado.
  const captchaEnabled = Boolean(TURNSTILE_SITE_KEY);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!captchaEnabled) return;
    try {
      const until = Number(window.sessionStorage.getItem(VERIFIED_KEY));
      if (until > Date.now()) setVerified(true);
    } catch {
      // sem armazenamento: o visitante verifica de novo
    }
  }, [captchaEnabled]);

  function markVerified(expiresInSeconds: number) {
    try {
      // Margem de 1 minuto antes de o cookie do servidor expirar.
      window.sessionStorage.setItem(VERIFIED_KEY, String(Date.now() + (expiresInSeconds - 60) * 1000));
    } catch {
      // ignora: a verificação continua valendo pelo cookie
    }
    setVerified(true);
  }

  const captcha = useMemo<CaptchaBridge | undefined>(
    () =>
      captchaEnabled
        ? {
            getToken: () => null,
            onTokenUsed: () => undefined,
            onVerified: () => undefined,
            onRejected: () => {
              try {
                window.sessionStorage.removeItem(VERIFIED_KEY);
              } catch {
                // ignora
              }
              setVerified(false);
            },
          }
        : undefined,
    [captchaEnabled],
  );

  const { messages, isLoading, isAnalyzingImage, error, sendMessage, retryLastMessage, startNewConversation } =
    useAssistantChat(captcha);
  const locked = captchaEnabled && !verified;

  // Pergunta vinda de um link da Home (/diagnostico?pergunta=...): só preenche o campo.
  const [prefill, setPrefill] = useState<string>();
  useEffect(() => {
    const question = new URLSearchParams(window.location.search).get("pergunta");
    if (question) setPrefill(question);
  }, []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasUserMessages = messages.some((m) => m.role === "user");

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? "auto" : "smooth" });
  }, [messages, isLoading, error]);

  return (
    <div
      data-track-location="assistente"
      className="flex h-[calc(100dvh-5.5rem)] min-h-[460px] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-lift md:h-[min(80dvh,780px)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <AssistantAvatar className="h-9 w-9" />
          <div className="min-w-0">
            <p className="truncate text-[0.9375rem] font-bold text-foreground">Assistente Automotivo</p>
            <p className="truncate text-xs text-muted">Orientação inicial, não substitui a avaliação presencial</p>
          </div>
        </div>
        {hasUserMessages && (
          <button
            type="button"
            onClick={startNewConversation}
            disabled={isLoading}
            className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface-elevated hover:text-foreground disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Nova conversa</span>
          </button>
        )}
      </div>

      {locked ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <CaptchaGate onVerified={markVerified} />
        </div>
      ) : (
        <>
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="Conversa com o assistente"
            className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-5 md:px-6"
          >
            {messages.map((message) => (
              <div key={message.id} className="animate-message-in">
                <MessageBubble message={message} />
              </div>
            ))}

            {isLoading && (
              <LoadingIndicator
                label={isAnalyzingImage ? "Analisando a foto e escrevendo a resposta…" : "Escrevendo a resposta…"}
              />
            )}

            {error && !isLoading && (
              <div role="alert" className="rounded-2xl border border-accent/50 bg-accent/[0.08] p-4">
                <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-fg" aria-hidden="true" />
                  {error.message}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {error.canRetry && (
                    <button
                      type="button"
                      onClick={retryLastMessage}
                      disabled={locked}
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-foreground/30 px-4 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-foreground/5 disabled:opacity-50"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Tentar novamente
                    </button>
                  )}
                  <a
                    href={buildWhatsAppLink("Olá! Tentei usar o assistente do site e gostaria de falar com a equipe.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-foreground/85 underline-offset-4 hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Falar com a JR Film no WhatsApp
                  </a>
                </div>
              </div>
            )}

            {!hasUserMessages && (
              <div className="pt-2">
                <p className="mb-3 text-sm font-semibold text-foreground/80">
                  Comece por um exemplo ou escreva com suas palavras:
                </p>
                <QuickSuggestions onSelect={(text) => void sendMessage(text)} disabled={isLoading || locked} />
              </div>
            )}
          </div>

          <ChatInput
            onSend={(text, image) => void sendMessage(text, image)}
            disabled={isLoading}
            submitBlocked={locked}
            imagesEnabled={imagesEnabled}
            prefill={prefill}
          />
        </>
      )}
    </div>
  );
}
