import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
