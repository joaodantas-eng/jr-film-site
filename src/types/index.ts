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
}

export interface ContactInfo {
  phoneDisplay: string;
  phoneRaw: string;
  whatsappNumber: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
  };
  hours: { day: string; time: string }[];
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
  googleReviewUrl: string;
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
  | "Home";
