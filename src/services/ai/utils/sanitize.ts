export const MAX_MESSAGE_LENGTH = 500;

// Remove caracteres de controle, colapsa espaços e limita o tamanho.
// A defesa real contra prompt injection é estrutural, não por filtro de
// palavras: o texto do usuário nunca é concatenado ao prompt de sistema —
// ele sempre viaja como conteúdo separado (role "user"), e o próprio prompt
// de sistema instrui o modelo a nunca tratar o texto do usuário como uma
// instrução (ver prompts/systemPrompt.ts, regra 8). Isso aqui é só higiene
// de entrada: bloqueia payloads absurdamente grandes e caracteres de controle.
export function sanitizeUserMessage(raw: unknown): string {
  if (typeof raw !== "string") return "";
  const withoutControlChars = raw.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  const collapsed = withoutControlChars.replace(/\s+/g, " ").trim();
  return collapsed.slice(0, MAX_MESSAGE_LENGTH);
}
