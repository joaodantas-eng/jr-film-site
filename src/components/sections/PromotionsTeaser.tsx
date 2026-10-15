import { promotions } from "@/data/promotions";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { PromotionCard } from "@/components/cards/PromotionCard";

// Promoções ativas na Home. Some automaticamente quando não houver ofertas.
export function PromotionsTeaser() {
  const active = promotions.filter((p) => p.active);
  if (active.length === 0) return null;

  return (
    <section
      aria-labelledby="promocoes-titulo"
      className="border-t border-border bg-surface/50 py-20 md:py-28"
      data-track-location="promocoes-home"
    >
      <SectionContainer>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            id="promocoes-titulo"
            title="Promoções da oficina."
            description="Condições especiais por tempo limitado. Confirme a validade pelo WhatsApp."
          />
          <Button href="/promocoes" variant="secondary" className="shrink-0 self-start md:self-auto">
            Ver todas as promoções
          </Button>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {active.slice(0, 3).map((promotion) => (
            <li key={promotion.id}>
              <PromotionCard promotion={promotion} headingLevel="h3" layout="vertical" />
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
