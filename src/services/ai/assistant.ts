import "server-only";
import { AssistantAnswer, AssistantContext, AssistantMessage } from "./types";
import { activeProvider } from "./providers/provider";
import { simulatedProvider } from "./providers/simulated.provider";

// Ponto único de entrada da camada de IA de texto — chamado exclusivamente
// pela Route Handler /api/assistant (nunca por um componente client; o
// import "server-only" quebra o build se isso acontecer por engano).
//
// Se o provider principal (Gemini) falhar em tempo de execução — erro de
// rede, chave inválida, limite de cota — a chamada cai para o provider
// simulado em vez de derrubar a experiência do usuário. O erro real é
// logado no servidor para investigação.
export async function getAssistantAnswer(
  userMessage: string,
  history: AssistantMessage[] = [],
  context?: AssistantContext,
): Promise<AssistantAnswer> {
  try {
    return await activeProvider.getResponse(userMessage, history, context);
  } catch (error) {
    if (activeProvider.name === simulatedProvider.name) {
      throw error;
    }
    console.error(`[assistant] provider "${activeProvider.name}" falhou, usando fallback simulado:`, error);
    return simulatedProvider.getResponse(userMessage, history, context);
  }
}
