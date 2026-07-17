"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useScrolled } from "@/shared/hooks/use-scroll";
import { useActiveSection } from "@/shared/hooks/use-section-observer";
import { navSections, profile } from "@/shared/constants/profile";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { CommandMenuTrigger } from "./command-trigger";
import { LanguageToggle } from "./language-toggle";

export function Navbar() {
  const scrolled = useScrolled(16);
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const t = useT();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mt-3 flex h-14 items-center justify-between gap-4 rounded-2xl px-3 transition-all duration-300",
            scrolled
              ? "glass-strong shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)]"
              : "border border-transparent"
          )}
        >
          {/* Brand */}
          <Link
            href="/#hero"
            onClick={(e) => handleNav(e, "hero")}
            className="group flex items-center gap-2.5 pl-1"
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <Terminal className="h-4 w-4" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-mono text-sm font-semibold tracking-tight">
                {profile.firstName}
                <span className="text-primary">.</span>
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
                {t("nav.brandRole")}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navSections.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => handleNav(e, item.id)}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(item.labelKey)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <CommandMenuTrigger />
            <LanguageToggle />
            <ThemeToggle />

            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex ml-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-9"
            >
              <Link
                href="/#contact"
                onClick={(e) => handleNav(e, "contact")}
                className="gap-1.5"
              >
                {t("common.contactMe")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 rounded-lg"
                  aria-label={t("common.openMenu")}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="h-auto border-border bg-background/95 backdrop-blur-xl"
              >
                <SheetTitle className="sr-only">{t("common.section")}</SheetTitle>
                <div className="flex items-center justify-between px-1 pt-1 pb-4">
                  <span className="font-mono text-sm font-semibold">
                    {profile.firstName}
                    <span className="text-primary">.</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
                <nav className="flex flex-col gap-1">
                  {navSections.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.05 }}
                    >
                      <SheetClose asChild>
                        <Link
                          href={`/#${item.id}`}
                          onClick={(e) => handleNav(e, item.id)}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium hover:bg-muted transition-colors"
                        >
                          <span>{t(item.labelKey)}</span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    asChild
                    className="w-full rounded-xl bg-primary text-primary-foreground"
                  >
                    <Link href="/#contact" onClick={(e) => handleNav(e, "contact")}>
                      {t("common.contactMe")}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
