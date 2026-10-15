"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLink } from "@/types";

interface NavLinksProps {
  links: NavLink[];
  activeId?: string;
  onClickLink?: () => void;
  className?: string;
}

export function NavLinks({ links, activeId, onClickLink, className }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const fragment = link.href.includes("#") ? link.href.split("#")[1] : null;
        const isCurrentPage = !fragment && (pathname === link.href || pathname.startsWith(`${link.href}/`));
        const isActive = isCurrentPage || (fragment !== null && pathname === "/" && activeId === fragment);
        return (
          <Link
            key={link.id}
            href={link.href}
            onClick={onClickLink}
            aria-current={isCurrentPage ? "page" : undefined}
            className={cn(
              "relative py-2 text-[0.9375rem] font-medium text-foreground/70 transition-colors duration-200 hover:text-foreground",
              "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-premium hover:after:scale-x-100",
              isActive && "text-foreground after:scale-x-100",
              className,
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
