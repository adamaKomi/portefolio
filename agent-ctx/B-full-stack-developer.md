# Task ID: B — Blog feature

- **Agent**: full-stack-developer
- **Date**: 2024-Q4
- **Scope**: Premium blog section for Adama Komi's portfolio (dark-first, emerald accent, glassmorphism).

## Task
Add a complete Blog feature (`id="blog"`) to the portfolio: 3 technical articles with structured content blocks, a cards grid section, and a full-screen reader overlay reusing the project overlay hash-routing pattern (`#/blog/<slug>`).

## Work Log
- Read `/home/z/my-project/worklog.md` to align with prior conventions (Tasks 1, 4, 5, 6, 7, 8, FINAL-1).
- Studied the project overlay reference implementation (`src/features/projects/components/projects-section.tsx` and `project-detail-overlay.tsx`) to replicate the hash-routing + AnimatePresence + scroll-lock pattern.
- Confirmed shared utilities (`glass-strong`, `bg-grid-sm`, `text-gradient-emerald`, `shadow-glow`, `premium-scroll`, `AuroraBackground`, `Section`, `SectionHeading`, `Reveal`, `overlayVariants`, `overlayContentVariants`, `EASE_PREMIUM`).
- Created `src/features/blog/data/posts.ts`:
  - `ContentBlock` union type: `{type:'heading'|'paragraph'|'code'|'list', ...}`.
  - `BlogPost` interface (slug, title, excerpt, date, readingTime, tags, category, highlightKeyword, content[]).
  - 3 articles: `clean-architecture-nodejs`, `websockets-redis-temps-reel`, `ddd-modeliser-le-metier` — each with realistic FR technical content reinforcing Adama's expertise (NestJS + DDD + Redis pub/sub). Posts sorted by date desc.
  - Helpers: `getPost(slug)`, `getNextPost(slug)`, `getPrevPost(slug)` (looping), `formatPostDate(iso)` (fr-FR).
- Created `src/features/blog/components/content-renderer.tsx`:
  - Renders `ContentBlock[]` via discriminated union switch.
  - heading → `<h2>` with emerald accent bar prefix.
  - paragraph → `<p>` muted-foreground leading-relaxed.
  - code → faux macOS editor window: header with 3 dots (destructive/accent/primary) + uppercase language label, body in `<pre><code>` with line numbers + emerald italic tint on `// ...` comments (lightweight, no tokenizer — string-aware scanner ignores `//` inside quotes).
  - list → `<ul>` with emerald checkmark pills.
- Created `src/features/blog/components/blog-card.tsx`:
  - `motion.article` clickable + keyboard-accessible (role="button", tabIndex=0, Enter/Space).
  - Glass-strong rounded-2xl, hover lift + emerald border glow + focus-visible ring.
  - Cover area: gradient + grid-sm + BookOpen watermark (scales on hover) + category mono tag.
  - Body: date (`<time dateTime>`) + reading time (Clock icon) — both mono; title (clamp-2 lg/xl); excerpt (clamp-3 muted); tags as mono badges; CTA "Lire l'article →" with mt-auto.
- Created `src/features/blog/components/blog-reader-overlay.tsx`:
  - Full AnimatePresence + overlayVariants (backdrop) + overlayContentVariants (panel).
  - Inner AnimatePresence mode="wait" keyed by slug for fluid prev/next swap.
  - role="dialog" aria-modal="true" aria-label=`Article : {title}`.
  - Sticky header: back button (ArrowLeft) + counter "i / 3" + close (X) with ref for focus.
  - Cover banner: gradient + grid + BookOpen watermark + mono category tag.
  - Hero: meta row (date + reading time), title with `highlightKeyword` rendered via `text-gradient-emerald`, tags, excerpt in a lead block with emerald left border.
  - Article body: `<ContentRenderer blocks={post.content} />`.
  - Footer divider `// fin de l'article`.
  - Prev/Next nav: 2-col grid of NavCard buttons (label + title + meta), align right for next.
  - Sticky CTA footer: "Me contacter" → close + smooth-scroll to `#contact`.
  - ESC to close, body scroll lock, focus close button on open, scroll reset on navigate.
