// Plan du site pour les moteurs de recherche (une seule page à indexer).
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const home = new URL(import.meta.env.BASE_URL, site).href;
  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${home}</loc><lastmod>${today}</lastmod></url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
