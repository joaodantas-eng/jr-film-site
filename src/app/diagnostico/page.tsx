import { siteConfig } from "@/data/site";
import { DIAGNOSTIC_CENTER_NAME } from "@/services/ai/prompt";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { DiagnosticCenter } from "@/components/diagnostic/DiagnosticCenter";

export const metadata: Metadata = buildMetadata({
  title: DIAGNOSTIC_CENTER_NAME,
  description: `Descreva o problema por texto, envie uma foto ou informe os dados do seu veículo e receba orientações iniciais da ${siteConfig.name} antes de uma avaliação presencial em ${siteConfig.city}.`,
  path: "/diagnostico",
});

export default function DiagnosticoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <SectionContainer className="mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: DIAGNOSTIC_CENTER_NAME }]} />

          <div className="mt-8">
            <SectionTitle
              eyebrow={DIAGNOSTIC_CENTER_NAME}
              title="Como você deseja explicar o problema do seu veículo?"
              description="Escolha a forma mais fácil para você. Isso não substitui o diagnóstico feito por um técnico — é um ponto de partida antes de trazer o veículo para uma avaliação presencial."
            />
          </div>

          <div className="mt-10">
            <DiagnosticCenter />
          </div>
        </SectionContainer>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
