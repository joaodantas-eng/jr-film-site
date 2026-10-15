import Link from "next/link";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";
import { ASSISTANT_SUGGESTIONS } from "@/components/assistant/QuickSuggestions";
import { ArrowUpRight, Camera, Sparkles } from "lucide-react";

// Apresentação do assistente na Home. As perguntas de exemplo abrem o chat
// com o texto já preenchido — o envio continua sendo do visitante (nenhuma
// chamada à IA acontece sem ele apertar "Enviar").
export function AssistantHighlightSection() {
  const examples = ASSISTANT_SUGGESTIONS.slice(0, 4);

  return (
    <section id="diagnostico" aria-labelledby="assistente-titulo" className="border-y border-border bg-surface/40 py-20 md:py-28">
      <SectionContainer className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="eyebrow">Diagnóstico Inteligente</p>
          <h2 id="assistente-titulo" className="type-display mt-5 text-display-lg text-foreground">
            Descreva o problema. Entenda as causas antes de vir.
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted">
            O assistente da JR Film responde dúvidas sobre o seu carro em linguagem simples e, se você quiser, analisa
            uma foto do painel ou da peça. Ele orienta — quem confirma o defeito é o técnico, na avaliação presencial.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/diagnostico" size="lg">
              Começar uma conversa
            </Button>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted">
            <Camera className="h-4 w-4" aria-hidden="true" />
            Aceita fotos do painel, de pneus, vazamentos e peças.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-2 shadow-lift">
          <div className="flex items-center gap-3 rounded-2xl bg-surface-elevated px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold text-foreground">Assistente Automotivo</span>
              <span className="block text-xs text-muted">Orientação inicial sobre o seu carro</span>
            </span>
          </div>
          <p className="px-4 pb-2 pt-5 text-sm text-muted">Comece por uma destas perguntas:</p>
          <ul className="px-2 pb-2">
            {examples.map((example) => (
              <li key={example}>
                <Link
                  href={`/diagnostico?pergunta=${encodeURIComponent(example)}`}
                  className="group flex min-h-12 items-center justify-between gap-4 rounded-xl px-3 py-3 text-[0.9375rem] text-foreground/90 transition-colors hover:bg-surface-elevated hover:text-foreground"
                >
                  {example}
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-fg"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </section>
  );
}
