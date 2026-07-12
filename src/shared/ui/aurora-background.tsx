"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

/**
 * Decorative background: animated gradient orbs + interactive grid.
 * Used behind hero and key sections.
 */
export function AuroraBackground({ variant = "section", className }: BackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-grid mask-radial opacity-60" />

      {/* Animated gradient orbs */}
      {variant === "hero" && (
        <>
          <motion.div
            className="absolute -top-32 left-1/4 h-[32rem] w-[32rem] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, oklch(0.78 0.17 162 / 0.18), transparent 70%)",
            }}
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.08, 0.95, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, oklch(0.82 0.16 80 / 0.12), transparent 70%)",
            }}
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 20, -20, 0],
              scale: [1, 0.95, 1.05, 1],
            }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full blur-[130px]"
            style={{
              background:
                "radial-gradient(circle, oklch(0.75 0.15 195 / 0.1), transparent 70%)",
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -10, 10, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {variant === "section" && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[24rem] w-[40rem] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.17 162 / 0.08), transparent 70%)",
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
