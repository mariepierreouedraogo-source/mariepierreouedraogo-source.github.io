// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// Deux cibles de déploiement :
// - Vercel (par défaut) : le site + la fonction /api/contact qui enregistre
//   les messages du formulaire dans Turso.
// - GitHub Pages (DEPLOY_TARGET=github-pages, posé par le workflow) : site
//   100 % statique, le formulaire ouvre la messagerie du visiteur.
// SITE et BASE sont injectés par le workflow GitHub Pages ; Vercel fournit
// VERCEL_PROJECT_PRODUCTION_URL. En local, rien à configurer.
const githubPages = process.env.DEPLOY_TARGET === 'github-pages';
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

/** @type {import('astro').AstroIntegration} */
const contactApi = {
  name: 'contact-api',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => {
      injectRoute({ pattern: '/api/contact', entrypoint: './src/api/contact.ts', prerender: false });
    },
  },
};

export default defineConfig({
  site: process.env.SITE ?? (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:4321'),
  base: process.env.BASE ?? '/',
  trailingSlash: 'ignore',
  adapter: githubPages ? undefined : vercel(),
  integrations: githubPages ? [] : [contactApi],
  env: {
    schema: {
      CONTACT_API: envField.boolean({ context: 'server', access: 'public', default: !githubPages }),
      TURSO_DATABASE_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      TURSO_AUTH_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
