import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { DifferentiatorsSection } from "@/components/sections/DifferentiatorsSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { InlineCTA } from "@/components/sections/InlineCTA";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";

// A Home apenas orquestra as sections — nenhuma lógica de UI ou dado vive aqui.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <DifferentiatorsSection />
        <BrandsSection />
        <HowItWorksSection />
        <AboutSection />
        <GallerySection />
        <InlineCTA text="Encontrou o que precisava? Fale agora com a gente." />
        <GuaranteeSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
