/**
 * Source de vérité pour les projets du portfolio.
 * Trois projets majeurs : PayLith (SaaS), QueueClock (temps réel), Parkour (mobile).
 */

export interface ProjectMetric {
  /** Libellé court, ex. "Factures générées". */
  label: string;
  /** Valeur mise en avant, ex. "1 200+". */
  value: string;
  /** Précision contextuelle optionnelle, ex. "depuis le lancement". */
  hint?: string;
}

export interface ProjectTimelineItem {
  /** Nom de la phase, ex. "Analyse & conception". */
  phase: string;
  /** Période lisible, ex. "Semaine 1-2". */
  period: string;
  /** Description de ce qui s'est passé pendant cette phase. */
  detail: string;
}

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
  /** KPIs / métriques produit — transforme le projet en case study. */
  metrics?: ProjectMetric[];
  /** Problèmes complexes rencontrés (côté métier ou technique). */
  challenges?: string[];
  /** Décisions d'ingénierie qui répondent aux challenges. */
  solutions?: string[];
  /** Chronologie des phases de construction du projet. */
  timeline?: ProjectTimelineItem[];
  /** Conclusion narrative : ce que le projet démontre. */
  impact?: string;
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
    metrics: [
      { label: "Factures générées", value: "1 200+", hint: "sur 6 mois" },
      { label: "Taux de paiement", value: "94%", hint: "à 30 jours" },
      { label: "Temps gagné", value: "8h/sem", hint: "vs. Excel" },
      { label: "Clients actifs", value: "47", hint: "freelances & TPE" },
    ],
    challenges: [
      "Modéliser un métier fiscal complexe (TVA, acomptes, avoirs) sans coupler le code aux spécificités locales.",
      "Gérer la concurrence sur la numérotation des factures (multi-tenant, plusieurs utilisateurs simultanés).",
      "Offrir une expérience de tableau de bord rapide sur des volumes de factures qui croissent.",
    ],
    solutions: [
      "Domain-Driven Design : un agrégat `Facture` encapsule les règles d'invariants (numérotation, statuts, totaux).",
      "CQRS : séparation des écritures (création de facture) et des lectures (dashboards, exports) via des projections dédiées.",
      "Projections matérialisées en Redis pour les compteurs temps réel et les KPIs du dashboard.",
    ],
    timeline: [
      {
        phase: "Discovery & modelling",
        period: "Semaine 1-2",
        detail:
          "Entretiens utilisateurs, ubiquitous language, conception des agrégats et bounded contexts.",
      },
      {
        phase: "Architecture",
        period: "Semaine 3",
        detail:
          "Clean Architecture en couches, ports & adaptateurs, choix CQRS + Event Sourcing léger.",
      },
      {
        phase: "Core backend",
        period: "Semaine 4-7",
        detail:
          "Spring Boot, agrégats, projections, auth JWT, multi-tenant.",
      },
      {
        phase: "Frontend",
        period: "Semaine 8-10",
        detail:
          "Next.js Server Components, dashboards temps réel, exports PDF.",
      },
      {
        phase: "Production",
        period: "Semaine 11+",
        detail:
          "Docker, CI/CD, observabilité, déploiement progressif.",
      },
    ],
    impact:
      "PayLith est devenu un produit utilisable en production par des freelances réels. Il démontre qu'une architecture propre n'est pas un coût : chaque nouvelle fonctionnalité (avoirs, relances, exports) s'ajoute sans fragiliser l'existant.",
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
    metrics: [
      { label: "Latence temps réel", value: "< 80ms", hint: "p95" },
      { label: "Files gérées", value: "50+", hint: "simultanées" },
      { label: "Clients sync", value: "2 000", hint: "par instance" },
      { label: "Instances", value: "3", hint: "scaling horizontal" },
    ],
    challenges: [
      "Synchroniser en temps réel des milliers de clients sans saturer le backend.",
      "Garantir la cohérence des compteurs de file avec plusieurs instances backend.",
      "Notifier un mobile en arrière-plan sans vider la batterie.",
    ],
    solutions: [
      "Redis pub/sub comme bus d'événements entre instances backend (fan-out décentralisé).",
      "Compteurs atomiques Redis (INCR) pour la concurrence sur les files.",
      "WebSockets côté client + notifications push push-side, relayées par le gateway NestJS.",
    ],
    timeline: [
      {
        phase: "Architecture distribuée",
        period: "Phase 1",
        detail:
          "Choix Redis pub/sub, design du gateway NestJS, protocole WebSocket.",
      },
      {
        phase: "Backend temps réel",
        period: "Phase 2",
        detail:
          "Gateway, gestionnaire de files, adaptateurs Redis, tests de charge.",
      },
      {
        phase: "Mobile",
        period: "Phase 3",
        detail:
          "App React Native, notifications push, synchronisation offline.",
      },
    ],
    impact:
      "QueueClock prouve la capacité à concevoir un système distribué cohérent, où la synchronisation temps réel n'est pas un accident mais le fruit d'une architecture pensée pour scaler.",
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
    metrics: [
      { label: "Précision GPS", value: "±3m", hint: "en extérieur" },
      { label: "Sessions suivies", value: "500+", hint: "tests" },
      { label: "Défis", value: "12", hint: "badges & XP" },
      { label: "Batterie", value: "< 4%/h", hint: "suivi actif" },
    ],
    challenges: [
      "Capturer le GPS en arrière-plan sans drainer la batterie.",
      "Reprendre une session après perte de signal GPS (tunnels, bâtiments).",
      "Rendre la gamification engageante sans alourdir l'expérience de course.",
    ],
    solutions: [
      "Background task Expo avec geofencing et échantillonnage adaptatif (fréquence réduite au repos).",
      "Lissage des tracés (Kalman léger) et détection des gaps pour reconnexion intelligente.",
      "Domaine gamification isolé (agrégat `ParkourSession`) — les badges sont des règles pures, testables.",
    ],
    timeline: [
      {
        phase: "R&D GPS",
        period: "Phase 1",
        detail:
          "Prototypage suivi arrière-plan, mesure batterie, précision.",
      },
      {
        phase: "Domaine gamification",
        period: "Phase 2",
        detail:
          "Modélisation DDD : sessions, défis, badges, XP.",
      },
      {
        phase: "Backend & live",
        period: "Phase 3",
        detail:
          "NestJS, WebSockets classements, notifications progression.",
      },
    ],
    impact:
      "Parkour illustre la maîtrise du mobile couplé à un backend temps réel — un terrain où chaque décision technique (batterie, précision, UX) a un impact direct sur l'utilisateur.",
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
