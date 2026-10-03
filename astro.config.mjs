// @ts-check
import { defineConfig } from 'astro/config';

// SITE et BASE sont injectés par le workflow GitHub Pages ; Vercel fournit
// VERCEL_PROJECT_PRODUCTION_URL. En local, rien à configurer.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  site: process.env.SITE ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:4321'),
  base: process.env.BASE ?? '/',
  trailingSlash: 'ignore',
});
