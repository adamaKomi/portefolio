import type { Locale } from "../provider";
import { en } from "./en";

export interface Messages {
  en: Record<string, unknown>;
  fr: Record<string, unknown>;
}

export type TranslationKey = keyof typeof en;

export type { Locale };
