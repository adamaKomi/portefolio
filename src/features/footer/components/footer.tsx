"use client";

import { profile, socials } from "@/shared/constants/profile";
import { Container } from "@/shared/ui";
import { useT } from "@/shared/i18n";

/** Pied de page en colophon, comme à la dernière page d'une revue. */
export function Footer({ email }: { email: string }) {
  const t = useT();

  const links = [
    ...socials.map((s) => ({ label: s.name, href: s.href })),
    ...(email ? [{ label: "Email", href: `mailto:${email}` }] : []),
  ];

  return (
    <footer>
      <Container>
        <p aria-hidden className="pb-6 text-center font-display text-2xl text-primary">
          ⁂
        </p>
        <div className="grid gap-8 border-t-2 border-foreground py-10 md:grid-cols-3 md:items-baseline">
          <p className="font-display text-2xl tracking-tight">{profile.name}</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t("footer.colophon")}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 label-caps md:justify-end">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="opacity-70 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#hero" className="opacity-70 transition-opacity hover:opacity-100">
                {t("footer.backToTop")}
              </a>
            </li>
          </ul>
        </div>
        <p className="pb-8 label-caps opacity-60">
          © {new Date().getFullYear()} · {t("common.location")}
        </p>
      </Container>
    </footer>
  );
}
