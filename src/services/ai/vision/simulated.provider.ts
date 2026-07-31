import { AssistantAnswer } from "../types";
import { VisionProvider, PhotoInput } from "./types";
import { ASSISTANT_WARNING, ASSISTANT_PHOTO_PLACEHOLDER_MESSAGE } from "../prompts/constants";

function simulateLatency() {
  return new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 600));
}

// Provider simulado de visão: por enquanto não analisa a imagem de fato —
// apenas confirma o recebimento e orienta o contato direto, deixando claro
// que a análise automática está a caminho. Quando um provider multimodal
// real (OpenAI, Anthropic, Gemini) for conectado, ele implementa a mesma
// interface VisionProvider e substitui este em vision/provider.ts.
async function analyzePhoto(_photo: PhotoInput): Promise<AssistantAnswer> {
  await simulateLatency();

  return {
    possibleCauses: [],
    recommendation: ASSISTANT_PHOTO_PLACEHOLDER_MESSAGE,
    warning: ASSISTANT_WARNING,
  };
}

export const simulatedVisionProvider: VisionProvider = {
  name: "simulated-vision",
  analyzePhoto,
};
