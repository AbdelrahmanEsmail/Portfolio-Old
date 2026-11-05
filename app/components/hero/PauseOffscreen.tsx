'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Decorative wrapper that sets `data-paused` while it is off-screen, so CSS
 * loops inside can stop (`[data-paused] … { animation-play-state: paused }`).
 */
export function PauseOffscreen({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.toggleAttribute('data-paused', !entry?.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
