# Task I18N-2 — i18n integration for Projects feature

## Agent
i18n-engineer

## Task
Brancher la feature Projects sur le système i18n EN/FR — remplacer les chaînes FR en dur par des appels `t("key")` dans 3 fichiers :
1. `src/features/projects/components/projects-section.tsx`
2. `src/features/projects/components/project-card.tsx`
3. `src/features/projects/components/project-detail-overlay.tsx`

## Contexte consulté
- `/home/z/my-project/worklog.md` (historique : design system, features, i18n testimonials/uses déjà migrés)
- `/agent-ctx/A2-full-stack-developer.md` et `/agent-ctx/B-full-stack-developer.md` (work records précédents)
- `src/features/projects/i18n.ts` (clés disponibles)
- `src/shared/i18n/provider.tsx` (mécanique `useT` + interpolation `{name}`)

## Fichiers précédents consultables
Les agents suivants peuvent consulter :
- `/agent-ctx/A2-full-stack-developer.md`
- `/agent-ctx/B-full-stack-developer.md`
- Le présent fichier `/agent-ctx/I18N-2-i18n-engineer.md`

## Résumé des modifications

### projects-section.tsx
- Import `useT` depuis `@/shared/i18n` + `const t = useT();` en tête de `Projects()`.
- 5 chaînes migrées : eyebrow, title, description, stripLabel, hint.

### project-card.tsx
- Import `useT` + `const t = useT();`.
- Renommage `visibleTech.map((t) =>` → `(tech)` (anti-shadow).
- 3 chaînes migrées : badge `Featured`, CTA `Voir le projet`, aria-label `Ouvrir le projet {name}` → `${t("projects.viewProject")} ${project.name}`.

### project-detail-overlay.tsx
- Import `useT` + `const t = useT();` dans 6 composants (`ProjectDetailOverlay`, `MetricsSection`, `ChallengesSolutionsSection`, `TimelineSection`, `ImpactSection`, `OverlayContent`).
- Renommage `const t = window.setTimeout(...)` → `focusTimer` (anti-shadow dans `ProjectDetailOverlay`).
- Renommage `project.tech.map((t) =>` → `(tech)` dans `OverlayContent`.
- 14 chaînes UI migrées : 9 section headers, "Défis"/"Solutions", "Voir mes autres projets"/"Me contacter", badge `Featured` (overlay banner), compteur `i / total` avec interpolation `{current}`/`{total}`.

## Décisions notables
- `// fin de l'étude de cas` n'existe pas dans le fichier source → clé `projects.section.end` non utilisée (consigne : pas de changement de structure).
- Données projet (name, tagline, shortDescription, highlights, architecture, role, metrics, challenges, solutions, timeline, impact, tech) préservées en FR — proviennent du data file, ne sont pas du chrome UI.
- Badge `Featured` traduit dans l'overlay pour cohérence (la clé retourne "Featured" dans les 2 locales).
- Commentaires internes et aria-labels section (ex : `aria-label="Métriques produit"`) laissés FR — hors scope, pas de clé i18n correspondante.

## Vérifications
- `bun run lint` → OK (0 erreur, 0 warning).
- `dev.log` → page `/` compile en 6.6s, statut 200.
- Grep sur patterns FR originaux → aucune chaîne listée par la consigne ne subsiste en dur.

## Worklog
Section ajoutée à `/home/z/my-project/worklog.md` sous `Task ID: I18N-2`.
