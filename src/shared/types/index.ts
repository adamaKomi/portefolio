/** Shared types across features */

export type SectionId =
  | "hero"
  | "about"
  | "philosophy"
  | "skills"
  | "technologies"
  | "projects"
  | "experience"
  | "education"
  | "contact";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
}
