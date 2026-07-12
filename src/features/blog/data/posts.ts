/**
 * Blog posts — structured TypeScript data.
 *
 * Chaque article est un ensemble de "blocs de contenu" typés, rendus
 * ensuite par <ContentRenderer />. On évite ainsi la lourdeur d'un setup
 * MDX complet tout en gardant un rendu riche (titres, paragraphes,
 * extraits de code, listes).
 *
 * Aucune page Next.js n'est ajoutée : la lecture se fait dans un overlay
 * full-screen avec hash routing (#/blog/<slug>).
 */

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  readingTime: number; // minutes
  tags: string[];
  category: string;
  /** Mot-clé mis en avant dans le titre de l'overlay (rendu text-gradient). */
  highlightKeyword?: string;
  content: ContentBlock[];
}

/* ----------------------------------------------------------
 * Post 1 — Clean Architecture en Node.js
 * ---------------------------------------------------------- */
const cleanArchitecturePost: BlogPost = {
  slug: "clean-architecture-nodejs",
  title: "Clean Architecture en Node.js : séparer le métier du framework",
  excerpt:
    "Pourquoi isoler votre logique métier des détails techniques change tout — et comment le faire concrètement avec NestJS.",
  date: "2024-11-15",
  readingTime: 8,
  tags: ["Architecture", "NestJS", "DDD"],
  category: "Architecture",
  highlightKeyword: "métier",
  content: [
    {
      type: "paragraph",
      text: "Combien de fois ai-je vu une base de code Node.js devenue impossible à maintenir après 18 mois ? Le coupable est presque toujours le même : la logique métier est mélangée avec les détails du framework, les ORM, les validateurs, les contrôleurs HTTP. Changer de bibliothèque devient une chirurgie à cœur ouvert. La Clean Architecture propose une autre voie : inverser les dépendances pour que le métier reste pur, indépendant, testable.",
    },
    {
      type: "heading",
      text: "Le principe : inverser la flèche des dépendances",
    },
    {
      type: "paragraph",
      text: "Dans une architecture classique, le domaine dépend de l'infrastructure (la DB, le framework). Dans une Clean Architecture, c'est l'inverse : l'infrastructure dépend du domaine, via des interfaces. Le cœur métier ne sait rien de NestJS, de PostgreSQL ou de Redis — il ne connaît que des contrats abstraits.",
    },
    {
      type: "code",
      language: "typescript",
      code: `// domain/entities/invoice.ts — pur, zéro dépendance framework
export class Invoice {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public amount: number,
    public status: InvoiceStatus = "draft",
    public readonly issuedAt: Date = new Date(),
  ) {}

  /** Règle métier : une facture payée ne peut plus être modifiée. */
  markAsPaid(): void {
    if (this.status === "paid") {
      throw new Error("La facture est déjà payée.");
    }
    this.status = "paid";
  }

  /** Règle métier : une facture en retard expose des pénalités. */
  computeLatePenalty(rate: number): number {
    if (this.status !== "overdue") return 0;
    return Math.round(this.amount * rate * 100) / 100;
  }
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

// domain/ports/invoice.repository.ts — un port, pas d'implémentation
export interface InvoiceRepository {
  findById(id: string): Promise<Invoice | null>;
  save(invoice: Invoice): Promise<void>;
}`,
    },
    {
      type: "paragraph",
      text: "Ce fichier ne dépend de rien d'autre que de TypeScript. On peut le tester en isolation, le réutiliser dans un CLI, un batch, une API HTTP ou un job cron. La règle d'or : si vous supprimez le fichier NestJS demain, le domaine doit encore compiler.",
    },
    {
      type: "heading",
      text: "Les bénéfices concrets en production",
    },
    {
      type: "list",
      items: [
        "Tests unitaires instantanés : plus aucun mock de base de données pour tester une règle métier.",
        "Évolution sans dette : changer d'ORM (TypeORM → Prisma) ne touche que la couche infrastructure.",
        "Lisibilité : un nouveau développeur lit le domaine pour comprendre le métier, pas la plomberie.",
        "Réutilisation : le même domaine peut servir une API REST, un job batch, ou un CLI interne.",
        "Confiance : les règles métier sont centralisées et explicites, pas dispersées dans des services.",
      ],
    },
    {
      type: "paragraph",
      text: "La Clean Architecture n'est pas une mode académique — c'est un investissement. Sur PayLith, elle m'a permis d'ajouter un moteur de relances automatiques en deux jours, sans toucher à un seul contrôleur HTTP. Le framework devient un détail, le métier redevient le héros. C'est exactement ce que devrait être un logiciel : durable.",
    },
  ],
};

/* ----------------------------------------------------------
 * Post 2 — WebSockets + Redis
 * ---------------------------------------------------------- */
