// Contratos centrais do projeto.
// Componentes dependem apenas destes tipos — nunca da origem do dado (arquivo estático hoje, API amanhã).

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: LucideIconName;
  // Agrupamento usado na listagem de serviços.
  group: ServiceGroup;
  // Campos abaixo alimentam a página individual do serviço (app/servicos/[slug]).
  // Opcionais para não quebrar nenhum componente da V1 que só usa os campos básicos.
  metaDescription?: string;
  longDescription?: string;
  benefits?: string[];
  symptoms?: string[];
  whenToDo?: string;
  process?: { title: string; description: string }[];
  faq?: FAQItem[];
}

export type ServiceGroup = "mecanica" | "pneus" | "estetica";

export interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: LucideIconName;
}

export interface Testimonial {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  date: string;
  vehicle?: string;
  // Origem verificável da avaliação. Avaliações vindas da API do Google
  // preenchem tudo automaticamente; nas cadastradas à mão, preencha só se
  // a origem tiver sido conferida.
  source?: "Google";
  authorUrl?: string;
  relativeDate?: string;
}

// Trabalho realizado (case). Use apenas fotos e informações reais, com
// autorização do cliente para publicar fotos do veículo.
export interface CaseStudy {
  id: string;
  service: string;
  vehicle?: string;
  problem: string;
  work: string;
  images: { src: string; alt: string }[];
  date?: string;
}

export interface GalleryItem {
  id: string;
  alt: string;
  category: "oficina" | "servicos" | "equipe" | "resultados";
  src: string;
}

export interface Promotion {
  id: string;
  slug: string;
  title: string;
  description: string;
  details?: string[]; // itens extras da oferta (ex: medidas de pneu)
  image: string;
  price: string;
  oldPrice?: string;
  validUntil?: string;
  active: boolean;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: LucideIconName;
  isProfile: boolean;
}

export interface OpeningHours {
  day: string;
  time: string;
  days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[];
  opens?: string;
  closes?: string;
}

export interface ContactInfo {
  phoneDisplay: string;
  phoneRaw: string;
  phoneE164: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  hours: OpeningHours[];
  mapEmbedUrl: string;
  mapSearchUrl: string;
  mapDirectionsUrl: string;
  googleReviewUrl: string;
  googlePlaceId: string;
}

export type LucideIconName =
  | "Droplet"
  | "Settings2"
  | "Disc3"
  | "GaugeCircle"
  | "Scale"
  | "Wind"
  | "SunDim"
  | "Layers"
  | "Sparkles"
  | "ShieldCheck"
  | "Clock"
  | "Wrench"
  | "Award"
  | "Users"
  | "MapPin"
  | "Phone"
  | "MessageCircle"
  | "Instagram"
  | "Facebook"
  | "Star"
  | "ChevronRight"
  | "Menu"
  | "X"
  | "ArrowUpRight"
  | "Link2"
  | "CheckCircle2"
  | "HelpCircle"
  | "Calendar"
  | "ClipboardList"
  | "CarFront"
  | "Tag"
  | "BookOpen"
  | "ChevronDown"
  | "Home"
  | "Navigation";
