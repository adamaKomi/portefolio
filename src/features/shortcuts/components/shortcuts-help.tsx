"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Command, ArrowUp, ArrowDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useCommandPalette } from "@/features/command-palette";
import { useT, type TranslationKey } from "@/shared/i18n";

interface Shortcut {
  keys: React.ReactNode;
  labelKey: TranslationKey;
  groupKey: TranslationKey;
}

const SHORTCUTS: Shortcut[] = [
  { groupKey: "shortcuts.group.nav", keys: <Kbd><Command />K</Kbd>, labelKey: "shortcuts.openCmd" },
  { groupKey: "shortcuts.group.nav", keys: <Kbd>?</Kbd>, labelKey: "shortcuts.showHelp" },
  { groupKey: "shortcuts.group.nav", keys: <><Kbd>G</Kbd><Kbd>B</Kbd></>, labelKey: "shortcuts.goBlog" },
  { groupKey: "shortcuts.group.nav", keys: <><Kbd>G</Kbd><Kbd>P</Kbd></>, labelKey: "shortcuts.goProjects" },
  { groupKey: "shortcuts.group.nav", keys: <><Kbd>G</Kbd><Kbd>C</Kbd></>, labelKey: "shortcuts.goContact" },
  { groupKey: "shortcuts.group.nav", keys: <><Kbd><ArrowUp /></Kbd><Kbd><ArrowDown /></Kbd></>, labelKey: "shortcuts.scrollSection" },
  { groupKey: "shortcuts.group.overlays", keys: <Kbd>Esc</Kbd>, labelKey: "shortcuts.closeOverlay" },
  { groupKey: "shortcuts.group.overlays", keys: <><Kbd>←</Kbd><Kbd>→</Kbd></>, labelKey: "shortcuts.prevNextItem" },
  { groupKey: "shortcuts.group.appearance", keys: <Kbd>T</Kbd>, labelKey: "shortcuts.toggleTheme" },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center gap-0.5 rounded-md border border-border bg-muted px-1.5 font-mono text-[11px] font-medium text-foreground/80">
      {children}
    </kbd>
  );
}

const GROUPS = ["shortcuts.group.nav", "shortcuts.group.overlays", "shortcuts.group.appearance"] as const;

export function ShortcutsHelp() {
  const [open, setOpen] = React.useState(false);
  const { setOpen: setCmdOpen } = useCommandPalette();
  const { theme, setTheme } = useTheme();
  const t = useT();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable;

      // "?" (Shift+/) toggles
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey && !inField) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      // "T" toggles theme
      if (
        e.key && e.key.toLowerCase() === "t" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !inField
      ) {
        setTheme(theme === "dark" ? "light" : "dark");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [theme, setTheme]);

  // G+key shortcuts (blog/projects/contact)
  React.useEffect(() => {
    let gPressed = false;
    let gTimer: number | undefined;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key.toLowerCase() === "g" && !gPressed) {
        gPressed = true;
        window.clearTimeout(gTimer);
        gTimer = window.setTimeout(() => {
          gPressed = false;
        }, 800);
        return;
      }
      if (gPressed) {
        const id =
          e.key.toLowerCase() === "b" ? "blog" :
          e.key.toLowerCase() === "p" ? "projects" :
          e.key.toLowerCase() === "c" ? "contact" : null;
        if (id) {
          e.preventDefault();
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        gPressed = false;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] flex items-center justify-center px-4"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {t("shortcuts.title")}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label={t("shortcuts.closeHelp")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto p-5 premium-scroll">
              {GROUPS.map((groupKey) => (
                <div key={groupKey} className="mb-5 last:mb-0">
                  <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t(groupKey)}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {SHORTCUTS.filter((s) => s.groupKey === groupKey).map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-4 rounded-lg px-2.5 py-2 hover:bg-muted/40 transition-colors"
                      >
                        <span className="text-sm text-foreground/85">{t(s.labelKey)}</span>
                        <span className="flex items-center gap-1 shrink-0">{s.keys}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-5 py-3">
              <span className="font-mono text-[11px] text-muted-foreground">
                Adama<span className="text-primary">.</span> {t("cmd.brand")}
              </span>
              <button
                onClick={() => {
                  setOpen(false);
                  setCmdOpen(true);
                }}
                className="font-mono text-[11px] text-primary hover:underline"
              >
                {t("shortcuts.openPaletteLink")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
