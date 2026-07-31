import { VisionProvider } from "./types";
import { simulatedVisionProvider } from "./simulated.provider";

// Único ponto de troca do provider de visão computacional.
// Para conectar análise de imagem real (GPT-4 Vision, Claude, Gemini Vision):
//   1. Criar um novo arquivo implementando VisionProvider (ver ./types.ts)
//   2. Trocar a linha abaixo
// Nenhum componente de UI precisa mudar.
export const activeVisionProvider: VisionProvider = simulatedVisionProvider;
