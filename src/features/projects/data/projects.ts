import type { TranslationKey } from "@/shared/i18n";

/**
 * Projets du portfolio, repris du CV.
 * Les textes sont des clés i18n (src/shared/i18n/messages/).
 */

export interface ProjectWorkItem {
  titleKey: TranslationKey;
  textKey: TranslationKey;
}

export interface Project {
  slug: string;
  name: string;
  period: string;
  taglineKey: TranslationKey;
  contextKey: TranslationKey;
  summaryKey: TranslationKey;
  tech: string[];
  work: ProjectWorkItem[];
}

export const projects: Project[] = [
  {
    slug: "editalis",
    name: "Editalis",
    period: "2026",
    taglineKey: "projects.editalis.tagline",
    contextKey: "projects.editalis.context",
    summaryKey: "projects.editalis.summary",
    tech: ["FastAPI", "Celery", "Redis", "Qdrant", "React", "TypeScript"],
    work: [
      { titleKey: "projects.editalis.work.0.title", textKey: "projects.editalis.work.0.text" },
      { titleKey: "projects.editalis.work.1.title", textKey: "projects.editalis.work.1.text" },
      { titleKey: "projects.editalis.work.2.title", textKey: "projects.editalis.work.2.text" },
      { titleKey: "projects.editalis.work.3.title", textKey: "projects.editalis.work.3.text" },
    ],
  },
  {
    slug: "parkour",
    name: "Parkour",
    period: "2025 – 2026",
    taglineKey: "projects.parkour.tagline",
    contextKey: "projects.parkour.context",
    summaryKey: "projects.parkour.summary",
    tech: ["React Native", "Expo", "NestJS", "PostgreSQL", "WebSockets", "Redux Toolkit"],
    work: [
      { titleKey: "projects.parkour.work.0.title", textKey: "projects.parkour.work.0.text" },
      { titleKey: "projects.parkour.work.1.title", textKey: "projects.parkour.work.1.text" },
      { titleKey: "projects.parkour.work.2.title", textKey: "projects.parkour.work.2.text" },
      { titleKey: "projects.parkour.work.3.title", textKey: "projects.parkour.work.3.text" },
    ],
  },
  {
    slug: "queueclock",
    name: "QueueClock",
    period: "2024 – 2025",
    taglineKey: "projects.queueclock.tagline",
    contextKey: "projects.queueclock.context",
    summaryKey: "projects.queueclock.summary",
    tech: ["NestJS", "Prisma", "PostgreSQL", "Socket.io", "BullMQ", "React Native"],
    work: [
      { titleKey: "projects.queueclock.work.0.title", textKey: "projects.queueclock.work.0.text" },
      { titleKey: "projects.queueclock.work.1.title", textKey: "projects.queueclock.work.1.text" },
      { titleKey: "projects.queueclock.work.2.title", textKey: "projects.queueclock.work.2.text" },
      { titleKey: "projects.queueclock.work.3.title", textKey: "projects.queueclock.work.3.text" },
    ],
  },
];

export function isProjectSlug(slug: string): boolean {
  return projects.some((p) => p.slug === slug);
}
