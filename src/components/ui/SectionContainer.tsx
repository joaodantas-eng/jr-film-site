import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section";
}

// Container padrão do site: largura máxima e padding horizontal consistentes.
// Toda section usa este componente em vez de repetir "max-w-* mx-auto px-*" manualmente.
export function SectionContainer({ className, children, ...props }: SectionContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-6 md:px-10", className)} {...props}>
      {children}
    </div>
  );
}
