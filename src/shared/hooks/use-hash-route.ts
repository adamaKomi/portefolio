"use client";

import * as React from "react";

/**
 * Synchronise un élément ouvert (projet, article) avec le hash de l'URL,
 * sous la forme `#/<prefix>/<slug>`, pour permettre les liens directs.
 * `isValid` doit être une référence stable (fonction de module).
 */
export function useHashRoute(prefix: string, isValid: (slug: string) => boolean) {
  const [slug, setSlug] = React.useState<string | null>(null);
  // Vrai si l'entrée d'historique courante a été ajoutée par `open`.
  const pushedRef = React.useRef(false);

  React.useEffect(() => {
    const pattern = new RegExp(`^#/${prefix}/([\\w-]+)$`);
    const sync = () => {
      const match = window.location.hash.match(pattern);
      const next = match && isValid(match[1]) ? match[1] : null;
      if (!next) pushedRef.current = false;
      setSlug(next);
    };
    sync();
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [prefix, isValid]);

  const open = React.useCallback(
    (next: string) => {
      window.history.pushState(null, "", `#/${prefix}/${next}`);
      pushedRef.current = true;
      setSlug(next);
    },
    [prefix]
  );

  const navigate = React.useCallback(
    (next: string) => {
      window.history.replaceState(null, "", `#/${prefix}/${next}`);
      setSlug(next);
    },
    [prefix]
  );

  const close = React.useCallback(() => {
    if (pushedRef.current) {
      window.history.back();
    } else {
      // Arrivée directe par lien : on nettoie l'URL sans quitter le site.
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setSlug(null);
    }
  }, []);

  return { slug, open, navigate, close };
}

