/**
 * Données de la section "Uses" — setup quotidien d'Adama Komi.
 *
 * Inspiré des pages /uses de Linear, Vercel, Raycast : liste crédible
 * d'outils qu'un ingénieur full-stack utilise au quotidien.
 *
 * Le champ `icon` stocke directement le composant LucideIcon — plus simple
 * et type-safe (pas de map string → composant à maintenir côté composant).
 *
 * i18n :
 *  - `name` est universel ("Neovim", "VS Code", etc.) — non traduit.
 *  - `descKey` pointe vers la clé i18n de la description (ex. `uses.item.neovim`).
 *  - `titleKey` pointe vers la clé i18n du titre de catégorie (ex. `uses.cat1`).
 */
import {
  Code2,
  GitBranch,
  Package,
  Settings,
  Monitor,
  type LucideIcon,
} from "lucide-react";

import type { TranslationKey } from "@/shared/i18n";

export interface UsesItem {
  /** Nom universel — non traduit (ex. "Neovim", "TypeScript"). */
  name: string;
  /** Clé i18n de la description (ex. "uses.item.neovim"). */
  descKey: TranslationKey;
}

export interface UsesCategory {
  id: string;
  /** Clé i18n du titre de catégorie (ex. "uses.cat1"). */
  titleKey: TranslationKey;
  icon: LucideIcon;
  /** Catégorie mise en avant : carte full-width en haut de section. */
  featured?: boolean;
  items: UsesItem[];
}

export const usesCategories: UsesCategory[] = [
  {
    id: "editors",
    titleKey: "uses.cat1",
    icon: Code2,
    featured: true,
    items: [
      { name: "VS Code", descKey: "uses.item.vscode" },
      { name: "antigravity", descKey: "uses.item.antigravity" },
    ],
  },
  {
    id: "versioning",
    titleKey: "uses.cat2",
    icon: GitBranch,
    items: [
      { name: "Git", descKey: "uses.item.git" },
      { name: "GitHub", descKey: "uses.item.github" },
    ],
  },
  {
    id: "containerization",
    titleKey: "uses.cat3",
    icon: Package,
    items: [
      { name: "Docker", descKey: "uses.item.docker" },
      { name: "Docker Compose", descKey: "uses.item.dockercompose" },
    ],
  },
  {
    id: "tools",
    titleKey: "uses.cat4",
    icon: Settings,
    items: [
      { name: "Postman", descKey: "uses.item.postman" },
      { name: "Figma", descKey: "uses.item.figma" },
    ],
  },
  {
    id: "systems",
    titleKey: "uses.cat5",
    icon: Monitor,
    items: [
      { name: "Windows", descKey: "uses.item.windows" },
      { name: "Ubuntu", descKey: "uses.item.ubuntu" },
    ],
  },
];

/** Catégorie mise en avant (full-width featured card). */
export const featuredUsesCategory: UsesCategory =
  usesCategories.find((c) => c.featured) ?? usesCategories[0];

/** Catégories régulières (grille 2×2 sous la featured). */
export const regularUsesCategories: UsesCategory[] = usesCategories.filter(
  (c) => !c.featured,
);

/** Compteurs globaux (utiles pour les mono labels). */
export const usesStats = {
  categories: usesCategories.length,
  items: usesCategories.reduce((acc, c) => acc + c.items.length, 0),
};
