import Link from "next/link";
import { Terminal, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Background grid + orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid mask-radial opacity-50" />
        <div
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.17 162 / 0.15), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.16 80 / 0.1), transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-6 text-center">
        {/* Terminal icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-glow">
          <Terminal className="h-7 w-7" />
        </div>

        {/* 404 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-7xl md:text-8xl font-semibold tracking-tight text-gradient leading-none">
            404
          </h1>
          <p className="font-mono text-sm text-muted-foreground tracking-wide">
            {"// route not found"}
          </p>
        </div>

        {/* Message */}
        <p className="max-w-md text-base md:text-lg text-muted-foreground text-pretty">
          This page doesn&apos;t exist — or maybe it hasn&apos;t been built yet.
          Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-glow transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Back to home
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/#projects"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card/40 px-6 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-card"
          >
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
