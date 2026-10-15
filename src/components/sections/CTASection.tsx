import { SectionContainer } from "@/components/ui/SectionContainer";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data/contact";

// Chamada final: a única faixa vermelha do site, no ponto de decisão.
export function CTASection() {
  return (
    <section aria-labelledby="cta-titulo" className="bg-accent text-white" data-track-location="cta-final">
      <SectionContainer className="grid gap-10 py-16 md:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h2 id="cta-titulo" className="type-display text-display-lg">
            Seu carro merece um diagnóstico preciso.
          </h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-white">
            Conte o que está acontecendo pelo WhatsApp e agende uma avaliação sem compromisso.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <WhatsAppButton size="lg" variant="dark" label="Agendar pelo WhatsApp" className="whitespace-nowrap" />
          <Button
            href={`tel:${contactInfo.phoneRaw}`}
            size="lg"
            className="whitespace-nowrap border border-white/70 text-white no-underline hover:border-white hover:bg-white/10"
            variant="ghost"
          >
            Ligar {contactInfo.phoneDisplay}
          </Button>
        </div>
      </SectionContainer>
    </section>
  );
}
