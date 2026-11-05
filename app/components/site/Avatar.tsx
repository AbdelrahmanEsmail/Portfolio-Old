import Image from 'next/image';
import type { CSSProperties } from 'react';
import { site } from '../../content';
import styles from './avatar.module.css';

type AvatarProps = {
  size?: number;
  className?: string;
};

/**
 * Tiny round portrait cropped to the face. The source is a 3:4 half-length
 * night photo, so the image is zoomed (CSS transform) around the head.
 * Decorative: always rendered next to the visible name.
 */
export function Avatar({ size = 34, className }: AvatarProps) {
  return (
    <span
      className={className ? `${styles.avatar} ${className}` : styles.avatar}
      style={{ '--avatar-size': `${size}px` } as CSSProperties}
      aria-hidden="true"
    >
      <Image
        src={site.portrait}
        alt=""
        fill
        sizes={`${Math.round(size * 3)}px`}
        className={styles.image}
        style={{ objectFit: 'cover', objectPosition: '45% 30%' }}
      />
    </span>
  );
}
