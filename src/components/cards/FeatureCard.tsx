import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { LucideIconName } from "@/types";

interface FeatureCardProps {
  icon: LucideIconName;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <Icon name={icon} className="h-6 w-6 text-accent" strokeWidth={1.75} />
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </Card>
  );
}
