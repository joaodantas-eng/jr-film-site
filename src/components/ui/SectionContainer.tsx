import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

// Container padrão do site: largura máxima e padding horizontal consistentes
// (20 px no celular, 32 px no tablet, 48 px no desktop).
export function SectionContainer({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-5 sm:px-8 lg:px-12", className)} {...props}>
      {children}
    </div>
  );
}
