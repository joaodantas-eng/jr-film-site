import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combina classes condicionalmente e resolve conflitos do Tailwind (ex: "p-2" vs "p-4").
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
