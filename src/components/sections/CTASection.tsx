import { SectionContainer } from "@/components/ui/SectionContainer";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Reveal } from "@/components/animations/Reveal";

export function CTASection() {
  return (
    <section className="py-24 md:py-32">
      <SectionContainer>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center md:px-16 md:py-24">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
            <h2 className="relative font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Seu carro merece um diagnóstico preciso.
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-base text-muted md:text-lg">
              Fale agora pelo WhatsApp e agende uma avaliação sem compromisso.
            </p>
            <div className="relative mt-8 flex justify-center">
              <WhatsAppButton size="lg" label="Agendar pelo WhatsApp" />
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
