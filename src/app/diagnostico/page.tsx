import { siteConfig } from "@/data/site";
import { ASSISTANT_NAME } from "@/services/ai/prompt";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { ChatWindow } from "@/components/assistant/ChatWindow";

export const metadata: Metadata = buildMetadata({
  title: ASSISTANT_NAME,
  description: `Converse com o ${ASSISTANT_NAME} da ${siteConfig.name} e entenda as possíveis causas do problema do seu veículo antes de uma avaliação presencial em ${siteConfig.city}.`,
  path: "/diagnostico",
});

export default function DiagnosticoPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <SectionContainer className="mx-auto max-w-3xl">
          <Breadcrumb items={[{ label: ASSISTANT_NAME }]} />

          <div className="mt-8">
            <SectionTitle
              eyebrow="Diagnóstico Inteligente"
              title={`Converse com o ${ASSISTANT_NAME}`}
              description="Conte o que o seu veículo está apresentando e entenda as possíveis causas antes de trazer para uma avaliação presencial na JR Film. Isso não substitui o diagnóstico feito por um técnico — é um ponto de partida."
            />
          </div>

          <div className="mt-10">
            <ChatWindow />
          </div>
        </SectionContainer>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
