import { contactInfo } from "@/data/contact";

// Camada de serviço: centraliza a montagem de links do WhatsApp.
// Qualquer componente que precise de um link chama esta função — nunca monta a URL manualmente.
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${contactInfo.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage = "Olá! Vim pelo site e gostaria de agendar uma avaliação para o meu veículo.";