- Created `src/features/blog/components/blog-section.tsx`:
  - `<Section id="blog">` + `<AuroraBackground variant="section" />`.
  - SectionHeading eyebrow="Blog" title="Articles & réflexions techniques." + description.
  - Header strip: mono `{"// 03 articles"}` + gradient divider (same pattern as projects).
  - Responsive grid: 1 col mobile → 2 col sm → 3 col lg, each `<BlogCard>` wrapped in `<Reveal delay>` for stagger.
  - Hint line "Cliquez sur un article pour le lire en entier. ↗".
  - Hash routing: `BLOG_HASH_RE = /^#\/blog\/([\w-]+)$/` (distinct from `#/projects/`).
    - syncFromHash on mount (deep-link support) + popstate + hashchange listeners.
    - openPost: pushState(#/blog/slug) + setState.
    - closePost: history.back() if hash is a blog (popstate syncs), else setState(null).
    - navigatePost: replaceState (no history stack bloat) + setState.
    - handleContact: closePost + setTimeout(400ms) → smooth-scroll to `#contact` after exit animation + body unlock.
- Created `src/features/blog/index.ts` barrel: `Blog`, `BlogCard`, `BlogReaderOverlay`, `ContentRenderer`, `posts`, `getPost`, `getNextPost`, `getPrevPost`, `formatPostDate`, types `BlogPost`, `ContentBlock`.
- Added `Blog` to `src/app/page.tsx` between `Education` and `WhatImLookingFor` (content/reflective section sits naturally before conversion CTAs).
- Lint: `bunx eslint src/features/blog src/app/page.tsx` → 0 errors.
- TS: `bunx tsc --noEmit` → 0 errors on blog/page (pre-existing errors only in `examples/` and `skills/`).
- Dev log: page loads 200 OK, fresh compiles clean, no `⨯` markers after my edits. SSR grep confirms `id="blog"` + all 3 article titles present in initial HTML.

## Stage Summary
- Blog feature delivered as 6 files in `src/features/blog/` + 1-line addition to `page.tsx`. No new Next.js routes, no MDX setup.
- 3 articles with structured `ContentBlock` union (heading / paragraph / code / list) — content approach keeps rendering simple and reliable while still showcasing real technical writing (Clean Arch, WebSockets+Redis pub/sub, DDD aggregates).
- Overlay reuses the proven project-overlay pattern (hash routing `#/blog/<slug>`, AnimatePresence mode="wait" for prev/next swap, ESC + scroll lock + focus management, deep-link support). No conflict with `#/projects/<slug>`.
- Faux editor code blocks (macOS dots + language label + line numbers + emerald comment tint) give a premium feel without a syntax-highlighting dependency.
- 100% responsive: 1-col mobile cards, full-screen overlay on mobile, 2-col sm → 3-col lg grid on desktop.
- Accessible: `role="dialog"`/`aria-modal`/`aria-label`, keyboard nav on cards (Enter/Space) and overlay (ESC), focus close button on open, semantic `<article>`/`<header>`/`<h2>`/`<time>`/`<pre>`/`<code>`.
- Design-system-compliant: dark-first, emerald accent, glassmorphism, grid bg, text-gradient-emerald on highlighted keyword, premium-scroll, mono labels `// 03 articles` and `// fin de l'article`.

## Files Created / Modified
- `src/features/blog/data/posts.ts` (new)
- `src/features/blog/components/content-renderer.tsx` (new)
- `src/features/blog/components/blog-card.tsx` (new)
- `src/features/blog/components/blog-reader-overlay.tsx` (new)
- `src/features/blog/components/blog-section.tsx` (new)
- `src/features/blog/index.ts` (new)
- `src/app/page.tsx` (modified — added `Blog` import + `<Blog />` between `<Education />` and `<WhatImLookingFor />`)

## Final Article List
1. `clean-architecture-nodejs` — "Clean Architecture en Node.js : séparer le métier du framework" (2024-11-15, 8 min, Architecture)
2. `websockets-redis-temps-reel` — "WebSockets + Redis : scaler le temps réel horizontalement" (2024-10-02, 10 min, Systèmes distribués)
3. `ddd-modeliser-le-metier` — "Domain-Driven Design : modéliser le métier avant le code" (2024-08-20, 7 min, Architecture)
