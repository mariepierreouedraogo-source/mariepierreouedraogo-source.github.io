# Portfolio — Marie-Pierre Ouédraogo

Site personnel présentant mes compétences en développement web & mobile, réseaux informatiques et programmation.

**Stack :** [Astro](https://astro.build) · TypeScript · CSS · [Vercel](https://vercel.com) · [Turso](https://turso.tech) (SQLite)
Pages statiques, ~2,5 Ko de JavaScript compressé, thème clair/sombre, responsive et accessible.
Seule partie serveur : `/api/contact`, qui enregistre les messages du formulaire dans Turso.

## Démarrer

```bash
npm install
npm run dev       # http://localhost:4321 — rechargement à chaud
npm run build     # vérification TypeScript + génération dans .vercel/output/
npm run db:setup  # crée la table des messages dans Turso (une seule fois)
```

Pour tester le formulaire en local, copie `.env.example` en `.env` et remplis-le avec les identifiants Turso.

## Modifier le contenu

Tout le contenu est dans **`src/data/profile.ts`** : identité, liens, compétences, projets, parcours, langues.
Les lignes marquées `TODO` sont à compléter. Les sections et liens vides (GitHub, LinkedIn, CV, téléphone) sont masqués automatiquement.

- **CV** : dépose `cv.pdf` dans `public/`, puis mets `cv: 'cv.pdf'`.
- **Formulaire de contact** : sur Vercel, les messages sont enregistrés dans Turso (voir plus bas). Sur GitHub Pages, il ouvre la messagerie du visiteur avec le message pré-rempli. Pour utiliser [Formspree](https://formspree.io) à la place, colle son URL dans `formEndpoint`.
- **Terminal de l'accueil** : son texte se modifie dans `src/components/Hero.astro`.

## Structure

```
src/
├── api/contact.ts       ← fonction serveur : enregistre les messages dans Turso
├── data/profile.ts      ← le contenu (à modifier)
├── components/          ← une section = un composant
├── layouts/Base.astro   ← <head>, SEO, thème
├── scripts/main.ts      ← interactions (menu, filtres, animation réseau…)
├── styles/global.css    ← couleurs, typographie, utilitaires
└── pages/               ← index et 404
db/schema.sql            ← structure de la base Turso
scripts/db-setup.mjs     ← crée cette structure (npm run db:setup)
```

## Mettre en ligne

### 1. Base de données Turso (gratuit)

1. Crée un compte sur [app.turso.tech](https://app.turso.tech) (connexion avec GitHub possible).
2. Crée une base nommée `portfolio`, dans la région la plus proche de tes visiteurs.
3. Dans la page de la base, copie l'**URL** (`libsql://…`) et crée un **jeton** (*Create Token*, lecture/écriture).
4. Crée la table des messages, au choix :
   - dans l'éditeur SQL de Turso, colle le contenu de `db/schema.sql` et exécute-le ;
   - ou, en local : copie `.env.example` en `.env`, remplis-le, puis `npm run db:setup`.

Les messages reçus se lisent dans Turso, onglet de la base → table `messages`.

### 2. Site sur Vercel (gratuit)

1. Sur [vercel.com](https://vercel.com), connecte-toi avec GitHub, puis **Add New → Project** et importe ce dépôt. Astro est détecté automatiquement.
2. Avant de cliquer sur **Deploy**, ouvre **Environment Variables** et ajoute :
   - `TURSO_DATABASE_URL` = l'URL de la base ;
   - `TURSO_AUTH_TOKEN` = le jeton.
3. Clique sur **Deploy**. Le site est en ligne à l'adresse `https://<projet>.vercel.app`.

À chaque `git push` sur `main`, Vercel reconstruit et republie le site.

### GitHub Pages (version statique)

Le workflow `.github/workflows/deploy.yml` publie aussi une version 100 % statique sur `https://<ton-pseudo>.github.io` à chaque push. Dans cette version, le formulaire ouvre la messagerie du visiteur. Pour n'utiliser que Vercel, supprime ce fichier et désactive Pages dans **Settings → Pages**.
