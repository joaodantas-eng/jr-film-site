import "server-only";
import { GoogleGenAI, MediaResolution, ThinkingLevel } from "@google/genai";
import { AIProvider, AssistantAnswer, AssistantContext, AssistantMessage, ImageAttachment } from "../../types";
import { buildSystemPrompt } from "../../prompts/systemPrompt";
import { ASSISTANT_RESPONSE_SCHEMA } from "./responseSchema";
import { services } from "@/data/services";
import { assistantConfig } from "../../config";
import { AssistantTimeoutError } from "../../errors";

// "server-only" garante, em tempo de build, que este arquivo nunca seja
// importado por um componente client — se alguém tentar, o build falha.
// É a segunda camada de proteção da chave (a primeira é: só a Route Handler
// de /api/assistant chama a camada de IA).

// Modelo, teto de tokens de saída e timeout vêm de services/ai/config.ts
// (variáveis GEMINI_MODEL, GEMINI_MAX_OUTPUT_TOKENS e GEMINI_TIMEOUT_MS).
// O histórico já chega limitado e validado pela Route Handler.

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

// Monta as "parts" de um turno — texto e, se houver, a imagem anexada junto.
// Usada tanto para o histórico (fotos de rodadas anteriores) quanto para a
// mensagem atual — é o que faz a IA "lembrar" de uma foto enviada antes,
// enquanto a conversa estiver ativa.
function toParts(text: string, image?: ImageAttachment) {
  const parts: ({ text: string } | { inlineData: { mimeType: string; data: string } })[] = [];
  if (text) parts.push({ text });
  if (image)
    parts.push({
      inlineData: { mimeType: image.mimeType, data: image.base64Data },
    });
  return parts;
}

// Converte o histórico do chat (nosso formato) para o formato de "contents"
// que a API do Gemini espera.
function toGeminiContents(history: AssistantMessage[], userMessage: string, currentImage?: ImageAttachment) {
  const historyContents = history
    .filter((m) => m.content || m.image)
    .map((message) => ({
      role: message.role === "user" ? ("user" as const) : ("model" as const),
      parts: toParts(message.content, message.image),
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
    // Não registra o texto da resposta (pode repetir dados do visitante) —
    // só o tamanho, para investigação.
    throw new Error(`Resposta do Gemini não é um JSON válido (${rawText.length} caracteres).`);
  }

  const urgency =
    parsed.urgency === "baixo" || parsed.urgency === "medio" || parsed.urgency === "alto" ? parsed.urgency : undefined;

  const rawSlug = typeof parsed.relatedServiceSlug === "string" ? parsed.relatedServiceSlug : "";
  const relatedServiceSlug = services.some((s) => s.slug === rawSlug) ? rawSlug : undefined;

  const message = typeof parsed.message === "string" ? parsed.message.trim().slice(0, 4000) : "";
  if (!message) throw new Error("Resposta do Gemini sem o campo message.");

  return {
    message,
    possibleCauses: Array.isArray(parsed.possibleCauses)
      ? parsed.possibleCauses.filter((c): c is string => typeof c === "string").slice(0, 6)
      : [],
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
  const abortController = new AbortController();
  const timer = setTimeout(() => abortController.abort(), assistantConfig.timeoutMs);

  let response;
  try {
    response = await ai.models.generateContent({
      model: assistantConfig.model,
      contents: toGeminiContents(history, userMessage, context?.image),
      config: {
        abortSignal: abortController.signal,
        // Sem novas tentativas automáticas: cada chamada é cobrada.
        httpOptions: {
          timeout: assistantConfig.timeoutMs,
          retryOptions: { attempts: 1 },
        },
        // Resolução média de imagem: suficiente para fotos de painel/peças e
        // usa menos tokens por foto do que a resolução alta.
        mediaResolution: MediaResolution.MEDIA_RESOLUTION_MEDIUM,
        systemInstruction: buildSystemPrompt(),
        responseMimeType: "application/json",
        responseSchema: ASSISTANT_RESPONSE_SCHEMA,
        // temperature/top_p/top_k foram descontinuados na linha Gemini 3.x —
        // não configuramos amostragem manualmente, usamos o padrão do modelo.
        // thinkingLevel "minimal": tarefa de classificação/formatação simples
        // (mesmo com imagem), não precisa de raciocínio profundo — e isso evita
        // gastar parte do maxOutputTokens com "pensamento" antes da resposta final.
        thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
        maxOutputTokens: assistantConfig.maxOutputTokens,
      },
    });
  } catch (error) {
    if (abortController.signal.aborted) throw new AssistantTimeoutError();
    throw error;
  } finally {
    clearTimeout(timer);
  }

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
