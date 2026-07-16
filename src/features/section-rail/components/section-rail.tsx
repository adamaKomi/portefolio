"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { railSections } from "@/shared/constants/profile";
import { useActiveSection } from "@/shared/hooks/use-section-observer";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";

/**
 * Vertical side rail — fixed section indicator (Linear/Vercel inspired).
 * Shows a dot per section, the active one highlighted, with a label on hover.
 * Hidden on small screens (lg+ only). Hidden when an overlay is open.
 */
export function SectionRail() {
  const active = useActiveSection();
  const t = useT();
  const [hovered, setHovered] = React.useState<string | null>(null);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      aria-label={t("common.navigationBySection")}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto flex flex-col items-start gap-1">
        {railSections.map((section) => {
          const isActive = active === section.id;
          const isHovered = hovered === section.id;
          return (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => handleClick(section.id)}
                onMouseEnter={() => setHovered(section.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(section.id)}
                onBlur={() => setHovered(null)}
                aria-label={t(("common.rail." + section.id) as any) ? `${t("common.navigationBySection")}: ${t(section.labelKey)}` : section.label}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-3 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                {/* Index number (mono, appears on hover) */}
                <span
                  className={cn(
                    "font-mono text-[10px] tabular-nums transition-all duration-300 w-4 text-right",
                    isActive
                      ? "text-primary opacity-100"
                      : isHovered
                        ? "text-foreground/70 opacity-100"
                        : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  )}
                >
                  {section.index}
                </span>

                {/* Dot indicator */}
                <span className="relative flex items-center justify-center">
                  {isActive && (
                    <motion.span
                      layoutId="rail-active-ring"
                      className="absolute h-5 w-5 rounded-full border border-primary/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      isActive
                        ? "h-2.5 w-2.5 bg-primary shadow-[0_0_12px_oklch(0.78_0.17_162/0.6)]"
                        : isHovered
                          ? "h-2 w-2 bg-foreground/60"
                          : "h-1.5 w-1.5 bg-muted-foreground/40 group-hover:bg-foreground/50"
                    )}
                  />
                </span>

                {/* Label (appears on hover/active) */}
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden whitespace-nowrap text-xs font-medium"
                    >
                      <span
                        className={cn(
                          "inline-block rounded-md px-2 py-0.5 backdrop-blur-sm",
                          isActive
                            ? "text-primary"
                            : "text-foreground/70"
                        )}
                      >
                        {t(section.labelKey)}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
