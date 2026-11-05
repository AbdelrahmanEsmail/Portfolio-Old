'use client';

import { useEffect } from 'react';

/**
 * Global, render-less effects mounted once on the page.
 *
 * 1. Reveal-on-scroll: any element with `data-reveal` fades/slides in the first
 *    time it enters the viewport (adds `.is-visible`). Works for elements that
 *    are added later too (e.g. filtered project cards). Optional per-element
 *    delay via the CSS custom property `--delay` (e.g. style={{'--delay':'120ms'}}).
 *
 * 2. Spotlight: any element with `data-spotlight` receives `--mx` / `--my`
 *    custom properties (pointer position relative to the element) so CSS can
 *    paint a cursor-following glow. Fine pointers only.
 */
export function Effects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('reveal-ready');

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
    );

    const observeAll = () => {
      document
        .querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
        .forEach((element) => io.observe(element));
    };
    observeAll();

    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        observeAll();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const target = last.target instanceof Element ? last.target : null;
      const element = target?.closest<HTMLElement>('[data-spotlight]');
      if (!element) return;
      const rect = element.getBoundingClientRect();
      element.style.setProperty('--mx', `${last.clientX - rect.left}px`);
      element.style.setProperty('--my', `${last.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
