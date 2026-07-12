/**
 * Source de vérité pour les projets du portfolio.
 * Trois projets majeurs : PayLith (SaaS), QueueClock (temps réel), Parkour (mobile).
 */

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  status: string;
  featured: boolean;
  shortDescription: string;
  tech: string[];
  highlights: string[];
  architecture: string;
  role: string;
}

export const projects: Project[] = [
  {
    slug: "paylith",
    name: "PayLith",
    tagline: "La facturation moderne pour freelances et TPE.",
    category: "SaaS Platform",
    year: "2024",
    status: "Projet principal",
    featured: true,
    shortDescription:
      "Plateforme moderne de facturation destinée aux freelances, indépendants et petites entreprises. Conçue comme un produit SaaS complet, de la gestion des clients au suivi des paiements.",
    tech: [
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Stripe",
    ],
    highlights: [
      "Gestion complète des clients, devis et factures",
      "Suivi des paiements et relances automatisées",
      "Tableau de bord analytics en temps réel",
      "Architecture Clean Architecture + DDD",
      "Multi-tenant, sécurisé, scalable",
    ],
    architecture:
      "Clean Architecture avec séparation stricte des couches. Domain-Driven Design pour modéliser le métier de la facturation. CQRS pour séparer lectures (dashboards, listing) et écritures (création de factures). API Spring Boot sécurisée par JWT, frontend Next.js avec Server Components pour le SEO et les performances.",
    role: "Conception, architecture, développement full-stack, déploiement.",
  },
  {
    slug: "queueclock",
    name: "QueueClock",
    tagline: "Files d'attente virtuelles, synchronisées en temps réel.",
    category: "Real-time System",
    year: "2024",
    status: "Système distribué",
    featured: false,
    shortDescription:
      "Application web et mobile de gestion de files d'attente virtuelles en temps réel. Pensée pour les commerces, administrations et événements qui veulent fluidifier l'attente physique.",
    tech: [
      "NestJS",
      "React Native",
      "WebSockets",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    highlights: [
      "Synchronisation temps réel via WebSockets",
      "Gestion de la concurrence avec Redis",
      "Application mobile React Native (Expo)",
      "Architecture distribuée, scalable horizontalement",
      "Notifications push aux clients",
    ],
    architecture:
      "Backend NestJS avec WebSockets (Socket.io) pour la diffusion temps réel. Redis comme store de concurrence pour les compteurs de file et la pub/sub. Architecture distribuée : plusieurs instances du backend synchronisées via Redis. Frontend web React, application mobile React Native avec notifications push.",
    role: "Architecture du système temps réel, backend NestJS, application mobile.",
  },
  {
    slug: "parkour",
    name: "Parkour",
    tagline: "Suivi GPS et gamification pour la course à pied.",
    category: "Mobile App",
    year: "2023",
    status: "Application mobile",
    featured: false,
    shortDescription:
      "Application mobile de suivi GPS et de gamification. Transforme la course en expérience engageante avec défis, badges et classements.",
    tech: [
      "React Native",
      "Expo",
      "NestJS",
      "WebSockets",
      "PostgreSQL",
      "Maps",
    ],
    highlights: [
      "Suivi GPS en arrière-plan, même écran éteint",
      "Cartographie interactive temps réel",
      "Système de gamification : défis, badges, XP",
      "Classements live via WebSockets",
      "Notifications push de progression",
    ],
    architecture:
      "Application React Native (Expo) avec suivi GPS en arrière-plan via task background. Backend NestJS exposant REST + WebSockets. Cartographie interactive. Synchronisation temps réel des classements. Système de gamification modélisé en DDD.",
    role: "Développement mobile React Native, backend NestJS, gamification.",
  },
];

/** Récupère un projet par son slug. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Slug du projet suivant (boucle à la fin). */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}

/** Slug du projet précédent (boucle au début). */
export function getPrevProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[projects.length - 1];
  return projects[(i - 1 + projects.length) % projects.length];
}
