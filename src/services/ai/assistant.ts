import { AssistantAnswer, AssistantContext, AssistantMessage } from "./types";
import { activeProvider } from "./providers/provider";

// Ponto único de entrada da camada de IA de texto. A UI (hooks/useAssistantChat)
// chama apenas esta função — nunca um provider diretamente. O parâmetro de
// contexto carrega os dados do veículo quando disponíveis (preenchidos na
// Central de Diagnóstico), preparado também para um provider multimodal
// receber uma referência de foto no futuro.
export async function getAssistantAnswer(
  userMessage: string,
  history: AssistantMessage[] = [],
  context?: AssistantContext,
): Promise<AssistantAnswer> {
  return activeProvider.getResponse(userMessage, history, context);
}