const websocketsPost: BlogPost = {
  slug: "websockets-redis-temps-reel",
  title: "WebSockets + Redis : scaler le temps réel horizontalement",
  excerpt:
    "Comment Redis pub/sub permet de synchroniser des milliers de clients temps réel à travers plusieurs instances backend.",
  date: "2024-10-02",
  readingTime: 10,
  tags: ["Temps réel", "Redis", "WebSockets"],
  category: "Systèmes distribués",
  highlightKeyword: "horizontalement",
  content: [
    {
      type: "paragraph",
      text: "Le temps réel est séduisant tant qu'il tourne sur un seul serveur. Le jour où vous ajoutez une deuxième instance, tout s'effondre : un client connecté à l'instance A ne recevra jamais le message publié par l'instance B. La solution canonique ? Un canal de synchronisation partagé entre toutes les instances — et Redis pub/sub est l'outil le plus simple pour le faire.",
    },
    {
      type: "heading",
      text: "Le pattern : chaque instance subscribe, chaque instance publish",
    },
    {
      type: "paragraph",
      text: "L'idée : toutes les instances backend se connectent au même Redis. Quand une instance reçoit un événement métier (une file qui avance, une notification à pousser), elle publie sur un canal Redis. Toutes les instances — y compris celle qui a publié — reçoivent le message et le diffusent à leurs clients WebSocket locaux. Redis devient le bus de message qui rend le cluster transparent pour les clients.",
    },
    {
      type: "code",
      language: "typescript",
      code: `// realtime/queue.gateway.ts — NestJS WebSocket Gateway
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { RedisService } from "./redis.service";

@WebSocketGateway({ namespace: "/queue", cors: true })
export class QueueGateway {
  // Map locale : quel socket écoute quelle file.
  private subscriptions = new Map<string, Set<string>>(); // queueId -> socketIds

  constructor(private readonly redis: RedisService) {
    // On écoute le canal global "queue:events".
    // Chaque instance reçoit les messages, y compris celles qui ont publié.
    this.redis.subscribe("queue:events", (payload) => {
      const { queueId, event } = payload;
      const sockets = this.subscriptions.get(queueId) ?? new Set();
      for (const socketId of sockets) {
        this.server.to(socketId).emit("queue:event", event);
      }
    });
  }

  /** Un client rejoint une file : on l'enregistre localement. */
  @SubscribeMessage("subscribe")
  handleSubscribe(
    @MessageBody() { queueId }: { queueId: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (!this.subscriptions.has(queueId)) {
      this.subscriptions.set(queueId, new Set());
    }
    this.subscriptions.get(queueId)!.add(client.id);
  }

  /** Quand une file avance, on publie sur Redis — pas besoin de savoir
   *  quels clients sont connectés ni sur quelle instance. */
  async advanceQueue(queueId: string, nextTicket: string) {
    await this.redis.publish("queue:events", {
      queueId,
      event: { type: "called", ticket: nextTicket, at: Date.now() },
    });
  }
}`,
    },
    {
      type: "paragraph",
      text: "Le point crucial : la méthode advanceQueue ne sait pas quels clients écouter. Elle publie aveuglément sur Redis, et chaque instance répartit ensuite le message vers ses sockets locaux. La logique de routage est totalement décentralisée — Redis ne fait que diffuser, les instances font le fan-out final.",
    },
    {
      type: "list",
      items: [
        "Scalabilité horizontale : ajoutez des instances backend sans toucher au code métier.",
        "Résilience : si une instance tombe, les autres continuent de diffuser.",
        "Découplage : le code métier ne connaît que Redis, jamais la topologie du cluster.",
        "Sticky sessions inutiles : un client peut atterrir sur n'importe quelle instance.",
        "Observable : un seul canal Redis à monitorer pour voir tout le trafic temps réel.",
      ],
    },
    {
      type: "paragraph",
      text: "Sur QueueClock, ce pattern a permis de passer d'une instance mono-processus à un cluster de 4 nœuds sans changer une ligne de code métier. Redis pub/sub n'est pas un messaging system enterprise — pas de persistance, pas de retries — mais pour la diffusion temps réel stateless, c'est l'outil le plus rentable que je connaisse. Pour aller plus loin : Redis Streams si vous avez besoin de replay, ou Kafka si vous êtes à l'échelle d'un data platform.",
    },
  ],
};

/* ----------------------------------------------------------
 * Post 3 — DDD : modéliser le métier
 * ---------------------------------------------------------- */
