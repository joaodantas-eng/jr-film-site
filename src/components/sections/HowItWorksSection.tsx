import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { Icon } from "@/components/ui/Icon";
import { LucideIconName } from "@/types";

const steps: { step: string; title: string; description: string; icon: LucideIconName }[] = [
  {
    step: "Passo 1",
    title: "Solicite um orçamento",
    description: "Chame no WhatsApp e conte o que o veículo está apresentando.",
    icon: "MessageCircle",
  },
  {
    step: "Passo 2",
    title: "Agende o serviço",
    description: "Combinamos o melhor horário para você trazer o veículo.",
    icon: "Calendar",
  },
  {
    step: "Passo 3",
    title: "Receba seu veículo revisado",
    description: "Serviço executado com checklist de qualidade antes da entrega.",
    icon: "CheckCircle2",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 md:py-32">
      <SectionContainer>
        <SectionTitle eyebrow="Como funciona" title="Do orçamento à entrega, sem complicação." align="center" className="mx-auto" />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <StaggerItem key={item.step} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-accent">
                <Icon name={item.icon} className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <span className="mt-4 block font-mono text-xs uppercase tracking-widest text-accent">{item.step}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionContainer>
    </section>
  );
}
