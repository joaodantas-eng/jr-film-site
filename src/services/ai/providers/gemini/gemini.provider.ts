import "server-only";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { AIProvider, AssistantAnswer, AssistantContext, AssistantMessage, ImageAttachment } from "../../types";
import { buildSystemPrompt } from "../../prompts/systemPrompt";
import { ASSISTANT_RESPONSE_SCHEMA } from "./responseSchema";
import { services } from "@/data/services";

// "server-only" garante, em tempo de build, que este arquivo nunca seja
// importado por um componente client — se alguém tentar, o build falha.
// É a segunda camada de proteção da chave (a primeira é: só a Route Handler
// de /api/assistant chama a camada de IA).

// Modelo padrão: Gemini 3.6 Flash — GA (uso em produção) na documentação oficial
// em ai.google.dev, com suporte multimodal nativo (texto + imagem na mesma
// chamada). Sobrescrevível via GEMINI_MODEL.
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3.6-flash";
// O briefing pede para sempre considerar todo o histórico da conversa, não só
// a última mensagem — o teto abaixo é só uma proteção de custo/latência para
// conversas muito longas, bem acima do que uma conversa típica de diagnóstico usa.
const MAX_HISTORY_MESSAGES = 20;

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
  return answer?.message || "";
}

// Monta as "parts" de um turno — texto e, se houver, a imagem anexada junto.
// Usada tanto para o histórico (fotos de rodadas anteriores) quanto para a
// mensagem atual — é o que faz a IA "lembrar" de uma foto enviada antes,
// enquanto a conversa estiver ativa.
function toParts(text: string, image?: ImageAttachment) {
  const parts: ({ text: string } | { inlineData: { mimeType: string; data: string } })[] = [];
  if (text) parts.push({ text });
  if (image) parts.push({ inlineData: { mimeType: image.mimeType, data: image.base64Data } });
  return parts;
}

// Converte o histórico do chat (nosso formato) para o formato de "contents"
// que a API do Gemini espera, mantendo só as últimas mensagens — reduz custo
// e latência sem perder o contexto recente da conversa.
function toGeminiContents(history: AssistantMessage[], userMessage: string, currentImage?: ImageAttachment) {
  const recentHistory = history.slice(-MAX_HISTORY_MESSAGES).filter((m) => m.content || m.answer || m.image);

  const historyContents = recentHistory.map((message) => ({
    role: message.role === "user" ? ("user" as const) : ("model" as const),
    parts: toParts(message.content || summarizeAnswerForHistory(message.answer), message.image),
  }));

  return [...historyContents, { role: "user" as const, parts: toParts(userMessage, currentImage) }];
}

interface GeminiResponseShape {
  message?: unknown;
  possibleCauses?: unknown;
  urgency?: unknown;
  offTopic?: unknown;
  relatedServiceSlug?: unknown;
}

// Alguns modelos, ocasionalmente, cercam a resposta em ```json ... ``` mesmo
// com responseMimeType "application/json". Removemos isso antes de parsear
// em vez de deixar o JSON.parse falhar por um detalhe cosmético.
function extractJsonText(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return (fenced?.[1] ?? trimmed).trim();
}

function parseAnswer(rawText: string): AssistantAnswer {
  const cleaned = extractJsonText(rawText);

  let parsed: GeminiResponseShape;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Loga o texto bruto completo no servidor (nunca mostrado ao usuário) para
    // investigação — o erro amigável é o que chega até a tela do cliente.
    console.error("[gemini] resposta bruta que falhou ao parsear como JSON:", rawText);
    const snippet = rawText.slice(0, 300);
    throw new Error(`Resposta do Gemini não é um JSON válido. Trecho recebido: ${snippet}`);
  }

  const urgency = parsed.urgency === "baixo" || parsed.urgency === "medio" || parsed.urgency === "alto" ? parsed.urgency : undefined;

  const rawSlug = typeof parsed.relatedServiceSlug === "string" ? parsed.relatedServiceSlug : "";
  const relatedServiceSlug = services.some((s) => s.slug === rawSlug) ? rawSlug : undefined;

  return {
    message: typeof parsed.message === "string" ? parsed.message : "",
    possibleCauses: Array.isArray(parsed.possibleCauses) ? parsed.possibleCauses.filter((c): c is string => typeof c === "string") : [],
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

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: toGeminiContents(history, userMessage, context?.image),
    config: {
      systemInstruction: buildSystemPrompt(),
      responseMimeType: "application/json",
      responseSchema: ASSISTANT_RESPONSE_SCHEMA,
      // temperature/top_p/top_k foram descontinuados na linha Gemini 3.x —
      // não configuramos amostragem manualmente, usamos o padrão do modelo.
      // thinkingLevel "minimal": tarefa de classificação/formatação simples
      // (mesmo com imagem), não precisa de raciocínio profundo — e isso evita
      // gastar parte do maxOutputTokens com "pensamento" antes da resposta final.
      thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
      maxOutputTokens: 2048,
    },
  });

  const text = response.text;
  if (!text) {
    const finishReason = response.candidates?.[0]?.finishReason;
    throw new Error(`Resposta vazia do Gemini${finishReason ? ` (finishReason: ${finishReason})` : ""}.`);
  }

  return parseAnswer(text);
}

export const geminiProvider: AIProvider = {
  name: "gemini",
  getResponse,
};
