"use client";

import { GalleryItem } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!isOpen || activeIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, activeIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && item && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-6 top-6 text-foreground/70 hover:text-foreground"
          >
            <X className="h-7 w-7" />
          </button>

          <button
            aria-label="Imagem anterior"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex - 1 + items.length) % items.length);
            }}
            className="absolute left-4 text-foreground/70 hover:text-foreground md:left-8"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface"
          >
            <Image src={item.src} alt={item.alt} fill sizes="90vw" className="object-cover" />
          </motion.div>

          <button
            aria-label="Próxima imagem"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex + 1) % items.length);
            }}
            className="absolute right-4 text-foreground/70 hover:text-foreground md:right-8"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
