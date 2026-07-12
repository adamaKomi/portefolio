import { z } from "zod";

/**
 * Schéma de validation du formulaire de contact.
 * Utilisé à la fois côté client (RHF + zodResolver) et côté serveur (API route).
 *
 * Zod v4 — `z.string().email()` reste supporté, on garde une API stable.
 *
 * Les messages sont paramétrables via `makeContactSchema(messages)` afin que
 * le client puisse fournir des messages traduits (i18n) tout en gardant un
 * schéma serveur par défaut (français) pour l'API route.
 */
export interface ContactSchemaMessages {
  nameMin: string;
  nameMax: string;
  email: string;
  messageMin: string;
  messageMax: string;
}

/** Messages par défaut (français) — utilisés côté serveur (API route). */
export const defaultContactSchemaMessages: ContactSchemaMessages = {
  nameMin: "Le nom doit contenir au moins 2 caractères",
  nameMax: "Le nom est trop long (80 caractères max)",
  email: "Email invalide",
  messageMin: "Le message doit contenir au moins 10 caractères",
  messageMax: "Le message est trop long (2000 caractères max)",
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

/** Schéma par défaut (messages français) — source de vérité côté serveur. */
export const contactSchema = makeContactSchema(defaultContactSchemaMessages);

export type ContactFormValues = z.infer<typeof contactSchema>;

/**
 * Options du select "budget" — exposées pour réutilisation
 * entre le formulaire et d'éventuels tests / analytics.
 *
 * Les valeurs (stockées) sont volontairement universelles ("5k — 15k€"…).
 * Les labels affichés sont identiques aux valeurs : ils restent semi-universels
 * (montants en €), donc non traduits. Le composant peut toutefois surcharger
 * l'affichage en mappant les valeurs vers des clés i18n si besoin.
 */
export const budgetOptions: { value: string; label: string }[] = [
  { value: "< 5k€", label: "< 5k€" },
  { value: "5k — 15k€", label: "5k — 15k€" },
  { value: "15k — 30k€", label: "15k — 30k€" },
  { value: "30k€+", label: "30k€+" },
  { value: "CDI / Recrutement", label: "CDI / Recrutement" },
  { value: "Autre", label: "Autre" },
];
