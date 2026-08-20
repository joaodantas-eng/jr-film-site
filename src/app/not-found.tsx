import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { Button } from "@/components/ui/Button";
import { SectionContainer } from "@/components/ui/SectionContainer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center pt-32">
        <SectionContainer className="text-center">
          <span className="font-mono text-sm uppercase tracking-widest text-accent">404</span>
          <h1 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-5xl">
            Essa página saiu de rota.
          </h1>
          <p className="mt-4 text-muted">A página que você procurou não existe ou foi movida.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href="/">Voltar para a Home</Button>
            <Button href="/diagnostico" variant="secondary">Ir para o Diagnóstico</Button>
          </div>
        </SectionContainer>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
