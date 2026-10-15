import "server-only";
import { AssistantAnswer, AssistantContext, AssistantMessage } from "./types";
import { activeProvider } from "./providers/provider";
import { simulatedProvider } from "./providers/simulated.provider";
import { logServerError } from "@/lib/serverLog";

import { AssistantTimeoutError } from "./errors";

export { AssistantTimeoutError };

// Ponto único de entrada da camada de IA de texto — chamado exclusivamente
// pela Route Handler /api/assistant (nunca por um componente client; o
// import "server-only" quebra o build se isso acontecer por engano).
//
// Comportamento de erro do provider principal (ex: Gemini):
// - Em PRODUÇÃO: cai para o provider simulado (base de conhecimento local,
//   sem custo), para o visitante não ficar sem resposta. O erro real fica no
//   log do servidor — acompanhe os logs da Vercel para não deixar uma falha
//   passar despercebida. Timeouts NÃO caem para o simulado: o visitante recebe
//   a mensagem de "tente novamente".
// - Em DESENVOLVIMENTO: o erro é relançado (não mascarado), para aparecer no
//   terminal e no console do navegador enquanto se depura a integração.
// Não há nova tentativa automática da chamada ao Gemini (cada chamada custa).
export async function getAssistantAnswer(
  userMessage: string,
  history: AssistantMessage[] = [],
  context?: AssistantContext,
): Promise<AssistantAnswer> {
  try {
    return await activeProvider.getResponse(userMessage, history, context);
  } catch (error) {
    if (error instanceof AssistantTimeoutError) throw error;

    const isProduction = process.env.NODE_ENV === "production";
    const isAlreadySimulated = activeProvider.name === simulatedProvider.name;

    if (isProduction && !isAlreadySimulated) {
      logServerError("assistant", error, { provider: activeProvider.name, fallback: true });
      return simulatedProvider.getResponse(userMessage, history, context);
    }

    throw error;
  }
}
