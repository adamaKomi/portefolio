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
 *  - 400 { ok: false, errors: Record<string, string> }  (validation / JSON invalide)
 *  - 500 { ok: false, error: string }                    (erreur de configuration / Resend / interne)
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

  // 3. Envoi via l'API REST de Resend.
  const apiKey = env.resendApiKey;
  if (!apiKey || apiKey === "your_resend_api_key_here") {
    console.error("[contact] RESEND_API_KEY n'est pas configurée dans .env. Échec d'envoi.");
    return NextResponse.json(
      { ok: false, errors: { _root: "Le service d'envoi d'e-mails n'est pas configuré. Veuillez définir RESEND_API_KEY dans votre environnement." } },
      { status: 500 }
    );
  }

  try {
    const { name, email, company, budget, message } = parsed.data;
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.contactEmailFrom,
        to: env.contactEmailTo,
        subject: `Portfolio : Message de ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">Nouveau Message de Contact</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Nom :</td>
                <td style="padding: 8px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email :</td>
                <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #059669; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Entreprise :</td>
                <td style="padding: 8px 0; color: #0f172a;">${company || "Non spécifié"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Budget :</td>
                <td style="padding: 8px 0; color: #0f172a;">${budget || "Non spécifié"}</td>
              </tr>
            </table>
            <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px; border-left: 4px solid #059669;">
              <p style="margin: 0; font-weight: bold; color: #475569; margin-bottom: 8px;">Message :</p>
              <p style="margin: 0; color: #334155; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              Cet e-mail a été envoyé depuis le formulaire de contact de ${env.websiteUrl}
            </p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("[contact] Erreur lors de l'envoi via Resend :", errText);
      return NextResponse.json(
        { ok: false, errors: { _root: "Impossible d'envoyer l'e-mail. Veuillez vérifier la configuration de l'API Resend." } },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[contact] Exception inattendue lors de l'envoi d'e-mail :", err);
    return NextResponse.json(
      { ok: false, errors: { _root: "Une erreur interne s'est produite lors de l'envoi." } },
      { status: 500 }
    );
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
