/* Traceway — high-end motion polish (GSAP + ScrollTrigger)
   Restraint over flash. Every animation must feel like glass settling. */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  // ---------- 0. Set initial states immediately so nothing flashes ----------
  // (kept tiny — bigger reveals are scoped per-section below)
  gsap.set('[data-reveal]', { opacity: 0, y: 24 });
  gsap.set('[data-reveal-stagger] > *', { opacity: 0, y: 18 });
  gsap.set('[data-fade]', { opacity: 0 });

  // ---------- 1. Page entrance — hero gets a deliberate, layered curtain ----------
  const heroTl = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  heroTl
    .from('.nav', { y: -20, opacity: 0, duration: 0.7 }, 0)
    .from('.hero .chip', { y: 16, opacity: 0, duration: 0.7 }, 0.15)
    .from('.hero h1 > *, .hero h1', {
      y: 30, opacity: 0, duration: 0.9, stagger: 0.06,
    }, 0.25)
    .from('.hero-sub', { y: 18, opacity: 0, duration: 0.7 }, 0.55)
    .from('.hero-cta-row > *', {
      y: 14, opacity: 0, duration: 0.6, stagger: 0.08,
    }, 0.7)
    .from('.pillars > *', {
      y: 24, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out',
    }, 0.85)
    .from('.pillars-sec > *', {
      y: 12, opacity: 0, duration: 0.5, stagger: 0.05,
    }, 1.05)
    .from('#dashboard-mount', {
      y: 40, opacity: 0, scale: 0.985, duration: 1.1, ease: 'power3.out',
    }, 0.4);

  // ---------- 2. Scroll-driven reveals on every section heading ----------
  document.querySelectorAll('section').forEach((sec) => {
    if (sec.classList.contains('hero')) return;
    const eyebrow = sec.querySelector('.eyebrow');
    const heading = sec.querySelector('h2');
    const para = sec.querySelector('h2 + p, h2 ~ p, .muted');
    const els = [eyebrow, heading, para].filter(Boolean);
    if (!els.length) return;

    gsap.set(els, { opacity: 0, y: 28 });
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(els, {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08,
        });
      },
    });
  });

  // ---------- 3. Pillar cards rise on enter ----------
  ['.bento-grid', '.feature-row', '.deploy-grid'].forEach((sel) => {
    document.querySelectorAll(sel).forEach((grid) => {
      const cards = grid.children;
      gsap.set(cards, { opacity: 0, y: 36 });
      ScrollTrigger.create({
        trigger: grid,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            stagger: { each: 0.07, from: 'start' },
          });
        },
      });
    });
  });

  // ---------- 4. Parallax — hero dashboard floats slightly slower than scroll ----------
  const dash = document.getElementById('dashboard-mount');
  if (dash) {
    gsap.to(dash, {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
  }

  // Aurora glow drifts on scroll (the radial-gradient body bg via a pseudo proxy)
  const auroraProxy = document.createElement('div');
  auroraProxy.style.cssText = `
    position: fixed; inset: -10vh -10vw; pointer-events: none; z-index: -1;
    background:
      radial-gradient(700px 420px at var(--ax,80%) var(--ay,5%), color-mix(in oklab, var(--a1) 20%, transparent), transparent 65%),
      radial-gradient(600px 380px at var(--bx,5%) var(--by,30%), color-mix(in oklab, var(--a2) 14%, transparent), transparent 65%);
    transition: opacity .4s;
  `;
  document.body.appendChild(auroraProxy);
  gsap.to(auroraProxy, {
    '--ax': '15%', '--ay': '50%',
    '--bx': '90%', '--by': '70%',
    ease: 'none',
    scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 1.2 },
  });

  // ---------- 5. Number counters in the deploy stats strip ----------
  document.querySelectorAll('.stats-strip .num').forEach((el) => {
    const raw = el.textContent.trim();
    // pull last numeric run
    const match = raw.match(/([\d.]+)/);
    if (!match) return;
    const target = parseFloat(match[1]);
    const prefix = raw.slice(0, match.index);
    const suffix = raw.slice(match.index + match[0].length);
    const isFloat = match[1].includes('.');
    const obj = { v: 0 };
    // Wrap in <em> if original had <em>, preserve markup
    const hasEm = el.querySelector('em');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => {
            const n = isFloat ? obj.v.toFixed(1) : Math.round(obj.v);
            el.innerHTML = hasEm
              ? `${prefix}<em>${n}${suffix}</em>`
              : `${prefix}${n}${suffix}`;
          },
        });
      },
    });
  });

  // ---------- 6. Magnetic CTAs ----------
  document.querySelectorAll('.btn-accent, .btn-primary').forEach((btn) => {
    const strength = 18;
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // ---------- 7. Logos row → seamless marquee ----------
  document.querySelectorAll('.logos-row').forEach((row) => {
    const items = Array.from(row.children);
    if (!items.length) return;
    // duplicate twice for seamless loop
    const wrap = document.createElement('div');
    wrap.className = 'logos-marquee';
    wrap.style.cssText = `
      display: flex; gap: 40px; align-items: center; width: max-content;
      will-change: transform;
    `;
    [0, 1].forEach(() => {
      items.forEach((it) => {
        const c = it.cloneNode(true);
        c.style.flexShrink = '0';
        wrap.appendChild(c);
      });
    });
    items.forEach((it) => it.remove());
    row.style.overflow = 'hidden';
    row.style.maskImage = 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)';
    row.style.webkitMaskImage = 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)';
    row.style.justifyContent = 'flex-start';
    row.appendChild(wrap);
    // measure half width
    const totalW = wrap.scrollWidth / 2;
    gsap.to(wrap, {
      x: -totalW,
      duration: 38,
      ease: 'none',
      repeat: -1,
    });
  });

  // ---------- 8. Cost-bar fills animate from 0 on scroll ----------
  ScrollTrigger.create({
    trigger: '#cost-mount',
    start: 'top 75%',
    once: true,
    onEnter: () => {
      // Wait one tick for React to settle, then look for fills
      requestAnimationFrame(() => {
        const fills = document.querySelectorAll('#cost-mount [style*="width"]');
        fills.forEach((f) => {
          const m = (f.getAttribute('style') || '').match(/width:\s*([\d.]+)%/);
          if (!m) return;
          const target = m[1];
          gsap.fromTo(f, { width: 0 }, {
            width: target + '%', duration: 1.2, ease: 'power3.out',
          });
        });
      });
    },
  });

  // ---------- 9. Terminal cursor + line-by-line type-on for self-host block ----------
  const termLines = document.querySelectorAll('.term .term-line');
  if (termLines.length) {
    gsap.set(termLines, { opacity: 0, x: -8 });
    ScrollTrigger.create({
      trigger: '.term',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(termLines, {
          opacity: 1, x: 0, duration: 0.45, ease: 'power2.out',
          stagger: 0.18,
        });
      },
    });
  }

  // ---------- 10. Sticky-link underline indicator on nav (subtle ring on hover) ----------
  // Just elevate buttons on scroll to give the nav a "thickening" feel
  ScrollTrigger.create({
    start: 60,
    end: 99999,
    onUpdate: (self) => {
      const nav = document.querySelector('.nav');
      if (!nav) return;
      nav.style.background = self.progress > 0
        ? 'color-mix(in oklab, var(--ink-0) 90%, transparent)'
        : 'color-mix(in oklab, var(--ink-0) 70%, transparent)';
    },
  });

  // ---------- 11. Bento card hover micro-tilt ----------
  document.querySelectorAll('.bento-grid .b').forEach((card) => {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.4s cubic-bezier(.2,.8,.2,1)';
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, {
        rotationY: px * 4,
        rotationX: -py * 4,
        y: -2,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, duration: 0.7, ease: 'power3.out' });
    });
  });

  // ---------- 12. Refresh ScrollTrigger after React mounts ----------
  setTimeout(() => ScrollTrigger.refresh(), 600);
  setTimeout(() => ScrollTrigger.refresh(), 1500);
})();
