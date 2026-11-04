'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { projectFilters, type ProjectCategory, type ProjectFilter } from '../../content';
import { PROJECT_REVEAL_EVENT } from './events';
import styles from './work.module.css';

export type StackItem = {
  slug: string;
  categories: ProjectCategory[];
  /** Server-rendered <ProjectCard />. */
  card: ReactNode;
};

const pad = (value: number) => String(value).padStart(2, '0');
const plural = (count: number) => (count === 1 ? 'project' : 'projects');

function matches(item: StackItem, filter: ProjectFilter) {
  return filter === 'All' || item.categories.includes(filter);
}

function describe(filter: ProjectFilter, count: number) {
  return filter === 'All'
    ? `Showing all ${count} ${plural(count)}`
    : `Showing ${count} ${filter} ${plural(count)}`;
}

/** True when the stack layout is allowed at the current viewport (set in work.module.css). */
function stackEligible(list: HTMLElement) {
  return getComputedStyle(list).getPropertyValue('--stack-eligible').trim() === '1';
}

function visibleItems(list: HTMLElement) {
  return Array.from(list.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement && !element.hidden,
  );
}

/** In the stack every card has a fixed height; does this one's content spill past it? */
function cardOverflows(item: HTMLElement) {
  const card = item.querySelector<HTMLElement>('[data-card]');
  if (!card) return false;
  const limit = card.clientHeight - (parseFloat(getComputedStyle(card).paddingBottom) || 0) + 1;
  return Array.from(card.querySelectorAll<HTMLElement>(':scope > [data-tail]')).some(
    (element) => element.offsetTop + element.offsetHeight > limit,
  );
}

/** Scroll a card's resting position into view and move focus to it (no focus ring). */
function scrollToProject(slug: string) {
  const item = document.getElementById(`project-${slug}`);
  if (!item) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  item.scrollIntoView({ block: 'start', behavior: reduce ? 'instant' : 'smooth' });
  if (!item.hasAttribute('tabindex')) {
    item.setAttribute('tabindex', '-1');
    item.addEventListener('blur', () => item.removeAttribute('tabindex'), { once: true });
  }
  item.focus({ preventScroll: true });
}

/**
 * Filter chips + the project list. Cards are rendered on the server and passed
 * in; this island only owns the filter state and the stack's safety nets.
 */
