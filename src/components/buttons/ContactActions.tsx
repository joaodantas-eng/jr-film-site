"use client";

import { useEffect } from "react";
import { buildWhatsAppLink, defaultWhatsAppMessage } from "@/services/whatsapp";
import { contactInfo } from "@/data/contact";
import { MessageCircle, Phone, MapPin } from "lucide-react";

const MOBILE_BAR_HEIGHT = "4.5rem";

// Atalhos de contato fixos:
// - Celular (< 1024 px): barra no rodapé com WhatsApp (ação principal),
//   Ligar e Como chegar. Ícone sempre acompanhado de texto, respeita a área
//   segura do iPhone e reserva espaço no fim da página (--mobile-bar-height)
//   para nunca cobrir conteúdo, campos ou botões.
// - Desktop: sem botão flutuante — o cabeçalho fixo já mostra o WhatsApp.
export function ContactActions() {
  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () =>
      root.style.setProperty(
        "--mobile-bar-height",
        mq.matches ? `calc(${MOBILE_BAR_HEIGHT} + env(safe-area-inset-bottom))` : "0px",
      );
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      root.style.removeProperty("--mobile-bar-height");
    };
  }, []);

  const whatsappHref = buildWhatsAppLink(defaultWhatsAppMessage);

  return (
    <>
      <nav
        aria-label="Atalhos de contato"
        data-track-location="barra-fixa-mobile"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <ul className="mx-auto flex h-[4.5rem] max-w-xl items-center gap-2 px-3">
          <li className="flex-[1.6]">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-[0.95rem] font-bold text-white active:bg-accent-hover"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp
            </a>
          </li>
          <li className="flex-1">
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="flex h-12 flex-col items-center justify-center rounded-lg text-xs font-semibold text-foreground/90 active:bg-surface-elevated"
            >
              <Phone className="h-5 w-5 text-accent-fg" aria-hidden="true" />
              Ligar
            </a>
          </li>
          <li className="flex-1">
            <a
              href={contactInfo.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 flex-col items-center justify-center rounded-lg text-xs font-semibold text-foreground/90 active:bg-surface-elevated"
            >
              <MapPin className="h-5 w-5 text-accent-fg" aria-hidden="true" />
              Como chegar
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
