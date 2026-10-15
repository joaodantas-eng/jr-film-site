"use client";

import Script from "next/script";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

// Widget do Cloudflare Turnstile (CAPTCHA). Em modo "interaction-only", fica
// invisível para a maioria dos visitantes e só mostra um desafio (uma caixa
// para marcar) quando a Cloudflare tem dúvida. O token gerado é de uso único
// e vale ~5 minutos; o servidor troca o token por um cookie de sessão.
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

interface TurnstileApi {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileWidgetProps {
  onToken: (token: string | null) => void;
  onError: (failed: boolean) => void;
}

export const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(function TurnstileWidget(
  { onToken, onError },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const callbacks = useRef({ onToken, onError });
  callbacks.current = { onToken, onError };

  const render = useCallback(() => {
    if (!window.turnstile || !containerRef.current || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: "assistant",
      appearance: "interaction-only",
      theme: "dark",
      language: "pt-br",
      callback: (token: string) => {
        callbacks.current.onError(false);
        callbacks.current.onToken(token);
      },
      "expired-callback": () => callbacks.current.onToken(null),
      "error-callback": () => {
        callbacks.current.onToken(null);
        callbacks.current.onError(true);
        // devolve true para a Turnstile não lançar o erro no console
        return true;
      },
    });
  }, []);

  useEffect(() => {
    if (window.turnstile) setScriptReady(true);
  }, []);

  useEffect(() => {
    if (scriptReady) render();
    return () => {
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [scriptReady, render]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      callbacks.current.onToken(null);
      if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
    },
  }));

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => callbacks.current.onError(true)}
      />
      <div ref={containerRef} className="flex justify-center py-2 empty:hidden" />
    </>
  );
});
