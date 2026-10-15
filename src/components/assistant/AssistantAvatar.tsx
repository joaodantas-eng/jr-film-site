import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Marca visual do assistente nas mensagens (ícone, não uma logo inventada).
export function AssistantAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-white", className)}
    >
      <Sparkles className="h-4 w-4" />
    </span>
  );
}
