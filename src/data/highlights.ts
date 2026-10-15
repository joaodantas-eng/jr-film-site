import { Differentiator, LucideIconName } from "@/types";

// Textos comerciais de destaque da Home, movidos dos componentes para cá.
// São afirmações da empresa (garantia, prazos, equipe) — mantenha somente o
// que a JR Film de fato pratica.

export const differentiators: Differentiator[] = [
  {
    id: "diff-1",
    title: "Diagnóstico transparente",
    description: "Você recebe um laudo claro antes de qualquer serviço, sem surpresas na hora de pagar.",
    icon: "ShieldCheck",
  },
  {
    id: "diff-2",
    title: "Entrega no prazo",
    description: "Compromisso com o horário combinado — seu tempo importa tanto quanto o do seu carro.",
    icon: "Clock",
  },
  {
    id: "diff-3",
    title: "Técnicos especializados",
    description: "Equipe treinada e atualizada com as tecnologias automotivas mais recentes.",
    icon: "Wrench",
  },
  {
    id: "diff-4",
    title: "Garantia em todos os serviços",
    description: "Todo trabalho realizado sai da oficina com garantia por escrito.",
    icon: "Award",
  },
  {
    id: "diff-5",
    title: "Peças de procedência",
    description: "Trabalhamos com peças homologadas, com nota fiscal.",
    icon: "CheckCircle2",
  },
  {
    id: "diff-6",
    title: "Você aprova antes",
    description: "Você aprova o orçamento antes de qualquer peça ser trocada.",
    icon: "ClipboardList",
  },
];

export const guaranteePillars: { title: string; description: string; icon: LucideIconName }[] = [
  {
    title: "Garantia em todo serviço",
    description: "Todo trabalho realizado na JR Film sai da oficina com garantia.",
    icon: "ShieldCheck",
  },
  {
    title: "Diagnóstico antes do reparo",
    description: "Você aprova o orçamento antes de qualquer peça ser trocada.",
    icon: "ClipboardList",
  },
  {
    title: "Peças de procedência",
    description: "Trabalhamos com peças homologadas, com nota fiscal.",
    icon: "CheckCircle2",
  },
];

export const howItWorksSteps: { step: string; title: string; description: string; icon: LucideIconName }[] = [
  {
    step: "Passo 1",
    title: "Solicite um orçamento",
    description: "Chame no WhatsApp e conte o que o veículo está apresentando.",
    icon: "MessageCircle",
  },
  {
    step: "Passo 2",
    title: "Agende o serviço",
    description: "Combinamos o melhor horário para você trazer o veículo.",
    icon: "Calendar",
  },
  {
    step: "Passo 3",
    title: "Receba seu veículo revisado",
    description: "Serviço executado com checklist de qualidade antes da entrega.",
    icon: "CheckCircle2",
  },
];
