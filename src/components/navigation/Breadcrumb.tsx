import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/data/site";

export interface BreadcrumbItem {
  label: string;
  href?: string; // sem href = item atual (não clicável)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

// Breadcrumb visual + Schema.org BreadcrumbList (SEO). Usado nas páginas de
// serviço e promoções — qualquer página futura pode reaproveitar.
export function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteConfig.url },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/" className="flex items-center hover:text-foreground" aria-label="Início">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
