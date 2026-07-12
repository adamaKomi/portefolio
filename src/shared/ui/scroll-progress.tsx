"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/shared/hooks/use-scroll";

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-primary via-primary to-accent"
      style={{ scaleX: progress }}
      aria-hidden
    />
  );
}
