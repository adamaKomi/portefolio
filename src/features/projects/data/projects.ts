/**
 * Source de vérité pour les projets du portfolio.
 * Trois projets majeurs : PayLith (SaaS), QueueClock (temps réel), Parkour (mobile).
 *
 * Toutes les chaînes traduisibles sont désormais des clés i18n ;
 * les valeurs humaines correspondantes sont dans src/shared/i18n/messages/.
 */

export interface ProjectTimelineItemI18n {
  phaseKey: string;
  period: string;
  detailKey: string;
}

export interface Project {
  slug: string;
  name: string;
  taglineKey: string;
  category: string;
  year: string;
  statusKey: string;
  featured: boolean;
  shortDescriptionKey: string;
  tech: string[];
  highlightKeys: string[];
  architectureKey: string;
  roleKey: string;
  challengeKeys?: string[];
  solutionKeys?: string[];
  timelineI18n?: ProjectTimelineItemI18n[];
  impactKey?: string;
}

export const projects: Project[] = [
  {
    slug: "paylith",
    name: "PayLith",
    taglineKey: "projects.data.paylith.tagline",
    category: "SaaS Platform",
    year: "2024",
    statusKey: "projects.data.paylith.status",
    featured: true,
    shortDescriptionKey: "projects.data.paylith.shortDescription",
    tech: [
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Stripe",
    ],
    highlightKeys: [
      "projects.data.paylith.highlights.0",
      "projects.data.paylith.highlights.1",
      "projects.data.paylith.highlights.2",
      "projects.data.paylith.highlights.3",
      "projects.data.paylith.highlights.4",
    ],
    architectureKey: "projects.data.paylith.architecture",
    roleKey: "projects.data.paylith.role",
    challengeKeys: [
      "projects.data.paylith.challenges.0",
      "projects.data.paylith.challenges.1",
      "projects.data.paylith.challenges.2",
    ],
    solutionKeys: [
      "projects.data.paylith.solutions.0",
      "projects.data.paylith.solutions.1",
      "projects.data.paylith.solutions.2",
    ],
    timelineI18n: [
      {
        phaseKey: "projects.data.paylith.timeline.0.phase",
        period: "Semaine 1-2",
        detailKey: "projects.data.paylith.timeline.0.detail",
      },
      {
        phaseKey: "projects.data.paylith.timeline.1.phase",
        period: "Semaine 3",
        detailKey: "projects.data.paylith.timeline.1.detail",
      },
      {
        phaseKey: "projects.data.paylith.timeline.2.phase",
        period: "Semaine 4-7",
        detailKey: "projects.data.paylith.timeline.2.detail",
      },
      {
        phaseKey: "projects.data.paylith.timeline.3.phase",
        period: "Semaine 8-10",
        detailKey: "projects.data.paylith.timeline.3.detail",
      },
      {
        phaseKey: "projects.data.paylith.timeline.4.phase",
        period: "Semaine 11+",
        detailKey: "projects.data.paylith.timeline.4.detail",
      },
    ],
    impactKey: "projects.data.paylith.impact",
  },
  {
    slug: "queueclock",
    name: "QueueClock",
    taglineKey: "projects.data.queueclock.tagline",
    category: "Real-time System",
    year: "2024",
    statusKey: "projects.data.queueclock.status",
    featured: false,
    shortDescriptionKey: "projects.data.queueclock.shortDescription",
    tech: [
      "NestJS",
      "React Native",
      "WebSockets",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    highlightKeys: [
      "projects.data.queueclock.highlights.0",
      "projects.data.queueclock.highlights.1",
      "projects.data.queueclock.highlights.2",
      "projects.data.queueclock.highlights.3",
      "projects.data.queueclock.highlights.4",
    ],
    architectureKey: "projects.data.queueclock.architecture",
    roleKey: "projects.data.queueclock.role",
    challengeKeys: [
      "projects.data.queueclock.challenges.0",
      "projects.data.queueclock.challenges.1",
      "projects.data.queueclock.challenges.2",
    ],
    solutionKeys: [
      "projects.data.queueclock.solutions.0",
      "projects.data.queueclock.solutions.1",
      "projects.data.queueclock.solutions.2",
    ],
    timelineI18n: [
      {
        phaseKey: "projects.data.queueclock.timeline.0.phase",
        period: "Phase 1",
        detailKey: "projects.data.queueclock.timeline.0.detail",
      },
      {
        phaseKey: "projects.data.queueclock.timeline.1.phase",
        period: "Phase 2",
        detailKey: "projects.data.queueclock.timeline.1.detail",
      },
      {
        phaseKey: "projects.data.queueclock.timeline.2.phase",
        period: "Phase 3",
        detailKey: "projects.data.queueclock.timeline.2.detail",
      },
    ],
    impactKey: "projects.data.queueclock.impact",
  },
  {
    slug: "parkour",
    name: "Parkour",
    taglineKey: "projects.data.parkour.tagline",
    category: "Mobile App",
    year: "2023",
    statusKey: "projects.data.parkour.status",
    featured: false,
    shortDescriptionKey: "projects.data.parkour.shortDescription",
    tech: [
      "React Native",
      "Expo",
      "NestJS",
      "WebSockets",
      "PostgreSQL",
      "Maps",
    ],
    highlightKeys: [
      "projects.data.parkour.highlights.0",
      "projects.data.parkour.highlights.1",
      "projects.data.parkour.highlights.2",
      "projects.data.parkour.highlights.3",
      "projects.data.parkour.highlights.4",
    ],
    architectureKey: "projects.data.parkour.architecture",
    roleKey: "projects.data.parkour.role",
    challengeKeys: [
      "projects.data.parkour.challenges.0",
      "projects.data.parkour.challenges.1",
      "projects.data.parkour.challenges.2",
    ],
    solutionKeys: [
      "projects.data.parkour.solutions.0",
      "projects.data.parkour.solutions.1",
      "projects.data.parkour.solutions.2",
    ],
    timelineI18n: [
      {
        phaseKey: "projects.data.parkour.timeline.0.phase",
        period: "Phase 1",
        detailKey: "projects.data.parkour.timeline.0.detail",
      },
      {
        phaseKey: "projects.data.parkour.timeline.1.phase",
        period: "Phase 2",
        detailKey: "projects.data.parkour.timeline.1.detail",
      },
      {
        phaseKey: "projects.data.parkour.timeline.2.phase",
        period: "Phase 3",
        detailKey: "projects.data.parkour.timeline.2.detail",
      },
    ],
    impactKey: "projects.data.parkour.impact",
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
