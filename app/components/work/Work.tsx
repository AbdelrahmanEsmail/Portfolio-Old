import type { CSSProperties } from 'react';
import { projects, site } from '../../content';
import { Icon } from '../ui/Icon';
import { ProjectCard } from './ProjectCard';
import { ProjectStack } from './ProjectStack';
import { ProjectDialog } from './ProjectDialog';
import styles from './work.module.css';

const NUMBER_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
const countWord = (count: number) => NUMBER_WORDS[count] ?? String(count);

export function Work() {
  const total = projects.length;

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <header className={styles.intro}>
          <div data-reveal="">
            <p className="eyebrow">
              <span className="eyebrow-index">02</span>Selected work
            </p>
            <h2 className="heading" id="work-title">
              Engineering the complete <em>experience.</em>
            </h2>
          </div>
          <p
            className={`lead ${styles.lead}`}
            data-reveal=""
            style={{ '--delay': '120ms' } as CSSProperties}
          >
            {countWord(total)} production systems across multi-tenant SaaS, financial platforms, commerce,
            and real-time products.
          </p>
        </header>

        <ProjectStack
          items={projects.map((project, index) => ({
            slug: project.slug,
            categories: project.categories,
            card: <ProjectCard project={project} index={index} total={total} />,
          }))}
        />
        <ProjectDialog />

        <div className={styles.outro} data-reveal="">
          <div>
            <p className={styles.outroTitle}>
              Want the <em>full story?</em>
            </p>
            <p className={styles.outroText}>Roles, dates, and responsibilities — all in the résumé.</p>
          </div>
          <div className={styles.outroActions}>
            <a className="btn btn-primary" href={site.resume} target="_blank" rel="noopener noreferrer">
              Résumé
              <span className="visually-hidden"> (PDF, opens in a new tab)</span>
              <span className="btn-icon">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </a>
            <a className="btn btn-ghost" href={site.github} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={18} />
              GitHub
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
