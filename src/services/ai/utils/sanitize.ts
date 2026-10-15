import { ASSISTANT_INPUT_LIMITS } from "../limits";

export const MAX_MESSAGE_LENGTH = ASSISTANT_INPUT_LIMITS.maxMessageChars;

// Remove caracteres de controle, colapsa espaços e limita o tamanho.
// A defesa real contra prompt injection é estrutural, não por filtro de
// palavras: o texto do usuário nunca é concatenado ao prompt de sistema —
// ele sempre viaja como conteúdo separado (role "user"). O prompt NÃO é uma
// barreira de segurança: os limites de custo e abuso ficam no servidor
// (rate limit, tamanho de entrada, teto de tokens). Isso aqui é só higiene.
export function sanitizeText(raw: unknown, maxLength: number = MAX_MESSAGE_LENGTH): string {
  if (typeof raw !== "string") return "";
  const withoutControlChars = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  const collapsed = withoutControlChars
    .replace(/[ \t\r\f\v]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return collapsed.slice(0, maxLength);
}

export function sanitizeUserMessage(raw: unknown): string {
  return sanitizeText(raw, MAX_MESSAGE_LENGTH);
}
