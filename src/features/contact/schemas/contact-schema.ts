import { z } from "zod";

/**
 * Schéma de validation du formulaire de contact.
 * Utilisé à la fois côté client (RHF + zodResolver) et côté serveur (API route).
 *
 * Zod v4 — `z.string().email()` reste supporté, on garde une API stable.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(80, "Le nom est trop long (80 caractères max)"),
  email: z.string().email("Email invalide"),
  company: z.string().max(100).optional().or(z.literal("")),
  budget: z.string().max(50).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000, "Le message est trop long (2000 caractères max)"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

/**
 * Options du select "budget" — exposées pour réutilisation
 * entre le formulaire et d'éventuels tests / analytics.
 */
export const budgetOptions: { value: string; label: string }[] = [
  { value: "< 5k€", label: "< 5k€" },
  { value: "5k — 15k€", label: "5k — 15k€" },
  { value: "15k — 30k€", label: "15k — 30k€" },
  { value: "30k€+", label: "30k€+" },
  { value: "CDI / Recrutement", label: "CDI / Recrutement" },
  { value: "Autre", label: "Autre" },
];
