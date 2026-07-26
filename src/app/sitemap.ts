import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

// Gerado dinamicamente — quando o blog/páginas futuras existirem, este arquivo
// passa a mapear rotas vindas do banco em vez de uma lista fixa.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
