"use client";

import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/buttons/WhatsAppButton";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Fundo com grid técnico sutil, referência a plantas de engenharia automotiva */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px]" />

      {/* Scan line — o "signature moment" do hero, referência a diagnóstico automotivo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.2, delay: 0.4, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        style={{ top: "45%" }}
      />

      <SectionContainer className="relative">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block font-mono text-xs uppercase tracking-[0.25em] text-accent"
        >
          Oficina mecânica · {siteConfig.city}/{siteConfig.state}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <WhatsAppButton size="lg" label="Agendar avaliação" />
          <Button href="#servicos" variant="secondary" size="lg">
            Ver serviços
          </Button>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
