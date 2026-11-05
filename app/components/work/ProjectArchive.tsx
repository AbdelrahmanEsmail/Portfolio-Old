'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { accentHex, type Project } from '../../content';
import { Icon } from '../ui/Icon';
import { openProject, PROJECT_REVEAL_EVENT } from './events';
import styles from './project-archive.module.css';

type ArchiveItem = { project: Project; number: number };

/** The rest of the body of work: readable records, without invented screenshots. */
export function ProjectArchive({ items, collection = false }: { items: ArchiveItem[]; collection?: boolean }) {
  const [query, setQuery] = useState('');
  const pending = useRef<string | null>(null);
  const ProjectHeading = collection ? 'h3' : 'h4';
  const term = query.trim().toLocaleLowerCase();
  const visible = items.filter(({ project }) =>
    `${project.title} ${project.label} ${project.description} ${project.technologies.join(' ')}`.toLocaleLowerCase().includes(term),
  );

  const scrollTo = (slug: string) => {
    const element = document.getElementById(`project-${slug}`);
    if (!element) return;
    element.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    element.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const reveal = (slug: string) => {
      if (!items.some(({ project }) => project.slug === slug)) return;
      if (!query) scrollTo(slug);
      else { pending.current = slug; setQuery(''); }
    };
    const onReveal = (event: Event) => reveal(String((event as CustomEvent<string>).detail));
    const onHashChange = () => {
      const match = /^#project-(.+)$/.exec(window.location.hash);
      if (match) {
        try { reveal(decodeURIComponent(match[1])); } catch { /* Ignore malformed URL fragments. */ }
      }
    };
    window.addEventListener(PROJECT_REVEAL_EVENT, onReveal);
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => {
      window.removeEventListener(PROJECT_REVEAL_EVENT, onReveal);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [items, query]);

  useEffect(() => {
    if (!query && pending.current) {
      const slug = pending.current;
      pending.current = null;
      scrollTo(slug);
    }
  }, [query]);

  const open = (event: MouseEvent<HTMLButtonElement>, slug: string) => {
    const rect = event.currentTarget.closest('article')?.getBoundingClientRect();
    openProject({
      slug,
      trigger: event.currentTarget,
      origin: rect ? { x: rect.x, y: rect.y, width: rect.width, height: rect.height } : undefined,
    });
  };

  return (
    <section className={styles.archive} data-collection={collection ? '' : undefined} aria-labelledby="archive-title">
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}><span aria-hidden="true">↳</span> {collection ? 'The full collection' : 'From the workspace'}</p>
          {collection ? <h2 id="archive-title" className={styles.title}>Find your <em>next project to explore.</em></h2>
            : <h3 id="archive-title" className={styles.title}>More work. <em>More ground covered.</em></h3>}
          <p className={styles.intro}>Products, practical tools, and experiments. Each has its own project notes.</p>
        </div>
        <label className={styles.search}>
          <Icon name="search" size={15} />
          <span className="visually-hidden">Search the project archive</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a project or technology…" />
        </label>
      </header>

      <p className={styles.count} role="status">{visible.length} of {items.length} project notes</p>
      {visible.length ? (
        <ul className={styles.grid}>
          {visible.map(({ project, number }) => (
            <li key={project.slug} id={`project-${project.slug}`}>
              <article className={styles.card} style={{ '--file-accent': accentHex[project.accent] } as CSSProperties}>
                <div className={styles.filebar}>
                  <span><Icon name="file" size={13} />ZS / {String(number).padStart(2, '0')}</span>
                  <span className={styles.kind}>{project.kind ?? 'Product'}</span>
                </div>
                {project.image ? <div className={styles.preview}>
                  <Image src={project.image} alt={project.imageAlt} fill style={{ objectFit: 'scale-down' }} sizes="(max-width: 639px) 88vw, 520px" />
                </div> : null}
                <p className={styles.label}>{project.label}</p>
                <ProjectHeading className={styles.name} dir="auto">{project.title}</ProjectHeading>
                <p className={styles.description}>{project.description}</p>
                <ul className={styles.technologies} aria-label={`${project.title} technologies`}>
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <button type="button" className={styles.open} aria-haspopup="dialog" aria-controls="project-dialog" onClick={(event) => open(event, project.slug)}>
                  Read project notes<Icon name="arrow-up-right" size={16} />
                  <span className="visually-hidden">: {project.title}</span>
                </button>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <Icon name="search" size={22} />
          <p>No projects match “{query}”.</p>
          <button type="button" onClick={() => setQuery('')}>Clear search</button>
        </div>
      )}
    </section>
  );
}
