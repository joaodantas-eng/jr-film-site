import { AIProvider, AssistantAnswer } from "../types";
import { findMatchingSymptom, isAutomotiveTopic } from "../knowledge/symptoms";
import { ASSISTANT_WARNING, ASSISTANT_OFF_TOPIC_MESSAGE, ASSISTANT_FALLBACK_RECOMMENDATION } from "../prompt";

// Provider simulado: responde a partir da base de conhecimento local, sem
// nenhuma chamada externa. Implementa o mesmo contrato AIProvider que um
// provider real (OpenAI/Anthropic/Gemini) implementaria — a troca futura
// acontece em providers/provider.ts, sem tocar em assistant.ts nem na UI.
function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));
}

async function getResponse(userMessage: string): Promise<AssistantAnswer> {
  await simulateLatency();

  const symptom = findMatchingSymptom(userMessage);

  if (symptom) {
    return {
      possibleCauses: symptom.possibleCauses,
      recommendation: `${symptom.description} ${symptom.recommendation}`,
      warning: ASSISTANT_WARNING,
      relatedServiceSlug: symptom.relatedServiceSlug,
    };
  }

  if (!isAutomotiveTopic(userMessage)) {
    return {
      possibleCauses: [],
      recommendation: ASSISTANT_OFF_TOPIC_MESSAGE,
      warning: ASSISTANT_WARNING,
      offTopic: true,
    };
  }

  return {
    possibleCauses: [],
    recommendation: ASSISTANT_FALLBACK_RECOMMENDATION,
    warning: ASSISTANT_WARNING,
  };
}

export const simulatedProvider: AIProvider = {
  name: "simulated",
  getResponse,
};
