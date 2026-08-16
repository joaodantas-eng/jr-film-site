import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonProps = (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>) & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  withArrow?: boolean;
  href?: string;
};

const variantClasses = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border border-border text-foreground hover:border-foreground/40 hover:bg-surface",
  ghost: "text-foreground hover:text-accent",
};

const sizeClasses = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

// Efeito "specular": um brilho diagonal que atravessa o botão no hover.
// Só no variant primary (os CTAs de maior peso) — em excesso, perde o efeito.
function Shine() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
      <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-hover:animate-shine" />
    </span>
  );
}

// Único componente de botão do site. Variants cobrem todos os casos de uso do briefing
// (PrimaryButton / SecondaryButton viram props de variant, não componentes duplicados).
// Com href, navega (Link ou <a> externo). Sem href, renderiza um <button> nativo —
// para ações como trocar de modo na Central de Diagnóstico, sem precisar de outro componente.
export function Button({ variant = "primary", size = "md", withArrow = false, className, children, href, ...props }: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {variant === "primary" && <Shine />}
        {children}
        {withArrow && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {variant === "primary" && <Shine />}
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4" />}
    </button>
  );
}
