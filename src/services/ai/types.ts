// Contratos da camada de IA. A UI e a orquestração (assistant.ts) dependem
// apenas destes tipos — nunca de uma implementação de provider específica.
// Isso é o que permite trocar de "simulado" para OpenAI/Anthropic/Gemini
// futuramente sem tocar em nenhum componente.

export type UrgencyLevel = "baixo" | "medio" | "alto";

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string; // texto simples (usado por mensagens do usuário e pela saudação inicial)
  answer?: AssistantAnswer; // presente quando a resposta do assistente é estruturada
  createdAt: number;
}

export interface AssistantAnswer {
  possibleCauses: string[];
  recommendation: string;
  warning: string;
  urgency?: UrgencyLevel;
  offTopic?: boolean; // true quando a pergunta não é sobre o tema automotivo
  relatedServiceSlug?: string;
}

// Dados do veículo, coletados no formulário da Central de Diagnóstico.
// Ficam disponíveis para enriquecer a resposta — hoje no texto simulado,
// futuramente como contexto real enviado ao provider de IA.
export interface VehicleInfo {
  brand: string;
  model: string;
  year: string;
  engine: string;
  mileage: string;
  fuel: string;
}

// Contexto opcional que acompanha uma pergunta — usado tanto pelo provider de
// texto quanto, futuramente, por um provider multimodal.
export interface AssistantContext {
  vehicleInfo?: VehicleInfo;
}

// Contrato que qualquer provider de IA precisa implementar — o simulado hoje,
// um provider real (OpenAI/Anthropic/Gemini) amanhã.
export interface AIProvider {
  name: string;
  getResponse: (
    userMessage: string,
    history: AssistantMessage[],
    context?: AssistantContext,
  ) => Promise<AssistantAnswer>;
}
