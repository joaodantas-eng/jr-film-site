import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";

// Gerado dinamicamente a partir dos dados centralizados — uma rota nova em
// data/services.ts já entra no sitemap automaticamente.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/diagnostico`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/promocoes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/servicos/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
