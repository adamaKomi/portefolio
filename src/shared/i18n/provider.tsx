"use client";

import * as React from "react";

export type Locale = "en" | "fr";

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  /** Returns true if current locale matches — useful for conditional content */
  is: (locale: Locale) => boolean;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio-locale";

/**
 * Detects the initial locale:
 * 1. localStorage (user's previous choice)
 * 2. navigator.language (browser preference)
 * 3. fallback "fr" (portfolio is French-first per the owner's profile)
 */
function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "fr";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr") return stored;
  } catch {
    /* ignore */
  }
  const nav = navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("en")) return "en";
  return "fr";
}

interface LanguageProviderProps {
  children: React.ReactNode;
  /** Aggregated messages — see src/shared/i18n/messages.ts */
  messages: Record<Locale, Record<string, unknown>>;
}

export function LanguageProvider({ children, messages }: LanguageProviderProps) {
  // Start with "fr" on SSR to match the default; sync on mount.
  const [locale, setLocaleState] = React.useState<Locale>("fr");

  React.useEffect(() => {
    const detected = detectInitialLocale();
    setLocaleState(detected);
  }, []);

  const setLocale = React.useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const dict = messages[locale] as Record<string, unknown>;
      // Flat key lookup first (messages stored as "nav.about" → "À propos")
      const flat = dict[key];
      const value = typeof flat === "string" ? flat : resolveKey(dict, key);
      if (typeof value !== "string") return key;
      if (!params) return value;
      return interpolate(value, params);
    },
    [locale, messages]
  );

  const is = React.useCallback((l: Locale) => l === locale, [locale]);

  const value = React.useMemo(
    () => ({ locale, setLocale, t, is }),
    [locale, setLocale, t, is]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Resolve a dot-notation key ("hero.title") against a nested object. */
function resolveKey(obj: Record<string, unknown>, key: string): unknown {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as object)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

/** Replace {name} placeholders in a string with param values. */
function interpolate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    name in params ? String(params[name]) : `{${name}}`
  );
}

export function useLanguage() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

/** Convenience hook — returns just the `t` function. */
export function useT() {
  return useLanguage().t;
}
