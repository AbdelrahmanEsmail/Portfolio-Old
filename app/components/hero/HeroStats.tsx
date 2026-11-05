'use client';

import { useEffect, useRef } from 'react';
import styles from './hero.module.css';

type Stat = { value: string; label: string };

/** "100K+" → { digits: "100", suffix: "K+" }. Values without leading digits are shown as-is. */
function split(value: string) {
  const match = /^(\d+)(.*)$/.exec(value);
  return match ? { digits: match[1], suffix: match[2] } : null;
}

const DURATION = 1500;
const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

/**
 * Headline numbers. The server renders the final values; on the client the
 * digits count up once, the first time the row is on screen (skipped entirely
 * for reduced motion). Leading zeros and suffixes are preserved.
 */
export function HeroStats({ stats }: { stats: readonly Stat[] }) {
  const listRef = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const counters = Array.from(list.querySelectorAll<HTMLElement>('[data-count]')).map((node) => {
      const final = node.dataset.count ?? '';
      return { node, final, target: Number(final), width: final.length };
    });
    if (!counters.length) return;

    const render = (progress: number) => {
      counters.forEach(({ node, target, width }, index) => {
        // Small stagger so the numbers don't land in lockstep.
        const local = Math.min(1, Math.max(0, (progress * DURATION - index * 90) / (DURATION - 270)));
        node.textContent = String(Math.round(target * easeOutQuart(local))).padStart(width, '0');
      });
    };

    let frame = 0;
    let started = false;
    let startAt = 0;
    render(0);

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startAt) / DURATION);
      render(progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else counters.forEach(({ node, final }) => (node.textContent = final));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        // Let the row's entrance animation get underway first on initial load.
        startAt = Math.max(performance.now(), 950);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.25 },
    );
    observer.observe(list);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      counters.forEach(({ node, final }) => (node.textContent = final));
    };
  }, []);

  return (
    <dl ref={listRef} className={styles.stats}>
      {stats.map((stat) => {
        const parts = split(stat.value);
        return (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.statLabel}>{stat.label}</dt>
            <dd className={styles.statValue}>
              {parts ? (
                <>
                  <span className="visually-hidden">{stat.value}</span>
                  <span aria-hidden="true">
                    <span data-count={parts.digits}>{parts.digits}</span>
                    {parts.suffix ? <span className={styles.statSuffix}>{parts.suffix}</span> : null}
                  </span>
                </>
              ) : (
                stat.value
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
