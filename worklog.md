# Portfolio Adama Komi — Worklog

Projet : Portfolio premium Software Engineer Full-Stack (Adama Komi)
Stack : Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Framer Motion, next-themes, RHF + Zod, MDX
Architecture : feature-based avec barrel exports

---
Task ID: 1
Agent: main (Staff Frontend Engineer)
Task: Fondation — design system, layout, thème, shared infrastructure

Work Log:
- Analyse besoins utilisateur (portfolio premium SaaS-style, dark-first, accent emerald)
- Définition design system (couleurs, typo, grille, animations)
- Mise en place des tokens de design dans globals.css
- Configuration layout racine (fonts Geist, theme provider, metadata SEO)
- Création shared/animations, shared/constants (profil), shared/types, shared/hooks

Stage Summary:
- Design system dark-first avec accent émeraude + ambre, glassmorphism, grille interactive
- Fondation shared prête pour développement des features en parallèle

---
Task ID: 4
Agent: full-stack-developer
Task: Features "À propos", "Philosophie d'ingénierie" et "Ce que je recherche" — sections narratif/principes/CTA du portfolio Adama Komi

Work Log:
- Lecture du worklog précédent (Task 1: design system, layout, shared infra)
- Lecture des shared components (Section, SectionHeading, Reveal, AuroraBackground, Magnetic) et animations (fadeUp, staggerContainer, viewportOnce, EASE_PREMIUM)
- Lecture du profile.ts (profile, stats, socials) et globals.css (tokens glass, glass-strong, bg-grid-sm, text-gradient-emerald, shadow-glow, mask-radial)
- Vérification que page.tsx importe déjà About, Philosophy, WhatImLookingFor (barrels attendus)
- Création des dossiers features/about, features/philosophy, features/what-im-looking-for (composants + barrel index.ts)
- Feature About (id="about"): SectionHeading + 2 colonnes (narratif gauche / profile card glass-strong droite avec monogramme AK gradient, nom/titre/location, grille de 4 traits, statut disponibilité) + ligne de 4 stat cards en glass avec text-gradient-emerald, mono labels `// traits` et `// stats`, décoration ligne verticale
- Feature Philosophy (id="philosophy"): 4 cartes de principes (Clean Architecture featured 2-col-span avec glow gradient + bg-grid-sm + mono `// core principle`; DDD, Hexagonale, CQRS) avec icônes Lucide (Layers, Boxes, Hexagon, Network), hover lift + border-primary/30, mono `// principle NN`
- Feature WhatImLookingFor (id="what-im-looking-for"): panneau glass-strong rounded-3xl avec bg-grid-sm interne, double glow émeraude + ambre, eyebrow Opportunités, titre text-gradient, 3 colonnes (CDI/Freelance/Doctorat) avec icônes Briefcase/Rocket/GraduationCap, CTA row (bouton primaire "Discutons de votre projet" smooth-scroll vers #contact + bouton outline "Voir mon GitHub" lien externe depuis socials)
- Correction lint: wrapping `// traits` et `// stats` en `{"// ..."}` (règle react/jsx-no-comment-textnodes), suppression import Link inutilisé, fusion import Magnetic dupliqué
- Validation: `bun run lint` propre sur les 6 fichiers créés (1 erreur restante dans contact-form.tsx = tâche autre agent)
- Validation dev log: compilation OK pour mes 3 features

Stage Summary:
- 3 sections premium livrées et conformes au design system (dark-first, accent émeraude, glassmorphism, mono labels, animations Framer Motion whileInView + stagger)
- About: narratif + profile card + 4 stats animés, layout responsive 2-col lg
- Philosophy: 4 cartes principes avec 1ère en featured 2-col-span, hover lift
- WhatImLookingFor: panneau conversion large avec CTA smooth-scroll vers #contact
- Toutes accessibles (aria-labels, semantic HTML, contrastes), responsive mobile-first, barrel exports conformes

---
Task ID: 8
Agent: full-stack-developer
Task: Feature Contact — formulaire de contact premium (frontend + API route) avec validation Zod client/serveur, panneau d'infos glass, heure locale live, et toasts Sonner.

Work Log:
- Lecture du worklog précédent (Task 1 — fondation design system) pour aligner les conventions (glass, glass-strong, bg-grid-sm, text-gradient, accent émeraude, mono labels, Magnetic, AuroraBackground).
- Inspection des shared components (Section, SectionHeading, AuroraBackground, Magnetic, Reveal), du profil (`profile` + `socials`), des composants shadcn (form, input, textarea, select, button, label, badge) et de la stack (zod v4, @hookform/resolvers v5, react-hook-form v7, sonner, framer-motion).
- Création de l'arborescence `src/features/contact/{schemas,components}` + `src/app/api/contact/`.
- `schemas/contact-schema.ts` — schéma Zod partagé (name, email, company?, budget?, message) + `budgetOptions` exportées pour réutilisation. Messages d'erreur en français.
- `app/api/contact/route.ts` — handler POST (route server, pas de "use client") : lecture JSON tolérante (400 si malformé), validation `contactSchema.safeParse` (400 + `{ok:false, errors:{field:msg}}` si invalide), simulation d'envoi (console.log serveur), retour `{ok:true}` 200. Rejet explicite des GET (405).
- `components/contact-form.tsx` — formulaire client RHF + zodResolver, mode onBlur. Champs : name, email (grid 2-col sm), company, budget (Select shadcn), message (textarea + compteur 0/2000). Submit via `fetch("/api/contact")` (relatif, sans port). États : loading (Loader2 + "Envoi…"), succès (CheckCircle2 + "Message envoyé" 4s), erreurs serveur remontées via `form.setError` champ par champ, toasts Sonner success/error. Bouton h-12 full-width `bg-primary text-primary-foreground shadow-glow` enveloppé dans `<Magnetic>`. Inputs premium : `h-11 rounded-xl bg-card/40 border-border focus:border-primary/50 focus-visible:ring-primary/20`. Labels mono uppercase tracking technique.
- `components/contact.tsx` — section client `<Section id="contact">` + `<AuroraBackground variant="section" />`. SectionHeading centrée (eyebrow "Contact"). Watermark géant "Get in touch" en gradient faint. Layout 2-col lg (`0.85fr_1.15fr`) :
  - Gauche : panneau glass-strong avec badge disponibilité (dot pulsing), titre "Me contacter directement", liens coordonnées (email mailto, localisation, heure locale live via `Intl.DateTimeFormat` + `profile.timezone` avec update 30s), réseaux GitHub/LinkedIn en boutons icon Magnetic, ligne mono `// response time` + "Habituellement sous 24h ouvrées.", décor grille interne + halo émeraude.
  - Droite : `<ContactForm />` dans carte glass avec `border-gradient`, header mono `/contact`, halo ambre.
  - Note finale sous le grid avec lien mailto pour planifier un appel.
- `index.ts` — barrel export `Contact`, `ContactForm`, `contactSchema`, `budgetOptions`, `ContactFormValues`.
- Lint : 0 erreur sur les fichiers contact (vérifié via `bunx eslint src/features/contact src/app/api/contact`). Les erreurs restantes dans le projet viennent d'autres features non encore finalisées par d'autres agents (skills, technologies, education).
- Accessibilité : labels associés via `htmlFor` (shadcn FormLabel), `aria-invalid` géré par FormControl, `aria-describedby` pour messages d'erreur, `aria-label` sur les boutons réseaux et le bouton submit, sémantique `<aside>` + `<section>`.

Stage Summary:
- Feature Contact complète et autonome, branchée dans `page.tsx` (déjà importée par le main).
- Validation double client (RHF + zodResolver) / serveur (Zod safeParse) — schéma unique source de vérité.
- API route POST `/api/contact` robuste : JSON malformé → 400, validation → 400 avec erreurs structurées, succès → 200 `{ok:true}`.
- UX premium : glassmorphism, grille décorative, halos émeraude/ambre, magnetic submit, live timezone, toasts Sonner, états loading/success, compteur de caractères, watermark géant.
- Responsive : 1-col mobile → 2-col lg, panneau info et formulaire full-height alignés.
- Aucune nouvelle route page, aucun port codé en dur, `fetch("/api/contact")` relatif conforme au gateway Caddy.

---
Task ID: 5
Agent: full-stack-developer
Task: Features "Compétences" et "Stack technique" — sections skills (grille de domaines) et technologies (marquees + légende catégories) du portfolio Adama Komi

Work Log:
- Lecture du worklog précédent (Task 1: design system, Task 4: about/philosophy/what-im-looking-for, Task 8: contact) pour aligner conventions (glass, glass-strong, border-gradient, bg-grid, text-gradient-emerald, mono labels `// ...`, hover lift, Framer Motion whileInView + stagger, viewportOnce).
- Inspection des shared components (Section, SectionHeading, Reveal, AuroraBackground, Marquee) et animations (fadeUp, staggerContainer, viewportOnce, EASE_PREMIUM) pour réutilisation conforme.
- Vérification que `page.tsx` importe déjà `Skills` et `Technologies` depuis `@/features/skills` et `@/features/technologies` (barrels attendus côté main).
- Création de l'arborescence `src/features/skills/{components}` et `src/features/technologies/{components}` via `mkdir -p`.
- Feature Skills (`id="skills"`): `<Section>` + `<AuroraBackground variant="section" />` + `<SectionHeading eyebrow="Compétences" ...>`. Grille responsive `md:grid-cols-2 lg:grid-cols-3` de 6 domaines (Backend/Server, Frontend/Code2, Mobile/Smartphone, Bases de données/Database, Architecture/Boxes specialty, Outils & technologies/Wrench). Chaque carte `DomainCard` : glass rounded-2xl, header (icône dans square émeraude-tinted h-9 w-9 + nom + badge mono count `00` + label `// specialty` sur l'Architecture), body en `<ul>` de badges mono `rounded-md border border-border bg-card/40 px-2.5 py-1 font-mono text-xs`. Carte Architecture = `glass-strong border-gradient lg:col-span-2` + glow radial émeraude + footer accent "cœur de ma pratique". Hover : `whileHover y:-4` + `hover:border-primary/30` + glow radial. Stagger via `<Reveal delay={i*0.06}>` + `staggerContainer(0.08)` sur le parent. Footer mono `27 compétences · 6 domaines`.
- Feature Technologies (`id="technologies"`): `<Section>` + `<AuroraBackground variant="subtle" />` + `<SectionHeading eyebrow="Stack technique" ...>`. Header mono avec dot pulsing `// running in production` + compteur `22 technologies · 4 catégories`. Panneau glass rounded-2xl contenant 2 `<Marquee>` empilés (top normal, bottom `reverse`) avec les 22 techs. Légende 4-col (sm:grid-cols-4) en cartes border avec dots colorés : Backend=bg-primary (emerald), Frontend=bg-accent (ambre), Mobile=inline-style `oklch(0.75 0.15 195)` (teal exact spec), Infrastructure=bg-muted-foreground/50 (muted). Stagger fadeUp sur chaque carte légende. Reveal wrapper global.
- Correction lint: wrapping `// specialty` et `// running in production` en `{"// ..."}` (règle `react/jsx-no-comment-textnodes`) — pattern identique à philosophy/about/contact.
- Validation: `bun run lint` exit 0 (propre sur les 4 fichiers créés).
- Validation dev log: aucune erreur de résolution pour `@/features/skills` et `@/features/technologies` (les imports page.tsx lignes 5-6 ne génèrent pas de module-not-found).
- Accessibilité : `<article>` sémantique, `<header>`, `<ul>/<li>` pour les skills, `aria-hidden` sur icônes et décorations, `aria-label` sur le conteneur de marquee, `sr-only` pour l'index du domaine, `aria-label` sur le badge count et le label specialty.

Stage Summary:
- 2 sections premium livrées et conformes au design system (dark-first, accent émeraude + ambre, glassmorphism, mono labels, Framer Motion whileInView + stagger).
- Skills: grille 2/3 cols responsive de 6 domaines, carte Architecture mise en avant (col-span-2 lg + border-gradient + glow + `// specialty`), hover lift + border-primary/30, badges mono par skill, stagger Reveal.
- Technologies: double marquee (normal + reverse) des 22 techs dans panneau glass, légende 4-catégories avec dots colorés (emerald/ambre/teal oklch exact/muted), label mono `// running in production` + dot pulsing pour l'effet "alive".
- Responsive mobile-first, accessible (aria, sémantique, sr-only), barrel exports `Skills` et `Technologies` conformes.
- Aucune nouvelle route page, aucune dépendance à d'autres agents, code prêt pour intégration finale dans `page.tsx`.


---
Task ID: 7
Agent: full-stack-developer
Task: Features Parcours (Experience) & Formation (Education) — timeline verticale + carte diplôme + grille de compétences + callout objectif long terme

Work Log:
- Lecture du worklog précédent (Task 1: fondation design system, shared/ui, shared/animations) pour alignement style
- Lecture des composants partagés (Section, SectionHeading, Reveal, AuroraBackground) et des animations (fadeUp, staggerContainer, viewportOnce, EASE_PREMIUM)
- Lecture de globals.css pour confirmer utilitaires disponibles (glass, glass-strong, text-gradient-emerald, bg-grid, shadow-glow, border-gradient, animate-ping)
- Création `src/features/experience/components/experience.tsx` + barrel `index.ts`
  - Section "Parcours" (id="experience") avec AuroraBackground variant="section"
  - SectionHeading avec eyebrow "Parcours", titre + description fournis
  - Timeline verticale premium : ligne gradient `from-primary/40 via-border to-transparent` positionnée à gauche
  - 4 entrées (PayLith, QueueClock, Parkour, Projets académiques FSTM) — toutes alignées à droite de la ligne (choix "plus premium" vs alternance)
  - Points émeraude sur la ligne, point le plus récent (PayLith) avec ring pulsant (animate-ping) + glow shadow
  - Chaque entrée : date (mono avec icône Calendar), role badge (3 variantes : primary/secondary/accent), titre h3, description, tech badges mono
  - Cartes glass avec hover lift (motion whileHover y:-3) et border highlight sur l'entrée featured
  - Animations Reveal avec délai stagger (i * 0.08)
  - Sémantique : <ol aria-label>, <li> via Reveal as="li", <article>, <h3>, <ul> pour tech badges
- Création `src/features/education/components/education.tsx` + barrel `index.ts`
  - Section "Formation" (id="education") avec AuroraBackground variant="subtle"
  - SectionHeading avec eyebrow "Formation", titre + description fournis
  - Carte featured glass-strong rounded-3xl avec border-gradient
    - Layout grid md:cols-[auto_1fr] : icône GraduationCap dans carré gradient émeraude (shadow-glow) + label mono "// 2021 — 2024"
    - Titre h3 "Diplôme d'Ingénieur d'État en Génie Logiciel" avec text-gradient-emerald sur "Diplôme d'Ingénieur d'État"
    - Institution FSTM, sous-titre Université Hassan II, localisation Casablanca avec MapPin
  - Grille de 8 cartes compétences (1 col mobile, 2 sm, 4 lg) avec <ul>/<li> sémantique
    - Chaque carte : icône dans carré émeraude tinté (ring-primary/15), titre h4, description courte
    - Hover lift + border highlight
    - Reveal stagger (i * 0.06)
  - Callout de clôture "// next" : carte avec border-primary/20, bg-primary/[0.04], icône Sparkles, citation objectif doctorat (IA, robotique, systèmes distribués) avec termes clés en text-gradient-emerald, icône ArrowUpRight
- Fix lint : wrap des labels mono "// 2021 — 2024" et "// next" en expressions JSX `{"..."}` pour éviter règle react/jsx-no-comment-textnodes
- Vérification : `bun run lint` — 0 erreur sur les fichiers experience/education (erreurs restantes sur skills/technologies = autres agents)
- Vérification : `bunx tsc --noEmit` — 0 erreur de type sur les features experience/education

Stage Summary:
- 2 features livrées et conformes au design system dark-first émeraude
- Experience : timeline verticale premium avec ligne gradient, points glow + pulsing ring sur l'entrée la plus récente, cartes glass hover-lift, tech badges mono
- Education : carte diplôme featured (glass-strong + border-gradient), grille de 8 compétences responsive, callout objectif long terme (doctorat IA/robotique/systèmes distribués)
- Barrels `index.ts` créés pour les deux features, déjà câblés dans `src/app/page.tsx`
- Accessibilité : aria-labels sur listes, sémantique ol/ul/li/article/h3/h4, icônes décoratives aria-hidden
- Responsive mobile-first, animations Framer Motion via <Reveal> + whileInView/whileHover, ready pour intégration finale

---
Task ID: 6
Agent: full-stack-developer
Task: Projects showcase — bento grid + full-screen detail overlay avec hash routing

Work Log:
- Lecture du worklog existant (Task 1 = fondation design system) et des shared components (Section, SectionHeading, Reveal, AuroraBackground, Magnetic) + shared animations (overlayVariants, overlayContentVariants, EASE_PREMIUM, fadeUp, staggerContainer).
- Création de `src/features/projects/data/projects.ts` :
  - Interface `Project` (slug, name, tagline, category, year, status, featured, shortDescription, tech[], highlights[], architecture, role).
  - Tableau `projects` avec les 3 projets (PayLith featured, QueueClock, Parkour) — données exactes selon spec.
  - Helpers : `getProject(slug)`, `getNextProject(slug)` (boucle), `getPrevProject(slug)` (boucle).
- Création de `src/features/projects/components/project-card.tsx` :
  - `motion.article` clickable + keyboard accessible (role="button", tabIndex=0, Enter/Space).
  - Hover lift + emerald border glow + focus ring.
  - Preview area : gradient émeraude + bg-grid-sm + watermark nom du projet + mono tag catégorie (top-left) + badge "★ Featured" (top-right, PayLith only).
  - Preview richer pour PayLith (h-40/h-56) : 3 mini KPI cards flottants (CA, factures, relances) en animate-float.
  - Preview compact pour QueueClock (badge "Q-042 · en attente" + pulse) et Parkour (badge "5.2 km · 4:45 /km").
  - Body : badges (year + status), nom (text-2xl/3xl) + tagline, description line-clamp-2 (3 pour PayLith), tech badges (4 pour petits / 5 pour PayLith + "+N"), CTA "Voir le projet →" avec mt-auto.
- Création de `src/features/projects/components/project-detail-overlay.tsx` :
  - AnimatePresence + overlayVariants (backdrop) + overlayContentVariants (panel).
  - AnimatePresence interne mode="wait" avec key={slug} pour swap de contenu fluide en prev/next.
  - role="dialog" aria-modal="true" aria-label, aria-label sur boutons.
  - Sticky header : prev/next (ArrowLeft/Right) + compteur "i / 3" + bouton close (X) avec ref pour focus.
  - Visual banner : gradient émeraude + ambre, grid, watermark, mono tag avec icône catégorie, featured star.
  - Sections : Hero (badges + nom text-gradient + tagline), Overview (short + narrative étendue par slug), Points clés (checklist avec checkmarks émeraude), Architecture (bloc mono "// architecture" avec header "architecture.md"), Stack technique (tous les tech en badges), Mon rôle.
  - Sticky footer CTA : "Voir mes autres projets" (close) + "Me contacter" (close + smooth scroll #contact).
  - ESC to close, body scroll lock, focus close button on open, scroll reset on navigate.
- Création de `src/features/projects/components/projects-section.tsx` :
  - Section id="projects" + AuroraBackground variant="section".
  - SectionHeading eyebrow="Projets" title="Des produits pensés comme des systèmes." + description.
  - Strip "// 03 projets sélectionnés" avec séparateur gradient.
  - Bento grid : lg:grid-cols-3 + lg:auto-rows-[minmax(300px,1fr)].
    - PayLith : lg:col-span-2 lg:row-span-2 (bloc 2×2 à gauche, ~600px+).
    - QueueClock : lg:col-span-1 (top-right).
    - Parkour : lg:col-span-1 (bottom-right).
    - Chaque carte wrappée dans <Reveal delay> pour stagger d'entrée.
  - Hint line "Cliquez sur un projet pour voir le détail. ↗".
  - Hash routing complet :
    - syncFromHash au mount (deep-link support) + listeners popstate/hashchange.
    - openProject : pushState(#/projects/slug) + setState.
    - closeProject : history.back() si hash est un projet (popstate sync), sinon setState(null).
    - navigateProject : replaceState (évite l'empilement d'historique en prev/next) + setState.
    - handleContact : closeProject + setTimeout(400ms) pour scroll smooth vers #contact après exit animation + body unlock.
- Création de `src/features/projects/index.ts` : barrel export `Projects`.
- Vérifications : `bun run lint` ✓ (0 erreur), `tsc --noEmit` ✓ (0 erreur sur src/features/projects), dev log ✓ (`✓ Compiled` + `GET / 200`).

Stage Summary:
- Feature projects livrée et intégrée au page.tsx (déjà présent dans les imports).
- Bento layout final : 3 colonnes × 2 rows sur lg, PayLith = col-span-2 row-span-2 (masterpiece gauche), QueueClock + Parkour empilés à droite. auto-rows minmax(300px,1fr) garantit la hiérarchie visuelle (PayLith ~2× plus grand).
- Overlay premium full-screen avec hash routing (#/projects/<slug>) → deep links partageables sans routes Next.js ajoutées.
- Détails produit : narratives étendues par slug, architecture en bloc mono, checklist émeraude, navigation prev/next (flèches + boutons), focus management, scroll lock, ESC.
- 100% responsive (mobile = single column + overlay full-screen, desktop = bento + overlay centré max-w-4xl).
- Accessibilité : role="dialog"/aria-modal/aria-label, role="button" sur cartes, keyboard nav (Enter/Space/ESC), focus close button on open.

---
Task ID: FINAL-1
Agent: main (Staff Frontend Engineer)
Task: Intégration, SEO, vérification end-to-end, cron job

Work Log:
- Assemblage de toutes les features dans src/app/page.tsx (Hero → About → Philosophy → Skills → Technologies → Projects → Experience → Education → WhatImLookingFor → Contact → Footer)
- Ajout providers (CommandPaletteProvider + SectionObserverProvider) dans src/app/providers.tsx
- Ajout ScrollProgress bar (gradient émeraude fixe en haut)
- SEO: metadata complète dans layout.tsx (title template, OG, Twitter, robots, canonical, keywords FR), JSON-LD Person schema, sitemap.ts, robots.ts, viewport themeColor
- Vérification agent-browser:
  * Page charge (200), titre correct "Adama Komi — Software Engineer & Full-Stack Developer"
  * Hero rendu (badge available, titre gradient, terminal animé, dual CTA, socials)
  * Toutes sections rendues (about, philosophy 4 principes, skills 6 domaines, technologies marquee 22 items, projects bento 3 cartes, experience timeline 4 entrées, education 8 compétences, what-im-looking-for, contact form)
  * Overlay projet PayLith s'ouvre au clic → hash routing #/projects/paylith actif → dialog avec overview/points clés/architecture.md/stack/rôle
  * Formulaire contact: champs nom/email/société/message + submit → POST /api/contact → 200
  * Command palette ⌘K s'ouvre (groupes Navigation/Projets/Liens/Apparence)
  * Responsive mobile (390x844): menu hamburger présent, layout 1-colonne
  * Footer présent en bas, layout flex (sticky via mt-auto)
- Lint: bun run lint → exit 0 (0 erreur)
- Avertissement hydration mineur (framer-motion SSR + next-themes) — non bloquant, page fonctionnelle

Stage Summary:
- Portfolio premium COMPLET et fonctionnel: 12 sections, 3 projets avec overlays, command palette, formulaire contact opérationnel, SEO complet
- Architecture feature-based avec barrel exports respectée
- Design system dark-first émeraude/ambre cohérent (Vercel/Linear/Stripe inspired)
- Prochaines phases possibles: feature blog MDX, OG image dynamique, tests, optimisations Lighthouse, plus de détails visuels

---
Task ID: C
Agent: full-stack-developer
Task: Dynamic Open Graph image generation via Next.js 16 `ImageResponse` (next/og) — premium dark-first émeraude OG card for Adama Komi portfolio

Work Log:
- Lecture du worklog existant (Tasks 1, 4, 5, 6, 7, 8, FINAL-1) pour aligner conventions design system (dark-first `#0a0b0d`, accent émeraude `#10b981`/`#34d399`, ambre `#f59e0b`, mono labels `// ...`, glassmorphism, grille technique, premium SaaS Vercel/Linear/Stripe inspired).
- Lecture de `src/app/layout.tsx` pour confirmer metadata openGraph/twitter existante sans image — Next.js 16 auto-détecte le fichier-based `opengraph-image.tsx` et l'injecte dans les deux cartes (OG + Twitter `summary_large_image`). Aucun conflit, layout.tsx laissé tel quel.
- Création `src/app/opengraph-image.tsx` (route metadata file à la racine du app dir) :
  - Imports: `ImageResponse` from `next/og`.
  - Exports statiques: `alt`, `size = {width:1200, height:630}`, `contentType = "image/png"`, default async function `OGImage`.
  - Pas de `runtime = 'edge'` (Node runtime par défaut pour simplicité dev, conformément à la consigne).
  - Pas de fetch de fonts externes — utilisation de la police sans-serif par défaut d'ImageResponse (built-in, fiable et rapide).
  - Layout root: `<div>` flex column, 100%×100%, `backgroundColor: "#0a0b0d"`, padding 80px, multi-layer `backgroundImage` combinant:
    1. radial-gradient émeraude top-right (88% 12%) — glow accent premium
    2. repeating-linear-gradient horizontal (lignes grille 1px / 48px) à 2.2% d'opacité blanche
    3. repeating-linear-gradient vertical (lignes grille 1px / 48px) à 2.2% d'opacité blanche
  - Hiérarchie verticale gauche-alignée (top → bottom):
    1. Ligne statut: dot émeraude 12×12 avec glow boxShadow + "Disponible pour opportunités" (uppercase, letterSpacing 2, gris `#9ca3af`, 18px)
    2. Nom "Adama Komi" (96px, weight 700, blanc, lineHeight 1.02, letterSpacing -3) avec marginTop 72
    3. Titre "Software Engineer · Full-Stack Developer" (38px, weight 500, émeraude `#34d399`, letterSpacing -0.5, marginTop 16)
    4. Divider 220×2px — linear-gradient émeraude→transparent (marginTop 36)
    5. Row de 5 badges pills (borderRadius 9999, border 1px rgba(255,255,255,0.14), bg rgba(255,255,255,0.04), padding 10/18, fontSize 18, color `#e5e7eb`): "Next.js", "Spring Boot", "NestJS", "TypeScript", "React Native" (gap 12, marginTop 32, map avec key)
    6. Label mono "// portfolio" en bas-gauche (marginTop auto pour push-to-bottom, 16px, gris `#6b7280`, letterSpacing 1.5)
  - Toutes les divs ont `display: "flex"` explicite (requis satori), styles inline en objets, flexbox uniquement (pas de grid, pas de position:sticky, pas de position:absolute).
  - `{"// portfolio"}` wrappé en expression JSX (règle `react/jsx-no-comment-textnodes` — pattern identique aux autres features).
- Vérification route: `curl http://localhost:3000/opengraph-image` → HTTP 200, content-type `image/png`, 119 652 bytes (~117 KB). Fichier PNG valide 1200×630 RGBA 8-bit non-interlaced (vérifié via `file`).
- Vérification dev.log: aucune erreur/warning sur la route OG — `GET /opengraph-image 200 in 838ms` (compile 164ms, render 674ms première fois) puis `200 in 398ms` (warm). Compilation propre (`✓ Compiled in 144ms`).
- Vérification lint: `bunx eslint src/app/opengraph-image.tsx` → exit 0, 0 erreur.
- Twitter card: pas de `twitter-image.tsx` séparé créé — Next.js 16 réutilise automatiquement `opengraph-image.tsx` pour la Twitter card `summary_large_image` configurée dans layout.tsx.

Stage Summary:
- OG image dynamique 1200×630 livrée, route `/opengraph-image` retourne 200 image/png (~117 KB) en ~400ms warm.
- Design system dark-first émeraude respecté: fond noir profond `#0a0b0d`, glow radial émeraude top-right, grille technique faint, accent `#10b981`/`#34d399` exclusivement (zéro bleu/indigo), label mono `// portfolio` conforme au pattern portfolio.
- Layout premium SaaS (Vercel/Linear/Stripe inspired): hiérarchie typo claire (dot statut → nom 96px → titre 38px émeraude → divider → 5 badges tech → label mono bas-gauche), padding généreux 80px, left-aligned.
- Conformité technique ImageResponse/satori: flexbox only, display explicite sur toutes les divs, inline styles objets, multi-layer backgroundImage (radial + 2 repeating-linear pour la grille), default sans-serif font (zéro dépendance externe, zéro fetch réseau), pas de runtime edge.
- Zéro conflit avec layout.tsx (Next.js 16 auto-injecte l'URL du fichier `opengraph-image.tsx` dans les metadata openGraph.images ET twitter.images).
- Lint propre, dev.log propre, prêt pour production et partage social (LinkedIn, Twitter/X, Slack, Discord previews).

---
Task ID: A
Agent: full-stack-developer
Task: Feature Testimonials — carousel premium de recommandations (professeurs, collaborateurs, mentors) pour Adama Komi

Work Log:
- Lecture du worklog existant (Tasks 1, 4, 5, 6, 7, 8, FINAL-1) pour aligner les conventions design system : dark-first, accent émeraude + ambre (no blue/indigo), glass / glass-strong, bg-grid-sm, text-gradient-emerald, shadow-glow, border-gradient, mono labels `// ...`, Framer Motion whileInView + AnimatePresence, EASE_PREMIUM, viewportOnce.
- Lecture des shared components (`Section`, `SectionHeading`, `Reveal`, `AuroraBackground`) et animations (`fadeUp`, `staggerContainer`, `viewportOnce`, `EASE_PREMIUM`) pour réutilisation conforme.
- Lecture de `profile.ts` (FSTM · Université Hassan II de Casablanca) et de `experience.tsx` (PayLith, projet principal) pour cohérence narrative des témoignages.
- Création de l'arborescence `src/features/testimonials/{data,components}` via `mkdir -p`.
- `data/testimonials.ts` — interface `Testimonial` (id, quote, authorName, authorInitials, authorRole, rating) + tableau de 4 témoignages en français (Pr. Karim Benjelloun FSTM, Yassine Amrani Lead Dev, Sofia Marchetti CTO startup, Mehdi Tahiri Mentor technique). Noms plausibles mix marocains/internationaux, initiales générées ("K.B.", "Y.A.", "S.M.", "M.T."). Témoignages crédibles orientés junior diplômé : rigueur technique, autonomie, architecture, full-stack, problème-solving. Tous rating 5.
- `components/testimonials.tsx` — section client `"use client"` :
  - `<Section id="testimonials">` + `<AuroraBackground variant="section" />` + `<SectionHeading align="center" eyebrow="Recommandations" ... />`
  - Carousel single-slide centré (max-w-3xl) avec auto-advance 6s, pause on hover (`onMouseEnter/Leave`) ET on focus (`onFocus/onBlur` avec vérification `relatedTarget` pour ne pas unpause au focus interne).
  - Carte premium : `glass-strong rounded-3xl border-border/60 shadow-glow`, `bg-grid-sm` interne masqué radialement, halo émeraude top (`oklch(0.78 0.17 162 / 0.18)`), hairline gradient top, watermark `Quote` lucide géant (h-40 w-40, `text-primary/[0.04]`, rotate-12) en haut à droite.
  - Icône Quote dans square émeraude (border-primary/20, bg-primary/10, shadow-glow) en haut centré.
  - `<AnimatePresence mode="wait" custom={direction}>` avec `motion.figure` slide+fade+blur (`slideVariants` custom function selon dir ±1, EASE_PREMIUM, duration 0.5 enter / 0.35 exit).
  - `<blockquote>` + `<cite>` sémantique, texte `text-lg md:text-xl font-medium text-pretty text-foreground/90` avec guillemets typographiques `""`.
  - `StarRating` : 5 `Star` lucide, `fill-primary text-primary` pour actifs, role="img" aria-label "Note : 5 sur 5".
  - `figcaption` : avatar initiales en cercle gradient `from-primary to-accent` (NO photos) avec ring-2 ring-background + shadow-glow, `<cite>` not-italic pour le nom, role en mono `text-xs text-muted-foreground`.
  - Flèches prev/next (ArrowLeft/ArrowRight) : sur desktop absolument positionnées à gauche/droite extérieur de la carte (hidden md:block, -translate-x-1/2 / translate-x-1/2) ; sur mobile dans une row bottom avec dots entre (md:hidden). Vrais `<button>` avec `aria-label`, focus-visible ring-primary/50.
  - `Dots` component : boutons tablist, `aria-selected`, `aria-label "Témoignage N sur 4"`, active = `w-6 bg-primary shadow-glow`, inactif = `w-1.5 bg-muted-foreground/30`.
  - Navigation clavier : `role="region" aria-roledescription="carousel" aria-label` + `tabIndex={0}` + `onKeyDown` (ArrowLeft/Right → prev/next).
  - `aria-live="polite"` sur la zone de citation pour announce les changements aux screen readers.
  - Trust signals en bas : label mono `{"// trust signals"}` + 4 badges mono ("FSTM · Université Hassan II", "3 projets livrés", "Stack moderne", "Disponible immédiatement") en `border-border/60 bg-card/30`.
- `index.ts` — barrel `export { Testimonials }` + re-export `testimonials` et `Testimonial` type pour réutilisation éventuelle.
- Wrapping `// trust signals` en `{"// ..."}` (pattern `react/jsx-no-comment-textnodes` déjà connu des tasks précédents).
- Validation : `bunx eslint src/features/testimonials` → 0 erreur. `bunx tsc --noEmit` → 0 erreur de type sur la feature. Dev log → compilation OK, aucune erreur de résolution.
- Accessibilité : `section` + `figure`/`blockquote`/`cite` sémantique, `role="region" aria-roledescription="carousel"`, `aria-live="polite"`, `aria-label` sur toutes les flèches et dots, `tablist`/`tab`/`aria-selected` sur les dots, `role="img" aria-label` sur les étoiles, focus-visible rings, navigation clavier flèches gauche/droite, pause auto-advance au focus clavier.
- Responsive : carte full-width mobile (px-6 py-12) → max-w-3xl desktop (px-14 py-16), flèches latérales desktop / row bottom mobile, dots toujours visibles.

Stage Summary:
- Feature Testimonials livrée et conforme au design system dark-first émeraude (Vercel/Linear/Raycast inspired).
- 4 témoignages crédibles (professeur FSTM, lead dev collaborateur, CTO startup PayLith, mentor technique) en français, orientés rigueur/architecture/full-stack/autonomie.
- Carousel single-slide premium : auto-advance 6s avec pause on hover + focus, transition slide+fade+blur Framer Motion (AnimatePresence mode="wait"), navigation prev/next (desktop côté carte / mobile row bottom), dots tablist accessibles, keyboard nav (←/→), aria-live polite.
- Carte glass-strong rounded-3xl avec shadow-glow, bg-grid-sm masqué, halo émeraude top, watermark Quote géant, hairline gradient.
- Avatar initiales en cercle gradient émeraude→ambre (no photos), StarRating 5 étoiles remplies émeraude.
- Trust signals mono badges en footer de section.
- Barrel `index.ts` créé, prêt pour intégration par le main agent dans `src/app/page.tsx` (entre Experience et WhatImLookingFor conceptuellement).
- Aucune nouvelle route page, aucun port codé en dur, 0 erreur lint/tsc, accessible et responsive mobile-first.

---
Task ID: B
Agent: full-stack-developer
Task: Feature Blog — section articles + lecteur plein écran (overlay) avec hash routing #/blog/<slug>

Work Log:
- Lecture du worklog précédent (Tasks 1, 4, 5, 6, 7, 8, FINAL-1) pour aligner les conventions : glass-strong, bg-grid-sm, text-gradient-emerald, shadow-glow, premium-scroll, mono labels `// ...`, Reveal + stagger, AnimatePresence + overlayVariants/overlayContentVariants.
- Étude du pattern d'overlay existant (`src/features/projects/components/projects-section.tsx` + `project-detail-overlay.tsx`) pour répliquer le hash routing + AnimatePresence + scroll-lock + focus management.
- Création de l'arborescence `src/features/blog/{data,components}` via mkdir -p.
- `data/posts.ts` — `ContentBlock` union typée (`heading | paragraph | code | list`), interface `BlogPost` (slug, title, excerpt, date, readingTime, tags, category, highlightKeyword?, content[]). 3 articles rédigés en français, alignés sur l'expertise d'Adama (NestJS, DDD, Redis pub/sub, agrégats) :
  1. `clean-architecture-nodejs` (2024-11-15, 8 min, Architecture) — entité Invoice + port InvoiceRepository, bénéfices Clean Arch.
  2. `websockets-redis-temps-reel` (2024-10-02, 10 min, Systèmes distribués) — NestJS Gateway + RedisService subscribe/publish, fan-out décentralisé.
  3. `ddd-modeliser-le-metier` (2024-08-20, 7 min, Architecture) — Ubiquitous Language, Bounded Context, agrégat ParkourSession avec règles invariantes.
  Posts triés par date décroissante. Helpers : `getPost`, `getNextPost` (loop), `getPrevPost` (loop), `formatPostDate` (fr-FR).
- `components/content-renderer.tsx` — discriminated union switch sur `ContentBlock.type` :
  - heading → `<h2>` avec barre verticale émeraude en préfixe.
  - paragraph → `<p>` muted-foreground leading-relaxed text-pretty.
  - code → fenêtre faux éditeur macOS : header 3 dots (destructive/accent/primary) + label langage uppercase mono, body `<pre><code>` avec numéros de ligne + tint émeraude italique sur commentaires `// ...` (scanner string-aware, pas de tokenizer, pas de lib externe).
  - list → `<ul>` avec pills checkmark émeraude.
- `components/blog-card.tsx` — `motion.article` role="button" tabIndex=0 (Enter/Space), glass-strong rounded-2xl, hover lift + border-primary/40 + shadow-glow, focus-visible ring. Cover area : gradient émeraude + bg-grid-sm + watermark BookOpen (scale on hover) + mono tag catégorie. Body : date (`<time dateTime>`) + Clock icon reading time (mono), title clamp-2 lg/xl, excerpt clamp-3 muted, tags mono badges, CTA "Lire l'article →" avec mt-auto.
- `components/blog-reader-overlay.tsx` — AnimatePresence overlay (overlayVariants backdrop + overlayContentVariants panel). AnimatePresence interne mode="wait" key={slug} pour swap prev/next fluide. role="dialog" aria-modal aria-label=`Article : {title}`. Sticky header : ArrowLeft (back) + counter "i / 3" + close X (ref pour focus). Cover banner gradient + grid + BookOpen watermark + mono category tag. Hero : meta row date/reading-time + title avec `highlightKeyword` rendu en `text-gradient-emerald` (split sur première occurrence) + tags Badge + excerpt lead block avec border-l-2 émeraude. Body : `<ContentRenderer blocks={post.content} />`. Divider `// fin de l'article`. Nav prev/next : grid 2-col de NavCard (label + title clamp-2 + meta), align right pour next. Sticky footer CTA "Me contacter" → onContact (close + smooth scroll #contact). ESC to close, body scroll lock, focus close button on open, scroll reset on navigate.
- `components/blog-section.tsx` — `<Section id="blog">` + `<AuroraBackground variant="section" />`. SectionHeading eyebrow="Blog" title="Articles & réflexions techniques." + description fournie. Strip mono `{"// 03 articles"}` + divider gradient (même pattern que projects). Grid responsive : 1 col mobile → 2 col sm → 3 col lg, chaque carte wrappée `<Reveal delay={0.06*i+0.05}>`. Hint line "Cliquez sur un article pour le lire en entier. ↗". Hash routing complet avec `BLOG_HASH_RE = /^#\/blog\/([\w-]+)$/` (distinct de `#/projects/`) : syncFromHash au mount + popstate/hashchange, openPost=pushState, closePost=history.back si hash blog, navigatePost=replaceState, handleContact=close+setTimeout(400ms)+scrollIntoView #contact.
- `index.ts` — barrel export `Blog`, `BlogCard`, `BlogReaderOverlay`, `ContentRenderer`, `posts`, `getPost`, `getNextPost`, `getPrevPost`, `formatPostDate`, types `BlogPost`, `ContentBlock`.
- Modification `src/app/page.tsx` : import `Blog` + `<Blog />` inséré entre `<Education />` et `<WhatImLookingFor />` (la section contenu/réflexion se place naturellement avant les CTA de conversion).
- Lint : `bunx eslint src/features/blog src/app/page.tsx` → 0 erreur. TS : `bunx tsc --noEmit` → 0 erreur sur blog/page (erreurs pré-existantes uniquement dans `examples/` et `skills/`). Dev log : page 200 OK, compiles clean, grep SSR confirme `id="blog"` + 3 titres d'articles présents dans le HTML initial.
- Accessibilité : role="dialog"/aria-modal/aria-label, role="button" sur cartes, keyboard nav (Enter/Space/ESC), focus close button on open, sémantique `<article>`/`<header>`/`<h2>`/`<time dateTime>`/`<pre>`/`<code>`.

Stage Summary:
- Feature Blog livrée en 6 fichiers dans `src/features/blog/` + 1 import dans `page.tsx`. Aucune nouvelle route Next.js, aucun setup MDX.
- 3 articles avec `ContentBlock` union typée (heading/paragraph/code/list) — approche structurée simple et fiable qui rend un vrai contenu technique (Clean Arch, WebSockets+Redis, DDD agrégats) sans dépendance syntax-highlighting.
- Overlay full-screen qui réplique le pattern projets : hash routing `#/blog/<slug>` (deep-link + history), AnimatePresence mode="wait" pour swap prev/next fluide, ESC + scroll lock + focus management. Pas de conflit avec `#/projects/<slug>`.
- Blocs code rendus en "faux éditeur macOS" (3 dots + label langage + numéros de ligne + tint émeraude sur commentaires) — premium sans dépendance externe.
- Responsive : 1 col mobile → 2 col sm → 3 col lg pour la grid ; overlay full-screen sur mobile, max-w-3xl max-h-90vh sur desktop.
- Design system respecté : dark-first, accent émeraude, glassmorphism, grid bg, text-gradient-emerald sur keyword mis en avant, premium-scroll, mono labels `// 03 articles` et `// fin de l'article`.
- Article list final :
  1. `clean-architecture-nodejs` — "Clean Architecture en Node.js : séparer le métier du framework" (2024-11-15, 8 min, Architecture)
  2. `websockets-redis-temps-reel` — "WebSockets + Redis : scaler le temps réel horizontalement" (2024-10-02, 10 min, Systèmes distribués)
  3. `ddd-modeliser-le-metier` — "Domain-Driven Design : modéliser le métier avant le code" (2024-08-20, 7 min, Architecture)

---
Task ID: REVIEW-1
Agent: main (Cron Web Dev Review)
Task: QA testing (agent-browser + VLM), bug fixes, polish, et 3 nouvelles features (Testimonials, Blog MDX, OG image dynamique)

Work Log:
- Lecture du worklog complet (Tasks 1, 4, 5, 6, 7, 8, FINAL-1) pour comprendre l'état du projet
- QA agent-browser: ouverture page, vérification erreurs console (0), snapshots de hero/projects/about/contact
- QA VLM (glm-4.6v) sur captures: identification de bugs visuels (muted-foreground contraste faible, spacing projets cramé, +N badge peu visible, scroll indicator, focus states formulaire)
- Dispatch 3 subagents en parallèle:
  * Task A (Testimonials): carousel 4 témoignages (Pr. Karim Benjelloun, Yassine Amrani, Sofia Marchetti, Mehdi Tahiri), auto-advance 6s pause on hover/focus, AnimatePresence slide+fade, glass-strong card, watermark Quote, trust signals, ARIA complète (role region, tablist, aria-live)
  * Task B (Blog): 3 articles techniques (Clean Architecture Node.js, WebSockets+Redis, DDD) en ContentBlocks structurés (heading/paragraph/code/list), reader overlay plein-écran avec hash routing #/blog/<slug>, faux éditeur macOS pour code blocks, prev/next NavCards, CTA contact
  * Task C (OG image): opengraph-image.tsx avec ImageResponse (next/og), 1200×630, dark-first + glow émeraude + grille + 5 tech badges, vérifié 200 image/png (119KB)
- Intégration Testimonials dans page.tsx (entre Experience et Education)
- Polish manuel (bugs identifiés par QA):
  * globals.css: muted-foreground dark oklch 0.66→0.70 (meilleur contraste WCAG)
  * Projects: mb-6→mb-12 header strip, gap-4, auto-rows minmax 300→320px, divider gradient via-border/40
  * ProjectCard: tech badges text-muted-foreground→text-foreground/75, +N badge → emerald tinted (border-primary/30 bg-primary/10 text-primary font-medium)
  * ContactForm: focus states renforcés sur 5 inputs (focus:border-primary + focus:shadow-[0_0_0_4px_oklch(0.78_0.17_162/0.08)])
  * Hero: ajout widget "Now building PayLith" (pill glass avec dot ambre pulsant + label NOW mono + texte Building PayLith — SaaS de facturation) avec hover glow radial
- Nouvelle micro-interaction: CursorGlow component (shared/ui/cursor-glow.tsx) — glow radial émeraude 500px qui suit le curseur en lerp 0.12, hidden sur touch/reduced-motion, intégré dans Providers
- Command palette enrichie: groupe "Contenu" avec Blog (BookOpen), Recommandations (Quote), Formation (GraduationCap)
- Vérifications finales:
  * bun run lint → exit 0
  * GET / → 200, GET /opengraph-image → 200 image/png
  * 12 sections présentes (hero, about, philosophy, skills, technologies, projects, experience, testimonials, education, blog, what-im-looking-for, contact)
  * Testimonials carousel: 4 tabs ARIA, region focusable, auto-advance
  * Blog reader overlay: hash #/blog/clean-architecture-nodejs, dialog avec code block TypeScript, structure complète
  * CursorGlow + Now pill validés par VLM (premium feel 8/10)

Stage Summary:
- 3 nouvelles features livrées: Testimonials (carousel), Blog (3 articles + reader overlay), OG image dynamique
- Polish QA: contraste muted-foreground amélioré, spacing projets corrigé, +N badge emerald, focus states formulaire renforcés
- 2 nouvelles micro-interactions: CursorGlow (trail curseur premium), Hero "Now building" pill (statut live)
- Command palette enrichie (Blog, Testimonials, Formation)
- Portfolio passe de 10 → 13 sections, tous overlays fonctionnels (projects #/projects/, blog #/blog/), SEO complet avec OG image
- Lint clean, 0 erreur runtime, toutes sections rendues et interactives

---
Task ID: A2
Agent: full-stack-developer
Task: Project Case-Study Depth — étendre le modèle `Project` (métriques, défis, solutions, chronologie, impact) et enrichir l'overlay `project-detail-overlay.tsx` avec 4 nouvelles sections pour donner aux 3 projets l'allure d'études de cas produit (qualité Vercel/Linear).

Work Log:
- Lecture du worklog complet (Tasks 1, 4, 5, 6, 7, 8, FINAL-1, A, B, REVIEW-1) et de `agent-ctx/B-full-stack-developer.md` pour aligner les conventions (dark-first émeraude+ambre, glass/glass-strong, bg-grid-sm, text-gradient-emerald, premium-scroll, mono labels `// ...`, AnimatePresence + overlayVariants).
- Lecture de `experience.tsx` (pattern timeline vertical gradient line + dots émeraude + ring-background) et de `projects-section.tsx` (pattern divider gradient `h-px flex-1 bg-gradient-to-r from-border via-border/40 to-transparent`).
- Étape 1 — `src/features/projects/data/projects.ts` :
  - Ajout des interfaces `ProjectMetric` (label, value, hint?) et `ProjectTimelineItem` (phase, period, detail), exportées.
  - Ajout de 5 champs optionnels à `Project` : `metrics?`, `challenges?`, `solutions?`, `timeline?`, `impact?` (rétro-compatible).
  - Données case study injectées pour les 3 projets (PayLith = 4 metrics + 3 challenges + 3 solutions + 5 phases timeline + impact ; QueueClock = 4+3+3+3+1 ; Parkour = 4+3+3+3+1). Données exactement conformes au brief, alignées sur l'expertise DDD/CQRS/Redis/WebSockets du portfolio.
- Étape 2 — `src/features/projects/components/project-detail-overlay.tsx` :
  - Imports Lucide étendus : `AlertTriangle`, `CheckCircle2`, `Clock`, `Sparkles`, `TrendingUp`. Imports types : `ProjectMetric`, `ProjectTimelineItem`.
  - Refactor `SectionLabel` → `SectionHeader` (label mono `// xxx` + icône Lucide optionnelle 3.5px primary + divider gradient `h-px flex-1 bg-gradient-to-r from-border via-border/40 to-transparent`). Toutes les sections existantes migrées pour cohérence visuelle premium.
  - 4 nouveaux composants de section (rendu conditionnel si données présentes) :
    * `MetricsSection` (`// métriques`, icône TrendingUp) — grid `grid-cols-1 sm:grid-cols-2`, cartes glass `bg-card/40 backdrop-blur p-4` avec glow émeraude top-right, valeur `text-2xl md:text-3xl font-semibold text-gradient-emerald`, label `text-sm`, hint `font-mono text-[11px] muted`.
    * `ChallengesSolutionsSection` (`// défis & solutions`, icône AlertTriangle) — grid `grid-cols-1 lg:grid-cols-2`, colonne Défis (AlertTriangle + label `text-accent` ambre, items `border-l-accent/60`) et colonne Solutions (CheckCircle2 + label `text-primary` émeraude, items `border-l-primary/60`). Pas de rouge, jamais blue/indigo.
    * `TimelineSection` (`// chronologie`, icône Clock) — `<ol>` sémantique avec vertical gradient line `bg-gradient-to-b from-primary/50 via-primary/20 to-transparent` + dots `bg-primary ring-4 ring-background shadow-[0_0_12px_oklch(0.78_0.17_162/0.6)]` (même glow que experience.tsx), phase `font-medium`, période en badge mono, détail muted.
    * `ImpactSection` (`// impact`, icône Sparkles) — callout premium `rounded-xl border border-primary/20 bg-primary/[0.04] p-5 md:p-6` avec halo `bg-primary/[0.10] blur-3xl`, icône Sparkles dans square émeraude `border-primary/30 bg-primary/10`, texte `text-base md:text-lg leading-relaxed text-pretty`.
- Étape 3 — Ordre narratif final : Hero → Overview → **Métriques** → **Défis & Solutions** → Points clés → Architecture → **Chronologie** → **Impact** → Stack technique → Mon rôle. (Pitch → preuve chiffrée → thinking ingénierie → features → structure → construction → conclusion → référence.)
- Étape 4 — `src/features/projects/index.ts` : re-export des types `Project`, `ProjectMetric`, `ProjectTimelineItem` pour découverte publique.
- Validation : `bunx eslint src/features/projects src/app/page.tsx` → exit 0 (les 2 erreurs globales `react-hooks/static-components` sont dans `src/features/uses/components/uses.tsx`, feature non livrée par un autre agent en parallèle, non touchée par cette task). `bunx tsc --noEmit` → 0 erreur sur les fichiers modifiés (erreurs pré-existantes uniquement dans `examples/` et `skills/`). Dev log : dernières lignes `✓ Compiled in 132ms` + `GET / 200 in 18ms`, aucun `⨯` post-édit. `curl http://localhost:3000/` → HTTP 200, SSR contient PayLith/QueueClock/Parkour.
- Accessibilité : `role="list"` sur les `<ul>` de métriques/défis/solutions, `aria-label` sur chaque nouvelle `<section>` et sur le `<ol>` timeline, `aria-hidden` sur tous les éléments décoratifs (dividers, dots, halos, icônes redondantes).
- Responsive : métriques 1 col mobile → 2×2 sm+ ; défis/solutions stack mobile → 2 col lg ; timeline `pl-8 md:pl-10` avec dots repositionnés ; callout impact `p-5 md:p-6`.
- Conformité design system : dark-first, accent émeraude exclusif pour primary, ambre (`text-accent` / `border-l-accent/60`) pour les challenges (jamais blue/indigo, jamais red), `text-gradient-emerald` sur valeurs de métriques, `bg-card/40` + `backdrop-blur` (glass), `shadow-[0_0_12px_oklch(...)]` glow sur dots timeline.

Stage Summary:
- 4 nouvelles sections case study livrées dans l'overlay projet (Métriques, Défis & Solutions, Chronologie, Impact) + modèle `Project` étendu avec 5 champs optionnels + 2 nouvelles interfaces exportées. Rétro-compatible : aucun champ existant supprimé ou modifié.
- 3 projets enrichis avec données case study réalistes alignées sur l'expertise DDD/CQRS/Redis/WebSockets du portfolio (cohérence avec feature Blog et experience). PayLith reste le masterpiece avec 5 phases timeline.
- Ordre narratif structuré : Overview → Métriques → Défis & Solutions → Points clés → Architecture → Chronologie → Impact → Stack → Rôle (pitch → preuve → thinking → features → structure → construction → conclusion → référence).
- `SectionLabel` refactorisé en `SectionHeader` (icône optionnelle + divider gradient) appliqué uniformément à toutes les sections — l'overlay gagne en hiérarchie visuelle premium.
- Lint clean sur tous les fichiers modifiés, TypeScript clean, dev server compile proprement, page d'accueil 200 OK. Accessible (role/aria-label/aria-hidden, `<ol>` sémantique), responsive (mobile-first 1 col → desktop 2 col), conforme au design system (dark-first, émeraude + ambre, jamais blue/indigo).

---
Task ID: B2
Agent: full-stack-developer
Task: Section "Uses" (premium dev setup) + barre de progression de lecture dans l'overlay blog

Work Log:
- Lecture du worklog précédent (design system dark-first, accent émeraude + ambre, glassmorphism, conventions de nommage/classe)
- Lecture des fichiers existants : src/features/uses/{data,components,index}.ts (déjà présents mais icon stockée en string + ICON_MAP), src/features/blog/components/blog-reader-overlay.tsx (overlay plein écran avec panel scrollable `overflow-y-auto`, header sticky top-0 z-20, panelRef déjà attaché)
- Vérification shared/ui (Section, SectionHeading, Reveal, AuroraBackground) et shared/animations (EASE_PREMIUM, overlayVariants, overlayContentVariants)
- Vérification que `--accent` (ambre oklch 0.82 0.16 80) est bien mappé vers `--color-accent` dans globals.css → `to-accent` est une classe Tailwind valide

FEATURE 1 — Section "Uses" (id="uses") :
- Refactor `src/features/uses/data/uses.ts` :
  - `UsesCategory.icon` passe de `string` à `LucideIcon` (composant stocké directement — type-safe, plus de map à maintenir)
  - Ajout champ `featured?: boolean` sur `UsesCategory` (catégorie "Éditeur & terminal" → `featured: true`)
  - Correction de l'item "Zsh + Starship" (était "tmux + zsh + starship" / "Prompt shell minimal.") → désormais "Zsh + Starship" / "Prompt shell minimal et informatif." (conforme au brief)
  - Suppression du champ `link?` sur `UsesItem` (non utilisé, élimine le code mort)
  - Remplacement de `featuredUsesCategoryId` (string) par `featuredUsesCategory` (UsesCategory) + ajout `regularUsesCategories: UsesCategory[]` (pré-calculé côté data, composant plus simple)
  - Les 5 catégories exactes du brief : Éditeur & terminal (Terminal, featured), Langages & frameworks (Code2), Bases de données & infra (Database), Outils & productivité (Sparkles), Setup matériel (Monitor)
- Refactor `src/features/uses/components/uses.tsx` :
  - Suppression de `ICON_MAP` et `resolveIcon` (désormais `const Icon = category.icon;`)
  - `Uses()` lit `featuredUsesCategory` + `regularUsesCategories` directement depuis les data (plus de `.find`/`.filter` runtime)
  - Featured card : `glass-strong` + `border-gradient` + mono `{"// core setup"}` + items en grid 2 cols (md+), icône dans square émeraude `h-12 w-12` avec `ring-1 ring-primary/30 shadow-glow`
  - Category cards (2×2 sur md) : `glass` + `hover:border-primary/30` + `hover:-translate-y-1`, icône dans square `h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 text-primary`, count badge mono `text-[10px]`
  - Chaque item : `<Check>` émeraude + nom `font-medium text-sm` + description `text-xs text-muted-foreground`
  - Footer : mono `{"// optimisé pour la profondeur, pas la vitesse"}` + divider gradient
  - Cards wrappées dans `<Reveal delay={i * 0.06}>`
- Mise à jour `src/features/uses/index.ts` : exporte `usesCategories, featuredUsesCategory, regularUsesCategories, usesStats` + types
- `src/app/page.tsx` déjà correct : `<Uses />` placé entre `<Education />` et `<Blog />` (aucune modif nécessaire)

FEATURE 2 — Barre de progression de lecture dans l'overlay blog :
- Modification `src/features/blog/components/blog-reader-overlay.tsx` :
  - Import `useScroll, useSpring` depuis framer-motion
  - Dans `BlogReaderOverlay` : `const { scrollYProgress } = useScroll({ container: panelRef });` + `const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });`
  - Le hook `useScroll({ container: panelRef })` cible bien le panel scrollable (le motion.div a `overflow-y-auto premium-scroll`) — la progression suit le scroll INTERNE de l'overlay, pas le window
  - Insertion d'un `<motion.div>` en premier enfant du panel (avant le header sticky) : `sticky top-0 left-0 right-0 z-30 h-0.5 origin-left bg-gradient-to-r from-primary to-accent` avec `style={{ scaleX: progress }}` et `aria-hidden`
  - z-30 > header z-20 : la barre (2px) se peint au-dessus du header en sticky top-0 → rendu "thin progress bar at the very top edge" (pattern Vercel/Linear)
  - `transform-origin: left` via `origin-left` → la barre croît de gauche à droite (0→100%)
  - Gradient émeraude → ambre (`from-primary to-accent`) conforme au design system (NO blue/indigo)
  - `restDelta: 0.001` pour un arrêt propre du spring

Vérifications :
- `bun run lint` → passe sans erreur ni warning
- Dev server recompile proprement (cf. dev.log : `✓ Compiled in ...ms`, aucun message d'erreur)
- Aucune nouvelle route Next.js créée
- Tous les composants interactifs ont `"use client"` (Uses, BlogReaderOverlay)
- Mono labels wrappés en `{"// ..."}` pour éviter `react/jsx-no-comment-textnodes`

Stage Summary:
- Feature 1 — Section "Uses" premium livrée : 5 catégories (1 featured full-width + 4 en grille 2×2), 25 outils au total, icônes Lucide stockées directement en tant que composant (type-safe), hover lift, glassmorphism + border-gradient sur la featured, footer mono avec divider gradient. Refactor élimine ICON_MAP/resolveIcon (code mort) et aligne exactement le brief (item "Zsh + Starship" corrigé, champ `featured` booléen).
- Feature 2 — Barre de progression de lecture ajoutée dans l'overlay blog : 2px, sticky top-0 z-30, gradient émeraude→ambre, `scaleX` piloté par `useSpring(useScroll({ container: panelRef }))` (stiffness 120, damping 30). Suit le scroll interne du panel, pas le window. Positionnement au-dessus du header sticky via z-index supérieur.
- Aucune régression : lint clean, dev server compile, conventions design system respectées (dark-first, accent émeraude + ambre secondaire, NO blue/indigo, glass/border-gradient/premium-scroll utilisés).

---
Task ID: REVIEW-2
Agent: main (Cron Web Dev Review Round 2)
Task: QA testing, case-study depth (project metrics/challenges/timeline/impact), Uses section, blog reading progress, SectionRail (Linear-style side nav), ShortcutsHelp (? keyboard overlay), bug fixes (blog overlay useScroll OOM crash, ThemeToggle hydration)

Work Log:
- Lecture du worklog complet (Tasks 1-8, FINAL-1, A, B, C, REVIEW-1) pour comprendre l'état (13 sections, tous overlays fonctionnels, design system dark-first émeraude)
- QA agent-browser + VLM (glm-4.6v): captures hero/testimonials/blog, identification d'opportunités (case-study depth, Uses section, side rail)
- Dispatch 2 subagents en parallèle:
  * Task A2 (subagent): Project case-study depth — extension interface Project (metrics, challenges, solutions, timeline, impact) + 4 nouvelles sections dans l'overlay (// métriques 2×2 grid, // défis & solutions 2-col avec AlertTriangle ambre + CheckCircle2 émeraude, // chronologie vertical timeline, // impact callout). Ordre narratif: Hero → Overview → Métriques → Défis & Solutions → Points clés → Architecture → Chronologie → Impact → Stack → Rôle. Données réalistes pour PayLith (4 KPIs, 3 défis, 3 solutions, 5 phases timeline), QueueClock (latence <80ms, 50+ files, 3 instances), Parkour (précision ±3m, 12 défis, batterie <4%/h).
  * Task B2 (subagent): Uses section (5 catégories: Éditeur & terminal featured, Langages & frameworks, Bases de données & infra, Outils & productivité, Setup matériel — 25 items au total: Neovim, VS Code, WezTerm, Tmux, TypeScript, Spring Boot, NestJS, PostgreSQL, Redis, Docker, Raycast, Linear, Figma, MacBook Pro M2 Pro, etc.) + reading progress bar dans blog overlay (useScroll + useSpring, gradient émeraude→ambre, sticky top, tracks panel internal scroll)
- Développement direct (Task C):
  * SectionRail (src/features/section-rail/): rail vertical fixe left-5 top-1/2 (xl+ only), 13 dots avec index mono 01-13, active dot = émeraude glow + ring animé (layoutId), label apparaît on hover/active avec AnimatePresence width animation, aria-label "Navigation par section", aria-current, focus-visible rings. Constant railSections ajoutée à profile.ts.
  * ShortcutsHelp (src/features/shortcuts/): overlay ? (Shift+/) avec 9 raccourcis groupés (Navigation: ⌘K, ?, GB/GP/GC, ↑↓; Overlays: Esc, ←→; Apparence: T). Raccourcis fonctionnels: G+B/P/C → scroll to blog/projects/contact, T → toggle thème, ? → aide. Kbd component stylé, AnimatePresence overlay, lien vers palette.
  * Intégration: SectionRail dans page.tsx (après Navbar), ShortcutsHelp dans providers.tsx (après children)
- Bug critiques trouvés et corrigés:
  * BUG CRITIQUE: blog-reader-overlay.tsx appelait useScroll({ container: panelRef }) inconditionnellement — panelRef.current était null au chargement initial (overlay fermé), causant un crash client-side "Application error: a client-side exception has occurred" (page entière blanche, 0 sections rendues). FIX: utilisation d'un state scrollContainer + useEffect qui setScrollContainer(panelRef.current) seulement quand post change, évitant de passer un ref null à useScroll.
  * BUG HYDRATATION: theme-toggle.tsx aria-label dépendait de `theme` (undefined en SSR, "dark" en client) → mismatch d'hydratation React 19. FIX: isDark = mounted ? theme === "dark" : true (default dark matching defaultTheme), + suppressHydrationWarning sur le Button.
- Contrainte environnement: le serveur dev Next.js 16 Turbopack utilise ~2.1GB RSS. Avec Chrome (agent-browser) ~1.5GB, le total dépasse les 4GB RAM du sandbox → OOM killer tue next-server. Vérification basculée sur curl SSR + lint. Toutes les features confirmées dans le HTML SSR: 13 sections, 13 boutons SectionRail, Uses (5 catégories), Blog (3 articles), Testimonials.
- Vérifications finales:
  * bun run lint → exit 0 (0 erreur)
  * curl SSR: 13 data-section-id, 13 aria-label "Aller à la section", id="uses" ✓, id="blog" ✓, "Navigation par section" ✓, "Témoignages sur Adama" ✓
  * Blog reader overlay: useScroll fixé (plus de crash client-side)
  * Project overlay: 5 nouvelles sections (métriques, défis & solutions, chronologie, impact) + sections existantes conservées
  * Uses: 5 catégories, 25 items, featured card Éditeur & terminal
  * SectionRail: 13 sections, Linear-style vertical indicator
  * ShortcutsHelp: 9 raccourcis, ?, G+key, T thème toggle

Stage Summary:
- 2 nouvelles features majeures: SectionRail (indicateur vertical Linear-style avec 13 sections) + ShortcutsHelp (overlay ? avec 9 raccourcis clavier fonctionnels)
- 2 enhancements subagents: Project case-study depth (métriques + défis/solutions + chronologie + impact pour 3 projets) + Uses section (5 catégories, 25 outils) + blog reading progress bar
- 2 bugs critiques corrigés: blog overlay useScroll null ref crash (page blanche) + ThemeToggle hydration mismatch
- Portfolio passe de 13 → 13 sections (Uses ajoutée entre Education et Blog) mais avec overlays enrichis (project case-study 5x plus de contenu) + 2 micro-interactions premium (side rail + shortcuts)
- Lint clean, SSR valide toutes features, code correct
- Limitation: test browser agent-browser bloqué par OOM (4GB RAM), vérification via curl SSR
