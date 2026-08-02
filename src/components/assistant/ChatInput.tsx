"use client";

import { useRef, useState, FormEvent } from "react";
import { Send, Paperclip, X } from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "@/services/ai/utils/sanitize";

interface ChatInputProps {
  onSend: (text: string, imageFile?: File | null) => void;
  disabled?: boolean;
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(file: File | undefined) {
    if (!file || !ACCEPTED_IMAGE_TYPES.includes(file.type)) return;
    setPendingImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function removeImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPendingImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (disabled || (!value.trim() && !pendingImage)) return;
    onSend(value, pendingImage);
    setValue("");
    removeImage();
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border p-4">
      {previewUrl && (
        <div className="mb-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- prévia local via object URL, não precisa de otimização do next/image */}
          <img src={previewUrl} alt="Prévia da imagem anexada" className="h-16 w-16 rounded-lg border border-border object-cover" />
          <button
            type="button"
            onClick={removeImage}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <X className="h-3.5 w-3.5" />
            Remover
          </button>
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          aria-label="Anexar foto"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Paperclip className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Descreva o que o seu carro está apresentando..."
          disabled={disabled}
          maxLength={MAX_MESSAGE_LENGTH}
          className="flex-1 rounded-full border border-border bg-surface px-5 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={disabled || (!value.trim() && !pendingImage)}
          aria-label="Enviar mensagem"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </form>
  );
}
