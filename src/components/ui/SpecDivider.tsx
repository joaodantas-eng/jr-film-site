interface SpecDividerProps {
  label: string;
}

// Elemento de assinatura visual do site: um divisor técnico em estilo "leitura de diagnóstico",
// usado entre seções em vez de um divisor decorativo genérico.
export function SpecDivider({ label }: SpecDividerProps) {
  return (
    <div className="flex items-center gap-4 py-2" role="separator" aria-hidden="true">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{label}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-border via-border to-transparent" />
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  );
}
