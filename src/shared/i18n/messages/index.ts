/**
 * Central message aggregation.
 *
 * Each feature owns its translations in `src/features/<name>/i18n.ts`,
 * exporting `{ en: {...}, fr: {...} }`. This file imports and merges them
 * into a single dictionary consumed by <LanguageProvider>.
 *
 * To add a new feature's translations:
 *   1. Create `src/features/<name>/i18n.ts` with `export const messages = { en: {...}, fr: {...} }`
 *   2. Import it here and add to the `features` array.
 */

import { messages as commonMessages } from "./common";
import { messages as navMessages } from "@/features/navbar/i18n";
import { messages as heroMessages } from "@/features/hero/i18n";
import { messages as aboutMessages } from "@/features/about/i18n";
import { messages as philosophyMessages } from "@/features/philosophy/i18n";
import { messages as expertiseMessages } from "@/features/expertise/i18n";
import { messages as projectsMessages } from "@/features/projects/i18n";
import { messages as journeyMessages } from "@/features/journey/i18n";
import { messages as testimonialsMessages } from "@/features/testimonials/i18n";
import { messages as usesMessages } from "@/features/uses/i18n";
import { messages as blogMessages } from "@/features/blog/i18n";
import { messages as contactMessages } from "@/features/contact/i18n";
import { messages as footerMessages } from "@/features/footer/i18n";
import type { Locale } from "../provider";

const featureMessages = [
  commonMessages,
  navMessages,
  heroMessages,
  aboutMessages,
  philosophyMessages,
  expertiseMessages,
  projectsMessages,
  journeyMessages,
  testimonialsMessages,
  usesMessages,
  blogMessages,
  contactMessages,
  footerMessages,
];

function merge(locale: Locale): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  for (const feature of featureMessages) {
    const dict = feature[locale];
    for (const [key, value] of Object.entries(dict)) {
      merged[key] = value;
    }
  }
  return merged;
}

export const messages: Record<Locale, Record<string, unknown>> = {
  en: merge("en"),
  fr: merge("fr"),
};
