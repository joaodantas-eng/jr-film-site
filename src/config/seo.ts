import { siteConfig } from "@/data/site";

// Defaults técnicos de SEO — separados de data/site.ts porque não são "conteúdo editorial",
// e sim configuração de metadados reaproveitada por app/layout.tsx e futuras páginas.
export const seoDefaults = {
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitle: `${siteConfig.name} — Oficina Mecânica em ${siteConfig.city}/${siteConfig.state}`,
  defaultDescription: siteConfig.description,
  ogImage: "/images/og-cover.jpg",
  keywords: [
    "oficina mecânica",
    "troca de óleo",
    "suspensão",
    "freios",
    "alinhamento e balanceamento",
    "insulfilm",
    `oficina mecânica ${siteConfig.city}`,
  ],
};
