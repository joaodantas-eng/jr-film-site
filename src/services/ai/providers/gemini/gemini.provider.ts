import "server-only";
import { GoogleGenAI } from "@google/genai";
import { AIProvider, AssistantAnswer, AssistantContext, AssistantMessage } from "../../types";
import { buildSystemPrompt } from "../../prompts/systemPrompt";
import { ASSISTANT_WARNING, ASSISTANT_CLOSING_NOTE_FALLBACK } from "../../prompts/constants";
import { ASSISTANT_RESPONSE_SCHEMA } from "./responseSchema";
import { services } from "@/data/services";

// "server-only" garante, em tempo de build, que este arquivo nunca seja
// importado por um componente client — se alguém tentar, o build falha.
// É a segunda camada de proteção da chave (a primeira é: só a Route Handler
// de /api/assistant chama a camada de IA).

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const MAX_HISTORY_MESSAGES = 8;

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (client) return client;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY não configurada.");
  }
  client = new GoogleGenAI({ apiKey });
  return client;
}

function summarizeAnswerForHistory(answer?: AssistantAnswer): string {
  if (!answer) return "";
  return [answer.recommendation, ...(answer.possibleCauses ?? [])].filter(Boolean).join(" ");
}

// Converte o histórico do chat (nosso formato) para o formato de "contents"
// que a API do Gemini espera, mantendo só as últimas mensagens — reduz custo
// e latência sem perder o contexto recente da conversa.
function toGeminiContents(history: AssistantMessage[], userMessage: string) {
  const recentHistory = history.slice(-MAX_HISTORY_MESSAGES).filter((m) => m.content || m.answer);

  const historyContents = recentHistory.map((message) => ({
    role: message.role === "user" ? ("user" as const) : ("model" as const),
    parts: [{ text: message.content || summarizeAnswerForHistory(message.answer) }],
  }));

  return [...historyContents, { role: "user" as const, parts: [{ text: userMessage }] }];
}

function buildUserMessage(userMessage: string, context?: AssistantContext): string {
  const vehicle = context?.vehicleInfo;
  if (!vehicle?.brand) return userMessage;

  const vehicleSummary = [
    vehicle.brand && `marca ${vehicle.brand}`,
    vehicle.model && `modelo ${vehicle.model}`,
    vehicle.year && `ano ${vehicle.year}`,
    vehicle.engine && `motorização ${vehicle.engine}`,
    vehicle.mileage && `quilometragem ${vehicle.mileage}`,
    vehicle.fuel && `combustível ${vehicle.fuel}`,
  ]
    .filter(Boolean)
    .join(", ");

  return `${userMessage}\n\n[Dados do veículo informados pelo cliente: ${vehicleSummary}]`;
}

interface GeminiResponseShape {
  possibleCauses?: unknown;
  urgency?: unknown;
  recommendation?: unknown;
  important?: unknown;
  closingNote?: unknown;
  offTopic?: unknown;
  relatedServiceSlug?: unknown;
}

function parseAnswer(rawText: string): AssistantAnswer {
  let parsed: GeminiResponseShape;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("Resposta do Gemini não é um JSON válido.");
  }

  const urgency = parsed.urgency === "baixo" || parsed.urgency === "medio" || parsed.urgency === "alto" ? parsed.urgency : undefined;

  const rawSlug = typeof parsed.relatedServiceSlug === "string" ? parsed.relatedServiceSlug : "";
  const relatedServiceSlug = services.some((s) => s.slug === rawSlug) ? rawSlug : undefined;

  return {
    possibleCauses: Array.isArray(parsed.possibleCauses) ? parsed.possibleCauses.filter((c): c is string => typeof c === "string") : [],
    recommendation: typeof parsed.recommendation === "string" ? parsed.recommendation : "",
    warning: typeof parsed.important === "string" && parsed.important ? parsed.important : ASSISTANT_WARNING,
    closingNote: typeof parsed.closingNote === "string" && parsed.closingNote ? parsed.closingNote : ASSISTANT_CLOSING_NOTE_FALLBACK,
    urgency,
    offTopic: Boolean(parsed.offTopic),
    relatedServiceSlug,
  };
}

async function getResponse(
  userMessage: string,
  history: AssistantMessage[],
  context?: AssistantContext,
): Promise<AssistantAnswer> {
  const ai = getClient();
  const messageWithContext = buildUserMessage(userMessage, context);

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: toGeminiContents(history, messageWithContext),
    config: {
      systemInstruction: buildSystemPrompt(),
      responseMimeType: "application/json",
      responseSchema: ASSISTANT_RESPONSE_SCHEMA,
      temperature: 0.4,
      maxOutputTokens: 800,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Resposta vazia do Gemini.");
  }

  return parseAnswer(text);
}

export const geminiProvider: AIProvider = {
  name: "gemini",
  getResponse,
};
