import { promotions } from "@/data/promotions";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/buttons/WhatsAppFloatingButton";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { PromotionCard } from "@/components/cards/PromotionCard";

export const metadata: Metadata = buildMetadata({
  title: "Promoções",
  description: `Confira as promoções e condições especiais da ${siteConfig.name} em ${siteConfig.city}.`,
  path: "/promocoes",
});

export default function PromotionsPage() {
  const activePromotions = promotions.filter((p) => p.active);

  return (
    <>
      <Navbar />
      <main className="pt-32">
        <SectionContainer>
          <Breadcrumb items={[{ label: "Promoções" }]} />
          <div className="mt-8">
            <SectionTitle
              eyebrow="Ofertas"
              title="Promoções ativas"
              description="Condições especiais por tempo limitado. Confirme a validade e agende pelo WhatsApp."
            />
          </div>
        </SectionContainer>

        <SectionContainer className="mt-14">
          {activePromotions.length > 0 ? (
            <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {activePromotions.map((promotion) => (
                <StaggerItem key={promotion.id}>
                  <PromotionCard promotion={promotion} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-surface px-8 py-16 text-center">
              <p className="text-muted">Nenhuma promoção ativa no momento. Fale com a gente para condições especiais.</p>
              <WhatsAppButton size="lg" />
            </div>
          )}
        </SectionContainer>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
