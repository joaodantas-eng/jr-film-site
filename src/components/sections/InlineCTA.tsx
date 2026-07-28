import { SectionContainer } from "@/components/ui/SectionContainer";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";

interface InlineCTAProps {
  text: string;
}

// Faixa compacta de CTA usada entre sections mais longas, para que o visitante
// nunca fique muito tempo rolando sem encontrar um botão de contato.
export function InlineCTA({ text }: InlineCTAProps) {
  return (
    <div className="border-y border-border bg-surface/40 py-8">
      <SectionContainer className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-foreground/80 sm:text-base">{text}</p>
        <WhatsAppButton size="md" />
      </SectionContainer>
    </div>
  );
}
