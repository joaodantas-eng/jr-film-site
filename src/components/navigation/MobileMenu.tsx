"use client";

import { NavLink } from "@/types";
import { NavLinks } from "./NavLinks";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Logo } from "@/components/ui/Logo";
import { contactInfo } from "@/data/contact";
import { useScrollLock } from "@/hooks/useScrollLock";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

// Menu de tela cheia no celular, com comportamento de diálogo acessível:
// foco vai para o botão de fechar, Esc fecha, Tab fica preso dentro do menu
// e, ao fechar, o foco volta para o botão que abriu (ver Navbar).
export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useScrollLock(open);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-track-location="menu-mobile"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5 sm:px-8">
            <Logo variant="dark-bg" height={24} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/10"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Principal" className="flex flex-col px-5 pt-4 sm:px-8">
            <NavLinks
              links={links}
              onClickLink={onClose}
              className="type-display border-b border-border py-4 text-2xl text-foreground/90 after:hidden"
            />
          </nav>
          <div className="mt-auto space-y-3 px-5 pb-8 pt-10 sm:px-8">
            <WhatsAppButton size="lg" label="Falar com a JR Film" className="w-full" />
            <a href={`tel:${contactInfo.phoneRaw}`} className="flex min-h-11 items-center gap-3 text-foreground/85">
              <Phone className="h-5 w-5 text-accent-fg" strokeWidth={1.75} aria-hidden="true" />
              Ligar: {contactInfo.phoneDisplay}
            </a>
            <a
              href={contactInfo.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-3 text-foreground/85"
            >
              <MapPin className="h-5 w-5 text-accent-fg" strokeWidth={1.75} aria-hidden="true" />
              Ver como chegar à oficina
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
