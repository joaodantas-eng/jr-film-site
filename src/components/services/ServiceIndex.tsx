import Link from "next/link";
import { services, serviceGroups } from "@/data/services";
import { Icon } from "@/components/ui/Icon";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Índice de serviços agrupado por tipo. Cada linha é um link para a página
// do serviço. `tone` adapta as cores à seção clara (paper) ou escura.
export function ServiceIndex({
  tone = "paper",
  headingLevel = "h3",
}: {
  tone?: "paper" | "dark";
  headingLevel?: "h2" | "h3";
}) {
  const isPaper = tone === "paper";
  const GroupHeading = headingLevel;
  const ItemHeading = headingLevel === "h2" ? "h3" : "h4";

  return (
    <div className="space-y-12">
      {serviceGroups.map((group) => {
        const items = services.filter((s) => s.group === group.id);
        if (items.length === 0) return null;
        return (
          <div key={group.id}>
            <div
              className={cn(
                "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 pb-3",
                isPaper ? "border-paper-ink" : "border-foreground",
              )}
            >
              <GroupHeading className={cn("type-display text-xl", isPaper ? "text-paper-ink" : "text-foreground")}>
                {group.title}
              </GroupHeading>
              <p className={cn("text-sm", isPaper ? "text-paper-muted" : "text-muted")}>{group.description}</p>
            </div>
            <ul>
              {items.map((service) => (
                <li key={service.id} className={cn("border-b", isPaper ? "border-paper-line" : "border-border")}>
                  <Link
                    href={`/servicos/${service.slug}`}
                    className={cn(
                      "group grid grid-cols-[2.75rem_1fr_auto] items-start gap-4 py-5 transition-colors duration-200 sm:items-center",
                      isPaper ? "hover:bg-paper-raised" : "hover:bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-200",
                        isPaper
                          ? "bg-paper-ink text-white group-hover:bg-accent"
                          : "bg-surface-elevated text-accent-fg group-hover:bg-accent group-hover:text-white",
                      )}
                    >
                      <Icon name={service.icon} className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <ItemHeading className={cn("text-lg font-bold", isPaper ? "text-paper-ink" : "text-foreground")}>
                        {service.title}
                      </ItemHeading>
                      <span
                        className={cn(
                          "mt-1 block text-[0.9375rem] leading-relaxed",
                          isPaper ? "text-paper-muted" : "text-muted",
                        )}
                      >
                        {service.description}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={cn(
                        "mr-2 mt-1 h-5 w-5 transition-[transform,color] duration-200 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:mt-0",
                        isPaper
                          ? "text-paper-muted group-hover:text-accent-ink"
                          : "text-muted group-hover:text-accent-fg",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
