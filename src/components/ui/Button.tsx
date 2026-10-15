import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonProps = (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>) & {
  variant?: "primary" | "secondary" | "ghost" | "light" | "dark";
  size?: "md" | "lg";
  withArrow?: boolean;
  href?: string;
};

const variantClasses = {
  // Vermelho só no CTA principal de cada contexto.
  primary: "bg-accent text-white hover:bg-accent-hover active:translate-y-px",
  secondary: "border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5",
  ghost: "text-foreground underline decoration-foreground/30 underline-offset-[6px] hover:decoration-accent",
  // Para fundos claros (seção paper) e para a faixa vermelha do CTA final.
  light: "border border-paper-ink/25 text-paper-ink hover:border-paper-ink hover:bg-paper-ink/5",
  dark: "bg-paper-ink text-white hover:bg-black active:translate-y-px",
};

// Alturas mínimas de 44/52px garantem área de toque confortável no celular.
const sizeClasses = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-[3.25rem] px-7 text-base",
};

function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}

// Único componente de botão do site. Com href, navega (Link interno ou <a>
// para links externos, tel: e mailto:). Sem href, renderiza um <button>.
export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2.5 rounded-lg text-center font-semibold leading-tight transition-[background-color,border-color,color,transform] duration-200 ease-premium focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const arrow = withArrow && (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
      aria-hidden="true"
    />
  );

  if (href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
          {arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {arrow}
    </button>
  );
}
