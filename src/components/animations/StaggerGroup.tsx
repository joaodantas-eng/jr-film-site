"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

type ListTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li";

// Anima uma lista (grid de cards) com stagger, sem repetir a config de transição em cada card.
// `as` permite usar listas semânticas (ul/ol + li) sem perder a animação.
export function StaggerGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ListTag;
}) {
  const Component = motion[as];
  return (
    <Component
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
}) {
  const Component = motion[as];
  return (
    <Component variants={item} className={className}>
      {children}
    </Component>
  );
}
