import { galleryItems } from "@/data/gallery";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import DriftWall from "@/components/gallery/DriftWall";

export function GallerySection() {
  const items = galleryItems.map((item) => ({ image: item.src, title: item.alt }));

  return (
    <section id="galeria" className="py-24 md:py-32">
      <SectionContainer>
        <SectionTitle
          eyebrow="Galeria"
          title="Nosso dia a dia, da recepção ao acabamento."
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 h-[85vh] min-h-[540px] w-full overflow-hidden rounded-3xl border border-border">
          <DriftWall
            items={items}
            columns={6}
            tileWidth={190}
            tileHeight={150}
            gap={14}
            radius={16}
            speed={30}
            overlayColor="#0A0A0A"
            dim={0.5}
          />
        </div>
      </SectionContainer>
    </section>
  );
}
