// Small client-side helpers shared by the site chrome (header, command palette).

import { useSyncExternalStore } from 'react';

/** Fired when the chrome scrolls to a section/card on the user's behalf. */
export const NAVIGATE_EVENT = 'portfolio:navigate';
export type NavigateDetail = { id: string };

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Tell the header a programmatic jump is starting (it pins itself and moves the nav pill). */
export function announceNavigation(id: string) {
  window.dispatchEvent(new CustomEvent<NavigateDetail>(NAVIGATE_EVENT, { detail: { id } }));
}

// ---------------------------------------------------------------------------
// Scroll lock — stackable (menu + palette can overlap for a frame), keeps the
// scroll position (overflow on <html>, not position:fixed on <body>) and
// reserves the scrollbar gutter so nothing shifts sideways.

let lockCount = 0;
let restoreRoot: (() => void) | null = null;

export function lockScroll(): () => void {
  const root = document.documentElement;
  if (lockCount === 0) {
    const previousOverflow = root.style.overflow;
    const previousGutter = root.style.getPropertyValue('scrollbar-gutter');
    const hasScrollbar = window.innerWidth > root.clientWidth;
    root.style.overflow = 'hidden';
    if (hasScrollbar) root.style.setProperty('scrollbar-gutter', 'stable');
    restoreRoot = () => {
      root.style.overflow = previousOverflow;
      if (previousGutter) root.style.setProperty('scrollbar-gutter', previousGutter);
      else root.style.removeProperty('scrollbar-gutter');
    };
  }
  lockCount += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      restoreRoot?.();
      restoreRoot = null;
    }
  };
}

// ---------------------------------------------------------------------------
// Programmatic in-page navigation.

/** Move keyboard focus to a landmark without scrolling or painting a giant ring. */
function focusTarget(target: HTMLElement) {
  if (!target.hasAttribute('tabindex')) {
    const previousOutline = target.style.outline;
    target.setAttribute('tabindex', '-1');
    target.style.outline = 'none';
    target.addEventListener(
      'blur',
      () => {
        target.removeAttribute('tabindex');
        target.style.outline = previousOutline;
      },
      { once: true },
    );
  }
  target.focus({ preventScroll: true });
}

/**
 * Smooth-scroll to an element by id, clear of the fixed header (honours the
 * global scroll-padding). Sticky elements (e.g. stacked project cards) are
 * measured at their in-flow position so the jump lands where they stick.
 * Returns false when the target is missing or not rendered.
 */
export function scrollToId(id: string, { focus = false }: { focus?: boolean } = {}): boolean {
  const target = document.getElementById(id);
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'instant' : 'smooth';

  if (id === 'top') {
    window.scrollTo({ top: 0, behavior });
    if (target && focus) focusTarget(target);
    return true;
  }
  if (!target || target.getClientRects().length === 0) return false;

  const computed = getComputedStyle(target);
  if (computed.position === 'sticky') {
    const stickyTop = Number.parseFloat(computed.top);
    const inlinePosition = target.style.position;
    target.style.position = 'static';
    const flowTop = target.getBoundingClientRect().top + window.scrollY;
    target.style.position = inlinePosition;
    const offset = Number.isFinite(stickyTop) ? stickyTop : 100;
    window.scrollTo({ top: Math.max(0, flowTop - offset), behavior });
  } else {
    target.scrollIntoView({ block: 'start', behavior });
  }

  if (focus) focusTarget(target);
  return true;
}

// ---------------------------------------------------------------------------
// Platform: ⌘ on Apple devices, Ctrl elsewhere. Server render assumes ⌘ and
// the client corrects it after hydration (no mismatch warning).

const subscribeNever = () => () => {};

function readIsApple() {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  return /mac|iphone|ipad|ipod/i.test(nav.userAgentData?.platform || nav.platform || nav.userAgent);
}

export function useIsApple(): boolean {
  return useSyncExternalStore(subscribeNever, readIsApple, () => true);
}
