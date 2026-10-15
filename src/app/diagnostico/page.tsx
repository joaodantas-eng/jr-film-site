import { siteConfig } from "@/data/site";
import { DIAGNOSTIC_CENTER_NAME } from "@/services/ai/prompts/constants";
import { assistantConfig } from "@/services/ai/config";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { DiagnosticCenter } from "@/components/diagnostic/DiagnosticCenter";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: `Diagnóstico automotivo online em ${siteConfig.city}`,
  description: `Descreva o problema do seu carro (ou envie uma foto) e receba uma orientação inicial do assistente da ${siteConfig.name} antes da avaliação presencial em ${siteConfig.city}.`,
  path: "/diagnostico",
});

export default function DiagnosticoPage() {
  return (
    <PageShell className="pb-16 pt-24 md:pt-32" showContactActions={false}>
      <TrackOnMount event="assistant_open" />
      <SectionContainer className="max-w-4xl">
        <Breadcrumb items={[{ label: "Diagnóstico" }]} />
        <div className="mt-6 max-w-2xl">
          <p className="eyebrow mb-4">{DIAGNOSTIC_CENTER_NAME}</p>
          <h1 className="type-display text-display-lg text-foreground">
            Converse com o Assistente Automotivo da JR Film
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
            Conte o que o seu carro está apresentando e, se quiser, anexe uma foto — do painel, de um pneu, de um
            vazamento ou de qualquer outra parte. Isso não substitui o diagnóstico feito por um técnico — é um ponto de
            partida antes de trazer o veículo para uma avaliação presencial.
          </p>
        </div>
        <div className="mt-8 scroll-mt-20" id="chat">
          <DiagnosticCenter enabled={assistantConfig.enabled} imagesEnabled={assistantConfig.imagesEnabled} />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          As mensagens e fotos são processadas por um provedor de inteligência artificial (Google Gemini) para gerar a
          resposta. Não envie dados pessoais, como documentos ou placas. Veja a{" "}
          <Link href="/privacidade#assistente" className="text-foreground underline underline-offset-2">
            Política de Privacidade
          </Link>
          .
        </p>
      </SectionContainer>
    </PageShell>
  );
}
