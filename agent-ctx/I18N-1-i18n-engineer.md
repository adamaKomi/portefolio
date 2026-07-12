# Task ID: I18N-1 — Wire About, Philosophy, Footer to i18n system

- **Agent**: i18n-engineer
- **Scope**: Remplacer les chaînes françaises codées en dur dans 3 features (About, Philosophy, Footer) par des appels `t("key")` basés sur le système i18n EN/FR existant (`useT` de `@/shared/i18n`).

## Task
Brancher 3 features existantes sur le nouveau système i18n (EN/FR). Chaque feature a son fichier `i18n.ts` avec les clés de traduction déjà définies. Remplacer les chaînes françaises codées en dur par des appels `t("key")` dans les composants — sans toucher au styling, à la layout ou aux fichiers `i18n.ts`.

## Work Log

### Pré-requis
- Lecture du `worklog.md` du projet pour comprendre l'historique (design system dark-first, accent émeraude, feature-based architecture).
- Lecture de chaque `i18n.ts` pour connaître les clés exactes :
  - `src/features/about/i18n.ts` : 22 clés (`about.eyebrow`, `about.title`, `about.description`, `about.p1`/`p2`/`p3`, `about.traitsLabel`, `about.trait1-4`, `about.statsLabel`, `about.stat1-4Value`/`Label`/`Sub`).
  - `src/features/philosophy/i18n.ts` : 11 clés (`philosophy.eyebrow`, `title`, `description`, `coreLabel`, `p1-4Title`/`Desc`).
  - `src/features/footer/i18n.ts` : 5 clés (`footer.tagline`, `navTitle`, `contactTitle`, `copyright`, `available`).
- Lecture de `src/shared/i18n/provider.tsx` : la fonction `t` accepte une `string` (pas un type littéral), donc on peut utiliser des template literals (`t(\`about.stat${idx + 1}Value\`)`).
- Lecture de `src/shared/constants/profile.ts` : `navSections` possède bien la propriété `labelKey` attendue par le brief.

### 1. `src/features/about/components/about.tsx`
- Import ajouté : `import { useT } from "@/shared/i18n";`
- `const t = useT();` en haut du corps de `About()`.
- `SectionHeading` : `eyebrow={t("about.eyebrow")}`, `title={t("about.title")}`, `description={t("about.description")}`.
- 3 paragraphes narratifs (`<p>`) : remplacés par `{t("about.p1")}`, `{t("about.p2")}`, `{t("about.p3")}` (les `<span>` d'emphase inline ont été retirés car le dictionnaire i18n ne contient que du texte brut — conforme au brief qui demande explicitement de remplacer p1/p2/p3).
- Const `traits` : labels français remplacés par les clés i18n (`about.trait1` … `about.trait4`). Dans la map : `{t(label)}` au lieu de `{label}`. Le `key={label}` reste stable (clé i18n = identifiant unique).
- Mono label `// traits` → `{t("about.traitsLabel")}`.
- Mono label `// stats` → `{t("about.statsLabel")}`.
- Stats : `stats.map((_, idx) => ...)` — itère sur l'array `stats` (qui reste importé depuis `profile.ts`, juste pour le compteur). Pour chaque item, appels `t(\`about.stat${idx + 1}Value\`)`, `t(\`about.stat${idx + 1}Label\`)`, `t(\`about.stat${idx + 1}Sub\`)`. `key={idx}` (stable, array statique).
- Profil card : `profile.name`, `profile.title`, `profile.subtitle`, `profile.location`, `profile.availabilityLabel` laissés tels quels (données universelles). `aria-label="Monogramme AK"` laissé tel quel (hors scope du brief).

### 2. `src/features/philosophy/components/philosophy.tsx`
- Import ajouté : `import { useT } from "@/shared/i18n";`
- `const t = useT();` en haut du corps de `Philosophy()` ET dans `PrincipleCard` (composant enfant qui en a besoin).
- Const `principles` : `title` et `description` désormais des clés i18n (`philosophy.p1Title`, `philosophy.p1Desc`, etc.). L'interface `Principle` est inchangée (mêmes noms de champs `title`/`description`, juste sémantiquement des clés maintenant).
- `SectionHeading` : `eyebrow={t("philosophy.eyebrow")}`, `title={t("philosophy.title")}`, `description={t("philosophy.description")}`.
- Mono label du header de carte : `featured ? t("philosophy.coreLabel") : \`// principle ${...}\``. Le cas non-featured (`// principle 01`) reste en dur car aucune clé i18n n'existe pour lui.
- `<h3>{title}</h3>` → `<h3>{t(title)}</h3>`.
- `<p>{description}</p>` → `<p>{t(description)}</p>`.
- Strings non couvertes par i18n laissées en français : `fondation de toute conception` (footer accent du principle featured) — aucune clé dans `philosophy/i18n.ts`.

### 3. `src/features/footer/components/footer.tsx`
- Import ajouté : `import { useT } from "@/shared/i18n";`
- `const t = useT();` en haut du corps de `Footer()`.
- Tagline : tout le `<p>` remplacé par `{t("footer.tagline")}` — la version i18n inclut déjà le préfixe "Software Engineer · Full-Stack Developer." donc on retire les `{profile.title} · {profile.subtitle}` qui étaient en dur.
- Colonne Navigation : `Navigation` → `{t("footer.navTitle")}`. Liens : `{item.label}` → `{t(item.labelKey)}` (utilise la propriété `labelKey` déjà présente sur chaque entrée de `navSections`).
- Colonne Contact : `Contact` → `{t("footer.contactTitle")}`. Email et location laissés tels quels (universels). `profile.availabilityLabel` → `{t("footer.available")}`.
- Bottom bar : `Conçu & développé avec Next.js, TypeScript & Framer Motion.` → `{t("footer.copyright")}` (le `© {year} {profile.name}.` reste devant).
- Strings non couvertes laissées en français : `aria-label="Remonter en haut"` et le `Intl.DateTimeFormat("fr-FR", …)` (hors scope du brief).

### Vérifications
- `bun run lint` → passe sans erreur ni warning.
- Dev server (`bun run dev`, automatique) → compile et sert `/` en 200 OK, aucun runtime error visible dans `dev.log`.
- Aucun changement de styling, layout ou structure JSX (uniquement le contenu textuel devient dynamique via `t()`).
- Aucun fichier `i18n.ts` modifié (conforme à la règle).

## Stage Summary
- 3 features (About, Philosophy, Footer) entièrement branchées sur le système i18n EN/FR via `useT()`.
- ~30 chaînes françaises remplacées par des appels `t("key")`.
- Données universelles (profile.name, profile.email, profile.location, profile.title, profile.subtitle) conservées telles quelles.
- Aucune clé i18n manquante : toutes les clés référencées existent dans les `i18n.ts` respectifs.
- Lint OK, dev server OK, prêt pour QA visuelle EN/FR.
