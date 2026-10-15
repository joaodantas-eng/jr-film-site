import Image from "next/image";
import { siteConfig } from "@/data/site";
import { galleryItems } from "@/data/gallery";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

// Sobre + galeria: mosaico estático com fotos reais (substitui o mural 3D em
// movimento contínuo, que distraía e pesava no celular). As fotos usam
// next/image, que entrega tamanhos e formatos otimizados por tela.
const mosaic = [
  { id: "gal-6", className: "col-span-2 row-span-2 md:col-span-3" },
  { id: "gal-1", className: "md:col-span-2" },
  { id: "gal-4", className: "md:col-span-1" },
  { id: "gal-12", className: "md:col-span-1" },
  { id: "gal-2", className: "md:col-span-2" },
  { id: "gal-13", className: "col-span-2 md:col-span-2" },
  { id: "gal-11", className: "md:col-span-2" },
  { id: "gal-8", className: "md:col-span-2" },
  { id: "gal-9", className: "col-span-2 md:col-span-3" },
];

export function AboutSection() {
  const photos = mosaic
    .map((slot) => ({ ...slot, item: galleryItems.find((g) => g.id === slot.id) }))
    .filter((slot): slot is typeof slot & { item: NonNullable<typeof slot.item> } => Boolean(slot.item));

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="border-t border-border py-20 md:py-28">
      <SectionContainer>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <SectionTitle
            id="sobre-titulo"
            className="max-w-none"
            title={`A ${siteConfig.name} nasceu para elevar o padrão da manutenção automotiva em ${siteConfig.city}.`}
          />
          <p className="max-w-prose text-lg leading-relaxed text-muted">
            Combinamos equipamentos de diagnóstico atualizados com uma equipe que valoriza a conversa clara: você
            entende o que está sendo feito no seu carro, por quê, e quanto isso custa — antes de qualquer coisa ser
            executada.
          </p>
        </div>

        <ul
          aria-label="Fotos da oficina"
          className="mt-14 grid auto-rows-[9.5rem] grid-cols-2 gap-2 sm:auto-rows-[12rem] md:grid-cols-7 md:gap-3"
        >
          {photos.map(({ id, className, item }) => (
            <li key={id} className={cn("relative overflow-hidden rounded-xl bg-surface", className)}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover transition-transform duration-700 ease-premium hover:scale-[1.04] motion-reduce:hover:scale-100"
              />
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
