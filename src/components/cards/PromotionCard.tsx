import { Card } from "@/components/ui/Card";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Promotion } from "@/types";
import Image from "next/image";
import { Tag } from "lucide-react";

export function PromotionCard({ promotion }: { promotion: Promotion }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0 hover:-translate-y-1">
      <div className="relative aspect-[16/10] w-full">
        <Image src={promotion.image} alt={promotion.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wider text-white">
          <Tag className="h-3 w-3" />
          Promoção
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-foreground">{promotion.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{promotion.description}</p>

        {promotion.details && promotion.details.length > 0 && (
          <ul className="mt-2 space-y-1">
            {promotion.details.map((detail) => (
              <li key={detail} className="font-mono text-xs uppercase tracking-wider text-foreground/70">
                • {detail}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-1 items-end justify-between gap-4">
          <div>
            {promotion.oldPrice && (
              <span className="block font-mono text-xs text-muted line-through">{promotion.oldPrice}</span>
            )}
            <span className="font-display text-2xl font-semibold text-accent">{promotion.price}</span>
          </div>
          {promotion.validUntil && (
            <span className="font-mono text-xs uppercase tracking-wider text-muted">{promotion.validUntil}</span>
          )}
        </div>

        <WhatsAppButton
          size="md"
          className="mt-5 w-full justify-center"
          label="Solicitar orçamento pelo WhatsApp"
          message={`Olá! Vi a promoção "${promotion.title}" no site e gostaria de solicitar um orçamento.`}
        />
      </div>
    </Card>
  );
}
