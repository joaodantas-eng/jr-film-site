"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { contactInfo } from "@/data/contact";
import { trackEvent } from "@/lib/analytics";

// O mapa do Google só é carregado quando o visitante pede: evita baixar
// ~1 MB de scripts do Google em toda visita e não envia dados do visitante
// ao Google Maps sem uma ação dele. Até lá, mostra endereço e rota.
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={contactInfo.mapEmbedUrl}
        className="h-full w-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title={`Mapa: JR Film, ${contactInfo.address.full}`}
      />
    );
  }

  return (
    <div
      className="relative flex h-full flex-col items-center justify-center gap-5 bg-surface p-8 text-center"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_0_10px_rgba(225,6,0,0.15)]">
        <MapPin className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <p className="max-w-xs text-lg font-semibold text-foreground">{contactInfo.address.full}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={contactInfo.mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Traçar rota no Google Maps
        </a>
        <button
          type="button"
          onClick={() => {
            setLoaded(true);
            trackEvent("map_load");
          }}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-foreground/30 px-5 text-sm font-semibold text-foreground transition-colors hover:border-foreground hover:bg-foreground/5"
        >
          Carregar mapa aqui
        </button>
      </div>
      <p className="max-w-xs text-xs text-muted">
        Ao carregar o mapa, o Google Maps recebe dados de acesso do seu navegador.
      </p>
    </div>
  );
}
