import { AssistantAnswer } from "@/services/ai/types";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AssistantAnswerCardProps {
  answer: AssistantAnswer;
}

// Formato padronizado de resposta pedido no briefing: Possíveis causas,
// O que recomendamos, Aviso e CTA para o WhatsApp.
export function AssistantAnswerCard({ answer }: AssistantAnswerCardProps) {
  const whatsappMessage = answer.possibleCauses.length
    ? `Olá! Usei o Diagnóstico Inteligente do site e gostaria de agendar uma avaliação presencial.`
    : undefined;

  return (
    <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-surface p-5">
      {answer.possibleCauses.length > 0 && (
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Possíveis causas</h3>
          <ul className="mt-3 space-y-2">
            {answer.possibleCauses.map((cause) => (
              <li key={cause} className="flex items-start gap-2.5 text-sm text-foreground/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {cause}
              </li>
            ))}
          </ul>
        </div>
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
          <WhatsAppButton size="md" label="Agendar avaliação pelo WhatsApp" message={whatsappMessage} />
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
