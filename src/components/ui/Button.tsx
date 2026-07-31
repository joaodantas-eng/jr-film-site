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

// Único componente de botão do site. Variants cobrem todos os casos de uso do briefing
// (PrimaryButton / SecondaryButton viram props de variant, não componentes duplicados).
// Com href, navega (Link ou <a> externo). Sem href, renderiza um <button> nativo —
// para ações como trocar de modo na Central de Diagnóstico, sem precisar de outro componente.
export function Button({ variant = "primary", size = "md", withArrow = false, className, children, href, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        {withArrow && <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {withArrow && <ArrowUpRight className="h-4 w-4" />}
    </button>
  );
}
