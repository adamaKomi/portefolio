"use client";

import { Container, SectionHead } from "@/shared/ui";
import { useLanguage } from "@/shared/i18n";
import { resumeUrls, socials } from "@/shared/constants/profile";
import { ContactForm } from "./contact-form";

export function Contact({ email }: { email: string }) {
  const { t, locale } = useLanguage();

  const links = [
    ...socials.map((s) => ({ label: s.name, href: s.href })),
    { label: t("contact.cv"), href: resumeUrls[locale] },
  ];

  return (
    <section id="contact" data-section-id="contact">
      <Container className="py-section">
        <SectionHead label={t("contact.title")} aside={t("contact.response")} />

        <p className="mt-12 font-display text-shout tracking-[-0.04em] md:mt-16">
          {t("contact.headline")}
        </p>

        <div className="mt-14 grid gap-16 md:mt-20 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed">{t("contact.lead")}</p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="link-spot mt-4 inline-block font-display text-statement break-all"
              >
                {email}
              </a>
            )}
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-spot">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="label-caps">{t("contact.formTitle")}</p>
            <ContactForm className="mt-8" />
          </div>
        </div>
      </Container>
    </section>
  );
}
