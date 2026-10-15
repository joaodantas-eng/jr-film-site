"use client";

import { useEffect, useId, useRef, useState, FormEvent, KeyboardEvent } from "react";
import { ArrowUp, ImagePlus, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSISTANT_INPUT_LIMITS } from "@/services/ai/limits";
import { compressImage } from "@/lib/compressImage";

interface ChatInputProps {
  onSend: (text: string, image?: Blob | null) => void;
  disabled?: boolean;
  // Permite digitar, mas não enviar (ex: aguardando a verificação de segurança).
  submitBlocked?: boolean;
  imagesEnabled?: boolean;
  // Texto inicial vindo de um link (ex: /diagnostico?pergunta=...). Só preenche
  // o campo — o envio continua sendo do visitante.
  prefill?: string;
}

const { maxMessageChars, maxOriginalImageBytes, maxImageBytes, acceptedImageTypes } = ASSISTANT_INPUT_LIMITS;

export function ChatInput({ onSend, disabled, submitBlocked = false, imagesEnabled = true, prefill }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [pendingImage, setPendingImage] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreparingImage, setIsPreparingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputId = useId();
  const hintId = useId();

  useEffect(() => {
    if (prefill) setValue(prefill.slice(0, maxMessageChars));
  }, [prefill]);

  // Cresce até ~4 linhas conforme o texto; depois rola por dentro.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }, [value]);

  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  async function handleFileSelect(file: File | undefined) {
    setImageError(null);
    if (!file) return;
    if (file.type && !acceptedImageTypes.includes(file.type as (typeof acceptedImageTypes)[number])) {
      setImageError("Formato não aceito. Envie uma foto JPG, PNG, WEBP ou HEIC.");
      return;
    }
    if (file.size > maxOriginalImageBytes) {
      setImageError("Essa foto é muito grande. Escolha uma imagem de até 15 MB.");
      return;
    }

    setIsPreparingImage(true);
    const prepared = await compressImage(file);
    setIsPreparingImage(false);

    if (prepared.size > maxImageBytes) {
      setImageError("Não foi possível reduzir essa foto para envio. Tente outra imagem ou um print da tela.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setPendingImage(prepared);
    setPreviewUrl(URL.createObjectURL(prepared));
  }

  function removeImage() {
    setPendingImage(null);
    setPreviewUrl(null);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function submit() {
    if (disabled || submitBlocked || isPreparingImage || (!value.trim() && !pendingImage)) return;
    onSend(value, pendingImage);
    setValue("");
    removeImage();
    textareaRef.current?.focus();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  // Enter envia; Shift+Enter quebra a linha (padrão de apps de mensagem).
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submit();
    }
  }

  const remaining = maxMessageChars - value.length;
  const canSend =
    !disabled && !submitBlocked && !isPreparingImage && (value.trim().length > 0 || Boolean(pendingImage));

  return (
    <form onSubmit={handleSubmit} className="bg-surface px-3 pb-3 pt-2 md:px-4 md:pb-4">
      {imageError && (
        <p role="alert" className="mb-2 rounded-lg bg-accent/10 px-3 py-2 text-sm text-foreground">
          {imageError}
        </p>
      )}

      <div
        className={cn(
          "rounded-2xl border bg-background transition-[border-color,box-shadow] duration-200",
          "border-border-strong focus-within:border-foreground/50 focus-within:shadow-[0_0_0_4px_rgba(243,243,241,0.06)]",
        )}
      >
        {(previewUrl || isPreparingImage) && (
          <div className="flex items-center gap-3 px-3 pt-3">
            {previewUrl ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element -- prévia local via object URL */}
                <img
                  src={previewUrl}
                  alt="Prévia da foto que será enviada"
                  className="h-20 w-20 rounded-xl border border-border object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  aria-label="Remover foto"
                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-foreground transition-colors hover:bg-accent hover:text-white"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <span
                className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-border-strong text-xs text-muted"
                role="status"
              >
                Preparando…
              </span>
            )}
            {previewUrl && <span className="text-sm text-muted">Foto pronta para enviar junto com a mensagem.</span>}
          </div>
        )}

        <label htmlFor={inputId} className="sr-only">
          Descreva o que o seu carro está apresentando
        </label>
        <textarea
          ref={textareaRef}
          id={inputId}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, maxMessageChars))}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            // No celular, garante que o campo continue visível acima do teclado.
            const target = e.currentTarget;
            window.setTimeout(() => target.scrollIntoView({ block: "nearest" }), 300);
          }}
          placeholder="Descreva o que o seu carro está apresentando…"
          maxLength={maxMessageChars}
          aria-describedby={hintId}
          enterKeyHint="send"
          className="block max-h-[132px] min-h-[3.25rem] w-full resize-none bg-transparent px-4 pb-1 pt-3.5 text-base leading-6 text-foreground placeholder:text-muted focus:outline-none"
        />

        <div className="flex items-center justify-between gap-2 px-2 pb-2">
          {imagesEnabled ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedImageTypes.join(",")}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
                onChange={(e) => void handleFileSelect(e.target.files?.[0])}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || isPreparingImage}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface-elevated hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ImagePlus className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} aria-hidden="true" />
                {pendingImage ? "Trocar foto" : "Anexar foto"}
              </button>
            </>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-3">
            {remaining <= 100 && (
              <span className="tabular text-xs text-muted" aria-live="polite">
                {remaining}
                <span className="sr-only"> caracteres restantes</span>
              </span>
            )}
            <button
              type="submit"
              disabled={!canSend}
              aria-label={disabled ? "Enviando mensagem" : "Enviar mensagem"}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white transition-[background-color,opacity,transform] duration-200 hover:bg-accent-hover active:scale-95 disabled:cursor-not-allowed disabled:bg-surface-elevated disabled:text-muted"
            >
              {disabled ? (
                <Loader2 className="h-[1.125rem] w-[1.125rem] animate-spin" aria-hidden="true" />
              ) : (
                <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <p id={hintId} className="mt-2 hidden px-1 text-xs text-muted sm:block">
        Enter envia, Shift+Enter quebra a linha.
      </p>
    </form>
  );
}
