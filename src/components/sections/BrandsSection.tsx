import { vehicleBrands, partsBrands } from "@/data/brands";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SpecDivider } from "@/components/ui/SpecDivider";

// Lista tipográfica das marcas atendidas — sem depender de logotipos de terceiros
// (evita problemas de direito de uso de marca), mas comunica amplitude de atendimento.
export function BrandsSection() {
  return (
    <section className="py-16">
      <SectionContainer>
        <SpecDivider label="Marcas atendidas" />
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {vehicleBrands.map((brand) => (
            <span key={brand.id} className="font-display text-lg font-medium text-muted transition-colors hover:text-foreground md:text-xl">
              {brand.name}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <SpecDivider label="Peças e insumos" />
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {partsBrands.map((brand) => (
              <span key={brand.id} className="font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:text-foreground">
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
