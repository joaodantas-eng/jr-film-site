import { SectionContainer } from "@/components/ui/SectionContainer";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";

interface InlineCTAProps {
  text: string;
  label?: string;
}

// Faixa compacta de CTA usada entre sections mais longas, para que o visitante
// nunca fique muito tempo rolando sem encontrar um botão de contato.
export function InlineCTA({ text, label = "Falar com a JR Film" }: InlineCTAProps) {
  return (
    <div className="border-y border-border bg-surface/40 py-7" data-track-location="cta-intermediario">
      <SectionContainer className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-base text-foreground/85">{text}</p>
        <WhatsAppButton size="md" label={label} className="w-full sm:w-auto" />
      </SectionContainer>
    </div>
  );
}
