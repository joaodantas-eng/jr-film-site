import { siteConfig } from "@/data/site";
import { DIAGNOSTIC_CENTER_NAME } from "@/services/ai/prompts";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { DiagnosticCenter } from "@/components/diagnostic/DiagnosticCenter";
import { BlobTextReveal } from "@/components/animations/BlobTextReveal";

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

          <div className="mt-8 max-w-2xl">
            <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {DIAGNOSTIC_CENTER_NAME}
            </span>
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              <BlobTextReveal text="Converse com o Assistente Automotivo da JR Film" />
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Conte o que o seu carro está apresentando e, se quiser, anexe uma foto — do painel, de um pneu, de um
              vazamento ou de qualquer outra parte. Isso não substitui o diagnóstico feito por um técnico — é um
              ponto de partida antes de trazer o veículo para uma avaliação presencial.
            </p>
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
