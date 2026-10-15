"use client";

// Camada fina sobre o Google Analytics 4. Só envia algo quando:
// 1. NEXT_PUBLIC_GA_MEASUREMENT_ID está configurado (ID público, não é segredo), e
// 2. o visitante aceitou os cookies de medição no aviso de consentimento.
// Caso contrário, todas as chamadas são ignoradas silenciosamente.
//
// Nunca envie aqui texto de conversas, nomes, telefones, imagens ou qualquer
// dado pessoal — apenas nomes de eventos e parâmetros curtos e genéricos.

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
export const CONSENT_STORAGE_KEY = "jrfilm-analytics-consent";
export const CONSENT_EVENT = "jrfilm:consent-change";
export const OPEN_CONSENT_EVENT = "jrfilm:open-consent";

export type ConsentValue = "granted" | "denied";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function readConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // sem armazenamento: a escolha vale só para esta página
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

// Inicializa o gtag uma única vez (fila do dataLayer). Eventos disparados
// antes do script do Google terminar de carregar ficam na fila e são enviados
// depois — nada é perdido nem duplicado em navegações entre páginas.
export function initGtag() {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag === "function") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- formato exigido pelo gtag.js
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (readConsent() !== "granted") return;
  initGtag();
  if (typeof window.gtag !== "function") return;

  const safeParams: EventParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    safeParams[key] = typeof value === "string" ? value.slice(0, 100) : value;
  }
  window.gtag("event", name, safeParams);
}
