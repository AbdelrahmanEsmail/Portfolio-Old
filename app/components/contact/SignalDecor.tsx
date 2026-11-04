import styles from './contact.module.css';

/*
 * Decorative corner wiring for the contact panel: two signal lines run in from
 * the panel edges and terminate at an "endpoint" port, with packets travelling
 * along them. Hidden from assistive tech; static under reduced motion.
 */

const lineA = 'M480 136 H428 Q416 136 416 124 V104 Q416 92 404 92 H192';
const lineB = 'M306 0 V92';
const packetB = 'M306 0 V82 Q306 92 296 92 H192';
const stubC = 'M480 204 H376 Q364 204 364 192 V150';
const stubD = 'M182 102 V176 Q182 188 170 188 H112';

export function SignalDecor() {
  return (
    <svg className={styles.decor} viewBox="0 0 480 260" aria-hidden="true" focusable="false">
      <path className={styles.stub} d={stubC} />
      <path className={styles.stub} d={stubD} />
      <circle className={styles.stubDot} cx={364} cy={150} r={3} />
      <circle className={styles.stubDot} cx={112} cy={188} r={3} />

      <path className={`${styles.wire} ${styles.wireA}`} d={lineA} />
      <path className={`${styles.wire} ${styles.wireB}`} d={lineB} />

      <g className={styles.packets}>
        <path className={`${styles.packetHalo} ${styles.wireA}`} d={lineA} pathLength={100} />
        <path className={`${styles.packet} ${styles.wireA}`} d={lineA} pathLength={100} />
        <path className={`${styles.packetHalo} ${styles.wireB} ${styles.packetLate}`} d={packetB} pathLength={100} />
        <path className={`${styles.packet} ${styles.wireB} ${styles.packetLate}`} d={packetB} pathLength={100} />
      </g>

      <circle className={`${styles.joint} ${styles.wireB}`} cx={306} cy={92} r={3.5} />
      <circle className={`${styles.joint} ${styles.wireA}`} cx={416} cy={114} r={3.5} />

      {/* Endpoint port */}
      <circle className={styles.portPulse} cx={182} cy={92} r={10} />
      <circle className={styles.port} cx={182} cy={92} r={10} />
      <circle className={styles.portCore} cx={182} cy={92} r={3.5} />
    </svg>
  );
}
