import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LucideIcon } from "lucide-react";

interface EntryModeCardProps {
  icon: LucideIcon;
  title: string;
  message: string;
  buttonLabel: string;
  onSelect: () => void;
}

export function EntryModeCard({ icon: IconComponent, title, message, buttonLabel, onSelect }: EntryModeCardProps) {
  return (
    <Card className="flex h-full flex-col items-start text-left">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-elevated text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
        <IconComponent className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{message}</p>
      <Button onClick={onSelect} variant="secondary" size="md" className="mt-6 w-full justify-center">
        {buttonLabel}
      </Button>
    </Card>
  );
}
