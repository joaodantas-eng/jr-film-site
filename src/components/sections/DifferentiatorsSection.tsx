import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { Differentiator } from "@/types";

const differentiators: Differentiator[] = [
  {
    id: "diff-1",
    title: "Diagnóstico transparente",
    description: "Você recebe um laudo claro antes de qualquer serviço, sem surpresas na hora de pagar.",
    icon: "ShieldCheck",
  },
  {
    id: "diff-2",
    title: "Entrega no prazo",
    description: "Compromisso com o horário combinado — seu tempo importa tanto quanto o do seu carro.",
    icon: "Clock",
  },
  {
    id: "diff-3",
    title: "Técnicos especializados",
    description: "Equipe treinada e atualizada com as tecnologias automotivas mais recentes.",
    icon: "Wrench",
  },
  {
    id: "diff-4",
    title: "Garantia em todos os serviços",
    description: "Todo trabalho realizado sai da oficina com garantia por escrito.",
    icon: "Award",
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="border-y border-border bg-surface/40 py-24 md:py-32">
      <SectionContainer>
        <SectionTitle eyebrow="Por que a JR Film" title="Confiança que se constrói serviço após serviço." align="center" />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <StaggerItem key={item.id}>
              <FeatureCard icon={item.icon} title={item.title} description={item.description} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionContainer>
    </section>
  );
}
