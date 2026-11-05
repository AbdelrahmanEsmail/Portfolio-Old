import type { CSSProperties } from 'react';
import { asset, homeProjectSlugs, projects } from '../../content';
import { Icon } from '../ui/Icon';
import { ProjectCard } from './ProjectCard';
import { ProjectStack } from './ProjectStack';
import { ProjectDialog } from './ProjectDialog';
import styles from './work.module.css';

export function Work() {
  const total = projects.length;
  const showcase = homeProjectSlugs.map((slug) => projects.find((project) => project.slug === slug)!);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <header className={styles.intro}>
          <div data-reveal="">
            <p className="eyebrow">
              <span className="eyebrow-index">02</span>Selected work
            </p>
            <h2 className="heading" id="work-title">
              Built for the work <em>people do.</em>
            </h2>
          </div>
          <p
            className={`lead ${styles.lead}`}
            data-reveal=""
            style={{ '--delay': '120ms' } as CSSProperties}
          >
            Five selected builds, from business operations to mobile experiences.
            {' '}Explore the full collection of {total} projects for the interfaces, systems, and decisions behind them.
          </p>
        </header>

        <p className={styles.showcaseLabel}>{String(showcase.length).padStart(2, '0')} selected <span aria-hidden="true">/</span> {total} projects in the collection</p>
        <ProjectStack
          showFilters={false}
          items={showcase.map((project) => ({
            slug: project.slug,
            categories: project.categories,
            card: <ProjectCard project={project} index={projects.indexOf(project)} total={total} />,
          }))}
        />
        <ProjectDialog />

        <div className={styles.outro} data-reveal="">
          <div>
            <p className={styles.outroTitle}>
              More work. <em>More ground covered.</em>
            </p>
            <p className={styles.outroText}>Browse all {total} projects, with product galleries and engineering notes.</p>
          </div>
          <div className={styles.outroActions}>
            <a className="btn btn-primary" href={asset('/projects/')}>
              View all {total} projects
              <span className="btn-icon">
                <Icon name="arrow-up-right" size={16} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
