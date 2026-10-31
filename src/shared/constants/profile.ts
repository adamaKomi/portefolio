/**
 * Profil central d'Adama Komi.
 * Source unique de vérité partagée entre toutes les features.
 * L'email vient de l'environnement serveur : il est passé en props depuis page.tsx.
 */

export const profile = {
  name: "Adama Komi",
  firstName: "Adama",
  lastName: "Komi",
} as const;

export const socials = [
  { name: "GitHub", href: "https://github.com/adamaKomi" },
  { name: "LinkedIn", href: "https://linkedin.com/in/adama-komi" },
] as const;

export const resumeUrls = {
  fr: "/CV_Adama_Komi_French.pdf",
  en: "/CV_Adama_Komi_English.pdf",
} as const;

export const navSections = [
  { id: "about", labelKey: "nav.about" },
  { id: "projects", labelKey: "nav.projects" },
  { id: "journey", labelKey: "nav.journey" },
  { id: "blog", labelKey: "nav.blog" },
  { id: "contact", labelKey: "nav.contact" },
] as const;
