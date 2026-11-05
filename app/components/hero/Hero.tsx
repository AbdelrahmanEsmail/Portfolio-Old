import type { CSSProperties } from 'react';
import { heroStats, site } from '../../content';
import { Icon } from '../ui/Icon';
import { HeroShell } from './HeroShell';
import { HeroStats } from './HeroStats';
import { LocalTime } from './LocalTime';
import { PaletteHint } from './PaletteHint';
import { SystemDiagram } from './SystemDiagram';
import styles from './hero.module.css';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** Back-to-front order of the decorative copies stacked behind "depth.". */
const DEPTH_LAYERS = [4, 3, 2, 1];

export function Hero() {
  return (
    <HeroShell id="top" className={styles.hero} labelledBy="hero-title">
      <div className={styles.ambient} aria-hidden="true">
        <svg className={styles.contours} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" focusable="false">
          <g fill="none" stroke="currentColor" strokeWidth="0.65">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d="M-160 590C90 140 350 850 610 420S1020 30 1390 230" transform={`translate(${i * 12} ${i * 23})`} />)}
          </g>
        </svg>
        <div className={styles.glowLime} />
        <div className={styles.glowPeri} />
        <div className={styles.floor}>
          <div className={styles.floorGrid} />
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`${styles.fieldNote} ${styles.enter}`} style={delay(0)}><span aria-hidden="true">◇</span> ZS / Software engineering <span className={styles.fieldNoteRule} /></p>
          <p className={`${styles.status} ${styles.enter}`} style={delay(40)}>
            <span className="status-dot" aria-hidden="true" />
            <span>Available for new roles</span>
            <span className={styles.statusDivider} aria-hidden="true" />
            <span className={styles.statusPlace}>
              <span>
                {site.locationShort}
              </span>
              <LocalTime timeZone={site.timeZone} className={styles.time} />
            </span>
          </p>

          {/* Accessible name: "Systems depth. Product polish." — the stacked copies are aria-hidden. */}
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.line}>
              <span className={styles.lineInner} style={delay(120)}>
                Systems{' '}
                <span className={styles.depth}>
                  <span className={styles.depthLayers} aria-hidden="true">
                    {DEPTH_LAYERS.map((i) => (
                      <span key={i} className={styles.depthLayer} style={{ '--i': i } as CSSProperties}>
                        {/* Text comes from CSS (::before) so the h1's text content stays clean for SEO. */}
                        <span className={styles.depthLayerInner} data-text="depth." />
                      </span>
                    ))}
                  </span>
                  <span className={styles.depthFace}>depth.</span>
                </span>
              </span>
            </span>{' '}
            <span className={styles.line}>
              <span className={styles.lineInner} style={delay(240)}>
                Product{' '}
                <span className={styles.polish}>
                  polish.
                  <Icon name="sparkle" className={styles.sparkle} />
                </span>
              </span>
            </span>
          </h1>

          <p className={`${styles.intro} ${styles.enter}`} style={delay(420)}>
            I&rsquo;m {site.firstName}. I build{' '}
            <span className={styles.hl}>web and mobile products</span>, connecting clear interfaces
            with the APIs, data, and business rules that make them work.
          </p>

          <div className={`${styles.actions} ${styles.enter}`} style={delay(540)}>
            <a className="btn btn-primary" href="#work">
              Explore my work
              <span className="btn-icon" data-direction="down">
                <Icon name="arrow-down" size={16} />
              </span>
            </a>
            <a className="btn btn-ghost" href={site.resume} target="_blank" rel="noopener noreferrer">
              Résumé
              <span className="visually-hidden">(opens in a new tab)</span>
              <span className="btn-icon">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </a>
            <PaletteHint className={styles.paletteHint} />
          </div>

          <div className={styles.enter} style={delay(680)}>
            <HeroStats stats={heroStats} />
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.diagram}>
            <SystemDiagram />
          </div>
        </div>
      </div>

      <a className={styles.scrollCue} href="#about">
        <span>
          Scroll<span className="visually-hidden"> to About</span>
        </span>
        <span className={styles.scrollTrack} aria-hidden="true" />
      </a>
    </HeroShell>
  );
}
