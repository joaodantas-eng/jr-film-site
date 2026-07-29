import { AssistantAnswer, AssistantMessage } from "./types";
import { activeProvider } from "./providers/provider";

// Ponto único de entrada da camada de IA. A UI (hooks/useAssistantChat) chama
// apenas esta função — nunca um provider diretamente. Quando o histórico da
// conversa passar a ser usado de fato (provider real de IA), a assinatura já
// está preparada para isso.
export async function getAssistantAnswer(
  userMessage: string,
  history: AssistantMessage[] = [],
): Promise<AssistantAnswer> {
  return activeProvider.getResponse(userMessage, history);
}
