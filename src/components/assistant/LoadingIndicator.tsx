import { motion } from "framer-motion";

// Indicador de "digitando" com um texto curto que reforça a sensação de análise —
// sem soar artificial, e sem citar "IA" em nenhum momento.
export function LoadingIndicator() {
  return (
    <div className="flex items-center gap-3 rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-muted">Analisando o sintoma</span>
    </div>
  );
}
