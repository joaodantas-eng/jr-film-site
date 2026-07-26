"use client";

import { GalleryItem } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { Lightbox } from "./Lightbox";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <StaggerGroup className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map((item, index) => (
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
        ))}
      </StaggerGroup>

      <Lightbox items={items} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
    </>
  );
}
