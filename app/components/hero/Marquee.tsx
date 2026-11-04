import { marqueeSkills, principles, site } from '../../content';
import { Icon } from '../ui/Icon';
import { PauseOffscreen } from './PauseOffscreen';
import styles from './marquee.module.css';

/** Small-print strip: the tagline, working principles and availability — all from content.ts. */
const stripWords = [
  ...site.tagline.split('. ').map((part) => part.replace(/\.$/, '')),
  ...principles.map((principle) => principle.title),
  site.availability,
  site.location,
];

/**
 * Typographic band between the hero and About. Purely decorative (aria-hidden):
 * row 1 scrolls the skill list in huge alternating solid/outlined type, row 2 is
 * a thin lime strip running the other way. Each track holds two identical
 * copies and moves by −50% for a seamless loop; pauses on hover, off-screen,
 * and (globally) for reduced motion.
 */
export function Marquee() {
  return (
    <PauseOffscreen className={styles.marquee}>
      <div className={styles.band}>
        <div className={styles.rowBig}>
          <div className={styles.track}>
            {[0, 1].map((copy) => (
              <div key={copy} className={styles.group}>
                {marqueeSkills.map((skill, index) => (
                  <span key={skill} className={styles.item}>
                    <span className={index % 2 ? styles.outline : styles.solid}>{skill}</span>
                    <Icon name="sparkle" className={styles.spark} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rowStrip}>
          <div className={`${styles.track} ${styles.trackReverse}`}>
            {[0, 1].map((copy) => (
              <div key={copy} className={styles.group}>
                {[0, 1].flatMap((repeat) =>
                  stripWords.map((word) => (
                    <span key={`${repeat}-${word}`} className={styles.stripItem}>
                      {word}
                      <Icon name="sparkle" className={styles.stripSpark} />
                    </span>
                  )),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PauseOffscreen>
  );
}
