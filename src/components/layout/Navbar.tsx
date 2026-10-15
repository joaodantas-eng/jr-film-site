"use client";

import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { contactInfo } from "@/data/contact";
import { NavLinks } from "@/components/navigation/NavLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Logo } from "@/components/ui/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, Phone } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sectionIds = useMemo(
    () =>
      mainNav
        .filter((l) => l.href.includes("#"))
        .map((l) => l.href.split("#")[1])
        .filter((fragment): fragment is string => Boolean(fragment)),
    [],
  );
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }

  // O menu mobile fica FORA do <header>: o backdrop-blur do cabeçalho cria um
  // novo contexto para elementos "fixed", o que prenderia o menu à altura dele.
  return (
    <>
      <header
        data-track-location="cabecalho"
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled || mobileOpen
            ? "border-b border-border bg-background/90 backdrop-blur-md backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-container items-center justify-between gap-6 px-5 sm:px-8 lg:h-[4.5rem] lg:px-12">
          <Link href="/" aria-label={`${siteConfig.name} — página inicial`} className="shrink-0 rounded-md">
            <Logo variant="dark-bg" height={26} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
            <NavLinks links={mainNav} activeId={activeId} />
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${contactInfo.phoneRaw}`}
              className="hidden items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground xl:flex"
            >
              <Phone className="h-4 w-4 text-accent-fg" strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only">Ligar para a JR Film:</span>
              {contactInfo.phoneDisplay}
            </a>
            <WhatsAppButton size="md" label="WhatsApp" className="min-h-10 px-4" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/10 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={closeMenu} links={mainNav} />
    </>
  );
}
