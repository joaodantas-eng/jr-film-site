"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, ConsentValue, GA_MEASUREMENT_ID, initGtag, readConsent, trackEvent } from "@/lib/analytics";
import { ConsentBanner } from "./ConsentBanner";

// Carrega o GA4 somente depois do consentimento — antes disso nenhum script
// do Google é baixado e nenhum cookie de medição é criado. Sem o ID de
// medição configurado, o componente não renderiza nada (nem o aviso).
export function GoogleAnalytics() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    setConsent(readConsent());
    const onChange = (event: Event) => setConsent((event as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // Recusa depois de ter aceitado: o sinalizador oficial ga-disable-<ID>
  // interrompe qualquer envio do gtag.js já carregado nesta página.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = consent !== "granted";
  }, [consent]);

  // Cliques de contato medidos por delegação: um único listener cobre todos
  // os links de WhatsApp, telefone e rota do site. Mede o clique — não
  // significa que a conversa ou a ligação de fato aconteceu.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || consent !== "granted") return;
    initGtag();
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const location = link.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation ?? "pagina";
      if (href.startsWith("https://wa.me/")) trackEvent("whatsapp_click", { link_location: location });
      else if (href.startsWith("tel:")) trackEvent("phone_click", { link_location: location });
      else if (href.includes("google.com/maps/dir")) trackEvent("directions_click", { link_location: location });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [consent]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {consent === "granted" && (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      )}
      <ConsentBanner initialConsent={consent} />
    </>
  );
}
