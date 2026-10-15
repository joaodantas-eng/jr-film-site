// Metadados globais do site. Única fonte de verdade para nome, slogan e textos
// institucionais reutilizados em várias telas.
//
// URL oficial: usada nas URLs canônicas, no sitemap, no robots.txt e no
// compartilhamento social. Pode ser sobrescrita por NEXT_PUBLIC_SITE_URL (sem
// barra no final) — por exemplo, se a oficina passar a usar um domínio próprio.
const FALLBACK_SITE_URL = "https://jrfilm.vercel.app";

export const siteConfig = {
  name: "JR Film",
  legalName: "JR Film Oficina Mecânica",
  tagline: "Precisão que se sente na direção.",
  description:
    "Loja de acessórios e mecânica automotiva: cuidamos da manutenção do seu veículo com diagnóstico técnico, peças de procedência garantida e um time pronto para deixar o carro pronto para a estrada.",
  city: "Nova Serrana",
  state: "MG",
  locale: "pt_BR",
  url: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL).replace(/\/$/, ""),
  logo: "/logos/jrfilm-logo-dark-bg.png",
  // Cores da marca (as classes Tailwind correspondentes ficam em tailwind.config.ts).
  colors: { background: "#0A0A0A", accent: "#DC2626", foreground: "#F5F5F4" },
} as const;

// Só a produção oficial deve ser indexada. Prévias da Vercel (VERCEL_ENV=preview)
// e builds locais recebem noindex e um robots.txt que bloqueia rastreamento.
export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";
