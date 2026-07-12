# Task ID: A2 — Project Case-Study Depth

- **Agent**: full-stack-developer
- **Scope**: Enrichir la feature Projects avec une profondeur "case study" (métriques/KPIs, défis, solutions, chronologie, impact) pour donner aux 3 projets l'allure d'études de cas produit (qualité Vercel/Linear).

## Task
Étendre le modèle de données `Project` (champs optionnels pour ne pas casser l'existant), ajouter des données riches de case study aux 3 projets (PayLith, QueueClock, Parkour), et enrichir l'overlay `project-detail-overlay.tsx` avec 4 nouvelles sections : Métriques, Défis & Solutions, Chronologie, Impact. L'ordre narratif final doit guider le lecteur du contexte vers l'impact produit.

## Work Log
- Lecture du worklog complet (Tasks 1, 4, 5, 6, 7, 8, FINAL-1, A, B, REVIEW-1) pour aligner les conventions : dark-first, accent émeraude + ambre (no blue/indigo), glass / glass-strong, bg-grid-sm, text-gradient-emerald, premium-scroll, mono labels `// ...`, AnimatePresence + overlayVariants, EASE_PREMIUM.
- Lecture du `agent-ctx/B-full-stack-developer.md` (feature Blog) pour réutiliser le pattern d'overlay (hash routing, sticky header, scroll-lock, focus management, swap prev/next AnimatePresence mode="wait").
- Lecture de l'`experience.tsx` pour répliquer le pattern timeline (vertical gradient line + dots émeraude + ring-background).
- Lecture de `projects-section.tsx` pour le pattern divider gradient `h-px flex-1 bg-gradient-to-r from-border via-border/40 to-transparent`.

### Étape 1 — Extension du modèle `projects.ts`
- Ajout des interfaces `ProjectMetric` (label, value, hint?) et `ProjectTimelineItem` (phase, period, detail), exportées.
- Ajout des champs optionnels à `Project` : `metrics?`, `challenges?`, `solutions?`, `timeline?`, `impact?` (tous optionnels pour préserver la rétro-compatibilité).
- Données case study injectées pour les 3 projets, exactement conformes au brief :
  - **PayLith** (masterpiece, données les plus riches) : 4 metrics (1 200+ factures, 94% paiement, 8h/sem, 47 clients), 3 challenges (TVA/acomptes, concurrence numérotation, perf dashboard), 3 solutions (DDD agrégat Facture, CQRS, projections Redis), 5 phases timeline (Discovery, Architecture, Core backend, Frontend, Production), impact sur l'architecture propre comme investissement.
  - **QueueClock** : 4 metrics (<80ms latence p95, 50+ files, 2 000 clients/instance, 3 instances), 3 challenges (sync temps réel, cohérence compteurs, batterie mobile), 3 solutions (Redis pub/sub, INCR atomique, WebSockets + push), 3 phases timeline (Architecture distribuée, Backend temps réel, Mobile), impact sur la capacité à concevoir un système distribué cohérent.
  - **Parkour** : 4 metrics (±3m GPS, 500+ sessions, 12 défis, <4%/h batterie), 3 challenges (GPS arrière-plan batterie, reprise perte signal, gamification sans friction), 3 solutions (background task Expo + geofencing, Kalman léger + gap detection, agrégat ParkourSession), 3 phases timeline (R&D GPS, Domaine gamification, Backend & live), impact sur la maîtrise mobile + temps réel.

### Étape 2 — Enrichissement de l'overlay `project-detail-overlay.tsx`
- Imports Lucide étendus : `AlertTriangle`, `CheckCircle2`, `Clock`, `Sparkles`, `TrendingUp` (en plus des existants). Imports types : `ProjectMetric`, `ProjectTimelineItem`.
- Refactor du composant `SectionLabel` (mono text only) en `SectionHeader` : label mono `// xxx` + icône Lucide optionnelle (3.5px primary) + divider gradient `h-px flex-1 bg-gradient-to-r from-border via-border/40 to-transparent` (même pattern que `projects-section.tsx` et `blog-section.tsx`). Toutes les sections existantes migrées vers `SectionHeader` pour cohérence visuelle — l'overlay gagne en structure premium.
- 4 nouvelles sections case study créées comme composants dédiés (rendu conditionnel si données présentes) :
  1. **`MetricsSection`** (`// métriques`, icône `TrendingUp`) — grid `grid-cols-1 sm:grid-cols-2` (1 col mobile / 2×2 desktop). Chaque carte : `border-border/50 bg-card/40 backdrop-blur p-4` + glow émeraude top-right `bg-primary/[0.06] blur-2xl` (intensifie au hover). Valeur en `text-2xl md:text-3xl font-semibold text-gradient-emerald`, label `text-sm font-medium text-foreground/90`, hint `font-mono text-[11px] text-muted-foreground`. `role="list"`, `aria-label="Métriques produit"`.
  2. **`ChallengesSolutionsSection`** (`// défis & solutions`, icône `AlertTriangle`) — grid `grid-cols-1 lg:grid-cols-2`. Colonne Défis : header `AlertTriangle` + label ambre `text-accent` (NOUVELLE utilisation du token accent ambre déjà présent dans globals.css, jamais blue/red), items en `border-l-accent/60` avec icône `AlertTriangle h-3.5 w-3.5 text-accent`. Colonne Solutions : header `CheckCircle2` + label `text-primary`, items en `border-l-primary/60` avec icône `CheckCircle2 text-primary`. Chaque item : `rounded-lg border border-border/40 bg-card/30 p-3`, `text-sm leading-relaxed text-foreground/85`.
  3. **`TimelineSection`** (`// chronologie`, icône `Clock`) — `<ol>` relative avec `pl-8 md:pl-10`. Vertical gradient line `absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent`. Chaque item : dot `h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background shadow-[0_0_12px_oklch(0.78_0.17_162/0.6)]` (même glow que experience.tsx), phase `text-sm font-medium text-foreground`, période en badge mono `border-border/60 bg-card/40`, détail `text-sm text-muted-foreground`.
  4. **`ImpactSection`** (`// impact`, icône `Sparkles`) — callout `rounded-xl border border-primary/20 bg-primary/[0.04] p-5 md:p-6` avec halo `bg-primary/[0.10] blur-3xl` top-right. Icône `Sparkles` dans square émeraude `border-primary/30 bg-primary/10`. Texte `text-base md:text-lg leading-relaxed text-pretty text-foreground/90`.

### Étape 3 — Ordre narratif final
Ordre retenu (justifié par la progression naturelle d'une case study) :
1. **Hero** (badges + name + tagline) — existant
2. **Overview** (`// overview`) — contexte narratif — existant
3. **Métriques** (`// métriques`) — **NEW** — preuve chiffrée immédiate après le pitch
4. **Défis & Solutions** (`// défis & solutions`) — **NEW** — thinking ingénierie qui rend les métriques crédibles
5. **Points clés** (`// points clés`) — existant — features produits découlant des solutions
6. **Architecture** (`// architecture`) — existant — structure technique sous-jacente
7. **Chronologie** (`// chronologie`) — **NEW** — comment ça a été construit dans le temps
8. **Impact** (`// impact`) — **NEW** — conclusion narrative, ce que le projet démontre
9. **Stack technique** (`// stack technique`) — existant — référence outil
10. **Mon rôle** (`// mon rôle`) — existant — reference personne

### Étape 4 — Barrel exports
- `src/features/projects/index.ts` enrichi : re-export des types `Project`, `ProjectMetric`, `ProjectTimelineItem` depuis `./data/projects` (en plus du `Projects` existant) pour découverte publique.

### Validation
- `bunx eslint src/features/projects src/app/page.tsx` → exit 0, 0 erreur (les 2 erreurs `react-hooks/static-components` globales sont dans `src/features/uses/components/uses.tsx`, feature non livrée par un autre agent en parallèle, pas touchée par cette task).
- `bunx tsc --noEmit` → 0 erreur sur `src/features/projects` et `src/app/page.tsx` (erreurs pré-existantes uniquement dans `examples/` et `skills/`, non liées).
- Dev log inspecté : dernières lignes `✓ Compiled in 132ms` + `GET / 200 in 18ms`. Aucun `⨯` ou `Module not found` post-édit. Page d'accueil retourne 200, SSR contient les 3 noms de projet (PayLith, QueueClock, Parkour).
- Accessibilité : `role="list"` sur les `<ul>` de métriques/défis/solutions, `aria-label` sur chaque `<section>` ("Métriques produit", "Défis et solutions", "Chronologie du projet", "Impact du projet"), `aria-label` sur le `<ol>` timeline ("Phases de construction"), `aria-hidden` sur tous les éléments décoratifs (dividers, dots, halos, icônes redondantes avec texte), `<ol>` sémantique pour la chronologie.
- Responsive : métriques 1 col mobile → 2 col sm+ ; défis/solutions stack mobile → 2 col lg ; timeline `pl-8 md:pl-10` avec dots repositionnés en `-left-8 md:-left-10` ; callout impact `p-5 md:p-6` et `text-base md:text-lg`.
- Conformité design system : dark-first, accent émeraude exclusif pour primary, ambre (`text-accent` / `border-l-accent/60`) pour les challenges (jamais blue/indigo, jamais red), `text-gradient-emerald` sur les valeurs de métriques, `bg-card/40` + `backdrop-blur` (glass), `premium-scroll` déjà sur le panel, `shadow-glow` via `shadow-[0_0_12px_oklch(...)]` sur les dots timeline.

## Stage Summary
- 4 nouvelles sections case study livrées dans l'overlay projet : Métriques (2×2 grid de KPIs avec valeurs en `text-gradient-emerald`), Défis & Solutions (2-col grid avec accents ambre/émeraude distincts), Chronologie (timeline verticale avec dots émeraude glow + gradient line), Impact (callout premium `border-primary/20 bg-primary/[0.04]` avec icône Sparkles).
- Modèle `Project` étendu avec 5 champs optionnels (`metrics`, `challenges`, `solutions`, `timeline`, `impact`) + 2 nouvelles interfaces `ProjectMetric` et `ProjectTimelineItem` exportées. Rétro-compatible : aucun champ existant supprimé ou modifié.
- 3 projets enrichis avec données case study réalistes et crédibles (PayLith le plus riche avec 5 phases timeline), alignées sur l'expertise DDD/CQRS/Redis/WebSockets déjà présentée dans le portfolio (cohérence avec la feature Blog et l'experience).
- Ordre narratif structuré : Overview → Métriques → Défis & Solutions → Points clés → Architecture → Chronologie → Impact → Stack → Rôle. Le lecteur passe du pitch → preuve chiffrée → thinking ingénierie → features → structure → construction → conclusion → référence outil/personne.
- `SectionLabel` refactorisé en `SectionHeader` avec icône optionnelle + divider gradient, appliqué uniformément à toutes les sections (existantes + nouvelles) — l'overlay gagne en hiérarchie visuelle premium.
- Lint clean sur tous les fichiers modifiés (`src/features/projects/**`, `src/app/page.tsx`). TypeScript clean. Dev server compile proprement, page d'accueil 200 OK.
- Accessible (role/aria-label/aria-hidden, `<ol>` sémantique), responsive (mobile-first 1 col → desktop 2 col), conforme au design system (dark-first, émeraude + ambre, jamais blue/indigo).

## Files Modified
- `src/features/projects/data/projects.ts` — interfaces `ProjectMetric`/`ProjectTimelineItem` ajoutées + 5 champs optionnels sur `Project` + données case study pour les 3 projets.
- `src/features/projects/components/project-detail-overlay.tsx` — nouveaux imports Lucide/types, `SectionLabel`→`SectionHeader` (avec icône + divider), 4 nouveaux composants (`MetricsSection`, `ChallengesSolutionsSection`, `TimelineSection`, `ImpactSection`), ordre narratif final orchestré dans `OverlayContent`.
- `src/features/projects/index.ts` — re-export des types `Project`/`ProjectMetric`/`ProjectTimelineItem`.
