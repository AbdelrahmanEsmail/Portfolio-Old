'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type LoopZoneProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Wrapper for regions with ambient CSS loops. While the region is off-screen it
 * carries `data-offscreen`, which the section styles use to set
 * `--play: paused` — every loop inside reads `animation-play-state: var(--play, running)`.
 * The attribute is toggled directly on the node, so nothing re-renders.
 */
export function LoopZone({ className, children }: LoopZoneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) node.toggleAttribute('data-offscreen', !entry.isIntersecting);
      },
      { rootMargin: '160px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
