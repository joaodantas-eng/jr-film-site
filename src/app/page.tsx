import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AssistantHighlightSection } from "@/components/sections/AssistantHighlightSection";
import { PromotionsTeaser } from "@/components/sections/PromotionsTeaser";
import { WhySection } from "@/components/sections/WhySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CasesSection } from "@/components/sections/CasesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SeoKeywordsSection } from "@/components/sections/SeoKeywordsSection";
import { seoDefaults } from "@/config/seo";

// A Home usa o título padrão (sem o sufixo do template).
export const metadata: Metadata = {
  title: { absolute: seoDefaults.defaultTitle },
  alternates: { canonical: "/" },
};

// Ordem pensada para a jornada do visitante: quem somos → tirar uma dúvida
// (assistente, o principal diferencial) → o que fazemos → ofertas → por que confiar → prova social →
// dúvidas → decisão (CTA) → como chegar.
export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <AssistantHighlightSection />
      <ServicesSection />
      <PromotionsTeaser />
      <WhySection />
      <AboutSection />
      <CasesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <ContactSection />
      <SeoKeywordsSection />
    </PageShell>
  );
}
