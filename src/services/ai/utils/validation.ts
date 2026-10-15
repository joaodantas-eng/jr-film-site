import "server-only";
import { assistantConfig } from "../config";
import { AssistantMessage, ImageAttachment } from "../types";
import { sanitizeText } from "./sanitize";

// Confere a assinatura real do arquivo (magic bytes) — o tipo declarado pelo
// navegador (file.type) pode ser falsificado.
export function detectImageType(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  if (ascii(4, 8) === "ftyp") {
    const brand = ascii(8, 12);
    if (["heic", "heix", "hevc", "hevx", "heim", "heis"].includes(brand)) return "image/heic";
    if (["mif1", "msf1"].includes(brand)) return "image/heif";
  }
  return null;
}

export type ImageValidation =
  { ok: true; image: ImageAttachment } | { ok: false; code: "invalid_image" | "image_too_large" };

export function validateImageBytes(bytes: Uint8Array): ImageValidation {
  if (bytes.byteLength === 0) return { ok: false, code: "invalid_image" };
  if (bytes.byteLength > assistantConfig.input.maxImageBytes) return { ok: false, code: "image_too_large" };
  const mimeType = detectImageType(bytes);
  if (!mimeType) return { ok: false, code: "invalid_image" };
  return { ok: true, image: { mimeType, base64Data: Buffer.from(bytes).toString("base64") } };
}

export async function validateImageFile(file: File): Promise<ImageValidation> {
  if (file.size > assistantConfig.input.maxImageBytes) return { ok: false, code: "image_too_large" };
  return validateImageBytes(new Uint8Array(await file.arrayBuffer()));
}

// O histórico vem do navegador e, portanto, não é confiável: só aproveitamos
// papel e texto (com tamanho limitado), as últimas N mensagens e, no máximo,
// UMA imagem anterior (a mais recente) — cada imagem reenviada custa tokens.
export function parseHistory(raw: unknown): { history: AssistantMessage[]; invalidImage: boolean } {
  if (typeof raw !== "string" || raw.length > assistantConfig.input.maxBodyBytes) {
    return { history: [], invalidImage: false };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { history: [], invalidImage: false };
  }
  if (!Array.isArray(parsed)) return { history: [], invalidImage: false };

  const { maxHistoryItems, maxHistoryItemChars } = assistantConfig.input;
  const recent = parsed.slice(-maxHistoryItems);
  let imageKept = false;
  let invalidImage = false;

  const history: AssistantMessage[] = [];
  for (let index = recent.length - 1; index >= 0; index--) {
    const item = recent[index] as Record<string, unknown> | null;
    if (!item || typeof item !== "object") continue;
    if (item.role !== "user" && item.role !== "assistant") continue;

    const content = sanitizeText(item.content, maxHistoryItemChars);
    let image: ImageAttachment | undefined;

    const rawImage = item.image as Record<string, unknown> | undefined;
    if (item.role === "user" && !imageKept && rawImage && typeof rawImage.base64Data === "string") {
      // base64 ocupa ~4/3 do tamanho original — recusa antes de decodificar.
      if (rawImage.base64Data.length <= Math.ceil((assistantConfig.input.maxImageBytes * 4) / 3) + 4) {
        const result = validateImageBytes(new Uint8Array(Buffer.from(rawImage.base64Data, "base64")));
        if (result.ok) {
          image = result.image;
          imageKept = true;
        } else {
          invalidImage = true;
        }
      } else {
        invalidImage = true;
      }
    }

    if (!content && !image) continue;
    history.unshift({
      id: `h${index}`,
      role: item.role,
      content,
      image,
      createdAt: 0,
    });
  }

  return { history, invalidImage };
}
