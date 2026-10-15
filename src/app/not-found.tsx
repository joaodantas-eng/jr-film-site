import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { SectionContainer } from "@/components/ui/SectionContainer";

export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O endereço acessado não existe no site da JR Film.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell className="flex min-h-[75svh] items-center pb-16 pt-28">
      <SectionContainer className="max-w-2xl text-center">
        <span className="eyebrow">Erro 404</span>
        <h1 className="type-display mt-4 text-display-lg text-foreground">Essa página saiu de rota.</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-foreground/75">
          O endereço que você abriu não existe ou foi alterado. Escolha um caminho abaixo para continuar.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/" size="lg">
            Voltar para a página inicial
          </Button>
          <Button href="/servicos" variant="secondary" size="lg">
            Consultar nossos serviços
          </Button>
        </div>
        <div className="mt-6 flex justify-center">
          <WhatsAppButton variant="secondary" label="Falar com a JR Film" />
        </div>
      </SectionContainer>
    </PageShell>
  );
}
