import { asset, navigation, site } from '../../content';
import { Icon, type IconName } from '../ui/Icon';
import { Avatar } from './Avatar';
import { CurrentYear } from './CurrentYear';
import { FieldGuide } from './FieldGuide';
import styles from './footer.module.css';

/** Evaluated on the server (build time for the static export); the client island corrects it. */
const BUILD_YEAR = new Date().getFullYear();

/** The second sentence of the tagline gets the serif accent. */
const [taglineLead, ...taglineRest] = site.tagline.split('. ');
const taglineAccent = taglineRest.join('. ');

type ElsewhereLink = { label: string; href: string; icon: IconName; external: boolean };

const elsewhere: ElsewhereLink[] = [
  { label: 'GitHub', href: site.github, icon: 'github', external: true },
  { label: 'LinkedIn', href: site.linkedin, icon: 'linkedin', external: true },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'mail', external: false },
  { label: 'Résumé', href: site.resume, icon: 'file', external: true },
];

export function Footer({ home = true }: { home?: boolean }) {
  const sectionHref = (hash: string) => home ? hash : `${asset('/')}${hash}`;
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.signal}`} aria-hidden="true">
        <span className={styles.signalLine} />
        <span className={styles.junction} />
        <span className={styles.junctionEnd} />
        <span className={styles.packetTrack}>
          <span className={styles.packet} />
        </span>
      </div>

      <p className={styles.signature} aria-hidden="true">
        {site.handle}
      </p>

      {home ? <FieldGuide /> : null}

      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <a className={styles.brand} href={sectionHref('#top')}>
            <Avatar size={36} />
            {site.name}
          </a>
          <p className={styles.tagline}>
            {taglineAccent ? (
              <>
                {taglineLead}. <em>{taglineAccent}</em>
              </>
            ) : (
              site.tagline
            )}
          </p>
          <p className={styles.status}>
            <span className="status-dot" aria-hidden="true" />
            {site.availability}
          </p>
        </div>

        <nav className={styles.col} aria-labelledby="footer-index-label">
          <p id="footer-index-label" className={`label ${styles.colLabel}`}>
            Index
          </p>
          <ul className={styles.links}>
            {navigation.map((item) => (
              <li key={item.href}>
                <a className={styles.link} href={sectionHref(item.href)}>
                  <span className={styles.index} aria-hidden="true">
                    {item.index}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <p id="footer-elsewhere-label" className={`label ${styles.colLabel}`}>
            Elsewhere
          </p>
          <ul className={styles.links} aria-labelledby="footer-elsewhere-label">
            {elsewhere.map((link) => (
              <li key={link.label}>
                <a
                  className={styles.link}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon name={link.icon} size={16} className={styles.linkIcon} />
                  {link.label}
                  {link.external ? (
                    <>
                      <Icon name="arrow-up-right" size={14} className={styles.linkArrow} />
                      <span className="visually-hidden">(opens in a new tab)</span>
                    </>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.base}`}>
        <p className={styles.meta}>
          <span>
            © <CurrentYear fallback={BUILD_YEAR} /> {site.name}
          </span>
          <span>{site.location}</span>
          <span>Built with Next.js &amp; TypeScript</span>
        </p>
        <a className={`btn btn-ghost ${styles.toTop}`} href="#top">
          Back to top
          <span className="btn-icon">
            <Icon name="arrow-up" size={15} strokeWidth={2} />
          </span>
        </a>
      </div>
    </footer>
  );
}
