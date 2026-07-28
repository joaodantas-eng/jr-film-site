import { BlogPost } from "@/types";

// Estrutura do blog — poucos posts de exemplo, mas o array aceita quantos forem
// adicionados depois. app/blog/[slug] gera a página automaticamente para cada item.
export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "quando-trocar-o-oleo",
    title: "Quando trocar o óleo do motor?",
    excerpt:
      "Entenda os sinais de que o óleo do seu carro precisa ser trocado e por que respeitar o intervalo certo evita danos maiores no motor.",
    coverImage: "/images/gallery/img_3606.jpg",
    publishedAt: "2026-06-10",
    relatedServiceSlugs: ["troca-de-oleo"],
    content: [
      "O óleo do motor perde suas propriedades lubrificantes com o tempo e o uso, mesmo que o carro fique parado na garagem. Por isso, a troca é sempre recomendada por tempo (geralmente uma vez por ano) ou por quilometragem (em torno de 10.000 km), o que vencer primeiro.",
      "Alguns sinais indicam que a troca não pode esperar: luz de óleo acesa no painel, ruído metálico vindo do motor, ou óleo escuro e com cheiro de queimado quando verificado na vareta.",
      "Rodar com óleo vencido ou em quantidade insuficiente acelera o desgaste de peças internas do motor, podendo levar a reparos muito mais caros do que uma troca preventiva.",
      "Se você não sabe quando foi a última troca do seu veículo, o mais seguro é levar para uma avaliação — é rápido e evita dor de cabeça mais à frente.",
    ],
  },
  {
    id: "post-2",
    slug: "sinais-de-problema-nos-freios",
    title: "5 sinais de que os freios do seu carro precisam de atenção",
    excerpt:
      "Ruídos, vibração e pedal mole são alguns dos sinais mais comuns de que o sistema de freios precisa de revisão.",
    coverImage: "/images/gallery/img_3682.jpg",
    publishedAt: "2026-06-24",
    relatedServiceSlugs: ["freios"],
    content: [
      "O sistema de freios é o item de segurança mais importante do veículo, e geralmente dá sinais antes de falhar completamente. Ficar atento a eles evita riscos e reparos mais caros.",
      "1. Ruído de atrito ou 'grito' ao frear — geralmente indica pastilhas no limite de desgaste.",
      "2. Pedal mole ou muito duro — pode indicar problema no fluido ou no sistema hidráulico.",
      "3. Veículo puxando para um lado ao frear — sinal de desgaste desigual entre as rodas.",
      "4. Vibração no volante durante a frenagem — comum em discos empenados.",
      "5. Distância de frenagem maior que o normal — não deve ser ignorado em nenhuma hipótese.",
      "Ao notar qualquer um desses sinais, o recomendado é levar o veículo para uma inspeção o quanto antes.",
    ],
  },
  {
    id: "post-3",
    slug: "cuidados-com-o-ar-condicionado",
    title: "Cuidados com o ar-condicionado do carro",
    excerpt:
      "Manutenção preventiva simples que evita mofo, mau cheiro e perda de rendimento no ar-condicionado automotivo.",
    coverImage: "/images/gallery/img_0471.jpg",
    publishedAt: "2026-07-08",
    relatedServiceSlugs: ["ar-condicionado"],
    content: [
      "O ar-condicionado automotivo costuma ser lembrado só quando para de gelar — mas a manutenção preventiva evita boa parte dos problemas mais comuns.",
      "A higienização do sistema, recomendada a cada 12 meses, remove fungos e bactérias que se acumulam no evaporador e causam o famoso cheiro de mofo ao ligar o ar.",
      "Já a perda de rendimento — ar saindo fraco ou não gelando — geralmente está ligada à queda no nível de gás refrigerante, que pode indicar um pequeno vazamento no sistema.",
      "Manter o ar-condicionado em dia também protege o compressor, uma das peças mais caras do sistema, que pode ser danificado ao operar com pouco gás por tempo prolongado.",
    ],
  },
];
