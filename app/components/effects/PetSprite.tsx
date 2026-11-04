import styles from './pet-sprite.module.css';

type PetSpriteProps = {
  kind: 'claude' | 'gpt';
  mood?: 'walking' | 'waving' | 'sleeping';
  className?: string;
};

/** Original pixel companions; their parent scene controls where they travel. */
export function PetSprite({ kind, mood = 'walking', className = '' }: PetSpriteProps) {
  return (
    <svg
      className={`${styles.sprite} ${styles[kind]} ${styles[mood]} ${className}`}
      width="40"
      height="36"
      viewBox="0 0 40 36"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {kind === 'claude' ? (
        <>
          <g className={styles.body}>
            <path d="M12 7h16v3h4v4h3v10h-4v4H9v-4H5V14h3v-4h4z" />
            <path className={styles.highlight} d="M13 10h12v3H13z" />
            <g className={styles.leftArm}><path d="M2 15h5v4H2zM1 12h3v4H1z" /></g>
            <g className={styles.rightArm}><path d="M33 15h5v4h-5zM36 12h3v4h-3z" /></g>
            <g className={styles.eyes}><path d="M13 16h3v5h-3zM25 16h3v5h-3z" /></g>
            <path className={styles.smile} d="M18 23h5v2h-5z" />
          </g>
          <g className={styles.leftFoot}><path d="M9 26h4v7H9zM16 26h3v5h-3z" /></g>
          <g className={styles.rightFoot}><path d="M27 26h4v7h-4zM22 26h3v5h-3z" /></g>
        </>
      ) : (
        <>
          <g className={styles.body}>
            <path d="M18 5h4v5h-4z" />
            <path className={styles.antenna} d="M18 1h4v2h2v3h-2v2h-4V6h-2V3h2z" />
            <path d="M12 10h16v3h5v3h3v9h-3v4H7v-4H4v-9h3v-3h5z" />
            <path className={styles.highlight} d="M12 13h12v2H12z" />
            <path className={styles.face} d="M10 17h20v8H10z" />
            <g className={styles.eyes}><path d="M13 18h3v3h-3zM24 18h3v3h-3z" /></g>
            <path className={styles.smile} d="M17 22h2v1h3v-1h2v2h-7z" />
            <g className={styles.leftArm}><path d="M1 20h5v5H1z" /></g>
            <g className={styles.rightArm}><path d="M34 20h5v5h-5z" /></g>
          </g>
          <g className={styles.leftFoot}><path d="M10 28h6v5H8v-3h2z" /></g>
          <g className={styles.rightFoot}><path d="M24 28h6v2h2v3h-8z" /></g>
        </>
      )}
    </svg>
  );
}
