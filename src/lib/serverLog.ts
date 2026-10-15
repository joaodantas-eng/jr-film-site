import "server-only";

// Registro de erros no servidor sem vazar segredos ou dados de visitantes:
// só nome, status HTTP (quando houver) e um trecho curto da mensagem, com
// qualquer coisa parecida com chave de API mascarada. Nunca registre aqui o
// texto da conversa, imagens ou cabeçalhos da requisição.
const SECRET_PATTERNS = [/AIza[0-9A-Za-z_-]{20,}/g, /Bearer\s+[A-Za-z0-9._-]+/gi, /key=[^&\s]+/gi];

function redact(text: string): string {
  return SECRET_PATTERNS.reduce((acc, pattern) => acc.replace(pattern, "[redacted]"), text);
}

export function describeError(error: unknown): { name: string; status?: number; message: string } {
  if (error instanceof Error) {
    const status = (error as { status?: unknown }).status;
    return {
      name: error.name,
      status: typeof status === "number" ? status : undefined,
      message: redact(error.message).slice(0, 300),
    };
  }
  return { name: "UnknownError", message: redact(String(error)).slice(0, 300) };
}

export function logServerError(scope: string, error: unknown, extra?: Record<string, string | number | boolean>) {
  console.error(`[${scope}]`, JSON.stringify({ ...describeError(error), ...extra }));
}
