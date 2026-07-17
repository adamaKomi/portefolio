"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  /** Optional mono label shown centered on the divider (e.g. "// next") */
  label?: string;
  className?: string;
}

/**
 * Animated section divider — a thin gradient line with an emerald pulse
 * that sweeps across when scrolled into view.
 * Adds visual rhythm between sections (Vercel/Linear style).
 */
export function SectionDivider({ label, className }: SectionDividerProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative flex items-center justify-center py-6 md:py-8", className)}
    >
      {/* Gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-full origin-left bg-gradient-to-r from-transparent via-border to-transparent"
      />

      {/* Center pulse dot */}
      {label ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground bg-background px-3"
        >
          {label}
        </motion.span>
      ) : (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_oklch(0.78_0.17_162/0.6)]"
        />
      )}

      {/* Sweeping pulse */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={inView ? { x: "100%", opacity: [0, 1, 0] } : { x: "-100%", opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
        className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  );
}
