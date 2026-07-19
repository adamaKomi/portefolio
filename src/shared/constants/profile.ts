import { env } from "@/config/env";

/**
 * Profil central d'Adama Komi.
 * Source unique de vérité partagée entre toutes les features.
 */

export const profile = {
  name: "Adama Komi",
  firstName: "Adama",
  lastName: "Komi",
  title: "Software Engineer",
  subtitle: "Full-Stack Developer",
  tagline: "Je conçois et déploie des applications complètes — de l'analyse métier à la production.",
  description:
    "Ingénieur logiciel diplômé en Génie Logiciel de la FSTM (Université Hassan II de Casablanca). Je construis des systèmes distribués, des applications temps réel et des plateformes SaaS robustes, avec une obsession : l'architecture propre et la maintenabilité.",
  timezone: "Africa/Casablanca",
  available: true,

  email: env.contactEmailTo,
  resumeUrl: env.resumeUrl,
} as const;

export const socials = [
  { name: "GitHub", href: "https://github.com/adamaKomi", handle: "@adamaKomi", icon: "github" },
  { name: "LinkedIn", href: "https://linkedin.com/in/adama-komi", handle: "in/adama-komi", icon: "linkedin" },
  { name: "Email", href: `mailto:${env.contactEmailTo || "#"}`, handle: env.contactEmailTo || "", icon: "mail" },
] as const;

export const navSections = [
  { id: "about", label: "À propos", labelKey: "nav.about" },
  { id: "expertise", label: "Expertise", labelKey: "nav.expertise" },
  { id: "projects", label: "Projets", labelKey: "nav.projects" },
  { id: "journey", label: "Parcours", labelKey: "nav.journey" },
  { id: "contact", label: "Contact", labelKey: "nav.contact" },
] as const;

/**
 * Sections affichées dans le rail latéral (indicateur de progression vertical).
 * Structure consolidée (10 sections — Skills+Technologies fusionnés en Expertise,
 * Experience+Education fusionnés en Journey, WhatImLookingFor fusionné dans Contact).
 */
export const railSections = [
  { id: "hero", label: "Hero", index: "01", labelKey: "common.rail.hero" },
  { id: "about", label: "À propos", index: "02", labelKey: "common.rail.about" },
  { id: "philosophy", label: "Philosophie", index: "03", labelKey: "common.rail.philosophy" },
  { id: "expertise", label: "Expertise", index: "04", labelKey: "common.rail.expertise" },
  { id: "projects", label: "Projets", index: "05", labelKey: "common.rail.projects" },
  { id: "journey", label: "Parcours", index: "06", labelKey: "common.rail.journey" },
  // { id: "testimonials", label: "Recommandations", index: "07", labelKey: "common.rail.testimonials" },
  { id: "uses", label: "Uses", index: "07", labelKey: "common.rail.uses" },
  { id: "blog", label: "Blog", index: "08", labelKey: "common.rail.blog" },
  { id: "contact", label: "Contact", index: "09", labelKey: "common.rail.contact" },
] as const;
