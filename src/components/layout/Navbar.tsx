"use client";

import { mainNav } from "@/data/navigation";
import { contactInfo } from "@/data/contact";
import { NavLinks } from "@/components/navigation/NavLinks";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { Logo } from "@/components/ui/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Phone } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(
    mainNav
      .filter((l) => l.href.includes("#"))
      .map((l) => l.href.split("#")[1])
      .filter((fragment): fragment is string => Boolean(fragment)),
  );

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-container items-center justify-between px-6 md:px-10">
        <Link href="/" aria-label={`${contactInfo.address.city} — Página inicial`}>
          <Logo variant="dark-bg" height={30} />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks links={mainNav} activeId={activeId} />
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="hidden items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground lg:flex"
          >
            <Phone className="h-4 w-4 text-accent" strokeWidth={1.75} />
            {contactInfo.phoneDisplay}
          </a>
          <WhatsAppButton size="md" />
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          className="p-2 text-foreground md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={mainNav} />
    </motion.header>
  );
}
