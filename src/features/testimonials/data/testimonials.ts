/**
 * Témoignages — recommandations d'encadrants, collaborateurs et mentors.
 * Adama Komi étant un jeune diplômé, les témoignages proviennent de professeurs,
 * collaborateurs de projets et mentors techniques.
 *
 * Les citations, noms d'auteurs et rôles sont traduits via le système i18n
 * (clés `t1.quote`, `t1.author`, `t1.role`, … `t4.role`). Le data file ne
 * conserve que les champs universels : id, initiales (texte dérivé), note.
 * L'indice du tableau est utilisé pour construire la clé i18n (`t{index+1}`).
 */

export interface Testimonial {
  id: string;
  /** Initiales dérivées du nom — universelles, non traduites. */
  authorInitials: string;
  rating: number; // 1-5
}

export const testimonials: Testimonial[] = [
  { id: "pr-benjelloun", authorInitials: "K.B.", rating: 5 },
  { id: "yassine-amrani", authorInitials: "Y.A.", rating: 5 },
  { id: "sofia-marchetti", authorInitials: "S.M.", rating: 5 },
  { id: "mehdi-tahiri", authorInitials: "M.T.", rating: 5 },
];
