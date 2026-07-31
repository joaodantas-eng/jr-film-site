"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, RefreshCw } from "lucide-react";
import { inMemoryPhotoStorage, StoredPhoto } from "@/services/ai/storage/photoStorage";
import { activeVisionProvider } from "@/services/ai/vision/provider";
import { AssistantAnswer } from "@/services/ai/types";
import { AssistantAnswerCard } from "@/components/assistant/AssistantAnswerCard";
import { LoadingIndicator } from "@/components/assistant/LoadingIndicator";
import { Button } from "@/components/ui/Button";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

export function PhotoUploader() {
  const [photo, setPhoto] = useState<StoredPhoto | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [answer, setAnswer] = useState<AssistantAnswer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || !ACCEPTED_TYPES.includes(file.type)) return;
      if (photo) inMemoryPhotoStorage.release(photo);
      setPhoto(inMemoryPhotoStorage.save(file));
      setAnswer(null);
    },
    [photo],
  );

  function handleRemove() {
    if (photo) inMemoryPhotoStorage.release(photo);
    setPhoto(null);
    setAnswer(null);
  }

  async function handleAnalyze() {
    if (!photo) return;
    setIsAnalyzing(true);
    try {
      const result = await activeVisionProvider.analyzePhoto({
        fileName: photo.file.name,
        fileType: photo.file.type,
        fileSizeKb: Math.round(photo.file.size / 1024),
      });
      setAnswer(result);
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {!photo ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`flex flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed p-12 text-center transition-colors duration-200 ${
              isDragging ? "border-accent bg-accent/5" : "border-border bg-surface/60"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-elevated text-accent">
              <UploadCloud className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-medium text-foreground">Arraste uma foto até aqui</p>
              <p className="mt-1 text-sm text-muted">
                Painel, pneu, vazamento ou qualquer outra parte do veículo — JPG, PNG ou WEBP
              </p>
            </div>
            <Button variant="secondary" size="md" onClick={() => inputRef.current?.click()}>
              Selecionar imagem
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(",")}
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-hidden rounded-3xl border border-border bg-surface"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image src={photo.previewUrl} alt="Foto enviada para diagnóstico" fill className="object-cover" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div className="flex gap-2">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-accent hover:text-accent"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Trocar imagem
                </button>
                <button
                  onClick={handleRemove}
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-accent hover:text-accent"
                >
                  <X className="h-3.5 w-3.5" />
                  Remover
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>
              {!answer && !isAnalyzing && (
                <Button size="md" onClick={handleAnalyze}>
                  Enviar para avaliação
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isAnalyzing && <LoadingIndicator label="Analisando a imagem" />}
      {answer && <AssistantAnswerCard answer={answer} />}
    </div>
  );
}
