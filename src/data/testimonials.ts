import { Testimonial } from "@/types";

// Avaliações exibidas quando a API do Google (GOOGLE_PLACES_API_KEY) não está
// configurada ou falha. Copiadas das avaliações públicas da JR Film no Google
// Maps. Não adicione avaliações sem origem verificável.
export const testimonials: Testimonial[] = [
  {
    id: "tst-1",
    author: "Tôni Domingues",
    rating: 5,
    content:
      "Super bem atendido! Agilidade, preço bom, serviço de qualidade, atenção dos funcionários. Recomendo demais! Show de bola!",
    date: "2026-05-12",
    source: "Google",
  },
  {
    id: "tst-2",
    author: "Alex Rodrigues",
    rating: 5,
    content: "Atendimento nota 10. Equipe muito eficaz, serviço de ótima qualidade!!",
    date: "2026-04-03",
    source: "Google",
  },
  {
    id: "tst-3",
    author: "Thiago Vinicius Ferreira Santos",
    rating: 5,
    content:
      "Atendimento excelente e humano também. Pessoal super prestativo, mesmo sendo um pequeno reparo e bem simples demonstraram muita boa vontade em me ajudar. Recomendo e indico. Preço justo e serviço de qualidade! Estão de parabéns!",
    date: "2026-02-27",
    source: "Google",
  },
];
