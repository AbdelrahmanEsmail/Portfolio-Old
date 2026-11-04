'use client';

import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { accentHex, projects } from '../../content';
import { projectDetails, type ProjectScreen } from '../../project-details';
import { lockScroll, prefersReducedMotion } from '../site/chrome';
import { Icon } from '../ui/Icon';
import { PROJECT_OPEN_EVENT, type ProjectOpenDetail } from './events';
import { useProjectTransition } from './useProjectTransition';
import styles from './project-dialog.module.css';

const pad = (value: number) => String(value).padStart(2, '0');

export function ProjectDialog() {
  const [active, setActive] = useState<ProjectOpenDetail | null>(null);
  const [closing, setClosing] = useState(false);
  const [view, setView] = useState<'story' | 'gallery'>('story');
  const [screen, setScreen] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mastheadRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const originRef = useRef<ProjectOpenDetail['origin']>(undefined);
  const backdropPressRef = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingProjectRef = useRef<string | null>(null);
  const pendingViewRef = useRef<'story' | 'gallery'>('story');
  const { swap, cancel: cancelSwap } = useProjectTransition(contentRef, mastheadRef, footerRef);

  const index = projects.findIndex((project) => project.slug === active?.slug);
  const project = projects[index];
  const isOpen = Boolean(project);

  const finishClose = useCallback(() => {
    cancelSwap();
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setActive(null);
    setClosing(false);
  }, [cancelSwap]);

  const requestClose = useCallback(() => {
    if (closeTimer.current) return;
    cancelSwap();
    if (prefersReducedMotion()) {
      finishClose();
      return;
    }
    setClosing(true);
    // A timer also handles interrupted animations and browser backgrounding.
    closeTimer.current = setTimeout(finishClose, 220);
  }, [cancelSwap, finishClose]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<ProjectOpenDetail>).detail;
      if (!detail || !projects.some((project) => project.slug === detail.slug)) return;
      cancelSwap();
      pendingProjectRef.current = detail.slug;
      pendingViewRef.current = 'story';
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = null;
      triggerRef.current = detail.trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      originRef.current = detail.origin;
      setClosing(false);
      setScreen(0);
      setView('story');
      setActive(detail);
    };
    window.addEventListener(PROJECT_OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener(PROJECT_OPEN_EVENT, onOpen);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [cancelSwap]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const shell = shellRef.current;
    if (!isOpen || !dialog || !shell) return;
    // Native dialog supplies modal semantics, focus containment, and an inert page.
    if (!dialog.open) dialog.showModal();
    const unlock = lockScroll();
    const rect = shell.getBoundingClientRect();
    const origin = originRef.current;
    if (origin) {
      const x = origin.x + origin.width / 2 - (rect.x + rect.width / 2);
      const y = origin.y + origin.height / 2 - (rect.y + rect.height / 2);
      shell.style.setProperty('--launch-x', `${Math.max(-window.innerWidth / 2, Math.min(window.innerWidth / 2, x))}px`);
      shell.style.setProperty('--launch-y', `${Math.max(-window.innerHeight / 2, Math.min(window.innerHeight / 2, y))}px`);
    }
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      unlock();
      const trigger = triggerRef.current;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
    // The same dialog stays open while browsing the adjacent projects.
  }, [isOpen]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [active?.slug, view]);

  useLayoutEffect(() => {
    const tabs = tabsRef.current;
    if (!isOpen || !tabs) return;
    const measure = () => {
      const selected = tabs.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
      if (!selected || !tabs.isConnected) return;
      tabs.style.setProperty('--active-tab-x', `${selected.offsetLeft}px`);
      tabs.style.setProperty('--active-tab-w', `${selected.offsetWidth}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(tabs);
    document.fonts?.ready.then(measure, () => {});
    return () => observer.disconnect();
  }, [isOpen, view]);

  if (!project || !active) return null;

  const details = projectDetails[project.slug];
  const screens: ProjectScreen[] = details?.screens.length
    ? details.screens
    : project.image ? [{ src: project.image, alt: project.imageAlt, caption: project.title }] : [];
  const selected = screens[screen] ?? screens[0];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const hostname = project.liveUrl ? new URL(project.liveUrl).hostname.replace(/^www\./, '') : project.appLinks?.length ? 'Android + iOS' : project.title;

  const changeProject = (direction: -1 | 1) => {
    if (closing) return;
    const pendingIndex = projects.findIndex((item) => item.slug === pendingProjectRef.current);
    const target = projects[((pendingIndex < 0 ? index : pendingIndex) + direction + projects.length) % projects.length];
    pendingProjectRef.current = target.slug;
    pendingViewRef.current = 'story';
    void swap(() => {
      setScreen(0);
      setView('story');
      setActive((current) => current ? { ...current, slug: target.slug } : null);
    }, direction, 'project');
  };
  const changeView = (nextView: 'story' | 'gallery') => {
    if (closing || pendingViewRef.current === nextView) return;
    const targetSlug = pendingProjectRef.current ?? active.slug;
    const target = projects.find((item) => item.slug === targetSlug);
    if (nextView === 'gallery' && !projectDetails[targetSlug]?.screens.length && !target?.image) return;
    const changesProject = targetSlug !== active.slug;
    pendingViewRef.current = nextView;
    // The in-gallery launch button is replaced with the content; keep focus in a stable control.
    tabsRef.current?.querySelector<HTMLButtonElement>(`button[data-view="${nextView}"]`)?.focus({ preventScroll: true });
    void swap(() => {
      // If a tab interrupts project navigation, commit the latest intended project too.
      if (changesProject) {
        setScreen(0);
        setActive((current) => current ? { ...current, slug: targetSlug } : null);
      }
      setView(nextView);
    }, nextView === 'gallery' ? 1 : -1, changesProject ? 'project' : 'view');
  };
  const changeScreen = (delta: number) => setScreen((value) => (value + delta + screens.length) % screens.length);

  return createPortal(
    <dialog
      ref={dialogRef}
      id="project-dialog"
      className={styles.dialog}
      aria-labelledby="project-dialog-title"
      aria-describedby="project-dialog-description"
      data-closing={closing ? '' : undefined}
      style={{ '--project-accent': accentHex[project.accent] } as CSSProperties}
      onCancel={(event) => { event.preventDefault(); requestClose(); }}
      onClose={finishClose}
      onPointerDown={(event) => { backdropPressRef.current = event.target === event.currentTarget; }}
      onClick={(event) => {
        if (backdropPressRef.current && event.target === event.currentTarget) requestClose();
        backdropPressRef.current = false;
      }}
      onKeyDown={(event) => {
        if (view !== 'gallery' || screens.length < 2 || event.altKey || event.metaKey || event.ctrlKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          changeScreen(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <div ref={shellRef} className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.filebar}>
            <p className={styles.fileLabel}><Icon name="file" size={15} /> Project file <span>/ {pad(index + 1)}</span></p>
            <div className={styles.closeGroup}>
              <span className={styles.escapeHint}>Esc to close</span>
              <button ref={closeRef} type="button" className={styles.iconButton} onClick={requestClose} aria-label="Close project details">
                <Icon name="close" size={20} />
              </button>
            </div>
          </div>
          <div ref={mastheadRef} className={styles.masthead}>
            <div>
              <p className={styles.category}>{project.label}</p>
              <h2 id="project-dialog-title" className={styles.title} dir="auto">{project.title}</h2>
            </div>
            <span className={styles.projectNumber} aria-hidden="true">{pad(index + 1)}<span> / {pad(projects.length)}</span></span>
          </div>
          <p id="project-dialog-description" className="visually-hidden">Project overview, engineering highlights, image gallery, and live links.</p>
          <div ref={tabsRef} className={styles.tabs} role="group" aria-label="Project view">
            <span className={styles.tabIndicator} aria-hidden="true" />
            <button type="button" data-view="story" aria-pressed={view === 'story'} onClick={() => changeView('story')}>
              <Icon name="layers" size={15} /> The story
            </button>
            {screens.length > 0 ? <button type="button" data-view="gallery" aria-pressed={view === 'gallery'} onClick={() => changeView('gallery')}>
              <Icon name="layout" size={15} /> Gallery <span>{pad(screens.length)}</span>
            </button> : null}
            <span className={styles.tabNote}>A closer look, layer by layer.</span>
          </div>
        </header>

        <div ref={bodyRef} className={styles.body}>
          <div ref={contentRef} key={`${project.slug}-${view}`} className={styles.content} data-gallery={view === 'gallery' ? '' : undefined}>
            <div className={styles.storyGrid} data-gallery={view === 'gallery' ? '' : undefined}>
              <section className={styles.gallery} aria-label={`${project.title} gallery`}>
                {selected ? <>
                <div className={styles.browserBar}>
                  <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
                  <span>{hostname}</span>
                  <Icon name={project.liveUrl ? 'globe' : 'smartphone'} size={14} />
                </div>
                <figure className={styles.figure}>
                  <div className={styles.viewer} data-expanded={view === 'gallery' ? '' : undefined}>
                    <Image key={selected.src} src={selected.src} alt={selected.alt} fill sizes="(max-width: 800px) 92vw, 900px" className={styles.screen} />
                    <span className={styles.imageKind}>{
                      selected.kind === 'app-store' ? 'App Store screenshot'
                        : selected.kind === 'demo' ? 'Demo screen'
                          : selected.kind === 'photo' ? 'Product photo' : 'Product screen'
                    }</span>
                    {view === 'story' ? (
                      <button type="button" className={styles.expandButton} onClick={() => changeView('gallery')} aria-label="Expand project gallery">
                        Open gallery <Icon name="arrow-up-right" size={16} />
                      </button>
                    ) : <a className={styles.expandButton} href={selected.src} target="_blank" rel="noopener noreferrer">
                      Full image <Icon name="arrow-up-right" size={16} />
                      <span className="visually-hidden">: {selected.caption} (opens in a new tab)</span>
                    </a>}
                  </div>
                  <figcaption className={styles.caption} aria-live="polite">
                    <span>{selected.caption}</span>
                    <span className={styles.imageCount}>{pad(screen + 1)} <span>/ {pad(screens.length)}</span></span>
                  </figcaption>
                </figure>
                {screens.length > 1 ? (
                  <div className={styles.galleryControls}>
                    <button type="button" className={styles.iconButton} onClick={() => changeScreen(-1)} aria-label="Previous image"><Icon name="arrow-right" className={styles.reverseArrow} /></button>
                    <div className={styles.thumbnails} role="group" aria-label="Choose gallery image">
                      {screens.map((image, imageIndex) => (
                        <button key={`${image.src}-${imageIndex}`} type="button" aria-label={`View image ${imageIndex + 1}: ${image.caption}`} aria-pressed={screen === imageIndex} onClick={() => setScreen(imageIndex)}>
                          <Image src={image.src} alt="" width={120} height={80} />
                        </button>
                      ))}
                    </div>
                    <button type="button" className={styles.iconButton} onClick={() => changeScreen(1)} aria-label="Next image"><Icon name="arrow-right" /></button>
                  </div>
                ) : null}
                </> : <div className={styles.previewUnavailable}>
                  <Icon name="layers" size={32} />
                  <h3>Screenshots unavailable</h3>
                  <p>Read the project overview and product highlights.</p>
                </div>}
              </section>

              {view === 'story' ? (
                <section className={styles.story} aria-label="Project overview">
                  <p className={styles.sectionLabel}><span>01</span> The overview</p>
                  <p className={styles.overview}>{details?.overview ?? project.description}</p>
                  <dl className={styles.stats}>
                    {project.stats.map((stat) => (
                      <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
                    ))}
                  </dl>
                  <div className={styles.stack}>
                    <h3 className={styles.sectionLabel}>Built with</h3>
                    <ul className="chip-list" aria-label="Project technologies">{project.technologies.map((tech) => <li key={tech} className="chip">{tech}</li>)}</ul>
                  </div>
                  {project.liveUrl || project.appLinks?.length ? <div className={styles.liveLinks}>
                    <h3 className={styles.sectionLabel}>See it live</h3>
                    {project.liveUrl ? (
                      <a className={`btn btn-primary ${styles.liveButton}`} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Visit live site <Icon name="arrow-up-right" size={18} />
                        <span className="visually-hidden">: {project.title} (opens in a new tab)</span>
                      </a>
                    ) : null}
                    {project.appLinks?.map((app) => (
                      <div key={app.label} className={styles.appLinks}>
                        <p><Icon name="smartphone" size={15} />{app.label}</p>
                        <div>
                          <a href={app.googlePlay} target="_blank" rel="noopener noreferrer">Google Play <Icon name="arrow-up-right" size={14} /><span className="visually-hidden">: {app.label} (opens in a new tab)</span></a>
                          <a href={app.appStore} target="_blank" rel="noopener noreferrer">App Store <Icon name="arrow-up-right" size={14} /><span className="visually-hidden">: {app.label} (opens in a new tab)</span></a>
                        </div>
                      </div>
                    ))}
                  </div> : null}
                </section>
              ) : null}
            </div>

            {view === 'story' && details?.highlights.length ? (
              <section className={styles.highlights} aria-labelledby="project-highlights-title">
                <h3 id="project-highlights-title" className={styles.sectionLabel}><span>02</span> Inside the build</h3>
                <div className={styles.highlightGrid}>
                  {details.highlights.map((highlight, highlightIndex) => (
                    <article key={highlight.title}>
                      <span className={styles.highlightIndex} aria-hidden="true">{pad(highlightIndex + 1)}</span>
                      <h4>{highlight.title}</h4>
                      <p>{highlight.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <footer ref={footerRef} className={styles.footer}>
          <button type="button" onClick={() => changeProject(-1)} aria-label={`Previous project: ${previous.title}`}>
            <Icon name="arrow-right" className={styles.reverseArrow} />
            <span data-project-nav-text><span className={styles.navLabel}>Previous project</span><span className={styles.navTitle} dir="auto">{previous.title}</span></span>
          </button>
          <span className={styles.footerMark} aria-hidden="true"><Icon name="sparkle" size={21} /></span>
          <button type="button" onClick={() => changeProject(1)} aria-label={`Next project: ${next.title}`}>
            <span data-project-nav-text><span className={styles.navLabel}>Next project</span><span className={styles.navTitle} dir="auto">{next.title}</span></span>
            <Icon name="arrow-right" />
          </button>
        </footer>
        <p className="visually-hidden" role="status">Project {index + 1} of {projects.length}: {project.title}</p>
      </div>
    </dialog>,
    document.body,
  );
}
