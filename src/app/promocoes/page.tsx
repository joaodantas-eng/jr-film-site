import { promotions } from "@/data/promotions";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/config/seo";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerGroup";
import { PromotionCard } from "@/components/cards/PromotionCard";
import { TrackOnMount } from "@/components/analytics/TrackOnMount";

export const metadata: Metadata = buildMetadata({
  title: "Promoções em troca de óleo e pneus",
  description: `Promoções ativas da ${siteConfig.name} em ${siteConfig.city}/${siteConfig.state}, como combo de troca de óleo e ofertas de pneus. Confirme a validade e peça pelo WhatsApp.`,
  path: "/promocoes",
});

export default function PromotionsPage() {
  const activePromotions = promotions.filter((p) => p.active);

  return (
    <PageShell className="pb-20 pt-24 md:pt-32">
      <TrackOnMount event="view_promotions" params={{ promotions_count: activePromotions.length }} />
      <SectionContainer>
        <Breadcrumb items={[{ label: "Promoções" }]} />
        <div className="mt-6">
          <SectionTitle
            as="h1"
            eyebrow="Ofertas"
            title="Promoções ativas"
            description="Condições especiais por tempo limitado. Confirme a validade e peça pelo WhatsApp."
          />
        </div>
      </SectionContainer>
      <SectionContainer className="mt-12">
        {activePromotions.length > 0 ? (
          <StaggerGroup as="ul" className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {activePromotions.map((promotion) => (
              <StaggerItem as="li" key={promotion.id} className="h-full">
                <PromotionCard promotion={promotion} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-border bg-surface px-6 py-16 text-center">
            <p className="text-muted">Nenhuma promoção ativa no momento. Fale com a gente para condições especiais.</p>
            <WhatsAppButton size="lg" />
          </div>
        )}
      </SectionContainer>
    </PageShell>
  );
}
