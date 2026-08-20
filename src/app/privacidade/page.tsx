import { siteConfig } from "@/data/site";
import { contactInfo } from "@/data/contact";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: `Como a ${siteConfig.name} trata os dados de quem usa o site e o Diagnóstico Inteligente.`,
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <SectionContainer className="mx-auto max-w-2xl">
          <Breadcrumb items={[{ label: "Privacidade" }]} />
          <h1 className="mt-8 font-display text-3xl font-semibold text-foreground md:text-4xl">Política de Privacidade</h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/85">
            <p>A {siteConfig.legalName} respeita a sua privacidade. Esta página explica, de forma simples, como os dados são tratados ao usar este site.</p>
            <div>
              <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Diagnóstico Inteligente</h2>
              <p>Ao conversar com o assistente em /diagnostico, o texto (e a foto, se você anexar) é enviado para o provedor de IA que processa a resposta. A conversa fica salva só no seu navegador, durante a sessão — não guardamos isso em nenhum banco de dados nosso, e ela some ao fechar ou recarregar a página.</p>
            </div>
            <div>
              <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Formulários e contato</h2>
              <p>Dados enviados pelo WhatsApp ou telefone são usados só para atendimento comercial, e tratados diretamente pela nossa equipe.</p>
            </div>
            <div>
              <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Cookies e analytics</h2>
              <p>Usamos ferramentas de analytics para entender, de forma agregada e anônima, como o site é usado — isso nos ajuda a melhorá-lo. Nenhum dado é vendido a terceiros.</p>
            </div>
            <div>
              <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Contato</h2>
              <p>Dúvidas sobre esta política podem ser enviadas pelo WhatsApp ou pelo telefone {contactInfo.phoneDisplay}.</p>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
