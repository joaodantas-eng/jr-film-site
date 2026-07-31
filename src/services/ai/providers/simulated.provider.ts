import { AIProvider, AssistantAnswer, AssistantContext, AssistantMessage } from "../types";
import { findMatchingSymptom, isAutomotiveTopic } from "../knowledge/symptoms";
import {
  ASSISTANT_WARNING,
  ASSISTANT_OFF_TOPIC_MESSAGE,
  ASSISTANT_FALLBACK_RECOMMENDATION,
  ASSISTANT_CLOSING_NOTE_FALLBACK,
} from "../prompts/constants";

// Provider simulado: responde a partir da base de conhecimento local, sem
// nenhuma chamada externa. Serve dois papéis agora: (1) fallback automático
// quando GEMINI_API_KEY não está configurada, e (2) rede de segurança quando
// o Gemini falha em tempo de execução (ver assistant.ts).
function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));
}

function vehicleMention(context?: AssistantContext): string {
  const vehicle = context?.vehicleInfo;
  if (!vehicle?.brand) return "";
  const parts = [vehicle.brand, vehicle.model, vehicle.year].filter(Boolean).join(" ");
  return parts ? ` Considerando que o veículo é um ${parts}, isso ajuda a direcionar melhor a avaliação presencial.` : "";
}

async function getResponse(
  userMessage: string,
  _history: AssistantMessage[],
  context?: AssistantContext,
): Promise<AssistantAnswer> {
  await simulateLatency();

  const symptom = findMatchingSymptom(userMessage);

  if (symptom) {
    return {
      possibleCauses: symptom.possibleCauses,
      recommendation: `${symptom.description} ${symptom.recommendation}${vehicleMention(context)}`,
      warning: ASSISTANT_WARNING,
      closingNote: ASSISTANT_CLOSING_NOTE_FALLBACK,
      urgency: symptom.urgency,
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
    recommendation: `${ASSISTANT_FALLBACK_RECOMMENDATION}${vehicleMention(context)}`,
    warning: ASSISTANT_WARNING,
    closingNote: ASSISTANT_CLOSING_NOTE_FALLBACK,
  };
}

export const simulatedProvider: AIProvider = {
  name: "simulated",
  getResponse,
};
