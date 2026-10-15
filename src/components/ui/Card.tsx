import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  // Só cards clicáveis ganham efeito de hover — em cards informativos, o
  // movimento sugeriria um clique que não existe.
  interactive?: boolean;
}

// Superfície base (grafite, borda fina, raio de 10px).
export function Card({ className, children, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border bg-surface p-6 shadow-card",
        interactive &&
          "transition-[border-color,background-color] duration-300 ease-premium hover:border-border-strong hover:bg-surface-elevated",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
