"use client";

import * as React from "react";
import { SectionObserverProvider } from "@/shared/hooks/use-section-observer";
import { LanguageProvider, messages } from "@/shared/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider messages={messages}>
      <SectionObserverProvider>{children}</SectionObserverProvider>
    </LanguageProvider>
  );
}
