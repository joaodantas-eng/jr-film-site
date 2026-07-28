import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Service } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/servicos/${service.slug}`} className="block h-full">
      <Card className="flex h-full flex-col">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
          <Icon name={service.icon} className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
        <div className="mt-5 flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted transition-colors duration-300 group-hover:text-accent">
          Saiba mais
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>
  );
}
