"use client";

import { useEffect } from "react";

type ScrollTriggerInstance = { kill: () => void };

export function MotionPolish() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    const triggers: ScrollTriggerInstance[] = [];
    const cleanups: Array<() => void> = [];

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Hero entrance timeline
      const hero = document.querySelector(".hero");
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".site-nav", { y: -20, opacity: 0, duration: 0.7 }, 0)
          .from(".hero .chip", { y: 16, opacity: 0, duration: 0.7 }, 0.15)
          .from(".hero h1", { y: 30, opacity: 0, duration: 0.9 }, 0.25)
          .from(".hero-sub", { y: 18, opacity: 0, duration: 0.7 }, 0.55)
          .from(".hero-cta-row > *", { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.7)
          .from(".pillars > *", { y: 24, opacity: 0, duration: 0.7, stagger: 0.07, ease: "power2.out" }, 0.85)
          .from(".pillars-sec > *", { y: 12, opacity: 0, duration: 0.5, stagger: 0.05 }, 1.05);
      }

      // Scroll-reveal on every non-hero section
      document.querySelectorAll<HTMLElement>("section").forEach((sec) => {
        if (sec.classList.contains("hero")) return;
        const eyebrow = sec.querySelector(".eyebrow");
        const heading = sec.querySelector("h2, h1");
        const para = sec.querySelector("h2 + p, h1 + p, .section-sub");
        const els = [eyebrow, heading, para].filter(Boolean) as Element[];
        if (!els.length) return;
        gsap.set(els, { opacity: 0, y: 28 });
        const t = ScrollTrigger.create({
          trigger: sec,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(els, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.08 });
          },
        });
        triggers.push(t);
      });

      // Grid staggers
      [".bento-grid", ".feature-row", ".pillars", ".pillars-all", ".tracks"].forEach((sel) => {
        document.querySelectorAll<HTMLElement>(sel).forEach((grid) => {
          const cards = Array.from(grid.children);
          if (!cards.length) return;
          if (grid.classList.contains("pillars") && hero) return; // hero already animated this
          gsap.set(cards, { opacity: 0, y: 28 });
          const t = ScrollTrigger.create({
            trigger: grid,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(cards, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: { each: 0.07, from: "start" },
              });
            },
          });
          triggers.push(t);
        });
      });

      // Aurora drift layer
      const auroraProxy = document.createElement("div");
      auroraProxy.setAttribute("data-aurora-proxy", "");
      auroraProxy.style.cssText = `
        position: fixed; inset: -10vh -10vw; pointer-events: none; z-index: -1;
        background:
          radial-gradient(700px 420px at var(--ax, 80%) var(--ay, 5%), color-mix(in oklab, var(--a1) 18%, transparent), transparent 65%),
          radial-gradient(600px 380px at var(--bx, 5%) var(--by, 30%), color-mix(in oklab, var(--a2) 12%, transparent), transparent 65%);
        transition: opacity .4s;
      `;
      document.body.appendChild(auroraProxy);
      const auroraTween = gsap.to(auroraProxy, {
        "--ax": "15%",
        "--ay": "50%",
        "--bx": "90%",
        "--by": "70%",
        ease: "none",
        scrollTrigger: { start: "top top", end: "bottom bottom", scrub: 1.2 },
      });
      if (auroraTween.scrollTrigger) triggers.push(auroraTween.scrollTrigger);
      cleanups.push(() => auroraProxy.remove());

      // Number counters
      document.querySelectorAll<HTMLElement>(".stats-strip .num").forEach((el) => {
        const raw = (el.textContent ?? "").trim();
        const match = raw.match(/([\d.]+)/);
        if (!match) return;
        const target = parseFloat(match[1]);
        const prefix = raw.slice(0, match.index);
        const suffix = raw.slice((match.index ?? 0) + match[0].length);
        const isFloat = match[1].includes(".");
        const hasEm = !!el.querySelector("em");
        const obj = { v: 0 };
        const t = ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                const n = isFloat ? obj.v.toFixed(1) : Math.round(obj.v);
                el.innerHTML = hasEm ? `${prefix}<em>${n}${suffix}</em>` : `${prefix}${n}${suffix}`;
              },
            });
          },
        });
        triggers.push(t);
      });

      // Magnetic CTAs
      document.querySelectorAll<HTMLElement>(".btn-accent, .btn-primary").forEach((btn) => {
        const strength = 14;
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
          const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
          gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
        };
        const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.5)" });
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
        });
      });

      // Cost-bar fills
      document.querySelectorAll<HTMLElement>("[data-cost-mount]").forEach((mount) => {
        const t = ScrollTrigger.create({
          trigger: mount,
          start: "top 80%",
          once: true,
          onEnter: () => {
            requestAnimationFrame(() => {
              const fills = mount.querySelectorAll<HTMLElement>(".cost-bar .fill");
              fills.forEach((f) => {
                const target = f.getAttribute("data-w");
                if (!target) return;
                gsap.fromTo(
                  f,
                  { width: 0 },
                  { width: `${target}%`, duration: 1.2, ease: "power3.out" }
                );
              });
            });
          },
        });
        triggers.push(t);
      });

      // Terminal type-on
      document.querySelectorAll<HTMLElement>(".term").forEach((term) => {
        const lines = term.querySelectorAll(".term-line");
        if (!lines.length) return;
        gsap.set(lines, { opacity: 0, x: -8 });
        const t = ScrollTrigger.create({
          trigger: term,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(lines, {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.15,
            });
          },
        });
        triggers.push(t);
      });

      // Nav thickening on scroll
      const nav = document.querySelector<HTMLElement>(".site-nav");
      if (nav) {
        const t = ScrollTrigger.create({
          start: 60,
          end: 99999,
          onUpdate: (self) => {
            nav.dataset.scrolled = self.progress > 0 ? "true" : "false";
          },
        });
        triggers.push(t);
      }

      // Bento micro-tilt
      document.querySelectorAll<HTMLElement>(".bento-grid .b").forEach((card) => {
        card.style.transformStyle = "preserve-3d";
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(card, {
            rotationY: px * 4,
            rotationX: -py * 4,
            y: -2,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
          });
        };
        const onLeave = () =>
          gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, duration: 0.7, ease: "power3.out" });
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      // Refresh after layout settles
      const r1 = setTimeout(() => ScrollTrigger.refresh(), 600);
      const r2 = setTimeout(() => ScrollTrigger.refresh(), 1500);
      cleanups.push(() => {
        clearTimeout(r1);
        clearTimeout(r2);
      });
    })();

    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill());
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
