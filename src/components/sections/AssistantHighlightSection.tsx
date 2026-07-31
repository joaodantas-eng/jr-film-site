"use client";

import { DIAGNOSTIC_CENTER_NAME } from "@/services/ai/prompts";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { MessageCircle, Sparkles, MessageSquareText, Camera, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  { icon: MessageSquareText, label: "Texto" },
  { icon: Camera, label: "Fotos" },
  { icon: ClipboardList, label: "Dados do veículo" },
];

// Seção premium de destaque da Central de Diagnóstico — o principal diferencial
// do site. Fica logo após o Hero, na posição de maior visibilidade da Home.
export function AssistantHighlightSection() {
  return (
    <section className="py-20 md:py-28">
      <SectionContainer>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-surface via-surface to-surface-elevated px-8 py-16 md:px-16 md:py-20">
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-[130px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />

            <div className="relative grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  Diferencial JR Film
                </span>

                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
                  Não sabe o que o seu carro tem?
                  <br />
                  Pergunte à {DIAGNOSTIC_CENTER_NAME}.
                </h2>

                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                  Conte o que aconteceu por texto, envie uma foto ou informe os dados do seu veículo — e receba
                  orientações iniciais sobre as possíveis causas antes de trazer o carro para uma avaliação presencial.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {capabilities.map((capability) => (
                    <span
                      key={capability.label}
                      className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground/80"
                    >
                      <capability.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                      {capability.label}
                    </span>
                  ))}
                </div>

                <Button href="/diagnostico" size="lg" withArrow className="mt-8 px-8 py-4 text-base">
                  <MessageCircle className="h-5 w-5" />
                  Fazer Diagnóstico
                </Button>
              </div>

              {/* Prévia decorativa do chat — reforça visualmente o que a página /diagnostico entrega */}
              <div className="hidden flex-col gap-3 md:flex">
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-accent px-4 py-3 text-sm text-white"
                >
                  Meu ar-condicionado não gela
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-surface p-4 text-sm text-foreground/85"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Possíveis causas</span>
                  <p className="mt-1.5">Nível de gás baixo, compressor irregular, filtro de cabine sujo...</p>
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </SectionContainer>
    </section>
  );
}
