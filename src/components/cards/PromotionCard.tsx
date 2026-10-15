import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Promotion } from "@/types";
import Image from "next/image";

// Card de oferta: foto ilustrativa, nome, condição e preço em destaque.
// Mostra só o que está cadastrado em data/promotions.ts (sem inventar
// desconto, prazo ou estoque).
export function PromotionCard({
  promotion,
  headingLevel = "h2",
}: {
  promotion: Promotion;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <article className="group grid h-full overflow-hidden rounded-3xl border border-border bg-surface sm:grid-cols-[0.9fr_1.1fr]">
      <div className="relative aspect-[16/10] bg-surface-elevated sm:aspect-auto sm:min-h-full">
        {/* Foto ilustrativa: o texto já descreve a oferta, então a imagem é decorativa. */}
        <Image
          src={promotion.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-xs font-bold text-white">
          Promoção
        </span>
      </div>
      <div className="flex flex-col p-6 md:p-7">
        <Heading className="type-display text-2xl text-foreground">{promotion.title}</Heading>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{promotion.description}</p>
        {promotion.details && promotion.details.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Itens da oferta">
            {promotion.details.map((detail) => (
              <li
                key={detail}
                className="tabular rounded-md border border-border-strong px-2.5 py-1 text-sm text-foreground/90"
              >
                {detail}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex flex-1 items-end justify-between gap-4 border-t border-border pt-5">
          <p className="tabular">
            {promotion.oldPrice && (
              <span className="block text-sm text-muted">
                de <s>{promotion.oldPrice}</s>
              </span>
            )}
            <span className="type-display text-[2rem] leading-none text-foreground">
              {promotion.oldPrice && <span className="sr-only">por </span>}
              {promotion.price}
            </span>
          </p>
          {promotion.validUntil && <span className="text-sm text-muted">Válido até {promotion.validUntil}</span>}
        </div>
        <WhatsAppButton
          size="md"
          className="mt-6 w-full"
          label="Pedir esta promoção"
          message={`Olá! Vi a promoção "${promotion.title}" no site e gostaria de solicitar um orçamento.`}
        />
      </div>
    </article>
  );
}
