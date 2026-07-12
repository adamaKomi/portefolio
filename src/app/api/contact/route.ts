import { NextResponse } from "next/server";
import { contactSchema } from "@/features/contact/schemas/contact-schema";

/**
 * POST /api/contact
 *
 * Reçoit un message de contact, le valide avec le même schéma Zod
 * que côté client, puis simule un envoi réussi (aucun service email,
 * aucune persistance DB — on log simplement serveur-side).
 *
 * Réponses:
 *  - 200 { ok: true }
 *  - 400 { ok: false, errors: Record<string, string> }  (validation / JSON invalide)
 *  - 500 { ok: false, error: string }                    (erreur inattendue)
 */
export async function POST(req: Request) {
  // 1. Lecture du corps JSON — tolérant au JSON malformé.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _root: "Requête invalide (JSON malformé)." } },
      { status: 400 }
    );
  }

  // 2. Validation Zod (server-side, source de vérité).
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      const fieldKey = typeof key === "string" ? key : "_root";
      // On ne garde que le premier message par champ pour éviter le bruit.
      if (!errors[fieldKey]) {
        errors[fieldKey] = issue.message;
      }
    }
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // 3. Succès — on log le message (aucun envoi réel, simulation).
  //    En production : brancher un service email (Resend, Postmark…).
  try {
    console.log("[contact] Nouveau message reçu:", {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      budget: parsed.data.budget || null,
      messageLength: parsed.data.message.length,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    // console.log n'échoue jamais en pratique, mais on reste défensif.
  }

  // 4. Petite latence simulée pour le feedback UI (200-500ms).
  //    Évité ici pour ne pas ralentir le preview — le client gère son propre état.

  return NextResponse.json({ ok: true }, { status: 200 });
}

/**
 * Rejet explicite des autres méthodes — le endpoint est POST-only.
 */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Méthode non autorisée. Utilisez POST." },
    { status: 405 }
  );
}
