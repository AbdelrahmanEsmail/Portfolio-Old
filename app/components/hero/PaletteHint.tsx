'use client';

import { openCommandPalette } from '../ui/events';
import { useModifierKey } from './hooks';

/** "or press ⌘K" — opens the command palette. Hidden on touch devices via CSS. */
export function PaletteHint({ className }: { className?: string }) {
  const modifier = useModifierKey();
  return (
    <button type="button" className={className} onClick={() => openCommandPalette()}>
      <span>or press</span>
      <kbd className="kbd">{modifier === '⌘' ? '⌘K' : 'Ctrl K'}</kbd>
      <span className="visually-hidden">to open the command palette</span>
    </button>
  );
}
