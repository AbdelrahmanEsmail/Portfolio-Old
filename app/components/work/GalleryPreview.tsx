'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './project-dialog.module.css';

const OPEN_DISTANCE = 40;

/** Scrolling the preview expands it; the surrounding story keeps its normal scroll. */
export function GalleryPreview({ expanded, disabled, onExpand, children }: {
  expanded: boolean;
  disabled: boolean;
  onExpand: (input: 'wheel' | 'touch') => void;
  children: ReactNode;
}) {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || expanded || disabled) return;

    let opened = false;
    let distance = 0;
    let lastWheel = 0;
    let touchStart: { x: number; y: number } | null = null;
    const expand = (input: 'wheel' | 'touch') => {
      if (opened) return;
      opened = true;
      onExpand(input);
    };

    const onWheel = (event: WheelEvent) => {
      // Leave pinch zoom, horizontal swipes, and upward scrolling to the browser.
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) { distance = 0; return; }
      if (event.deltaY <= 0) { distance = 0; return; }
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 180) distance = 0;
      lastWheel = now;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? preview.clientHeight : 1;
      distance += event.deltaY * unit;
      if (distance >= OPEN_DISTANCE) expand('wheel');
    };
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches.length === 1 ? event.touches[0] : null;
      touchStart = touch ? { x: touch.clientX, y: touch.clientY } : null;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1) { touchStart = null; return; }
      if (!touchStart) return;
      const touch = event.touches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touchStart.y - touch.clientY;
      if (dy < 8 || Math.abs(dx) > dy) return;
      event.preventDefault();
      if (dy >= OPEN_DISTANCE) expand('touch');
    };
    const onTouchEnd = () => { touchStart = null; };

    // Native non-passive listeners let the opening gesture stay inside the modal.
    preview.addEventListener('wheel', onWheel, { passive: false });
    preview.addEventListener('touchstart', onTouchStart, { passive: true });
    preview.addEventListener('touchmove', onTouchMove, { passive: false });
    preview.addEventListener('touchend', onTouchEnd);
    preview.addEventListener('touchcancel', onTouchEnd);
    return () => {
      preview.removeEventListener('wheel', onWheel);
      preview.removeEventListener('touchstart', onTouchStart);
      preview.removeEventListener('touchmove', onTouchMove);
      preview.removeEventListener('touchend', onTouchEnd);
      preview.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [expanded, disabled, onExpand]);

  return <div ref={previewRef} className={styles.viewer} data-expanded={expanded ? '' : undefined}>{children}</div>;
}
