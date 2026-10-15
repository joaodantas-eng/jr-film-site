"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ConsentValue, OPEN_CONSENT_EVENT, readConsent, saveConsent } from "@/lib/analytics";

// Aviso de cookies de medição (Google Analytics). Aceitar e recusar têm o
// mesmo peso visual; recusar não limita nenhuma funcionalidade do site.
export function ConsentBanner({ initialConsent }: { initialConsent: ConsentValue | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, [initialConsent]);

  if (!visible) return null;

  function choose(value: ConsentValue) {
    saveConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Preferências de cookies"
      className="fixed inset-x-3 bottom-[calc(var(--mobile-bar-height,0px)+0.75rem)] z-50 mx-auto max-w-xl rounded-2xl border border-border bg-surface-elevated p-5 shadow-card md:bottom-6"
    >
      <p className="text-sm leading-relaxed text-foreground/90">
        Usamos cookies do Google Analytics para entender, de forma agregada, como o site é usado. Você pode aceitar ou
        recusar — o site funciona normalmente nos dois casos.{" "}
        <Link href="/privacidade#cookies" className="underline underline-offset-2 hover:text-foreground">
          Saiba como tratamos os dados
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-11 flex-1 rounded-lg border border-foreground/30 bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Aceitar cookies de medição
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-11 flex-1 rounded-lg border border-foreground/30 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
