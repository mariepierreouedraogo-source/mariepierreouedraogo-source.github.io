/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENU DU SITE
 *  C'est le seul fichier à modifier pour mettre à jour le portfolio.
 *  Les lignes marquées « TODO » sont à compléter ou à vérifier.
 * ─────────────────────────────────────────────────────────────
 */

export type Category = 'web' | 'mobile' | 'reseau' | 'programmation';

export const categories: Record<Category, string> = {
  web: 'Web',
  mobile: 'Mobile',
  reseau: 'Réseaux',
  programmation: 'Programmation',
};

/* ── Identité ─────────────────────────────────────────────── */

export const profile = {
  name: 'Marie-Pierre Ouédraogo',
  initials: 'MPO',
  role: 'Développement web & mobile · Réseaux informatiques · Programmation',
  tagline:
    'Je conçois des applications web et mobiles, et je mets en place les réseaux et les serveurs sur lesquels elles tournent.',
  location: 'Ville, Pays', // TODO
  availability: 'Disponible pour un stage, une alternance ou une mission', // TODO
  email: 'mariepierreouedraogo@gmail.com',
  phone: '', // TODO (optionnel) ex. '+226 00 00 00 00'
  socials: {
    github: 'https://github.com/mariepierreouedraogo-source',
    linkedin: '', // TODO ex. 'https://www.linkedin.com/in/ton-profil'
    whatsapp: 'https://wa.me/22677615628',
    facebook: 'https://www.facebook.com/share/19TV2rjpFd/',
    tiktok: 'https://www.tiktok.com/@stanboss17',
    x: 'https://x.com/MariePierreOud2',
  },
  /** Dépose ton CV dans /public sous le nom cv.pdf, puis mets 'cv.pdf' ici. */
  cv: '', // TODO
  /**
   * Optionnel : URL Formspree (https://formspree.io) pour recevoir les messages
   * du formulaire sans ouvrir la messagerie du visiteur.
   * Vide = le formulaire ouvre le client mail avec le message pré-rempli.
   */
  formEndpoint: '',
};

/* ── À propos ─────────────────────────────────────────────── */

export const about = {
  paragraphs: [
    // TODO : réécris ces paragraphes avec ta propre voix.
    "Mon profil se situe au croisement du développement logiciel et de l'infrastructure. Je développe des interfaces web et mobiles, et je sais aussi ce qui se passe sous le capot : adressage, routage, serveurs, services réseau.",
    "J'aime comprendre un système de bout en bout, du câble jusqu'à l'écran. Cette double compétence me permet de livrer des applications qui tiennent compte des contraintes réelles du réseau, et de dialoguer aussi bien avec des équipes de développement qu'avec des équipes d'administration système.",
  ],
  highlights: [
    { label: 'Développement', value: 'Web & mobile' },
    { label: 'Infrastructure', value: 'Réseaux & serveurs' },
    { label: 'Téléphonie IP', value: 'Issabel · VitalPBX' },
    { label: 'Langages', value: 'Java · Python · JS' },
  ],
};

/* ── Compétences ──────────────────────────────────────────── */

export type SkillGroup = { title: string; items: string[] };
export type Pillar = {
  id: string;
  title: string;
  icon: 'code' | 'network' | 'terminal';
  description: string;
  groups: SkillGroup[];
};

