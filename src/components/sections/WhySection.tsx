import { differentiators, howItWorksSteps } from "@/data/highlights";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";

// Diferenciais + como funciona o atendimento (uma sequência real de 3 passos,
// por isso numerada). Une as antigas seções de diferenciais e de garantia,
// que repetiam as mesmas promessas.
export function WhySection() {
  return (
    <section aria-labelledby="porque-titulo" className="py-20 md:py-28">
      <SectionContainer>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionTitle
            id="porque-titulo"
            title="Confiança que se constrói serviço após serviço."
            description="O que você pode esperar de cada visita à JR Film."
          />
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {differentiators.map((item) => (
              <li key={item.id} className="flex gap-4 border-t border-border py-6">
                <Icon
                  name={item.icon}
                  className="mt-0.5 h-6 w-6 shrink-0 text-accent-fg"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 rounded-3xl border border-border bg-surface p-6 md:p-10">
          <h3 className="type-display text-display-md text-foreground">Do orçamento à entrega</h3>
          <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
            {howItWorksSteps.map((step, index) => (
              <li key={step.step} className="relative">
                <div className="flex items-center gap-4">
                  <span className="type-display tabular flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border-strong text-lg text-foreground">
                    {index + 1}
                  </span>
                  {index < howItWorksSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 bg-gradient-to-r from-border-strong to-transparent md:block"
                    />
                  )}
                </div>
                <h4 className="mt-5 text-lg font-bold text-foreground">{step.title}</h4>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </SectionContainer>
    </section>
  );
}
