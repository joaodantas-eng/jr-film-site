import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/config/seo";
import { PageShell } from "@/components/layout/PageShell";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ServiceIndex } from "@/components/services/ServiceIndex";
import { InlineCTA } from "@/components/sections/InlineCTA";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Serviços de mecânica, insulfilm e pneus",
  description: `Conheça os serviços da ${siteConfig.name} em ${siteConfig.city}/${siteConfig.state}: troca de óleo, suspensão, freios, alinhamento, balanceamento, ar-condicionado, insulfilm, pneus e acessórios.`,
  path: "/servicos",
});

export default function ServicesPage() {
  return (
    <PageShell className="pt-24 md:pt-32">
      <SectionContainer>
        <Breadcrumb items={[{ label: "Serviços" }]} />
        <div className="mt-6">
          <SectionTitle
            as="h1"
            eyebrow="O que fazemos"
            title={`Serviços da ${siteConfig.name} em ${siteConfig.city}`}
            description="Escolha um serviço para ver os sinais de alerta, quando fazer e como o trabalho é executado na oficina."
          />
        </div>
        <div className="mt-12">
          <ServiceIndex tone="dark" headingLevel="h2" />
        </div>
        <div className="my-16 flex flex-col items-start gap-4 rounded-3xl border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="max-w-xl text-foreground/85">
            Não sabe qual serviço o seu carro precisa? Descreva o problema e receba uma orientação inicial.
          </p>
          <Button href="/diagnostico" variant="secondary">
            Pedir orientação sobre um problema
          </Button>
        </div>
      </SectionContainer>
      <InlineCTA text="Quer agendar um serviço? Fale com a nossa equipe." />
    </PageShell>
  );
}
