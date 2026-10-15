import { FAQItem } from "@/types";
import { contactInfo } from "./contact";
import { services } from "./services";

// FAQ geral da Home. Cada serviço também tem seu próprio FAQ em services.ts
// (mais específico), usado na página individual do serviço.
//
// As respostas são montadas a partir dos dados oficiais (serviços, telefone,
// WhatsApp, endereço, horários). Afirmações comerciais ("orçamento antes do
// serviço") repetem o que o site já declara em outras seções — confirme com a
// oficina antes da divulgação.
const serviceNames = services.map((s) => s.title.toLowerCase());
const servicesText = `${serviceNames.slice(0, -1).join(", ")} e ${serviceNames.at(-1)}`;
const hoursText = contactInfo.hours.map((h) => `${h.day}: ${h.time.toLowerCase()}`).join("; ");

export const generalFaq: FAQItem[] = [
  {
    id: "faq-servicos",
    question: "Quais serviços a JR Film oferece?",
    answer: `Trabalhamos com ${servicesText}. Cada serviço tem uma página com detalhes, sinais de alerta e como o trabalho é feito.`,
  },
  {
    id: "faq-avaliacao",
    question: "Como solicito uma avaliação do meu veículo?",
    answer:
      "Chame a equipe pelo WhatsApp, conte o que o carro está apresentando e combine o melhor horário para trazê-lo à oficina. Depois da avaliação, você recebe o diagnóstico e o orçamento antes de qualquer serviço ser executado.",
  },
  {
    id: "faq-contato",
    question: "Como entro em contato com a oficina?",
    answer: `Pelo WhatsApp ${contactInfo.whatsappDisplay}, pelo telefone ${contactInfo.phoneDisplay} ou pessoalmente na ${contactInfo.address.full}.`,
  },
  {
    id: "faq-horarios",
    question: "Qual é o horário de atendimento?",
    answer: `${hoursText}. Para evitar espera, combine o horário pelo WhatsApp antes de vir.`,
  },
  {
    id: "faq-problema",
    question: "Meu carro apresentou um problema. O que devo fazer?",
    answer:
      "Se acender uma luz vermelha no painel, o motor esquentar ou o freio falhar, pare em local seguro e evite continuar rodando. Nos demais casos, anote quando o problema aparece (ao frear, em curvas, com o motor frio etc.) e fale com a equipe pelo WhatsApp. Você também pode usar o Diagnóstico Inteligente do site para entender as possíveis causas antes da avaliação presencial.",
  },
];
