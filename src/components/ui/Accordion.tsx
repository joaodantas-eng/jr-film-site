"use client";

import { FAQItem } from "@/types";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: FAQItem[];
  className?: string;
  headingLevel?: "h3" | "h4";
}

// Accordion de FAQ (padrão WAI-ARIA): botão dentro de heading, aria-expanded e
// aria-controls ligando pergunta e resposta. A resposta fica no HTML mesmo
// fechada (atributo hidden), então buscadores e leitores de tela a encontram.
export function Accordion({ items, className, headingLevel = "h3" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();
  const Heading = headingLevel;

  return (
    <div className={cn("border-t border-border", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${baseId}-${item.id}-q`;
        const panelId = `${baseId}-${item.id}-a`;
        return (
          <div key={item.id} className="border-b border-border">
            <Heading className="m-0">
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-foreground/80">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-[transform,background-color,border-color] duration-300 ease-premium",
                    isOpen ? "rotate-45 border-accent bg-accent text-white" : "border-border-strong text-foreground",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p className="max-w-prose pb-6 pr-12 text-[1rem] leading-relaxed text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
