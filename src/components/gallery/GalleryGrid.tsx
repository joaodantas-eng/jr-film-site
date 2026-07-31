"use client";

import { GalleryItem } from "@/types";
import { useMemo, useState } from "react";
import Image from "next/image";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { Lightbox } from "./Lightbox";
import { cn } from "@/lib/utils";

const categoryLabels: Record<GalleryItem["category"] | "todos", string> = {
  todos: "Todos",
  oficina: "Oficina",
  servicos: "Serviços",
  equipe: "Equipe",
  resultados: "Resultados",
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<GalleryItem["category"] | "todos">("todos");

  const availableCategories = useMemo(() => {
    const present = new Set(items.map((item) => item.category));
    return (["todos", ...Array.from(present)] as (GalleryItem["category"] | "todos")[]);
  }, [items]);

  const filteredItems = useMemo(
    () => (activeCategory === "todos" ? items : items.filter((item) => item.category === activeCategory)),
    [items, activeCategory],
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {availableCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200",
              activeCategory === category
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      <StaggerGroup key={activeCategory} className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {filteredItems.map((item) => {
          const index = items.indexOf(item);
          return (
            <StaggerItem key={item.id}>
              <button
                onClick={() => setActiveIndex(index)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-surface"
                aria-label={`Ampliar imagem: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </button>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <Lightbox items={items} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
    </>
  );
}
