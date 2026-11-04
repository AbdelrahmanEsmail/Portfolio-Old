import type { CSSProperties, ReactNode } from 'react';
import { experience, principles, site, skillGroups, type SkillGroup } from '../../content';
import { Icon, type IconName } from '../ui/Icon';
import { LayerStack } from './LayerStack';
import { LoopZone } from './LoopZone';
import { Pipeline } from './Pipeline';
import { SchemaDiagram } from './SchemaDiagram';
import styles from './toolkit.module.css';

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties;

type Variant = 'backend' | 'frontend' | 'platform';

/** Visual treatment per skill group (content stays in content.ts). */
const groupStyle: Record<string, { variant: Variant; icon: IconName; visual: ReactNode }> = {
  Backend: { variant: 'backend', icon: 'database', visual: <SchemaDiagram /> },
  Frontend: { variant: 'frontend', icon: 'layout', visual: <LayerStack /> },
  Platform: { variant: 'platform', icon: 'server', visual: <Pipeline /> },
};

const cellClass: Record<Variant, string> = {
  backend: styles.cellBackend,
  frontend: styles.cellFrontend,
  platform: styles.cellPlatform,
};

function SkillCard({ group, variant, icon, visual }: { group: SkillGroup; variant: Variant; icon: IconName; visual: ReactNode }) {
  const titleId = `stack-${variant}`;
  return (
    <article className={`panel ${styles.card} ${styles[variant]}`} data-spotlight data-tk-card aria-labelledby={titleId}>
      <div className={styles.cardTop}>
        <span className={styles.index}>{group.number}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.iconChip} aria-hidden="true">
          <Icon name={icon} size={16} />
        </span>
      </div>
      <div className={styles.cardHead}>
        <h3 id={titleId} className={styles.cardTitle}>
          {group.title}
        </h3>
        <p className={styles.cardDesc}>{group.description}</p>
      </div>
      <div className={styles.visual}>{visual}</div>
      <ul className={`chip-list ${styles.skills}`} aria-label={`${group.title} skills`}>
        {group.skills.map((skill) => (
          <li key={skill} className={`chip ${styles.skill}`}>
            {skill}
          </li>
        ))}
      </ul>
    </article>
  );
}

function NowCard() {
  const role = experience.find((entry) => entry.current) ?? experience[0];
  return (
    <article className={`panel ${styles.card} ${styles.now}`} data-spotlight data-tk-card aria-labelledby="stack-now">
      <div className={styles.cardTop}>
        <span className={styles.nowLabel}>
          <span className="status-dot" aria-hidden="true" />
          Now
        </span>
        <span className={styles.rule} aria-hidden="true" />
        <span className={styles.hash} aria-hidden="true">
          {role.hash}
        </span>
      </div>
      <h3 id="stack-now" className={`${styles.cardHead} ${styles.nowRole}`}>
        {site.currentRole.title}{' '}
        <span className={styles.nowCompany}>
          at <em>{site.currentRole.company}</em>
        </span>
      </h3>
      <dl className={styles.nowMeta}>
        <div>
          <dt className="visually-hidden">Where</dt>
          <dd>{role.tag}</dd>
        </div>
        <div>
          <dt className="visually-hidden">Since</dt>
          <dd>{role.period}</dd>
        </div>
      </dl>
      <a className={styles.nowLink} href="#experience">
        Full experience
        <Icon name="arrow-right" size={15} />
      </a>
    </article>
  );
}

function PrinciplesCard() {
  return (
    <article
      className={`panel ${styles.card} ${styles.principlesCard}`}
      data-spotlight
      data-tk-card
      aria-labelledby="stack-principles"
    >
      <div className={styles.cardTop}>
        <h3 id="stack-principles" className={styles.miniTitle}>
          Principles
        </h3>
        <span className={styles.iconChip} aria-hidden="true">
          <Icon name="sparkle" size={16} />
        </span>
      </div>
      <ol className={styles.principles}>
        {principles.map((principle) => (
          <li key={principle.number} className={styles.principle}>
            <span className={styles.principleNum} aria-hidden="true">
              {principle.number}
            </span>
            <h4 className={styles.principleTitle}>{principle.title}</h4>
            <p className={styles.principleDesc}>{principle.description}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

export function Toolkit() {
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="container">
        <header className={styles.header}>
          <div data-reveal>
            <p className="eyebrow">
              <span className="eyebrow-index">04</span>Toolkit
            </p>
            <h2 id="stack-title" className="heading">
              The tools to build the <em>whole product.</em>
            </h2>
          </div>
          <p className={styles.intro} data-reveal style={delay(120)}>
            React, Next.js, and TypeScript for the interface. Python, Django, and PostgreSQL for the systems
            behind it. Docker and CI/CD to bring everything into production.
          </p>
        </header>

        <LoopZone className={styles.bento}>
          {skillGroups.map((group, index) => {
            const look = groupStyle[group.title] ?? { variant: 'platform' as const, icon: 'layers' as const, visual: null };
            return (
              <div key={group.title} className={`${styles.cell} ${cellClass[look.variant]}`} data-reveal style={delay(index * 90)}>
                <SkillCard group={group} variant={look.variant} icon={look.icon} visual={look.visual} />
              </div>
            );
          })}
          <div className={`${styles.cell} ${styles.cellNow}`} data-reveal style={delay(270)}>
            <NowCard />
          </div>
          <div className={`${styles.cell} ${styles.cellPrinciples}`} data-reveal style={delay(360)}>
            <PrinciplesCard />
          </div>
        </LoopZone>
      </div>
    </section>
  );
}
