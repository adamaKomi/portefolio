"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { profile, socials, navSections } from "@/shared/constants/profile";
import { Button } from "@/components/ui/button";
import { useT } from "@/shared/i18n";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

export function Footer() {
  const t = useT();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-auto border-t border-border bg-background/50 backdrop-blur-sm">
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/#hero" className="flex items-center gap-2.5 w-fit">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <Terminal className="h-4 w-4" />
              </span>
              <span className="font-mono text-sm font-semibold">
                {profile.firstName}
                <span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon as keyof typeof socialIcons] ?? Mail;
                return (
                  <Button
                    key={s.name}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg border border-border bg-card/40"
                  >
                    <Link href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}>
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t("footer.navTitle")}
            </span>
            {navSections.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t("footer.contactTitle")}
            </span>
            <Link
              href={`mailto:${profile.email}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit break-all"
            >
              {profile.email}
            </Link>
            <span className="text-sm text-muted-foreground">{t("common.location")}</span>
            <span className="text-sm text-primary font-mono mt-1">
              ● {t("footer.available")}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-6">
          <p className="font-mono text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground">
              {mounted ? Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone }).format(new Date()) : ""} · {profile.timezone}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollTop}
              className="h-9 w-9 rounded-lg border border-border bg-card/40 hover:bg-card"
              aria-label={t("common.backToTop")}
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <ArrowUp className="h-4 w-4" />
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
