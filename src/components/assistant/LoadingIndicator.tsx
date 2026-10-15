import { AssistantAvatar } from "./AssistantAvatar";

interface LoadingIndicatorProps {
  label?: string;
}

// "Escrevendo…": texto explícito para leitores de tela e três pontos como
// reforço visual (param com prefers-reduced-motion pela regra global).
export function LoadingIndicator({ label = "Escrevendo a resposta…" }: LoadingIndicatorProps) {
  return (
    <div role="status" className="flex items-start gap-3">
      <AssistantAvatar className="mt-0.5" />
      <div className="inline-flex items-center gap-3 rounded-2xl rounded-tl-md bg-surface-elevated px-4 py-3">
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-dot-pulse rounded-full bg-foreground" />
          <span className="h-1.5 w-1.5 animate-dot-pulse rounded-full bg-foreground [animation-delay:0.15s]" />
          <span className="h-1.5 w-1.5 animate-dot-pulse rounded-full bg-foreground [animation-delay:0.3s]" />
        </span>
        <span className="text-sm text-foreground/75">{label}</span>
      </div>
    </div>
  );
}
