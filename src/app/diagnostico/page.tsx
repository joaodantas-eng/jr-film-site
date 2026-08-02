import { siteConfig } from "@/data/site";
import { DIAGNOSTIC_CENTER_NAME } from "@/services/ai/prompts";
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
  description: `Converse com o assistente automotivo da ${siteConfig.name}: descreva o problema, anexe uma foto, e receba orientações iniciais antes de uma avaliação presencial em ${siteConfig.city}.`,
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
              title="Converse com o Assistente Automotivo da JR Film"
              description="Conte o que o seu carro está apresentando e, se quiser, anexe uma foto — do painel, de um pneu, de um vazamento ou de qualquer outra parte. Isso não substitui o diagnóstico feito por um técnico — é um ponto de partida antes de trazer o veículo para uma avaliação presencial."
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
