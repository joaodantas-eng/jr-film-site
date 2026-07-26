"use client";

import { NavLink } from "@/types";
import { NavLinks } from "./NavLinks";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { contactInfo } from "@/data/contact";
import { useScrollLock } from "@/hooks/useScrollLock";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, MapPin } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur md:hidden"
        >
          <div className="flex justify-end px-6 pt-6">
            <button onClick={onClose} aria-label="Fechar menu" className="p-2 text-foreground">
              <X className="h-6 w-6" />
            </button>
          </div>
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-start gap-6 px-8 pt-10"
          >
            <div className="flex flex-col gap-3 border-b border-border pb-6">
              <a href={`tel:${contactInfo.phoneRaw}`} className="flex items-center gap-2 text-sm text-foreground/80">
                <Phone className="h-4 w-4 text-accent" strokeWidth={1.75} />
                {contactInfo.phoneDisplay}
              </a>
              <a
                href={contactInfo.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/80"
              >
                <MapPin className="h-4 w-4 text-accent" strokeWidth={1.75} />
                {contactInfo.address.street}, {contactInfo.address.neighborhood}
              </a>
            </div>
            <NavLinks links={links} onClickLink={onClose} className="text-2xl" />
            <WhatsAppButton size="lg" className="mt-4 w-full justify-center" />
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
