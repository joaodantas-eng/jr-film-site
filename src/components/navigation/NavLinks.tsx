"use client";

import { cn } from "@/lib/utils";
import { NavLink } from "@/types";

interface NavLinksProps {
  links: NavLink[];
  activeId?: string;
  onClickLink?: () => void;
  className?: string;
}

export function NavLinks({ links, activeId, onClickLink, className }: NavLinksProps) {
  return (
    <>
      {links.map((link) => {
        const fragment = link.href.includes("#") ? link.href.split("#")[1] : null;
        const isActive = fragment !== null && activeId === fragment;
        return (
          <a
            key={link.id}
            href={link.href}
            onClick={onClickLink}
            className={cn(
              "text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground",
              isActive && "text-foreground",
              className,
            )}
          >
            {link.label}
          </a>
        );
      })}
    </>
  );
}
