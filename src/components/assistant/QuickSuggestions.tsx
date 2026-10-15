interface QuickSuggestionsProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

export const ASSISTANT_SUGGESTIONS = [
  "Meu ar-condicionado não gela",
  "Meu carro está puxando para um lado",
  "Meu freio faz barulho",
  "Meu carro está consumindo muito",
  "Meu carro está falhando",
  "A luz da injeção acendeu",
  "Meu carro está esquentando",
];

export function QuickSuggestions({ onSelect, disabled }: QuickSuggestionsProps) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2" aria-label="Exemplos de problemas para começar">
      {ASSISTANT_SUGGESTIONS.map((suggestion) => (
        <li key={suggestion}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect(suggestion)}
            className="flex min-h-12 w-full items-center rounded-xl border border-border bg-surface px-4 py-2.5 text-left text-[0.9375rem] text-foreground/85 transition-colors duration-200 hover:border-border-strong hover:bg-surface-elevated hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {suggestion}
          </button>
        </li>
      ))}
    </ul>
  );
}
