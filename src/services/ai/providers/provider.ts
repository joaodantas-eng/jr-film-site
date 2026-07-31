import "server-only";
import { AIProvider } from "../types";
import { simulatedProvider } from "./simulated.provider";
import { geminiProvider } from "./gemini/gemini.provider";

// Único ponto de troca de provider de IA de texto do projeto.
//
// Hoje: Gemini quando GEMINI_API_KEY está configurada (ver .env.example);
// cai automaticamente para o provider simulado quando não está — o site
// nunca quebra por falta de chave, só deixa de usar IA real.
//
// Para conectar OpenAI, Anthropic ou outro provedor no futuro:
//   1. Criar providers/openai/openai.provider.ts implementando AIProvider
//      (ver ../interfaces/AIProvider.ts) — o mesmo prompts/systemPrompt.ts
//      pode ser reaproveitado como texto de instrução.
//   2. Trocar a linha abaixo.
// Nenhum componente de UI ou o assistant.ts precisam mudar.
export const activeProvider: AIProvider = process.env.GEMINI_API_KEY ? geminiProvider : simulatedProvider;
