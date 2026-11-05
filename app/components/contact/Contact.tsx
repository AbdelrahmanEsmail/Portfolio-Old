import type { CSSProperties } from 'react';
import { site } from '../../content';
import { Icon, type IconName } from '../ui/Icon';
import { LoopZone } from '../toolkit/LoopZone';
import { CopyEmailButton } from './CopyEmailButton';
import { LocalTime } from './LocalTime';
import { SignalDecor } from './SignalDecor';
import styles from './contact.module.css';

const [emailUser, emailDomain] = site.email.split('@');

const links: { label: string; href: string; icon: IconName }[] = [
  { label: 'GitHub', href: site.github, icon: 'github' },
  { label: 'LinkedIn', href: site.linkedin, icon: 'linkedin' },
  { label: 'Résumé', href: site.resume, icon: 'file' },
];

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

export function Contact() {
  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className="container">
        <div data-reveal>
          <LoopZone className={`panel-inverse ${styles.panel}`}>
            <SignalDecor />

            <div className={styles.content}>
              <p className="eyebrow">
                <span className="eyebrow-index">05</span>Let&apos;s connect
              </p>
              <h2 id="contact-title" className={`heading ${styles.heading}`}>
                Let&apos;s build something <em>useful.</em>
              </h2>
              <p className={styles.intro}>
                I&apos;m open to software engineering and full-stack roles, product work, and remote collaboration.
              </p>

              <div className={styles.emailRow} data-reveal style={delay(160)}>
                <a className={styles.email} href={`mailto:${site.email}`}>
                  <span className={styles.emailText}>
                    {emailUser}
                    <wbr />@{emailDomain}
                  </span>
                  <span className={styles.emailArrow} aria-hidden="true">
                    <Icon name="arrow-up-right" size={26} strokeWidth={2} />
                  </span>
                </a>
                <CopyEmailButton email={site.email} />
              </div>

              <div className={styles.bottom}>
                <dl className={styles.meta}>
                  <div className={styles.metaItem}>
                    <dt className={styles.metaLabel}>Local time · Egypt</dt>
                    <dd className={styles.metaValue}>
                      <LocalTime timeZone={site.timeZone} />
                    </dd>
                  </div>
                  <div className={styles.metaItem}>
                    <dt className={styles.metaLabel}>Availability</dt>
                    <dd className={`${styles.metaValue} ${styles.available}`}>
                      <span className={`status-dot ${styles.dot}`} aria-hidden="true" />
                      {site.availability}
                    </dd>
                  </div>
                  <div className={styles.metaItem}>
                    <dt className={styles.metaLabel}>Phone</dt>
                    <dd className={styles.metaValue}>
                      <a className={styles.phone} href={`tel:${site.phone}`}>
                        {site.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </dl>

                <ul className={styles.links}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a className={styles.pill} href={link.href} target="_blank" rel="noopener noreferrer">
                        <Icon name={link.icon} size={17} />
                        {link.label}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                        <Icon name="arrow-up-right" size={15} className={styles.pillArrow} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </LoopZone>
        </div>
      </div>
    </section>
  );
}
