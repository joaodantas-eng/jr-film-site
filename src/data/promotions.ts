import { Promotion } from "@/types";

// Página /promocoes lê deste array. Preparado para futuramente ser alimentado
// por um painel administrativo — o componente PromotionCard não muda.
export const promotions: Promotion[] = [
  {
    id: "promo-1",
    slug: "combo-fiat-1-0-e-1-4",
    title: "Combo Especial Fiat 1.0 e 1.4",
    description: "Troca de óleo + filtro",
    image: "/images/gallery/img_3606.jpg",
    price: "R$ 135,00",
    active: true,
  },
  {
    id: "promo-2",
    slug: "oferta-especial-de-pneus",
    title: "Oferta Especial de Pneus",
    description: "Pneus selecionados com condição especial:",
    details: ["175/75 R13", "175/70 R14"],
    image: "/images/gallery/img_3682.jpg",
    price: "R$ 279,00",
    oldPrice: "R$ 299,00",
    active: true,
  },
];
