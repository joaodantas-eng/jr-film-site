import "server-only";
import { AssistantAnswer, AssistantContext, AssistantMessage } from "./types";
import { activeProvider } from "./providers/provider";
import { simulatedProvider } from "./providers/simulated.provider";

// Ponto único de entrada da camada de IA de texto — chamado exclusivamente
// pela Route Handler /api/assistant (nunca por um componente client; o
// import "server-only" quebra o build se isso acontecer por engano).
//
// Comportamento de erro do provider principal (ex: Gemini):
// - Em PRODUÇÃO: cai para o provider simulado, para o visitante nunca ver a
//   experiência quebrada. O erro real fica logado no servidor.
// - Em DESENVOLVIMENTO: o erro é relançado (não mascarado), para aparecer
//   completo no terminal e na resposta da API — importante enquanto se
//   depura a integração. Reative o fallback em dev comentando a condição
//   abaixo, se preferir não ver os erros crus durante o trabalho no dia a dia.
export async function getAssistantAnswer(
  userMessage: string,
  history: AssistantMessage[] = [],
  context?: AssistantContext,
): Promise<AssistantAnswer> {
  try {
    return await activeProvider.getResponse(userMessage, history, context);
  } catch (error) {
    console.error(`[assistant] provider "${activeProvider.name}" falhou:`, error);

    const isProduction = process.env.NODE_ENV === "production";
    const isAlreadySimulated = activeProvider.name === simulatedProvider.name;

    if (isProduction && !isAlreadySimulated) {
      console.warn('[assistant] ambiente de produção: usando fallback simulado para esta resposta.');
      return simulatedProvider.getResponse(userMessage, history, context);
    }

    throw error;
  }
}
