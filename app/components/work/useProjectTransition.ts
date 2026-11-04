'use client';

import { useCallback, useEffect, useRef, type RefObject } from 'react';
import { flushSync } from 'react-dom';
import { prefersReducedMotion } from '../site/chrome';

type Direction = -1 | 1;
type Kind = 'project' | 'view';

/** An interruptible exit → content swap → entrance, without moving focused controls. */
export function useProjectTransition(
  contentRef: RefObject<HTMLDivElement | null>,
  mastheadRef: RefObject<HTMLDivElement | null>,
  footerRef: RefObject<HTMLElement | null>,
) {
  const animationsRef = useRef<Animation[]>([]);
  const sequenceRef = useRef(0);

  const cancel = useCallback(() => {
    sequenceRef.current += 1;
    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];
  }, []);

  useEffect(() => cancel, [cancel]);

  const swap = useCallback(async (commit: () => void, direction: Direction, kind: Kind) => {
    const targets = () => [
      contentRef.current,
      ...(kind === 'project'
        ? [mastheadRef.current, ...Array.from(footerRef.current?.querySelectorAll<HTMLElement>('[data-project-nav-text]') ?? [])]
        : []),
    ].filter((element): element is HTMLDivElement | HTMLElement => element !== null);

    const outgoing = targets();
    // Capture the current frame before cancelling, so quick repeated clicks stay smooth.
    const current = outgoing.map((element) => {
      const style = getComputedStyle(element);
      return { opacity: style.opacity, transform: style.transform };
    });
    cancel();
    if (prefersReducedMotion() || !outgoing.length || outgoing.some((element) => typeof element.animate !== 'function')) {
      flushSync(commit);
      return;
    }

    const sequence = sequenceRef.current;
    const exit = outgoing.map((element, index) => element.animate([
      current[index],
      { opacity: 0, transform: `translateX(${-direction * 18}px)` },
    ], { duration: 140, easing: 'ease-out', fill: 'both' }));
    animationsRef.current = exit;
    await Promise.all(exit.map((animation) => animation.finished.catch(() => {})));
    if (sequence !== sequenceRef.current) return;

    flushSync(commit);
    exit.forEach((animation) => animation.cancel());
    const enter = targets().map((element) => element.animate([
      { opacity: 0, transform: `translateX(${direction * 28}px)` },
      { opacity: 1, transform: 'translateX(0)' },
    ], { duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'both' }));
    animationsRef.current = enter;
    await Promise.all(enter.map((animation) => animation.finished.catch(() => {})));
    if (sequence !== sequenceRef.current) return;
    enter.forEach((animation) => animation.cancel());
    animationsRef.current = [];
  }, [cancel, contentRef, footerRef, mastheadRef]);

  return { swap, cancel };
}
