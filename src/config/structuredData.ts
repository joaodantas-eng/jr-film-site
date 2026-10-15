import { siteConfig } from "@/data/site";
import { contactInfo } from "@/data/contact";
import { socialLinks } from "@/data/social";
import { services } from "@/data/services";
import { FAQItem } from "@/types";

// Dados estruturados (Schema.org) montados SÓ com informações confirmadas no
// projeto. Propositalmente ausentes até a oficina fornecer: coordenadas
// geográficas (geo), faixa de preço, CNPJ e nota/avaliações agregadas
// (o Google não exibe estrelas de avaliações publicadas pelo próprio negócio).
export const BUSINESS_ID = `${siteConfig.url}/#oficina`;

export function buildBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": BUSINESS_ID,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}/og-image.png`,
    telephone: contactInfo.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInfo.address.street,
      addressLocality: contactInfo.address.city,
      addressRegion: contactInfo.address.state,
      postalCode: contactInfo.address.zip,
      addressCountry: "BR",
    },
    hasMap: contactInfo.mapSearchUrl,
    areaServed: { "@type": "City", name: `${siteConfig.city}, ${siteConfig.state}` },
    openingHoursSpecification: contactInfo.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: socialLinks.filter((s) => s.isProfile).map((s) => s.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${siteConfig.url}/servicos/${service.slug}`,
        },
      })),
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#site`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "pt-BR",
    publisher: { "@id": BUSINESS_ID },
  };
}

// FAQPage é marcação válida, mas o Google hoje só exibe o resultado especial
// de FAQ para poucos sites (governo/saúde). Mantida por descrever corretamente
// o conteúdo da página — não espere destaque especial na busca por causa dela.
export function buildFaqJsonLd(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
