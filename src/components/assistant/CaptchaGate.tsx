"use client";

import { useRef, useState } from "react";
import { ShieldCheck, Loader2, MessageCircle } from "lucide-react";
import { TurnstileHandle, TurnstileWidget } from "./TurnstileWidget";
import { buildWhatsAppLink } from "@/services/whatsapp";
import { ASSISTANT_ERROR_MESSAGES } from "@/services/ai/prompts/constants";

type Status = "idle" | "checking" | "error";

// Tela de entrada do assistente: o visitante confirma que não é um robô
// (Cloudflare Turnstile) e o servidor libera o chat por 30 minutos.
export function CaptchaGate({ onVerified }: { onVerified: (expiresInSeconds: number) => void }) {
  const widgetRef = useRef<TurnstileHandle>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [widgetFailed, setWidgetFailed] = useState(false);

  async function verify(token: string | null) {
    if (!token) return;
    setStatus("checking");
    setMessage(null);
    try {
      const response = await fetch("/api/assistant/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        signal: AbortSignal.timeout(15_000),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        expiresInSeconds?: number;
      } | null;
      if (response.ok && data?.ok) {
        onVerified(data.expiresInSeconds ?? 1800);
        return;
      }
      setMessage(
        ASSISTANT_ERROR_MESSAGES[data?.error ?? "captcha_unavailable"] ?? ASSISTANT_ERROR_MESSAGES.captcha_unavailable!,
      );
    } catch {
      setMessage(ASSISTANT_ERROR_MESSAGES.network!);
    }
    setStatus("error");
    widgetRef.current?.reset();
  }

  return (
    <div
      className="flex h-full flex-col items-center justify-center px-5 py-10 text-center"
      data-track-location="assistente-verificacao"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white">
        <ShieldCheck className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h2 className="type-display mt-6 text-2xl text-foreground">Confirme que você não é um robô</h2>
      <p className="mt-3 max-w-sm text-[0.975rem] leading-relaxed text-muted">
        Essa verificação protege o assistente contra uso automatizado. Depois dela, o chat fica liberado por 30 minutos.
      </p>

      <div className="mt-7 min-h-[65px]">
        <TurnstileWidget
          ref={widgetRef}
          appearance="always"
          onToken={(token) => void verify(token)}
          onError={(failed) => {
            setWidgetFailed(failed);
            if (failed) setStatus("error");
          }}
        />
      </div>

      <div className="mt-4 min-h-6" aria-live="polite">
        {status === "checking" && (
          <p className="flex items-center gap-2 text-sm text-foreground/80">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Liberando o assistente…
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="max-w-sm text-sm text-foreground">
            {widgetFailed
              ? "Não foi possível carregar a verificação. Recarregue a página ou desative bloqueadores de conteúdo para este site."
              : message}
          </p>
        )}
      </div>

      <a
        href={buildWhatsAppLink("Olá! Gostaria de uma orientação sobre o meu carro.")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-foreground/85 underline-offset-4 hover:underline"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Prefere falar direto com a equipe? WhatsApp
      </a>
    </div>
  );
}
