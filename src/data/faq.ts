import { FAQItem } from "@/types";

// FAQ geral da Home. Cada serviço também tem seu próprio FAQ em services.ts
// (mais específico), usado na página individual do serviço.
export const generalFaq: FAQItem[] = [
  {
    id: "faq-geral-1",
    question: "Preciso agendar ou posso levar o carro direto?",
    answer:
      "O ideal é agendar pelo WhatsApp para garantir horário e evitar espera, mas atendemos também por ordem de chegada conforme a disponibilidade do dia.",
  },
  {
    id: "faq-geral-2",
    question: "Vocês passam orçamento antes de iniciar o serviço?",
    answer:
      "Sim. Todo serviço só é executado depois da sua aprovação — você recebe o diagnóstico e o valor antes de qualquer peça ser trocada.",
  },
  {
    id: "faq-geral-3",
    question: "Atendem qualquer marca e modelo de veículo?",
    answer:
      "Atendemos a maioria das marcas nacionais e importadas populares. Se tiver dúvida sobre o seu modelo específico, chame no WhatsApp antes de vir.",
  },
  {
    id: "faq-geral-4",
    question: "Os serviços têm garantia?",
    answer: "Sim, todos os serviços realizados na JR Film saem com garantia.",
  },
  {
    id: "faq-geral-5",
    question: "Vocês atendem em Nova Serrana e região?",
    answer: "Sim, estamos localizados em Nova Serrana/MG e atendemos clientes da cidade e região.",
  },
];
