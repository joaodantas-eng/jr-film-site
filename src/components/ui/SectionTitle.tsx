import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "paper";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}

// Título de seção: Archivo larga e pesada. O rótulo (eyebrow) é opcional e
// deve ser usado só quando informa algo que o título não diz.
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  as: Heading = "h2",
  id,
}: SectionTitleProps) {
  const isPaper = tone === "paper";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", align === "center" && "justify-center", isPaper && "text-paper-muted")}>
          {eyebrow}
        </p>
      )}
      <Heading id={id} className={cn("type-display text-display-lg", isPaper ? "text-paper-ink" : "text-foreground")}>
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-prose text-[1.0625rem] leading-relaxed md:text-lg",
            align === "center" && "mx-auto",
            isPaper ? "text-paper-muted" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
