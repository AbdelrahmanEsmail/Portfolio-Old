import type { CSSProperties } from 'react';
import { Icon, type IconName } from '../ui/Icon';
import styles from './visuals.module.css';

/*
 * Decorative CI pipeline for the Platform card: commit → test → build → deploy.
 * A pulse travels the track and each stage lights as it passes; under reduced
 * motion it settles into a calm, fully-passed state. Hidden from assistive tech.
 */
const stages: { label: string; icon: IconName }[] = [
  { label: 'commit', icon: 'commit' },
  { label: 'test', icon: 'check' },
  { label: 'build', icon: 'layers' },
  { label: 'deploy', icon: 'globe' },
];

export function Pipeline() {
  return (
    <div className={styles.pipeline} aria-hidden="true">
      <div className={styles.pipeHead}>
        <span className={styles.pipeCmd}>git push origin main</span>
        <span className={styles.pipeFile}>ci.yml</span>
      </div>
      <div className={styles.pipeBody}>
        <span className={styles.track}>
          <span className={styles.trackFill} />
          <span className={styles.pulseCarrier}>
            <span className={styles.pulse} />
          </span>
        </span>
        <span className={styles.stages}>
          {stages.map((stage, index) => (
            <span
              key={stage.label}
              className={`${styles.stage} ${index === stages.length - 1 ? styles.stageLive : ''}`}
              style={{ '--i': index } as CSSProperties}
            >
              <span className={styles.node}>
                <Icon name={stage.icon} size={14} strokeWidth={2} />
              </span>
              <span className={styles.stageLabel}>{stage.label}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