export function ProjectStack({ items }: { items: StackItem[] }) {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [status, setStatus] = useState('');
  const listRef = useRef<HTMLOListElement>(null);
  const pendingSlug = useRef<string | null>(null);

  const visible = items.filter((item) => matches(item, filter));
  const countFor = (option: ProjectFilter) => items.filter((item) => matches(item, option)).length;

  const choose = (next: ProjectFilter) => {
    setFilter(next);
    setStatus(describe(next, countFor(next)));
  };

  // Safety net for the sticky stack: if any visible card's content would not
  // fit the fixed card height (browser zoom, a larger default font, ...), fall
  // back to the plain list instead of clipping. Re-checked on resize, after
  // web fonts load, and whenever the filter changes.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;

    const check = () => {
      frame = 0;
      if (!stackEligible(list)) return;
      // Measure in stack mode; trying it and (maybe) reverting happens in one
      // synchronous pass, so nothing flickers.
      delete list.dataset.fit;
      if (visibleItems(list).some(cardOverflows)) list.dataset.fit = 'no';
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener('resize', schedule);
    document.fonts?.ready.then(schedule, () => {});
    return () => {
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, [filter]);

  // Covers stay lazy for the first paint, but as soon as the list comes within
  // a screen of the viewport all of them start loading — a fast fling or a
  // jump from the command palette must never land on an empty frame.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        list.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((image) => {
          image.loading = 'eager';
        });
        io.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    io.observe(list);
    return () => io.disconnect();
  }, []);

  // Keyboard users: when focus lands in a card that later cards cover, scroll
  // back to that card's resting position so the focused link is visible.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const onFocusIn = (event: FocusEvent) => {
      if (list.dataset.fit === 'no' || !stackEligible(list)) return;
      const item = event.target instanceof Element ? event.target.closest('li') : null;
      if (!item || item.parentElement !== list) return;
      const card = item.querySelector<HTMLElement>('[data-card]');
      // Only focus inside the card (links). Focus moved to the <li> itself is a
      // programmatic jump whose caller already handles scrolling.
      if (!card || !(event.target instanceof Node) || !card.contains(event.target)) return;
      let next = item.nextElementSibling;
      while (next instanceof HTMLElement && next.hidden) next = next.nextElementSibling;
      const nextCard = next?.querySelector<HTMLElement>('[data-card]');
      if (!nextCard) return;
      if (nextCard.getBoundingClientRect().top >= card.getBoundingClientRect().bottom - 2) return;
      const pinnedTop = parseFloat(getComputedStyle(card).top) || 0;
      window.scrollTo({
        top: window.scrollY + item.getBoundingClientRect().top - pinnedTop,
        behavior: 'instant',
      });
    };

    list.addEventListener('focusin', onFocusIn);
    return () => list.removeEventListener('focusin', onFocusIn);
  }, []);

  // Bring a project into view on request (revealProject() / #project-… links),
  // showing all projects first if the current filter hides it.
  useEffect(() => {
    const reveal = (slug: string) => {
      const target = items.find((item) => item.slug === slug);
      if (!target) return;
      if (matches(target, filter)) {
        scrollToProject(slug);
        return;
      }
      pendingSlug.current = slug;
      setFilter('All');
      setStatus(describe('All', items.length));
    };
    const onReveal = (event: Event) => reveal(String((event as CustomEvent<string>).detail));
    const onHashChange = () => {
      const match = /^#project-(.+)$/.exec(window.location.hash);
      // Visible targets: the browser has already jumped to them.
      if (match) {
        const slug = decodeURIComponent(match[1]);
        const target = items.find((item) => item.slug === slug);
        if (target && !matches(target, filter)) reveal(slug);
      }
    };
    window.addEventListener(PROJECT_REVEAL_EVENT, onReveal);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener(PROJECT_REVEAL_EVENT, onReveal);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [filter, items]);

  // After "All" has been rendered, finish a pending reveal.
  useEffect(() => {
    const slug = pendingSlug.current;
    if (!slug) return;
    pendingSlug.current = null;
    scrollToProject(slug);
  }, [filter]);

  return (
    <>
      <div className={styles.toolbar} data-reveal="">
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {projectFilters.map((option) => {
            const count = countFor(option);
            return (
              <button
                key={option}
                type="button"
                className={styles.filter}
                aria-pressed={filter === option}
                onClick={() => choose(option)}
              >
                {option}
                <span className={styles.count} aria-hidden="true">
                  {pad(count)}
                </span>
                <span className="visually-hidden">
                  , {count} {plural(count)}
                </span>
              </button>
            );
          })}
        </div>
        <p className={styles.readout} aria-hidden="true">
          <span className={styles.readoutDot} />
          <span>
            <span className={styles.readoutValue}>{pad(visible.length)}</span> / {pad(items.length)}{' '}
            projects
          </span>
        </p>
        <p className="visually-hidden" role="status" aria-live="polite">
          {status}
        </p>
      </div>

      <div className={styles.stack}>
        <ol ref={listRef} className={styles.list} role="list">
          {items.map((item) => {
            const position = visible.indexOf(item);
            const shown = position !== -1;
            const remaining = shown ? visible.length - 1 - position : 0;
            return (
              <li
                key={item.slug}
                id={`project-${item.slug}`}
                className={styles.item}
                hidden={!shown}
                data-last={shown && remaining === 0 ? '' : undefined}
                style={{ '--pos': Math.max(position, 0), '--r': remaining } as CSSProperties}
              >
                <div className={styles.rail} data-reveal="">
                  {item.card}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
