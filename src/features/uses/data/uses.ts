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
  Database,
  Monitor,
  Sparkles,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export interface UsesItem {
  /** Nom universel — non traduit (ex. "Neovim", "TypeScript"). */
  name: string;
  /** Clé i18n de la description (ex. "uses.item.neovim"). */
  descKey: string;
}

export interface UsesCategory {
  id: string;
  /** Clé i18n du titre de catégorie (ex. "uses.cat1"). */
  titleKey: string;
  icon: LucideIcon;
  /** Catégorie mise en avant : carte full-width en haut de section. */
  featured?: boolean;
  items: UsesItem[];
}

export const usesCategories: UsesCategory[] = [
  {
    id: "editor-terminal",
    titleKey: "uses.cat1",
    icon: Terminal,
    featured: true,
    items: [
      { name: "Neovim", descKey: "uses.item.neovim" },
      { name: "VS Code", descKey: "uses.item.vscode" },
      { name: "WezTerm", descKey: "uses.item.wezterm" },
      { name: "Tmux", descKey: "uses.item.tmux" },
      { name: "Zsh + Starship", descKey: "uses.item.zsh" },
    ],
  },
  {
    id: "languages-frameworks",
    titleKey: "uses.cat2",
    icon: Code2,
    items: [
      { name: "TypeScript", descKey: "uses.item.typescript" },
      { name: "Java + Spring Boot", descKey: "uses.item.spring" },
      { name: "Node.js + NestJS", descKey: "uses.item.nestjs" },
      { name: "Python + FastAPI", descKey: "uses.item.fastapi" },
      { name: "React + Next.js", descKey: "uses.item.nextjs" },
    ],
  },
  {
    id: "databases-infra",
    titleKey: "uses.cat3",
    icon: Database,
    items: [
      { name: "PostgreSQL", descKey: "uses.item.postgres" },
      { name: "Redis", descKey: "uses.item.redis" },
      { name: "MongoDB", descKey: "uses.item.mongodb" },
      { name: "Docker", descKey: "uses.item.docker" },
      { name: "Git + GitHub", descKey: "uses.item.git" },
    ],
  },
  {
    id: "tools-productivity",
    titleKey: "uses.cat4",
    icon: Sparkles,
    items: [
      { name: "Raycast", descKey: "uses.item.raycast" },
      { name: "Linear", descKey: "uses.item.linear" },
      { name: "Figma", descKey: "uses.item.figma" },
      { name: "TablePlus", descKey: "uses.item.tableplus" },
      { name: "Obsidian", descKey: "uses.item.obsidian" },
    ],
  },
  {
    id: "hardware-setup",
    titleKey: "uses.cat5",
    icon: Monitor,
    items: [
      { name: 'MacBook Pro 14" M2 Pro', descKey: "uses.item.macbook" },
      { name: "LG 27UP850", descKey: "uses.item.monitor" },
      { name: "Keychron K2", descKey: "uses.item.keyboard" },
      { name: "Logitech MX Master 3S", descKey: "uses.item.mouse" },
      { name: "AirPods Pro", descKey: "uses.item.airpods" },
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
