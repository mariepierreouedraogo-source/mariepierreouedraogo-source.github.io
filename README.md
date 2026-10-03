# Portfolio — Marie-Pierre Ouédraogo

Site personnel présentant mes compétences en développement web & mobile, réseaux informatiques et programmation.

**Stack :** [Astro](https://astro.build) · TypeScript · CSS · GitHub Actions / GitHub Pages
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
- **Formulaire de contact** : par défaut, il ouvre la messagerie du visiteur avec le message pré-rempli. Pour recevoir les messages directement, crée un formulaire gratuit sur [Formspree](https://formspree.io) et colle son URL dans `formEndpoint`.
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

## Mettre en ligne (GitHub Pages, gratuit)

1. Crée un dépôt sur GitHub. Si tu le nommes `<ton-pseudo>.github.io`, le site sera à la racine `https://<ton-pseudo>.github.io`.
2. Pousse le code :
   ```bash
   git init && git add . && git commit -m "Premier commit"
   git branch -M main
   git remote add origin https://github.com/<ton-pseudo>/<depot>.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Source : GitHub Actions**.

À chaque `git push` sur `main`, le workflow `.github/workflows/deploy.yml` reconstruit et publie le site. L'URL et le chemin de base sont calculés automatiquement.
