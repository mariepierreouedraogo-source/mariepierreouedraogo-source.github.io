# Portfolio — Marie-Pierre Ouédraogo

Site personnel présentant mes compétences en développement web & mobile, réseaux informatiques et programmation.

**Stack :** [Astro](https://astro.build) · TypeScript · CSS · GitHub Pages ou Vercel · [Formspree](https://formspree.io)
Site 100 % statique, ~2,5 Ko de JavaScript compressé, thème clair/sombre, responsive et accessible.

## Démarrer

```bash
npm install
npm run dev       # http://localhost:4321 — rechargement à chaud
npm run build     # vérification TypeScript + génération dans dist/
npm run preview   # sert la version construite
```

## Modifier le contenu

Tout le contenu est dans **`src/data/profile.ts`** : identité, liens, compétences, projets, parcours, langues.
Les lignes marquées `TODO` sont à compléter. Les sections et liens vides (GitHub, LinkedIn, CV, téléphone) sont masqués automatiquement.

- **CV** : dépose `cv.pdf` dans `public/`, puis mets `cv: 'cv.pdf'`.
- **Formulaire de contact** : les messages sont envoyés par [Formspree](https://formspree.io) et arrivent par e-mail. L'adresse du formulaire est dans `formEndpoint` ; vide = le formulaire ouvre la messagerie du visiteur avec le message pré-rempli.
- **Terminal de l'accueil** : son texte se modifie dans `src/components/Hero.astro`.

## Structure

```
src/
├── data/profile.ts      ← le contenu (à modifier)
├── components/          ← une section = un composant
├── layouts/Base.astro   ← <head>, SEO, thème
├── scripts/main.ts      ← interactions (menu, filtres, animation réseau…)
├── styles/global.css    ← couleurs, typographie, utilitaires
└── pages/               ← index et 404
```

## Mettre en ligne

### GitHub Pages (en place)

À chaque `git push` sur `main`, le workflow `.github/workflows/deploy.yml` reconstruit et publie le site sur `https://<ton-pseudo>.github.io`. L'adresse du site (y compris un domaine personnalisé défini dans **Settings → Pages**) est lue automatiquement.

### Vercel (facultatif)

Sur [vercel.com](https://vercel.com), connecte-toi avec GitHub, puis **Add New → Project**, importe ce dépôt et clique sur **Deploy**. Astro est détecté automatiquement, sans aucune configuration. Vercel republie ensuite le site à chaque push.
