/**
 * POST /api/contact — enregistre un message du formulaire dans Turso.
 * Route ajoutée seulement sur Vercel (voir astro.config.mjs).
 */
import type { APIRoute } from 'astro';
import { createClient, type Client } from '@libsql/client/web';
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from 'astro:env/server';

const MAX = { name: 100, email: 200, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let db: Client | undefined;

const reply = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return reply(400, { error: 'Formulaire invalide.' });
  }
  const field = (key: string) => String(data.get(key) ?? '').trim();

  // Champ piège invisible : un humain le laisse vide, un robot le remplit.
  if (field('website')) return reply(200, { ok: true });

  const name = field('name');
  const email = field('email');
  const message = field('message');
  if (
    !name ||
    !message ||
    !EMAIL.test(email) ||
    name.length > MAX.name ||
    email.length > MAX.email ||
    message.length > MAX.message
  ) {
    return reply(400, { error: 'Vérifiez le nom, l’e-mail et le message.' });
  }

  if (!TURSO_DATABASE_URL) {
    console.error('TURSO_DATABASE_URL n’est pas défini.');
    return reply(503, { error: 'Service indisponible.' });
  }
  db ??= createClient({ url: TURSO_DATABASE_URL, authToken: TURSO_AUTH_TOKEN });

  try {
    await db.execute({
      sql: 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      args: [name, email, message],
    });
  } catch (err) {
    console.error('Échec de l’enregistrement du message :', err);
    return reply(500, { error: 'Enregistrement impossible.' });
  }
  return reply(201, { ok: true });
};
