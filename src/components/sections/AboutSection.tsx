import { siteConfig } from "@/data/site";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SpecDivider } from "@/components/ui/SpecDivider";
import { Reveal } from "@/components/animations/Reveal";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 md:py-32">
      <SectionContainer className="grid gap-14 md:grid-cols-2 md:items-center">
        <Reveal>
          <SectionTitle
            eyebrow="Sobre a oficina"
            title={`${siteConfig.name} nasceu para elevar o padrão da manutenção automotiva em ${siteConfig.city}.`}
          />
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            Combinamos equipamentos de diagnóstico atualizados com uma equipe que valoriza a conversa clara: você
            entende o que está sendo feito no seu carro, por quê, e quanto isso custa — antes de qualquer coisa ser
            executada.
          </p>
          <div className="mt-8 space-y-3">
            <SpecDivider label="Estrutura" />
            <SpecDivider label="Equipe técnica" />
            <SpecDivider label="Peças homologadas" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/gallery/img_3575.jpg"
              alt="Estrutura da oficina JR Film"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
