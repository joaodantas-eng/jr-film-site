// Contrato único que qualquer provider de IA de texto precisa implementar —
// GeminiProvider hoje, OpenAI/Anthropic amanhã. assistant.ts e a UI dependem
// só desta interface, nunca de uma implementação específica.
import { AssistantAnswer, AssistantContext, AssistantMessage } from "../types";

export interface AIProvider {
  name: string;
  getResponse: (
    userMessage: string,
    history: AssistantMessage[],
    context?: AssistantContext,
  ) => Promise<AssistantAnswer>;
}
