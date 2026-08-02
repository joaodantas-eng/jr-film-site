import { AIProvider, AssistantAnswer, AssistantContext, AssistantMessage } from "../types";
import { findMatchingSymptom, isAutomotiveTopic } from "../knowledge/symptoms";
import { ASSISTANT_OFF_TOPIC_MESSAGE, ASSISTANT_FALLBACK_RECOMMENDATION, ASSISTANT_IMAGE_ERROR_MESSAGE } from "../prompts/constants";

// Provider simulado: responde a partir da base de conhecimento local, sem
// nenhuma chamada externa. Serve dois papéis: (1) fallback automático quando
// GEMINI_API_KEY não está configurada, e (2) rede de segurança em produção
// quando o Gemini falha em tempo de execução (ver assistant.ts).
//
// Importante: este provider NUNCA analisa imagens de verdade (não tem como).
// Se uma imagem foi anexada, ele é honesto sobre isso em vez de fingir uma
// análise — nunca inventamos uma resposta falsa para uma foto.
function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));
}

async function getResponse(
  userMessage: string,
  _history: AssistantMessage[],
  context?: AssistantContext,
): Promise<AssistantAnswer> {
  await simulateLatency();

  if (context?.image) {
    return {
      message: ASSISTANT_IMAGE_ERROR_MESSAGE,
      possibleCauses: [],
    };
  }

  const symptom = findMatchingSymptom(userMessage);

  if (symptom) {
    return {
      message: `${symptom.description} ${symptom.recommendation}`,
      possibleCauses: symptom.possibleCauses,
      urgency: symptom.urgency,
      relatedServiceSlug: symptom.relatedServiceSlug,
    };
  }

  if (!isAutomotiveTopic(userMessage)) {
    return {
      message: ASSISTANT_OFF_TOPIC_MESSAGE,
      possibleCauses: [],
      offTopic: true,
    };
  }

  return {
    message: ASSISTANT_FALLBACK_RECOMMENDATION,
    possibleCauses: [],
  };
}

export const simulatedProvider: AIProvider = {
  name: "simulated",
  getResponse,
};
