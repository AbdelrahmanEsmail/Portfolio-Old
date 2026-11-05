'use client';

import { useEffect, useState } from 'react';
import { navigation } from '../../content';
import styles from './field-guide.module.css';

const pad = (value: number) => String(value).padStart(2, '0');

/** A quiet record of the sections encountered during this visit. */
export function FieldGuide() {
  const [visited, setVisited] = useState<ReadonlySet<string>>(() => new Set());

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      const entered = entries.filter((entry) => entry.isIntersecting);
      if (!entered.length) return;

      setVisited((current) => {
        const next = new Set(current);
        for (const entry of entered) next.add(`#${entry.target.id}`);
        return next.size === current.size ? current : next;
      });
      for (const entry of entered) observer.unobserve(entry.target);
    }, { threshold: 0, rootMargin: '0px 0px -25% 0px' });

    for (const item of navigation) {
      const section = document.getElementById(item.href.slice(1));
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`container ${styles.wrap}`}>
      <nav className={styles.guide} aria-label="Portfolio field guide">
        <svg className={styles.contours} viewBox="0 0 800 240" fill="none" aria-hidden="true" focusable="false">
          <path d="M31 228c47-60 12-125 94-162 91-42 128 67 222 22 88-43 94-94 198-59 72 24 81 88 169 61 44-13 59-39 91-49" />
          <path d="M61 246c44-65 15-127 81-157 83-39 126 61 210 23 85-38 100-91 188-60 73 25 88 89 169 62 45-15 67-39 102-47" />
          <path d="M94 253c38-69 22-123 71-144 71-30 121 58 193 25 78-35 103-84 177-58 73 25 89 88 166 62 43-15 75-38 116-45" />
          <path d="M126 261c35-71 29-115 62-128 59-24 113 54 176 24 70-33 103-75 165-55 72 23 97 85 166 59 43-16 77-37 124-41" />
          <path d="M164 267c25-71 32-105 50-110 48-14 103 44 156 22 66-29 104-68 153-52 69 23 102 78 166 58 42-13 79-34 130-36" />
          <path d="M201 271c19-64 38-93 51-90 35 9 76 33 125 18 60-19 99-57 141-47 63 15 106 70 164 55 44-12 85-30 139-28" />
        </svg>

        <div className={styles.meta}>
          <p className={styles.label}>Field guide</p>
          <p className={styles.progress} aria-label={`${visited.size} of ${navigation.length} chapters explored`}>
            <span>{pad(visited.size)} <span className={styles.separator}>/</span> {pad(navigation.length)}</span>
            <span>chapters explored</span>
          </p>
        </div>

        <ol className={styles.route}>
          {navigation.map((item) => {
            const explored = visited.has(item.href);
            return (
              <li key={item.href} className={styles.item} data-visited={explored ? '' : undefined}>
                <a className={styles.link} href={item.href}>
                  <span className={styles.marker} aria-hidden="true">
                    <span className={styles.diamond} />
                    <span className={styles.index}>{item.index}</span>
                  </span>
                  <span className={styles.title}>{item.label}</span>
                  {explored ? <span className="visually-hidden">, explored</span> : null}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
