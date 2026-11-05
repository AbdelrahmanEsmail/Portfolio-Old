'use client';

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

/** True when the visitor asked for reduced motion. Always false during SSR / hydration. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

const noopSubscribe = () => () => {};

/** "⌘" on Apple platforms, "Ctrl" elsewhere. Renders "⌘" on the server, corrected after hydration. */
export function useModifierKey() {
  return useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent) ? '⌘' : 'Ctrl'),
    () => '⌘',
  );
}

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatTime(timeZone: string) {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' });
    formatters.set(timeZone, formatter);
  }
  return formatter.format(new Date());
}

/** Re-render on every minute boundary. */
function subscribeMinutes(callback: () => void) {
  let timer = 0;
  const schedule = () => {
    timer = window.setTimeout(() => {
      callback();
      schedule();
    }, 60_000 - (Date.now() % 60_000) + 40);
  };
  schedule();
  return () => window.clearTimeout(timer);
}

/** Local "HH:MM" in the given IANA time zone; `--:--` on the server and during hydration. */
export function useLocalTime(timeZone: string) {
  return useSyncExternalStore(
    subscribeMinutes,
    () => formatTime(timeZone),
    () => '--:--',
  );
}
