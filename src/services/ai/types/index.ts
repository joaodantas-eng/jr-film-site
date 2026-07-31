// Contratos da camada de IA. A UI e a orquestração (assistant.ts) dependem
// apenas destes tipos — nunca de uma implementação de provider específica.

export type { AIProvider } from "../interfaces/AIProvider";

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
  closingNote?: string; // texto curto da seção "JR Film pode ajudar"
  urgency?: UrgencyLevel;
  offTopic?: boolean; // true quando a pergunta não é sobre o tema automotivo
  relatedServiceSlug?: string;
}

// Dados do veículo, coletados no formulário da Central de Diagnóstico.
// Ficam disponíveis para enriquecer a resposta — hoje enviados ao Gemini
// como contexto adicional da conversa.
export interface VehicleInfo {
  brand: string;
  model: string;
  year: string;
  engine: string;
  mileage: string;
  fuel: string;
}

// Contexto opcional que acompanha uma pergunta.
export interface AssistantContext {
  vehicleInfo?: VehicleInfo;
}
