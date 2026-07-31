import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

// Card base reutilizado por ServiceCard, FeatureCard e ReviewCard —
// eles compõem este componente em vez de duplicar estilos de superfície/borda/hover.
export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-foreground/20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
