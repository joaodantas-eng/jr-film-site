import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal } from "@/components/animations/Reveal";
import { Icon } from "@/components/ui/Icon";
import { LucideIconName } from "@/types";

const pillars: { title: string; description: string; icon: LucideIconName }[] = [
  {
    title: "Garantia em todo serviço",
    description: "Todo trabalho realizado na JR Film sai da oficina com garantia.",
    icon: "ShieldCheck",
  },
  {
    title: "Diagnóstico antes do reparo",
    description: "Você aprova o orçamento antes de qualquer peça ser trocada.",
    icon: "ClipboardList",
  },
  {
    title: "Peças de procedência",
    description: "Trabalhamos com peças homologadas, com nota fiscal.",
    icon: "CheckCircle2",
  },
];

export function GuaranteeSection() {
  return (
    <section className="py-24 md:py-32">
      <SectionContainer>
        <SectionTitle eyebrow="Compromisso" title="Qualidade e confiança em cada serviço." align="center" className="mx-auto" />

        <Reveal className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col items-center text-center">
              <Icon name={pillar.icon} className="h-8 w-8 text-accent" strokeWidth={1.5} />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.description}</p>
            </div>
          ))}
        </Reveal>
      </SectionContainer>
    </section>
  );
}
