"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Registra um evento quando a página é exibida (ex: abertura do assistente,
// visualização de promoções). Não envia nenhum dado do visitante.
export function TrackOnMount({ event, params }: { event: string; params?: Record<string, string | number> }) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dispara uma vez por exibição da página
  }, []);
  return null;
}
