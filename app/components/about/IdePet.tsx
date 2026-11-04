import styles from './ide-pet.module.css';

/** A tiny Claude-inspired pixel companion, animated entirely in CSS. */
export function IdePet({ celebrating }: { celebrating: boolean }) {
  return (
    <div className={styles.habitat} aria-hidden="true">
      <div className={`${styles.roam} ${celebrating ? styles.celebrating : ''}`}>
        <span className={styles.bubble}>nice!</span>
        <span className={styles.spark} />
        <span className={styles.shadow} />
        <svg className={styles.pet} width="36" height="32" viewBox="0 0 28 24" fill="currentColor" shapeRendering="crispEdges" focusable="false">
          <g className={styles.body}>
            <path d="M8 3h12v2h3v3h2v8h-3v3H6v-3H3V8h2V5h3z" />
            <path d="M1 10h3v3H1zM24 10h3v3h-3z" />
            <path d="M9 5h9v2H9z" className={styles.highlight} />
            <g className={styles.eyes}>
              <path d="M9 9h2v4H9zM17 9h2v4h-2z" />
            </g>
          </g>
          <g className={styles.leftFeet}><path d="M6 17h3v6H6zM11 17h2v4h-2z" /></g>
          <g className={styles.rightFeet}><path d="M19 17h3v6h-3zM15 17h2v4h-2z" /></g>
        </svg>
      </div>
    </div>
  );
}
