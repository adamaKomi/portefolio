import { NextResponse } from "next/server";
import { contactSchema } from "@/features/contact/schemas/contact-schema";
import { env } from "@/config/env";

/**
 * POST /api/contact
 *
 * Reçoit un message de contact, le valide avec le même schéma Zod
 * que côté client, puis l'envoie via Resend.
 *
 * Réponses:
 *  - 200 { ok: true }
 *  - 400 { ok: false, errors?: Record<string, string> }  (validation / JSON invalide)
 *  - 500 / 502 { ok: false }                             (configuration / Resend / interne)
 *
 * Le détail des erreurs serveur n'est jamais renvoyé au visiteur :
 * il est écrit dans les logs (préfixe « [contact] »).
 */
export async function POST(req: Request) {
  // 1. Lecture du corps JSON — tolérant au JSON malformé.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // 2. Validation Zod (server-side, source de vérité).
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      // On ne garde que le premier message par champ pour éviter le bruit.
      if (typeof key === "string" && !errors[key]) {
        errors[key] = issue.message;
      }
    }
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // 3. Configuration requise pour l'envoi.
  const { resendApiKey, contactEmailFrom, contactEmailTo } = env;
  const missing = [
    !resendApiKey && "RESEND_API_KEY",
    !contactEmailFrom && "CONTACT_EMAIL_FROM",
    !contactEmailTo && "CONTACT_EMAIL_TO",
  ].filter(Boolean);
  if (missing.length > 0) {
    console.error(`[contact] Variables manquantes : ${missing.join(", ")}.`);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // 4. Envoi via l'API REST de Resend.
  const { name, email, message } = parsed.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactEmailFrom,
        to: contactEmailTo,
        reply_to: email,
        subject: `Portfolio : message de ${name}`,
        html: renderEmail({ name, email, message }),
      }),
    });

    if (!res.ok) {
      // Ex. : domaine d'expédition non vérifié, clé invalide, destinataire non autorisé.
      console.error(`[contact] Resend a refusé l'envoi (HTTP ${res.status}) :`, await res.text());
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Exception lors de l'appel à Resend :", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

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

/** Échappe le texte saisi par le visiteur avant de l'insérer dans le HTML. */
function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (c) => entities[c]);
}

function renderEmail({ name, email, message }: { name: string; email: string; message: string }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1b2540;">
      <h2 style="margin: 0 0 16px; font-weight: 600;">Nouveau message depuis le portfolio</h2>
      <p style="margin: 0 0 4px;"><strong>Nom :</strong> ${safeName}</p>
      <p style="margin: 0 0 16px;"><strong>Email :</strong> <a href="mailto:${safeEmail}" style="color: #d9502e;">${safeEmail}</a></p>
      <div style="border-left: 3px solid #d9502e; padding: 4px 0 4px 14px; white-space: pre-wrap; line-height: 1.6;">${safeMessage}</div>
      <p style="margin-top: 28px; font-size: 12px; color: #6b7280;">Envoyé depuis le formulaire de contact de ${escapeHtml(env.websiteUrl)}. Répondez directement à cet e-mail pour écrire à ${safeName}.</p>
    </div>
  `;
}