// TODO : retire ce que tu ne maîtrises pas, ajoute ce qui manque.
export const pillars: Pillar[] = [
  {
    id: 'dev',
    title: 'Développement web & mobile',
    icon: 'code',
    description:
      "Des interfaces responsives, accessibles et rapides, connectées à des API et des bases de données.",
    groups: [
      { title: 'Front-end', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Responsive design'] },
      { title: 'Back-end', items: ['PHP', 'Node.js', 'API REST', 'MySQL'] },
      { title: 'Mobile', items: ['Android (Java)', 'Flutter'] },
    ],
  },
  {
    id: 'reseau',
    title: 'Réseaux informatiques',
    icon: 'network',
    description:
      "Conception, configuration et dépannage d'infrastructures réseau, des services de base à la téléphonie IP.",
    groups: [
      { title: 'Fondamentaux', items: ['Modèle OSI / TCP-IP', 'Adressage IPv4 & sous-réseaux', 'VLAN', 'Routage statique & dynamique'] },
      { title: 'Services', items: ['DHCP', 'DNS', 'VoIP / SIP', 'Issabel', 'VitalPBX'] },
      { title: 'Systèmes & outils', items: ['Cisco Packet Tracer', 'Linux (Ubuntu Server)', 'Windows Server', 'VirtualBox'] },
    ],
  },
  {
    id: 'prog',
    title: 'Programmation',
    icon: 'terminal',
    description:
      "Du code structuré et lisible, une bonne base en algorithmique et en programmation orientée objet.",
    groups: [
      { title: 'Langages', items: ['Java', 'Python', 'JavaScript', 'SQL'] },
      { title: 'Concepts', items: ['POO', 'Algorithmique', 'Structures de données', 'Modélisation UML'] },
      { title: 'Outils', items: ['Git', 'Eclipse', 'PyCharm', 'VS Code'] },
    ],
  },
];

/* ── Projets ──────────────────────────────────────────────── */

export type Project = {
  title: string;
  category: Category;
  year?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: { code?: string; demo?: string };
};

// TODO : vérifie chaque projet, corrige les détails, ajoute des liens si tu en as.
export const projects: Project[] = [
  {
    title: 'Infrastructure de téléphonie IP',
    category: 'reseau',
    summary:
      "Déploiement de serveurs IPBX virtualisés pour fournir la téléphonie interne d'une petite structure.",
    highlights: [
      'Installation et configuration de Issabel et VitalPBX',
      'Création des extensions SIP, groupes d’appels et messagerie vocale',
      'Tests d’appels entre postes clients virtualisés',
    ],
    stack: ['Issabel', 'VitalPBX', 'SIP', 'VirtualBox'],
  },
  {
    title: "Réseau d'entreprise multi-VLAN",
    category: 'reseau',
    summary:
      "Conception et simulation d'un réseau segmenté par services, avec routage inter-VLAN et services centralisés.",
    highlights: [
      'Plan d’adressage et découpage en sous-réseaux',
      'VLAN, trunks et routage inter-VLAN',
      'Serveurs DHCP et DNS centralisés',
    ],
    stack: ['Cisco Packet Tracer', 'VLAN', 'OSPF', 'DHCP', 'DNS'],
  },
  {
    title: 'Serveur Linux de services',
    category: 'reseau',
    summary:
      "Mise en place d'un serveur Ubuntu Server en environnement virtualisé pour héberger des services réseau.",
    highlights: [
      'Installation, configuration réseau et sécurisation de base',
      'Administration à distance via SSH',
      'Mise en réseau de plusieurs machines virtuelles',
    ],
    stack: ['Ubuntu Server', 'Linux', 'SSH', 'VirtualBox'],
  },
  {
    title: 'Application Java orientée objet',
    category: 'programmation',
    summary:
      'Projet de programmation orientée objet réalisé en binôme : modélisation métier et application complète en Java.',
    highlights: [
      'Modélisation des classes, héritage et polymorphisme',
      'Encapsulation et séparation des responsabilités',
      'Travail en équipe et revue de code',
    ],
    stack: ['Java', 'POO', 'UML', 'Eclipse'],
  },
  {
    title: 'Scripts et outils Python',
    category: 'programmation',
    summary:
      "Petits programmes Python pour automatiser des tâches et s'exercer à l'algorithmique.",
    highlights: ['Manipulation de fichiers et de données', 'Algorithmes de tri et de recherche'],
    stack: ['Python', 'PyCharm'],
  },
  {
    title: 'Ce portfolio',
    category: 'web',
    year: '2026',
    summary:
      'Site statique rapide et accessible, avec thème clair/sombre, et déployé automatiquement sur GitHub Pages.',
    highlights: [
      'Environ 2,5 Ko de JavaScript compressé côté client',
      'Contenu centralisé dans un seul fichier de données',
      'Déploiement continu via GitHub Actions',
    ],
    stack: ['Astro', 'TypeScript', 'CSS', 'GitHub Actions'],
  },
  {
    title: 'Application mobile (à compléter)', // TODO
    category: 'mobile',
    summary: 'Décris ici une application mobile que tu as réalisée : objectif, utilisateurs, fonctionnalités.',
    highlights: ['Fonctionnalité clé n°1', 'Fonctionnalité clé n°2'],
    stack: ['Flutter'],
  },
];

/* ── Parcours ─────────────────────────────────────────────── */
// Section masquée pour le moment : pour la réafficher, remettre <Timeline />
// dans src/pages/index.astro et le lien « Parcours » dans Header.astro.

export type TimelineItem = {
  period: string;
  title: string;
  place: string;
  kind: 'formation' | 'experience' | 'certification';
  description?: string;
};

// TODO : remplace par ton vrai parcours (du plus récent au plus ancien).
export const timeline: TimelineItem[] = [
  {
    period: '20XX — aujourd’hui',
    title: 'Diplôme en informatique (intitulé à préciser)',
    place: 'Établissement, Ville',
    kind: 'formation',
    description: 'Développement logiciel, réseaux, systèmes et bases de données.',
  },
  {
    period: '20XX',
    title: 'Stage (intitulé à préciser)',
    place: 'Entreprise, Ville',
    kind: 'experience',
    description: 'Missions principales et résultats obtenus.',
  },
  {
    period: '20XX',
    title: 'Baccalauréat (série à préciser)',
    place: 'Établissement, Ville',
    kind: 'formation',
  },
];

export const languages = [
  // TODO
  { name: 'Français', level: 'Courant' },
  { name: 'Anglais', level: 'Niveau à préciser' },
];
