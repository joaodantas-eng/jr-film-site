import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { HeroSection } from "@/components/sections/HeroSection";
import { AssistantHighlightSection } from "@/components/sections/AssistantHighlightSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { InlineCTA } from "@/components/sections/InlineCTA";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SeoKeywordsSection } from "@/components/sections/SeoKeywordsSection";

// A Home apenas orquestra as sections — nenhuma lógica de UI ou dado vive aqui.
// O Diagnóstico Inteligente vem logo após o Hero: é o principal diferencial do site.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AssistantHighlightSection />
        <ServicesSection />
        <DifferentiatorsSection />
        <HowItWorksSection />
        <AboutSection />
        <GallerySection />
        <InlineCTA text="Encontrou o que precisava? Fale agora com a gente." />
        <GuaranteeSection />
        <TestimonialsSection />
        <InlineCTA text="Ainda com dúvidas? Nossa equipe te atende no WhatsApp." />
        <FAQSection />
        <CTASection />
        <ContactSection />
        <SeoKeywordsSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
