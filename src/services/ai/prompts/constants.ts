import { siteConfig } from "@/data/site";

// Identidade própria — nunca "ChatGPT", "Gemini" nem "IA" nas telas do usuário.
export const ASSISTANT_NAME = "Diagnóstico Inteligente";
export const DIAGNOSTIC_CENTER_NAME = "Central de Diagnóstico Automotivo";

export const ASSISTANT_WARNING = "O diagnóstico definitivo depende de uma avaliação presencial.";

export const ASSISTANT_OFF_TOPIC_MESSAGE =
  "Sou especializado apenas em assuntos automotivos — posso te ajudar a entender melhor o que pode estar acontecendo com o seu veículo. Quer me contar o que ele está apresentando?";

export const ASSISTANT_FALLBACK_RECOMMENDATION =
  "Não encontrei um sintoma parecido na nossa base ainda, mas isso não significa que não seja algo simples de resolver. O ideal é trazer o veículo para uma avaliação — assim conseguimos te dar uma resposta precisa.";

export const ASSISTANT_WELCOME_MESSAGE = `Olá! Eu sou o ${ASSISTANT_NAME} da ${siteConfig.name}. Me conta o que o seu carro está apresentando que eu te ajudo a entender as possíveis causas antes de trazer para uma avaliação.`;

export const ASSISTANT_WHATSAPP_CTA_LABEL = "Falar com a JR Film no WhatsApp";

export const ASSISTANT_PHOTO_PLACEHOLDER_MESSAGE =
  "Recebemos a sua foto! A análise automática de imagens ainda está em desenvolvimento — por enquanto, o melhor caminho é confirmar com a nossa equipe pelo WhatsApp, que já pode dar uma primeira orientação olhando a foto.";

export const ASSISTANT_VEHICLE_SAVED_MESSAGE =
  "Dados do veículo salvos! Agora, sempre que você me contar um sintoma, vou levar essas informações em conta na orientação.";

export const ASSISTANT_ERROR_MESSAGE =
  "Não conseguimos falar com o assistente agora. Tente novamente em instantes, ou fale direto com a nossa equipe pelo WhatsApp.";

export const ASSISTANT_CLOSING_NOTE_FALLBACK = `Traga o veículo até a ${siteConfig.name} para uma avaliação completa e sem compromisso.`;
