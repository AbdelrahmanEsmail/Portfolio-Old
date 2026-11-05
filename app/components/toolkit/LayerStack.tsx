import type { CSSProperties } from 'react';
import styles from './visuals.module.css';

/*
 * Decorative "exploded view" for the Frontend card: design tokens → components
 * → interface, stacked as isometric tiles like the diorama covers. The layers
 * spread apart while the card is hovered or focused. Hidden from assistive tech.
 */
export function LayerStack() {
  return (
    <div className={styles.layers} aria-hidden="true">
      <div className={styles.iso}>
        <div className={`${styles.layer} ${styles.layerTokens}`} style={{ '--z': 0 } as CSSProperties}>
          <span className={styles.swatches}>
            <span className={styles.swatch} />
            <span className={styles.swatch} />
            <span className={styles.swatch} />
            <span className={styles.swatch} />
          </span>
          <span className={styles.gridLines} />
        </div>
        <div className={`${styles.layer} ${styles.layerParts}`} style={{ '--z': 1 } as CSSProperties}>
          <span className={styles.part} />
          <span className={styles.part} />
          <span className={styles.part} />
        </div>
        <div className={`${styles.layer} ${styles.layerUi}`} style={{ '--z': 2 } as CSSProperties}>
          <span className={styles.uiDots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.uiTitle} />
          <span className={styles.uiLine} />
          <span className={`${styles.uiLine} ${styles.uiLineShort}`} />
          <span className={styles.uiButton} />
        </div>
      </div>
    </div>
  );
}
