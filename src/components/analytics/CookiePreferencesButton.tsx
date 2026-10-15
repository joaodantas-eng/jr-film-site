"use client";

import { GA_MEASUREMENT_ID, OPEN_CONSENT_EVENT } from "@/lib/analytics";

// Link do rodapé para rever a escolha de cookies. Só aparece com o GA ativo.
export function CookiePreferencesButton({ className }: { className?: string }) {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className={className}>
      Preferências de cookies
    </button>
  );
}
