import { MetadataRoute } from "next";
import { siteConfig, isIndexable } from "@/data/site";

// Produção: libera tudo, exceto a API (que não tem conteúdo para indexar).
// Prévias e builds locais: bloqueia rastreamento. Lembrete: robots.txt não é
// proteção — a API tem suas próprias defesas (ver app/api/assistant/route.ts).
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
