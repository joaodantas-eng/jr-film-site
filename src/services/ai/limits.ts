// Limites de entrada do assistente compartilhados entre navegador e servidor.
// O navegador usa estes valores só para dar feedback imediato ao visitante —
// a validação que vale é sempre a do servidor (app/api/assistant/route.ts).
export const ASSISTANT_INPUT_LIMITS = {
  maxMessageChars: 500,
  maxHistoryItems: 10,
  maxHistoryItemChars: 1500,
  // Depois da compressão feita no navegador; o servidor rejeita acima disso.
  maxImageBytes: 3 * 1024 * 1024,
  // Arquivo original aceito antes da compressão no navegador.
  maxOriginalImageBytes: 15 * 1024 * 1024,
  // A Vercel recusa corpos acima de ~4,5 MB em funções serverless.
  maxBodyBytes: 4 * 1024 * 1024 + 512 * 1024,
  acceptedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
} as const;

// Códigos de erro estáveis devolvidos pela API — o navegador escolhe a
// mensagem amigável a partir deles, nunca exibe texto técnico.
export type AssistantErrorCode =
  | "rate_limited"
  | "busy"
  | "disabled"
  | "images_disabled"
  | "invalid_request"
  | "invalid_image"
  | "image_too_large"
  | "forbidden"
  | "captcha_required"
  | "captcha_unavailable"
  | "timeout"
  | "unavailable";
