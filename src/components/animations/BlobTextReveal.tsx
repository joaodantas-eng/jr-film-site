"use client";

import { motion } from "framer-motion";

interface BlobTextRevealProps {
  text: string;
  className?: string;
}

// Revela o texto através de uma "mancha" que cresce e engole a frase — em vez
// do wipe retangular comum. Usa mask-image com um radial-gradient animado,
// leve (sem SVG filter/goo pesado) e reaproveitável em qualquer título.
export function BlobTextReveal({ text, className }: BlobTextRevealProps) {
  return (
    <motion.span
      initial={{ ["--blob-size" as string]: "0%" }}
      whileInView={{ ["--blob-size" as string]: "150%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "inline-block",
        WebkitMaskImage: "radial-gradient(circle at 0% 50%, black var(--blob-size), transparent var(--blob-size))",
        maskImage: "radial-gradient(circle at 0% 50%, black var(--blob-size), transparent var(--blob-size))",
      }}
      className={className}
    >
      {text}
    </motion.span>
  );
}
