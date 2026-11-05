'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './diagram.module.css';

type LogLine = { method: string; text: string; status: string; meta: string };

type SystemLogProps = {
  lines: readonly LogLine[];
  className?: string;
  style?: CSSProperties;
};

const VISIBLE = 5;
const INTERVAL = 1800;
const FIRST_TICK = 3200;

/**
 * Decorative "tail -f" console. Every ~1.8s the next entry from `systemLog`
 * slides in at the bottom and the rest move up. Rows are absolutely positioned
 * by slot so the shift is a transform transition. Static for reduced motion,
 * paused while off-screen or in a background tab.
 */
export function SystemLog({ lines, className, style }: SystemLogProps) {
  const [head, setHead] = useState(VISIBLE);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || lines.length <= VISIBLE) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let visible = false;
    let timer = 0;
    let warm = false;

    const stop = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const schedule = () => {
      if (timer || !visible || document.hidden || reduce.matches) return;
      timer = window.setTimeout(
        () => {
          timer = 0;
          warm = true;
          setHead((value) => value + 1);
          schedule();
        },
        warm ? INTERVAL : Math.max(INTERVAL, FIRST_TICK - performance.now()),
      );
    };
    const update = () => {
      stop();
      schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      update();
    });
    observer.observe(root);
    document.addEventListener('visibilitychange', update);
    reduce.addEventListener('change', update);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      reduce.removeEventListener('change', update);
    };
  }, [lines.length]);

  // Rows head-VISIBLE … head-1 are on screen (slots 0–4); head-VISIBLE-1 is leaving (slot −1).
  const rows: { seq: number; slot: number; line: LogLine }[] = [];
  for (let seq = head - VISIBLE - 1; seq < head; seq += 1) {
    if (seq < 0) continue;
    rows.push({ seq, slot: seq - (head - VISIBLE), line: lines[seq % lines.length] });
  }

  return (
    <div ref={rootRef} className={className} style={style} aria-hidden="true">
      <div className={styles.logBar}>
        <span className={styles.logDots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.logTitle}>system.log</span>
        <span className={styles.logLive}>
          <span className={styles.logLiveDot} />
          demo
        </span>
      </div>
      <ol className={styles.logRows}>
        {rows.map(({ seq, slot, line }) => (
          <li
            key={seq}
            className={styles.logRow}
            data-initial={seq < VISIBLE ? '' : undefined}
            data-leaving={slot < 0 ? '' : undefined}
            style={{ '--slot': slot, '--seq': seq } as CSSProperties}
          >
            <span className={styles.logRowInner}>
              <span className={styles.logMethod} data-method={line.method}>
                {line.method}
              </span>
              <span className={styles.logText}>{line.text}</span>
              <span className={styles.logStatus}>{line.status}</span>
              <span className={styles.logMeta}>{line.meta}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
