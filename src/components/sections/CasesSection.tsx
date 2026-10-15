import Image from "next/image";
import { caseStudies } from "@/data/cases";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";

// Trabalhos realizados — estrutura pronta, exibida somente quando houver
// cases reais cadastrados em data/cases.ts (hoje a lista está vazia).
export function CasesSection() {
  if (caseStudies.length === 0) return null;

  return (
    <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="py-16 md:py-24">
      <SectionContainer>
        <SectionTitle id="trabalhos-titulo" eyebrow="Trabalhos realizados" title="Alguns serviços feitos na JR Film." />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <li key={item.id}>
              <Card className="h-full overflow-hidden p-0">
                {item.images[0] && (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.images[0].src}
                      alt={item.images[0].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="eyebrow">{item.service}</p>
                  {item.vehicle && <h3 className="mt-2 text-lg font-bold text-foreground">{item.vehicle}</h3>}
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-muted">Problema relatado</dt>
                      <dd className="mt-0.5 text-foreground/90">{item.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">O que foi feito</dt>
                      <dd className="mt-0.5 text-foreground/90">{item.work}</dd>
                    </div>
                  </dl>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
