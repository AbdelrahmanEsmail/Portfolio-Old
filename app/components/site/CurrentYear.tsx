'use client';

import { useSyncExternalStore } from 'react';

const subscribeNever = () => () => {};
const readYear = () => new Date().getFullYear();

/** The server/build year is rendered first; the visitor's clock corrects it after hydration. */
export function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(subscribeNever, readYear, () => fallback);
  return <>{year}</>;
}
