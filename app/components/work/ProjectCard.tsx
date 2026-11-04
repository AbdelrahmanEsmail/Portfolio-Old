import Image from 'next/image';
import type { CSSProperties } from 'react';
import { accentHex, type Project } from '../../content';
import { Icon } from '../ui/Icon';
import styles from './work.module.css';

const ARABIC_RUN = /([؀-ۿ]+(?:\s+[؀-ۿ]+)*)/;

const pad = (value: number) => String(value).padStart(2, '0');
const hostname = (url: string) => new URL(url).hostname.replace(/^www\./, '');

/** Wraps Arabic runs (e.g. "Bee3a (بيعة)") so they get the Arabic font and direction. */
function ProjectTitle({ text }: { text: string }) {
  return (
    <>
      {text.split(ARABIC_RUN).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} lang="ar" dir="rtl" className={styles.arabic}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className={styles.links} data-tail="">
      <button
        type="button"
        className={`btn btn-ghost ${styles.detailButton}`}
        data-project-open=""
        aria-haspopup="dialog"
        aria-controls="project-dialog"
        aria-label={`Explore ${project.title}`}
      >
        Explore project
        <span className="btn-icon">
          <Icon name="arrow-up-right" size={16} />
        </span>
      </button>
      {project.liveUrl ? (
        <a className={styles.quickLink} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          Live site <Icon name="arrow-up-right" size={15} />
          <span className="visually-hidden">: {project.title} (opens in a new tab)</span>
        </a>
      ) : null}
      {project.appLinks?.length ? <span className={styles.appHint}>iOS + Android</span> : null}
    </div>
  );
}

type ProjectCardProps = {
  project: Project;
  /** Position in the full (unfiltered) list, 0-based. */
  index: number;
  total: number;
};

/**
 * One project "tile": authentic product imagery in an inset frame with a spec plate
 * underneath, and the story + links beside it (stacked on small screens).
 */
export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const titleId = `project-${project.slug}-title`;
  const address = project.liveUrl
    ? hostname(project.liveUrl)
    : project.appLinks?.length
      ? 'Android · iOS'
      : null;

  return (
    <article
      className={`${styles.card} panel panel-brass`}
      data-card=""
      data-spotlight=""
      aria-labelledby={titleId}
      style={{ '--accent': accentHex[project.accent] } as CSSProperties}
    >
      <div className={styles.media} data-empty={!project.image ? '' : undefined}>
        {project.image ? <Image
          className={styles.image}
          src={project.image}
          alt={project.imageAlt}
          width={1536}
          height={1024}
          sizes="(min-width: 1440px) 680px, (min-width: 1024px) 52vw, 94vw"
        /> : <div className={styles.mediaUnavailable}>
          <Icon name="layers" size={38} />
          <span>{project.label}</span>
          <strong>{project.title}</strong>
          <small>Screenshots unavailable</small>
        </div>}
        <div className={styles.mediaTop} aria-hidden="true">
          <span className={styles.tag}>
            {pad(index + 1)}
            <span className={styles.tagMuted}>/ {pad(total)}</span>
          </span>
          <span className={styles.tags}>
            {project.categories.map((category) => (
              <span key={category} className={styles.tag}>
                {category}
              </span>
            ))}
          </span>
        </div>
        {address ? (
          <div className={styles.mediaBottom} aria-hidden="true">
            <span className={`${styles.tag} ${styles.address}`}>
              <span className={styles.liveDot} />
              {address}
            </span>
          </div>
        ) : null}
      </div>

      {/* Title comes first in the DOM (heading navigation lands on it); the grid
          shows the label above it. */}
      <h3 className={styles.title} id={titleId}>
        <ProjectTitle text={project.title} />
      </h3>
      <p className={styles.label}>
        <span className={styles.dot} aria-hidden="true" />
        {project.label}
      </p>

      <p className={styles.desc}>{project.description}</p>

      <ul className={`chip-list ${styles.tech}`} aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => (
          <li key={technology} className="chip">
            {technology}
          </li>
        ))}
      </ul>

      <dl className={styles.stats} data-tail="">
        {project.stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.statLabel}>{stat.label}</dt>
            <dd className={styles.statValue}>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <ProjectLinks project={project} />

      {/* Dims the card as later cards slide over it (scroll-driven, desktop only). */}
      <span className={styles.shade} aria-hidden="true" />
    </article>
  );
}
