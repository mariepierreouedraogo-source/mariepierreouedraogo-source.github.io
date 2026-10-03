// @ts-check
import { defineConfig } from 'astro/config';

// SITE et BASE sont injectés par le workflow GitHub Pages.
// En local, rien à configurer.
export default defineConfig({
  site: process.env.SITE ?? 'http://localhost:4321',
  base: process.env.BASE ?? '/',
  trailingSlash: 'ignore',
});
