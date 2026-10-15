// Contratos da camada de IA. A UI e a orquestração (assistant.ts) dependem
// apenas destes tipos — nunca de uma implementação de provider específica.

export type { AIProvider } from "../interfaces/AIProvider";

export type UrgencyLevel = "baixo" | "medio" | "alto";

// Imagem anexada a uma mensagem — trafega e é armazenada (em memória, durante
// a sessão) como base64. Sem tela separada, sem storage externo: a mesma
// representação serve para pré-visualização no chat e para envio à API.
export interface ImageAttachment {
  mimeType: string;
  base64Data: string; // sem o prefixo "data:mime;base64,"
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string; // texto simples (usado por mensagens do usuário e pela saudação inicial)
  image?: ImageAttachment; // presente quando o usuário anexou uma foto a esta mensagem
  imageOmitted?: boolean; // a foto existia, mas não foi mantida ao restaurar a conversa da aba
  answer?: AssistantAnswer; // presente quando a resposta do assistente é estruturada
  createdAt: number;
}

export interface AssistantAnswer {
  // Resposta conversacional, em prosa — como um consultor da JR Film
  // explicaria ao cliente. Pode ser uma orientação ou uma pergunta de
  // esclarecimento. Nunca é dividida em seções/títulos pela UI.
  message: string;
  // Lista curta de possíveis causas — só preenchida quando uma lista
  // realmente ajuda a compreensão (ex: não em perguntas de esclarecimento).
  possibleCauses: string[];
  urgency?: UrgencyLevel;
  offTopic?: boolean; // true quando a pergunta não é sobre o tema automotivo
  relatedServiceSlug?: string;
}

// Contexto opcional que acompanha a mensagem atual — hoje só a imagem
// anexada nesta rodada (imagens de rodadas anteriores viajam dentro do
// próprio `history`, em AssistantMessage.image).
export interface AssistantContext {
  image?: ImageAttachment;
}
