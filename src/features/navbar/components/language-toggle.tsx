"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/shared/i18n";
import { cn } from "@/lib/utils";

/**
 * Language toggle — switches between EN and FR.
 * Compact pill showing the two locale codes; the active one is highlighted.
 */
export function LanguageToggle() {
  const { locale, setLocale, is } = useLanguage();

  return (
    <div className="flex items-center rounded-lg border border-border bg-card/40 p-0.5 h-9">
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={is("en")}
        aria-label="English"
        className={cn(
          "flex h-7 items-center rounded-md px-2 font-mono text-[11px] font-medium transition-colors",
          is("en")
            ? "bg-primary/15 text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("fr")}
        aria-pressed={is("fr")}
        aria-label="Français"
        className={cn(
          "flex h-7 items-center rounded-md px-2 font-mono text-[11px] font-medium transition-colors",
          is("fr")
            ? "bg-primary/15 text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        FR
      </button>
    </div>
  );
}
