# Portfolio — Adama Komi

> A modern, bilingual portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

This is the personal portfolio of [Adama Komi](https://github.com/adamaKomi), a software engineering graduate from FSTM (Hassan II University of Casablanca). The site is designed as a single-page application that functions as a living resume, project showcase, and technical blog — all in one.

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 + `tw-animate-css` |
| **Component Library** | shadcn/ui (New York style) + Radix UI primitives |
| **Animation** | Framer Motion 12 |
| **Forms & Validation** | React Hook Form + Zod 4 |
| **Icons** | Lucide React |
| **Theming** | next-themes (dark-first) |
| **Internationalization** | Custom locale system (English / French) |
| **State Management** | Zustand 5 |
| **ORM** | Prisma 6 (PostgreSQL) |
| **Email Service** | Resend API |
| **Charts** | Recharts |
| **Command Palette** | cmdk |
| **Notifications** | sonner |

## Architecture

The codebase follows a **feature-based** architecture under `src/features/`. Each feature is self-contained with its own components, data files, and barrel export. Shared utilities, hooks, types, i18n messages, and UI primitives are extracted into `src/shared/` for cross-cutting reuse.

```
src/
├── app/                    # Next.js App Router
│   ├── api/contact/        # POST endpoint — contact form (Resend)
│   ├── api/                # Health check endpoint
│   ├── globals.css         # Global styles, CSS variables, keyframes
│   ├── layout.tsx          # Root layout with providers
│   ├── not-found.tsx       # Custom 404 page
│   ├── opengraph-image.tsx # Dynamic OG image generation
│   ├── page.tsx            # Home page (single-page entry point)
│   ├── providers.tsx       # React context providers
│   ├── robots.ts           # Robots.txt configuration
│   └── sitemap.ts          # Dynamic sitemap generation
├── components/ui/          # shadcn/ui generated components (40+)
├── config/                 # Environment variable validation (Zod)
├── features/               # Feature modules
│   ├── about/
│   ├── blog/
│   ├── command-palette/
│   ├── contact/
│   ├── expertise/
│   ├── footer/
│   ├── hero/
│   ├── journey/
│   ├── navbar/
│   ├── philosophy/
│   ├── projects/
│   ├── section-rail/
│   ├── shortcuts/
│   ├── testimonials/
│   └── uses/
├── hooks/                  # Shared hooks (use-mobile, use-toast)
├── lib/                    # Prisma client, utility functions (cn)
└── shared/                 # Cross-cutting shared layer
    ├── animations/         # Framer Motion variants
    ├── constants/          # Profile data, social links, nav config
    ├── hooks/              # use-scroll, use-section-observer, use-count-up
    ├── i18n/               # EN/FR message files (501 keys each) + provider
    ├── lib/                # Theme provider (next-themes wrapper)
    ├── types/              # Shared TypeScript types
    └── ui/                 # Custom UI components
        ├── aurora-background.tsx
        ├── back-to-top.tsx
        ├── cursor-glow.tsx
        ├── magnetic.tsx
        ├── marquee.tsx
        ├── reveal.tsx
        ├── scroll-progress.tsx
        ├── section-divider.tsx
        └── section.tsx
```

## Sections

The site is a single-page scroll with 10 sections, navigable via scroll, a fixed vertical section rail, keyboard shortcuts, and a command palette.

| # | Section | Purpose |
|---|---|---|
| 01 | **Hero** | Terminal-style title card, availability badge, social links, current project status |
| 02 | **About** | Biography, portrait photo, personality traits |
| 03 | **Philosophy** | 4 engineering principles: Clean Architecture, DDD, Simplicity, Scalability |
| 04 | **Expertise** | 6 domain cards (Backend, Frontend, Mobile, Database, Architecture, Cloud/DevOps) + tech marquee |
| 05 | **Projects** | Bento grid with full-screen case study overlays (hash-routed) |
| 06 | **Journey** | Education timeline, skills grid, next goals callout |
| 07 | **Uses** | Developer tools and equipment (categorized) |
| 08 | **Blog** | Technical articles with full-screen reader overlays |
| 09 | **Testimonials** | Recommendations from professors, peers, and mentors |
| 10 | **Contact** | Opportunities panel, info sidebar, validated contact form |
| — | **Footer** | Brand, navigation, contact info, copyright |

## Features

### Single-Page Application
All content lives on one page with smooth scroll navigation. Section changes update the URL hash and the active state in the vertical section rail.

### Internationalization (i18n)
Full English and French translations (501 keys each) stored as typed TypeScript objects. A locale toggle in the navbar switches between languages instantly. The locale is persisted across sessions.

### Command Palette
Press `Cmd+K` (or `Ctrl+K`) to open a searchable command palette built with cmdk. It provides quick access to all sections, theme toggling, and external links.

### Keyboard Shortcuts
| Shortcut | Action |
|---|---|
| `?` | Show shortcuts help overlay |
| `T` | Toggle dark/light theme |
| `G` + `B` | Navigate to Blog section |
| `G` + `P` | Navigate to Projects section |
| `G` + `C` | Navigate to Contact section |

### Dark & Light Themes
Dark-first design with next-themes. Uses OKLCH color space with emerald (`oklch(0.78 0.17 162)`) and amber (`oklch(0.82 0.16 80)`) as accent colors. Includes utilities for glassmorphism, gradient text, grid/dot backgrounds, glow shadows, and CSS noise texture.

### Animations
- **Framer Motion** — scroll-triggered reveal animations, staggered list entries, magnetic hover effects
- **Custom cursor glow** — subtle radial gradient that follows the mouse
- **Aurora background** — animated gradient orbs with grid overlay
- **Scroll progress** — top-of-page progress bar
- **Section dividers** — animated gradient separators between sections

### Contact Form
Three-field form (name, email, message) with:
- Client-side validation via Zod schema
- Server-side validation via Prisma
- Email delivery via Resend API
- Toast notifications (success/error) via sonner

### Project Detail Overlays
Each project opens as a full-screen overlay with hash-based routing (`#/project/<slug>`). Overlays include architecture description, role, timeline, challenges, solutions, and key highlights.

### Blog Reader Overlay
Articles render in a full-screen reader with reading progress, syntax-highlighted code blocks (react-syntax-highlighter), and prev/next navigation between posts. Content is structured as typed TypeScript blocks (paragraph, heading, code, list) rendered by a custom ContentRenderer component.

### Responsive Design
Mobile-first layout with a sheet navigation on small screens. The section rail and command palette are hidden on mobile in favor of touch-friendly interactions.

### Metadata & SEO
- Dynamic Open Graph image generation (`opengraph-image.tsx`)
- Automatic sitemap generation (`sitemap.ts`)
- Robots.txt configuration (`robots.ts`)
- Typed layout metadata via Next.js Metadata API

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Resend API key (for contact form)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Edit .env with your values:
#   DATABASE_URL        — PostgreSQL connection string
#   RESEND_API_KEY      — Resend API key
#   CONTACT_EMAIL_TO    — Recipient email address
#   CONTACT_EMAIL_FROM  — Sender email address

# Push Prisma schema to the database
npm run db:push

# Start development server on port 3000
npm run dev
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Production build (standalone output) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:reset` | Reset database migrations |

### Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|---|
| `DATABASE_URL` | Yes | `postgresql://postgres:postgres@localhost:5432/portfolio?schema=public` | PostgreSQL connection string |
| `RESEND_API_KEY` | Yes | — | Resend API key for email delivery |
| `CONTACT_EMAIL_TO` | Yes | — | Recipient email address for contact form |
| `CONTACT_EMAIL_FROM` | Yes | — | Sender email address for contact form emails |
| `NEXT_PUBLIC_WEBSITE_URL` | No | — | Public website URL (sitemap/OG) |
| `NEXT_PUBLIC_RESUME_URL` | No | `#` | Resume download link |
