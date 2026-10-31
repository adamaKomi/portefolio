"use client";

import { Container, SectionHead } from "@/shared/ui";
import { useT, type TranslationKey } from "@/shared/i18n";

/** Sélection resserrée des compétences du CV, composée comme du texte. */
const skills: { labelKey: TranslationKey; items: string }[] = [
  { labelKey: "skills.backend", items: "Node.js (NestJS, Express), Python (FastAPI), Java (Spring Boot)" },
  { labelKey: "skills.frontend", items: "React, TypeScript, Tailwind CSS" },
  { labelKey: "skills.mobile", items: "React Native, Expo" },
  { labelKey: "skills.data", items: "PostgreSQL, MongoDB, Redis, Qdrant" },
  { labelKey: "skills.async", items: "Socket.io, BullMQ, Celery" },
  { labelKey: "skills.architecture", items: "Clean Architecture, Hexagonal Architecture, DDD" },
  { labelKey: "skills.devops", items: "Docker, GitHub Actions, Jest, Pytest" },
];

export function Expertise() {
  const t = useT();

  return (
    <section id="skills" data-section-id="skills">
      <Container className="py-section">
        <SectionHead label={t("skills.title")} />
        <div className="mt-12 gap-16 md:mt-16 md:columns-2 lg:gap-24">
          {skills.map((row) => (
            <div key={row.labelKey} className="mb-12 break-inside-avoid md:mb-14">
              <p className="label-caps text-primary">{t(row.labelKey)}</p>
              <p className="mt-3 font-display text-statement">{row.items}.</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
