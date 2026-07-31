import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

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
    `oficina mecânica em ${siteConfig.city}`,
    `centro automotivo em ${siteConfig.city}`,
    `troca de óleo em ${siteConfig.city}`,
    `insulfilm em ${siteConfig.city}`,
    `suspensão em ${siteConfig.city}`,
  ],
};

// Helper central para metadata individual por página (SEO da V2).
// Toda rota nova chama esta função em vez de montar o objeto Metadata na mão,
// garantindo Open Graph, Twitter Card e canonical consistentes em todo o site.
export function buildMetadata({
  title,
  description,
  path,
  image,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? seoDefaults.ogImage;

  return {
    title,
    description,
    keywords: keywords ?? seoDefaults.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
