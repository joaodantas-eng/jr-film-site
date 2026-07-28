import { Promotion } from "@/types";

// Página /promocoes lê deste array. Preparado para futuramente ser alimentado
// por um painel administrativo — o componente PromotionCard não muda.
export const promotions: Promotion[] = [
  {
    id: "promo-1",
    slug: "revisao-de-freios",
    title: "Revisão de Freios com Desconto",
    description:
      "Inspeção completa do sistema de freios (pastilhas, discos e fluido) com condição especial neste mês.",
    image: "/images/gallery/img_1310.jpg",
    validUntil: "Consulte a validade pelo WhatsApp",
    active: true,
  },
  {
    id: "promo-2",
    slug: "combo-alinhamento-balanceamento",
    title: "Combo Alinhamento + Balanceamento",
    description: "Faça os dois serviços juntos e garanta mais estabilidade e economia de pneus.",
    image: "/images/gallery/img_3682.jpg",
    validUntil: "Consulte a validade pelo WhatsApp",
    active: true,
  },
];
