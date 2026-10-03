// Crée les tables dans la base Turso (à lancer une fois : npm run db:setup).
// Lit TURSO_DATABASE_URL et TURSO_AUTH_TOKEN depuis le fichier .env.
import { readFile } from 'node:fs/promises';
import { createClient } from '@libsql/client/web';

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  console.error('TURSO_DATABASE_URL manquant : copie .env.example en .env et remplis-le.');
  process.exit(1);
}

const db = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
await db.executeMultiple(await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8'));
console.log('Base prête : table « messages » créée.');
