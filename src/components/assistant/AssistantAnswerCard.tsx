import { AssistantAnswer } from "@/services/ai/types";
import { ASSISTANT_WHATSAPP_CTA_LABEL } from "@/services/ai/prompt";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AssistantAnswerCardProps {
  answer: AssistantAnswer;
}

const urgencyConfig = {
  baixo: { label: "Urgência baixa", className: "border-border text-muted" },
  medio: { label: "Urgência média", className: "border-accent/40 text-accent" },
  alto: { label: "Urgência alta", className: "border-accent bg-accent text-white" },
};

// Formato padronizado de resposta: Possíveis causas, Nível de urgência,
// O que recomendamos, Aviso e CTA para o WhatsApp.
export function AssistantAnswerCard({ answer }: AssistantAnswerCardProps) {
  const whatsappMessage = answer.possibleCauses.length
    ? `Olá! Usei a Central de Diagnóstico do site e gostaria de agendar uma avaliação presencial.`
    : undefined;

  const urgency = answer.urgency ? urgencyConfig[answer.urgency] : null;

  return (
    <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-surface p-5">
      {(answer.possibleCauses.length > 0 || urgency) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          {answer.possibleCauses.length > 0 && (
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Possíveis causas</h3>
          )}
          {urgency && (
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                urgency.className,
              )}
            >
              {urgency.label}
            </span>
          )}
        </div>
      )}

      {answer.possibleCauses.length > 0 && (
        <ul className="space-y-2">
          {answer.possibleCauses.map((cause) => (
            <li key={cause} className="flex items-start gap-2.5 text-sm text-foreground/90">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {cause}
            </li>
          ))}
        </ul>
      )}

      <div className={answer.possibleCauses.length > 0 ? "mt-4" : ""}>
        {answer.possibleCauses.length > 0 && (
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent">O que recomendamos</h3>
        )}
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">{answer.recommendation}</p>
      </div>

      {!answer.offTopic && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-surface-elevated/60 p-3 text-xs leading-relaxed text-muted">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
          {answer.warning}
        </div>
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
