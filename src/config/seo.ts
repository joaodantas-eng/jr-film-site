import { siteConfig, isIndexable } from "@/data/site";
import type { Metadata } from "next";

// Defaults técnicos de SEO — separados de data/site.ts porque não são
// "conteúdo editorial", e sim configuração de metadados.
export const seoDefaults = {
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitle: `${siteConfig.name} — Oficina Mecânica e Acessórios em ${siteConfig.city}/${siteConfig.state}`,
  defaultDescription: `Oficina mecânica em ${siteConfig.city}/${siteConfig.state}: troca de óleo, freios, suspensão, alinhamento, ar-condicionado, insulfilm e pneus. Fale com a JR Film pelo WhatsApp.`,
  // Gerada em build por app/og-image.png/route.tsx (1200 × 630).
  ogImage: "/og-image.png",
};

export const robotsMetadata: Metadata["robots"] = isIndexable
  ? { index: true, follow: true }
  : { index: false, follow: false };

// Helper central para metadata individual por página. Toda rota chama esta
// função, garantindo título, descrição, canonical, Open Graph e Twitter Card
// consistentes. O título recebe o sufixo do template definido no layout.
export function buildMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const ogImage = image ?? seoDefaults.ogImage;
  const socialTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : robotsMetadata,
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: `${siteConfig.name} — oficina mecânica em ${siteConfig.city}` },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}
