import { GalleryItem } from "@/types";

// Fotos reais da oficina. Se algum texto ou categoria não bater com a foto,
// é só ajustar `alt` e `category` aqui — nenhum componente precisa mudar.
export const galleryItems: GalleryItem[] = [
  { id: "gal-1", alt: "Oficina JR Film", category: "oficina", src: "/images/gallery/img_3688.jpg" },
  { id: "gal-2", alt: "Serviço em andamento na JR Film", category: "servicos", src: "/images/gallery/img_3682.jpg" },
  { id: "gal-3", alt: "Estrutura da oficina JR Film", category: "oficina", src: "/images/gallery/img_3575.jpg" },
  { id: "gal-4", alt: "Veículo atendido na JR Film", category: "resultados", src: "/images/gallery/img_3606.jpg" },
  { id: "gal-5", alt: "Equipe JR Film", category: "equipe", src: "/images/gallery/img_1310.jpg" },
  { id: "gal-6", alt: "Trabalho realizado na JR Film", category: "resultados", src: "/images/gallery/img_0471.jpg" },
];
