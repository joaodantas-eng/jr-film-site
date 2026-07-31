"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "@/services/ai/utils/sanitize";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-border p-4">
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
        disabled={disabled || !value.trim()}
        aria-label="Enviar mensagem"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-opacity hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </form>
  );
}
