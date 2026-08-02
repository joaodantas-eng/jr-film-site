import { AssistantAnswer } from "@/services/ai/types";
import { ASSISTANT_WHATSAPP_CTA_LABEL, ASSISTANT_WARNING } from "@/services/ai/prompts";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface AssistantAnswerCardProps {
  answer: AssistantAnswer;
}

const urgencyConfig = {
  baixo: { label: "Urgência baixa", className: "border-border text-muted" },
  medio: { label: "Urgência média", className: "border-accent/40 text-accent" },
  alto: { label: "Urgência alta", className: "border-accent bg-accent text-white" },
};

// Resposta em prosa, como um consultor conversando — sem títulos/seções fixas.
// A lista de causas só aparece quando o modelo de fato preencheu uma (perguntas
// de esclarecimento, por exemplo, não trazem lista). O aviso de avaliação
// presencial é fixo da interface, não depende do texto gerado incluir isso.
export function AssistantAnswerCard({ answer }: AssistantAnswerCardProps) {
  const hasCauses = answer.possibleCauses.length > 0;
  const whatsappMessage = hasCauses
    ? `Olá! Usei a Central de Diagnóstico do site e gostaria de agendar uma avaliação presencial.`
    : undefined;

  const urgency = answer.urgency ? urgencyConfig[answer.urgency] : null;

  return (
    <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-surface p-5">
      {urgency && (
        <span
          className={cn(
            "mb-3 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
            urgency.className,
          )}
        >
          {urgency.label}
        </span>
      )}

      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">{answer.message}</p>

      {hasCauses && (
        <ul className="mt-3 space-y-2">
          {answer.possibleCauses.map((cause) => (
            <li key={cause} className="flex items-start gap-2.5 text-sm text-foreground/85">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {cause}
            </li>
          ))}
        </ul>
      )}

      {!answer.offTopic && (
        <p className="mt-3 text-xs leading-relaxed text-muted">{ASSISTANT_WARNING}</p>
      )}

      {!answer.offTopic && (
        <div className="mt-4 flex flex-wrap gap-3">
          <WhatsAppButton size="md" label={ASSISTANT_WHATSAPP_CTA_LABEL} message={whatsappMessage} />
          {answer.relatedServiceSlug && (
            <Button href={`/servicos/${answer.relatedServiceSlug}`} variant="secondary" size="md">
              Ver serviço relacionado
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
