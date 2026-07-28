import { generalFaq } from "@/data/faq";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/animations/Reveal";

export function FAQSection() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id="faq" className="border-y border-border bg-surface/40 py-24 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <SectionContainer className="mx-auto max-w-3xl">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes." align="center" className="mx-auto" />
        <Reveal className="mt-12">
          <Accordion items={generalFaq} />
        </Reveal>
      </SectionContainer>
    </section>
  );
}
