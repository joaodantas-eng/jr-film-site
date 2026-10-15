import "server-only";
import { AIProvider } from "../types";
import { simulatedProvider } from "./simulated.provider";
import { geminiProvider } from "./gemini/gemini.provider";
import { hasGeminiKey } from "../config";

// Único ponto de troca de provider de IA de texto do projeto.
//
// Hoje: Gemini quando GEMINI_API_KEY está configurada (ver .env.example);
// cai para o provider simulado quando não está — o site não quebra por falta
// de chave, só deixa de usar IA real (um aviso é registrado no log em produção).
//
// Para conectar outro provedor no futuro: criar providers/<nome>/<nome>.provider.ts
// implementando AIProvider (ver ../interfaces/AIProvider.ts) e trocar a linha abaixo.
export const activeProvider: AIProvider = hasGeminiKey() ? geminiProvider : simulatedProvider;

if (!hasGeminiKey() && process.env.NODE_ENV === "production") {
  console.warn("[assistant] GEMINI_API_KEY ausente: usando respostas simuladas da base local.");
}
