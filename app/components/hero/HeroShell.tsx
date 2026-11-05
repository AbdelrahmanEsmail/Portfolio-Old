'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type HeroShellProps = {
  id: string;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
};

/**
 * The hero <section>. Client-side it only adds behaviour on top of the
 * server-rendered markup:
 *  - pauses CSS loops (`data-paused`) and SVG/SMIL packets while off-screen;
 *  - pointer parallax on fine pointers: writes `--px` / `--py` (−1…1, eased)
 *    which the layers turn into small translations.
 * Both are skipped for reduced motion.
 */
export function HeroShell({ id, className, labelledBy, children }: HeroShellProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = true;

    const apply = () => {
      const svgPaused = !onScreen || reduce.matches;
      // Never pause CSS for reduced motion: entrance animations must still settle.
      section.toggleAttribute('data-paused', !onScreen);
      section.querySelectorAll('svg').forEach((svg) => {
        if (svgPaused) svg.pauseAnimations();
        else svg.unpauseAnimations();
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      apply();
    });
    observer.observe(section);
    reduce.addEventListener('change', apply);
    apply();

    return () => {
      observer.disconnect();
      reduce.removeEventListener('change', apply);
    };
  }, []);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reduce.matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const step = () => {
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      const settled = Math.abs(targetX - x) < 0.002 && Math.abs(targetY - y) < 0.002;
      if (settled) {
        x = targetX;
        y = targetY;
      }
      section.style.setProperty('--px', x.toFixed(4));
      section.style.setProperty('--py', y.toFixed(4));
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      targetX = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth) * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight) * 2 - 1));
      kick();
    };
    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);
    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} id={id} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  );
}
