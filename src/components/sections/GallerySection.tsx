import { galleryItems } from "@/data/gallery";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export function GallerySection() {
  return (
    <section id="galeria" className="py-24 md:py-32">
      <SectionContainer>
        <SectionTitle
          eyebrow="Galeria"
          title="Nosso dia a dia, da recepção ao acabamento."
          align="center"
          className="mx-auto"
        />
        <div className="mt-14">
          <GalleryGrid items={galleryItems} />
        </div>
      </SectionContainer>
    </section>
  );
}
