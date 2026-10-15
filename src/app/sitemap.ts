import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";

// Gerado a partir dos dados centralizados — um serviço novo em
// data/services.ts entra no sitemap automaticamente. Só páginas públicas e
// indexáveis entram aqui (sem API, sem 404).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/servicos`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/diagnostico`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.url}/promocoes`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteConfig.url}/privacidade`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteConfig.url}/servicos/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
