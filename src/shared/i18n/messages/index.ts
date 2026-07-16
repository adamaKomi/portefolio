/**
 * Central message aggregation.
 *
 * Imports the unified `en.ts` and `fr.ts` dictionaries and aggregates them
 * into a single object consumed by the translation system.
 */

import { en } from "./en";
import { fr } from "./fr";
import type { Locale } from "../provider";

export const messages: Record<Locale, Record<string, unknown>> = {
  en,
  fr,
};
