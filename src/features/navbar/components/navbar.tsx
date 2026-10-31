"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useScrolled } from "@/shared/hooks/use-scroll";
import { useActiveSection } from "@/shared/hooks/use-section-observer";
import { navSections, profile } from "@/shared/constants/profile";
import { Container } from "@/shared/ui";
import { useT } from "@/shared/i18n";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";

function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const scrolled = useScrolled(8);
  const active = useActiveSection();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const t = useT();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b bg-background transition-colors",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <Container className="flex h-14 items-center justify-between gap-6">
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "hero")}
          className="font-display text-lg tracking-tight"
        >
          {profile.name}
        </a>

        <div className="flex items-center gap-7">
          <nav className="hidden items-center gap-7 md:flex">
            {navSections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "label-caps decoration-primary decoration-2 underline-offset-[6px] transition-opacity",
                  active === item.id ? "underline" : "opacity-70 hover:opacity-100"
                )}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <LanguageToggle />
            <ThemeToggle />

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label={t("common.openMenu")}>
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="px-5 pt-14 pb-8">
                <SheetTitle className="sr-only">{t("common.openMenu")}</SheetTitle>
                <nav className="flex flex-col">
                  {navSections.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        setMobileOpen(false);
                        scrollToSection(e, item.id);
                      }}
                      className="border-b border-border py-3 font-display text-3xl tracking-tight last:border-b-0"
                    >
                      {t(item.labelKey)}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
