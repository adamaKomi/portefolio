import { z } from "zod";
import { fr } from "@/shared/i18n/messages/fr";

/**
 * Zod-based contact form validation schema.
 * Used both client-side (RHF + zodResolver) and server-side (API route).
 *
 * Messages are customizable via `makeContactSchema(messages)` so the client
 * can pass translated messages via `t("contact.err.*")`, while keeping a
 * server-side default (French, matching the site's primary locale).
 */
export interface ContactSchemaMessages {
  nameMin: string;
  nameMax: string;
  email: string;
  messageMin: string;
  messageMax: string;
}

export const defaultContactSchemaMessages: ContactSchemaMessages = {
  nameMin: String(fr["contact.err.name"]),
  nameMax: String(fr["contact.err.nameMax"]),
  email: String(fr["contact.err.email"]),
  messageMin: String(fr["contact.err.message"]),
  messageMax: String(fr["contact.err.messageMax"]),
};

/**
 * Construit un schéma Zod avec des messages personnalisés.
 * Permet au client de passer des messages traduits via `t("contact.err.*")`.
 */
export function makeContactSchema(
  messages: ContactSchemaMessages = defaultContactSchemaMessages,
) {
  return z.object({
    name: z.string().min(2, messages.nameMin).max(80, messages.nameMax),
    email: z.string().email(messages.email),
    company: z.string().max(100).optional().or(z.literal("")),
    budget: z.string().max(50).optional().or(z.literal("")),
    message: z
      .string()
      .min(10, messages.messageMin)
      .max(2000, messages.messageMax),
  });
}

export const contactSchema = makeContactSchema(defaultContactSchemaMessages);

export type ContactFormValues = z.infer<typeof contactSchema>;

export const budgetOptions = [
  { value: "< 5k€", labelKey: "contact.budget.lt5k" },
  { value: "5k — 15k€", labelKey: "contact.budget.5k15k" },
  { value: "15k — 30k€", labelKey: "contact.budget.15k30k" },
  { value: "30k€+", labelKey: "contact.budget.30kPlus" },
  { value: "CDI / Recrutement", labelKey: "contact.budget.cdi" },
  { value: "Autre", labelKey: "contact.budget.other" },
] as const;
