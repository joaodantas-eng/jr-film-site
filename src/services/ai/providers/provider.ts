import { AIProvider } from "../types";
import { simulatedProvider } from "./simulated.provider";

// Único ponto de troca de provider de IA do projeto.
//
// Hoje: provider simulado, baseado na base de conhecimento local.
//
// Para conectar um provider real no futuro:
//   1. Criar providers/openai.provider.ts (ou anthropic.provider.ts, gemini.provider.ts)
//      implementando a interface AIProvider (ver ../types.ts).
//      O system prompt já está pronto em ../prompt.ts (ASSISTANT_SYSTEM_PROMPT).
//   2. Trocar a linha abaixo para o novo provider.
// Nenhum componente de UI ou o assistant.ts precisam mudar.
export const activeProvider: AIProvider = simulatedProvider;
