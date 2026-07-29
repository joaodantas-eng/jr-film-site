// Contratos da camada de IA. A UI e a orquestração (assistant.ts) dependem
// apenas destes tipos — nunca de uma implementação de provider específica.
// Isso é o que permite trocar de "simulado" para OpenAI/Anthropic/Gemini
// futuramente sem tocar em nenhum componente.

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
  offTopic?: boolean; // true quando a pergunta não é sobre o tema automotivo
  relatedServiceSlug?: string;
}

// Contrato que qualquer provider de IA precisa implementar — o simulado hoje,
// um provider real (OpenAI/Anthropic/Gemini) amanhã.
export interface AIProvider {
  name: string;
  getResponse: (userMessage: string, history: AssistantMessage[]) => Promise<AssistantAnswer>;
}
