import { generalFaq } from "@/data/faq";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqJsonLd } from "@/config/structuredData";

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="border-t border-border py-20 md:py-28">
      <JsonLd data={buildFaqJsonLd(generalFaq)} />
      <SectionContainer className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle
            id="faq-titulo"
            title="Perguntas frequentes."
            description="Não encontrou sua dúvida? A equipe responde pelo WhatsApp."
          />
          <WhatsAppButton variant="secondary" label="Perguntar no WhatsApp" className="mt-8" />
        </div>
        <Accordion items={generalFaq} />
      </SectionContainer>
    </section>
  );
}
