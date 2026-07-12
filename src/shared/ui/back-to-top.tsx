"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrolled } from "@/shared/hooks/use-scroll";

/**
 * Floating "back to top" button.
 * Appears after scrolling past 600px. Smooth scrolls to top on click.
 * Positioned bottom-right, above the Sonner toaster.
 */
export function BackToTop() {
  const visible = useScrolled(600);

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Remonter en haut"
          className="group fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/80 backdrop-blur-xl shadow-lg transition-colors hover:border-primary/40 hover:bg-card"
        >
          {/* Hover glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.78 0.17 162 / 0.12), transparent 70%)",
            }}
          />
          <ArrowUp className="relative h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
