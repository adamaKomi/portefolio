"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/shared/i18n";

/** Affiche la langue vers laquelle basculer. */
export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  const next = locale === "fr" ? "en" : "fr";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(next)}
      aria-label={t("nav.langSwitch")}
      className="label-caps opacity-70 hover:opacity-100"
    >
      {next}
    </Button>
  );
}
