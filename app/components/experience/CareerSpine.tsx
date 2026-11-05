'use client';

import { useEffect, useRef } from 'react';
import styles from './experience.module.css';

/** Where the "read head" sits, as a fraction of the viewport height. */
const READ_LINE = 0.6;

/**
 * Scroll-linked progress for the career graph. Rendered inside the graph wrapper,
 * next to the server-rendered <ol>: it measures the commit nodes, fills the spine
 * with lime down to the read line and marks passed commits with `data-lit`.
 *
 * Cost per frame: one rect read and two transform writes, rAF-throttled, and the
 * scroll listener only exists while the graph is near the viewport.
 * Reduced motion: a static, fully lit graph.
 */
export function CareerSpine() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    const tip = tipRef.current;
    const graph = track?.parentElement;
    if (!track || !fill || !tip || !graph) return;

    const commits = Array.from(graph.querySelectorAll<HTMLElement>('[data-commit]'));
    const nodes = commits.map((commit) => commit.querySelector<HTMLElement>('[data-node]'));
    if (commits.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lit = commits.map(() => false);
    let offsets: number[] = [];
    let start = 0;
    let length = 0;
    let painted = -1;
    let frame = 0;
    let listening = false;

    // Node centres relative to the graph; the track spans first → last node.
    const measure = () => {
      const top = graph.getBoundingClientRect().top;
      offsets = nodes.map((node) => {
        if (!node) return 0;
        const rect = node.getBoundingClientRect();
        return rect.top + rect.height / 2 - top;
      });
      start = offsets[0] ?? 0;
      length = Math.max(0, (offsets[offsets.length - 1] ?? 0) - start);
      track.style.top = `${start}px`;
      track.style.height = `${length}px`;
      painted = -1;
    };

    const paint = (px: number) => {
      if (px === painted) return;
      painted = px;
      const progress = length > 0 ? px / length : 1;
      fill.style.transform = `scaleY(${progress})`;
      tip.style.transform = `translate3d(0, ${px}px, 0)`;
      tip.toggleAttribute('data-on', progress > 0.002 && progress < 0.998);
      commits.forEach((commit, index) => {
        const on = offsets[index] - start <= px + 1;
        if (on !== lit[index]) {
          lit[index] = on;
          commit.toggleAttribute('data-lit', on);
        }
      });
    };

    const update = () => {
      frame = 0;
      if (reduceMotion.matches) {
        paint(length);
        return;
      }
      const top = graph.getBoundingClientRect().top;
      const px = Math.round(window.innerHeight * READ_LINE - top - start);
      paint(Math.min(Math.max(px, 0), length));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const near = entries[entries.length - 1]?.isIntersecting ?? false;
        if (near && !listening) {
          listening = true;
          window.addEventListener('scroll', schedule, { passive: true });
        } else if (!near && listening) {
          listening = false;
          window.removeEventListener('scroll', schedule);
        }
        // Settle on enter/exit too, so a fast jump never leaves a half-filled spine.
        schedule();
      },
      { rootMargin: '25% 0px 25% 0px' },
    );

    const ro = new ResizeObserver(() => {
      measure();
      schedule();
    });

    measure();
    update();
    io.observe(graph);
    ro.observe(graph);
    window.addEventListener('resize', schedule, { passive: true });
    reduceMotion.addEventListener('change', schedule);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduceMotion.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <div ref={trackRef} className={styles.track} aria-hidden="true">
      <span ref={fillRef} className={styles.fill} />
      <span ref={tipRef} className={styles.tip} />
    </div>
  );
}