const dddPost: BlogPost = {
  slug: "ddd-modeliser-le-metier",
  title: "Domain-Driven Design : modéliser le métier avant le code",
  excerpt:
    "Ubiquitous language, bounded contexts, agrégats — les outils pour que votre code parle le langage du métier.",
  date: "2024-08-20",
  readingTime: 7,
  tags: ["DDD", "Architecture", "Métier"],
  category: "Architecture",
  highlightKeyword: "métier",
  content: [
    {
      type: "paragraph",
      text: "Le DDD n'est pas une architecture. C'est une discipline : celle de modéliser le logiciel à partir du métier, pas à partir des tables de base de données. Trop souvent, on commence à coder en pensant schéma SQL. Le DDD propose l'inverse : comprendre les domaines, définir un langage partagé, puis dessiner des agrégats qui incarnent les règles invariantes du métier.",
    },
    {
      type: "heading",
      text: "Les briques fondamentales du DDD",
    },
    {
      type: "list",
      items: [
        "Ubiquitous Language : les développeurs et les experts métier utilisent les mêmes mots. Une « facture » dans le code est une « facture » dans les réunions.",
        "Bounded Context : découper un gros système en contextes autonomes (Facturation, Relances, Analytics) plutôt qu'en un seul modèle universel impossible à maintenir.",
        "Agrégat : un cluster d'entités cohérentes, modifiées ensemble de façon transactionnelle, avec une racine qui contrôle tous les accès.",
        "Domain Event : émettre ce qui s'est passé (« FacturePayée ») plutôt que d'appeler des méthodes — favorise le découplage et l'audit.",
        "Repository : abstraire la persistance derrière une interface du domaine, l'implémentation technique devient un détail.",
      ],
    },
    {
      type: "paragraph",
      text: "L'agrégat est la brique la plus puissante — et la plus mal comprise. Un agrégat n'est pas une table SQL, c'est une frontière de cohérence : tout ce qui doit rester cohérent ensemble vit dans le même agrégat, et on ne modifie un agrégat qu'en passant par sa racine.",
    },
    {
      type: "code",
      language: "typescript",
      code: `// domain/aggregate-trees/parkour-session.ts
// Un agrégat "Session de course" : la racine contrôle les règles invariantes.

export class ParkourSession {
  private readonly challenges: SessionChallenge[] = [];

  constructor(
    public readonly id: string,
    public readonly runnerId: string,
    public readonly startedAt: Date,
    public status: "running" | "completed" | "aborted" = "running",
  ) {}

  /** Règle : on ne peut pas compléter un défi sur une session déjà terminée. */
  completeChallenge(challengeId: string, at: Date): void {
    if (this.status !== "running") {
      throw new Error("La session n'est plus en cours.");
    }
    const challenge = this.challenges.find((c) => c.id === challengeId);
    if (!challenge) throw new Error("Défi introuvable dans cette session.");
    if (challenge.completedAt) {
      throw new Error("Ce défi a déjà été complété.");
    }
    challenge.completedAt = at;
  }

  /** Règle : une session s'arrête dès qu'un défi critique échoue. */
  failCriticalChallenge(challengeId: string, at: Date): void {
    const challenge = this.challenges.find((c) => c.id === challengeId);
    if (!challenge || !challenge.isCritical) return;
    challenge.failedAt = at;
    this.status = "aborted";
  }

  /** Factory : une session ne se crée jamais avec un état invalide. */
  static start(runnerId: string, challenges: ChallengeSpec[]): ParkourSession {
    if (challenges.length === 0) {
      throw new Error("Une session doit contenir au moins un défi.");
    }
    const session = new ParkourSession(uuid(), runnerId, new Date());
    for (const spec of challenges) {
      session.challenges.push(SessionChallenge.fromSpec(spec));
    }
    return session;
  }
}`,
    },
    {
      type: "paragraph",
      text: "Notez qu'aucune règle métier ne fuit hors de l'agrégat. La base de données, l'API, le framework — rien de tout ça n'apparaît ici. Ce fichier incarne ce que signifie « modéliser le métier avant le code » : on dessine d'abord les règles, on encode les invariants, puis seulement on branche la persistance et le transport. Le résultat ? Un code qui parle le langage des experts métier, qui se lit comme une spécification, et qui dure.",
    },
  ],
};

/* ----------------------------------------------------------
 * Export — tri par date décroissante
 * ---------------------------------------------------------- */
export const posts: BlogPost[] = [
  cleanArchitecturePost,
  websocketsPost,
  dddPost,
].sort((a, b) => (a.date < b.date ? 1 : -1));

/* ----------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------- */
export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getNextPost(slug: string): BlogPost | null {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return posts[(i + 1) % posts.length];
}

export function getPrevPost(slug: string): BlogPost | null {
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return posts[(i - 1 + posts.length) % posts.length];
}

/** Formatte une date ISO en chaîne lisible en français. */
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
