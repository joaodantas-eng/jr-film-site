import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Service } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// O card inteiro é um link; o texto "Ver detalhes" diz exatamente o que acontece.
export function ServiceCard({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link href={`/servicos/${service.slug}`} className="block h-full rounded-2xl">
      <Card interactive className="flex h-full flex-col">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated text-accent-fg transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
          <Icon name={service.icon} className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <Heading className="text-lg font-bold text-foreground">{service.title}</Heading>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
          Ver detalhes do serviço
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Card>
    </Link>
  );
}
