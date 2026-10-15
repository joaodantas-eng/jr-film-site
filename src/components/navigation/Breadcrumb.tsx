import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { JsonLd } from "@/components/seo/JsonLd";

export interface BreadcrumbItem {
  label: string;
  href?: string; // sem href = página atual (não clicável)
}

// Breadcrumb visual + Schema.org BreadcrumbList. Usado nas páginas internas.
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const all: BreadcrumbItem[] = [{ label: "Início", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.url}${item.href === "/" ? "" : item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Você está em">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
        {all.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="rounded py-1 transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground/90">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
