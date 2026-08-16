import TextRevealBlur from "@/components/animations/TextRevealBlur";

interface LoadingIndicatorProps {
  label?: string;
}

// Indicador de "digitando" — o texto é revelado por um blob que "escreve" a
// frase, no lugar dos três pontinhos genéricos. Label configurável para ser
// reaproveitado tanto no chat de texto quanto na análise de foto.
export function LoadingIndicator({ label = "Assistente digitando..." }: LoadingIndicatorProps) {
  return (
    <div className="flex items-center rounded-2xl rounded-bl-sm border border-border bg-surface px-4 py-3">
      <div className="h-6 w-56">
        <TextRevealBlur
          prefix=""
          texts={[label]}
          font={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.05em",
            lineHeight: "1.2em",
            textAlign: "left",
            textTransform: "uppercase",
          }}
          color="#8A8A8A"
          wipeColor="#EF4444"
          revealColor="#DC2626"
          blobSize={7}
          blur={6}
          transition={{ delay: 1.2 }}
        />
      </div>
    </div>
  );
}
