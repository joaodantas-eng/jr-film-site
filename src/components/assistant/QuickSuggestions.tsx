interface QuickSuggestionsProps {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

const suggestions = [
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
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(suggestion)}
          className="rounded-full border border-border bg-surface px-4 py-2 text-left text-sm text-foreground/85 transition-colors duration-200 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
