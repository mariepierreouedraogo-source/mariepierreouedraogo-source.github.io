const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

/* ── Thème ─────────────────────────────────────────────── */
function initTheme() {
  const root = document.documentElement;
  $('[data-theme-toggle]')?.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* stockage indisponible : le thème reste valable pour la session */
    }
    document.dispatchEvent(new CustomEvent('themechange'));
  });
}

/* ── Header & menu mobile ──────────────────────────────── */
function initHeader() {
  const header = $('[data-header]');
  const nav = $('[data-nav]');
  const toggle = $('[data-menu-toggle]');

  const onScroll = () => header?.classList.toggle('is-scrolled', scrollY > 12);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  const setOpen = (open: boolean) => {
    nav?.classList.toggle('is-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  toggle?.addEventListener('click', () => setOpen(!nav?.classList.contains('is-open')));
  nav?.addEventListener('click', (e) => {
    if ((e.target as Element).closest('a')) setOpen(false);
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('is-open')) {
      setOpen(false);
      toggle?.focus();
    }
  });

  // Lien actif selon la section visible.
  const links = $$<HTMLAnchorElement>('[data-nav-link]');
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((a) => a.classList.remove('is-active'));
        byId.get(entry.target.id)?.classList.add('is-active');
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

/* ── Apparition au scroll ──────────────────────────────── */
function initReveal() {
  const items = $$('[data-reveal]');
  if (reducedMotion.matches) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => observer.observe(el));
}

/* ── Filtres projets ───────────────────────────────────── */
function initFilters() {
  const buttons = $$<HTMLButtonElement>('[data-filter]');
  const cards = $$('[data-category]');
  const status = $('[data-filter-status]');

  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let shown = 0;
      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) {
          shown++;
          card.classList.add('is-visible');
        }
      });
      if (status) status.textContent = `${shown} projet${shown > 1 ? 's' : ''} affiché${shown > 1 ? 's' : ''}`;
    }),
  );
}

/* ── Formulaire de contact ─────────────────────────────── */
function initContactForm() {
  const form = $<HTMLFormElement>('[data-contact-form]');
  const status = $('[data-form-status]');
  if (!form || !status) return;

  const say = (msg: string, error = false) => {
    status.textContent = msg;
    status.classList.toggle('is-error', error);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    // Sans service d'envoi configuré, on ouvre le client mail du visiteur.
    if (!form.getAttribute('action')) {
      const subject = `Contact portfolio : ${name}`;
      const body = `${message}\n\n${name}\n${email}`;
      location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      say('Votre messagerie va s’ouvrir avec le message pré-rempli.');
      return;
    }

    const button = form.querySelector('button');
    button?.setAttribute('disabled', '');
    say('Envoi en cours…');
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      say('Merci ! Votre message a bien été envoyé.');
    } catch {
      say(`L’envoi a échoué. Écrivez-moi directement à ${form.dataset.email}.`, true);
    } finally {
      button?.removeAttribute('disabled');
    }
  });
}

/* ── Réseau animé (hero) ───────────────────────────────── */
type NetNode = { x: number; y: number; vx: number; vy: number; r: number };
type Packet = { a: number; b: number; t: number; speed: number };

function initNetwork() {
  const canvas = $<HTMLCanvasElement>('[data-network]');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const LINK_DIST = 150;
  let w = 0;
  let h = 0;
  let nodes: NetNode[] = [];
  let packets: Packet[] = [];
  let colors = { node: '', link: '', packet: '' };
  let raf = 0;
  let visible = true;

  const readColors = () => {
    const s = getComputedStyle(document.documentElement);
    colors = {
      node: s.getPropertyValue('--accent').trim(),
      link: s.getPropertyValue('--border-strong').trim(),
      packet: s.getPropertyValue('--accent-2').trim(),
    };
  };

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(Math.min(70, Math.max(24, (w * h) / 16000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() < 0.15 ? 3 : 1.6,
    }));
    packets = [];
    draw();
  };

  const neighbours = (i: number) => {
    const out: number[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (j !== i && Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < LINK_DIST) out.push(j);
    }
    return out;
  };

  const spawnPacket = () => {
    const a = Math.floor(Math.random() * nodes.length);
    const n = neighbours(a);
    if (n.length) packets.push({ a, b: n[Math.floor(Math.random() * n.length)], t: 0, speed: 0.008 + Math.random() * 0.01 });
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = colors.link;
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < LINK_DIST) {
          ctx.globalAlpha = 1 - d / LINK_DIST;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 0.9;
    ctx.fillStyle = colors.node;
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = colors.packet;
    for (const p of packets) {
      const A = nodes[p.a];
      const B = nodes[p.b];
      ctx.beginPath();
      ctx.arc(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const step = () => {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    if (packets.length < 14 && Math.random() < 0.08) spawnPacket();
    packets = packets.filter((p) => {
      p.t += p.speed;
      const A = nodes[p.a];
      const B = nodes[p.b];
      // Le paquet disparaît s'il arrive ou si le lien s'est rompu.
      return p.t < 1 && Math.hypot(A.x - B.x, A.y - B.y) < LINK_DIST;
    });
    draw();
    raf = requestAnimationFrame(step);
  };

  const start = () => {
    cancelAnimationFrame(raf);
    if (visible && !document.hidden && !reducedMotion.matches) raf = requestAnimationFrame(step);
    else draw();
  };

  readColors();
  resize();
  start();

  let resizeTimer = 0;
  addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      start();
    }, 150);
  });
  document.addEventListener('themechange', () => {
    readColors();
    draw();
  });
  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener('change', start);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    start();
  }).observe(canvas);
}

initTheme();
initHeader();
initReveal();
initFilters();
initContactForm();
initNetwork();
