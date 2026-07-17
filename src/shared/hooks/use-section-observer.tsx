"use client";

import * as React from "react";

export interface SectionContextValue {
  active: string | null;
  setActive: (id: string | null) => void;
}

const SectionContext = React.createContext<SectionContextValue | null>(null);

export function SectionObserverProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section-id]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.getAttribute("data-section-id"));
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return <SectionContext.Provider value={{ active, setActive }}>{children}</SectionContext.Provider>;
}

export function useActiveSection() {
  const ctx = React.useContext(SectionContext);
  return ctx?.active ?? null;
}
