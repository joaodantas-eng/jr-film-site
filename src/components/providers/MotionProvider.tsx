"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

// Faz todas as animações do Framer Motion respeitarem a preferência do
// sistema por menos movimento (prefers-reduced-motion).
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
