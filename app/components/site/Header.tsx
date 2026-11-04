'use client';

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { navigation, site } from '../../content';
import { Icon } from '../ui/Icon';
import { openCommandPalette, PALETTE_OPEN_EVENT } from '../ui/events';
import { toggleTheme, useTheme } from '../ui/theme';
import { Avatar } from './Avatar';
import { announceNavigation, lockScroll, NAVIGATE_EVENT, useIsApple, type NavigateDetail } from './chrome';
import styles from './header.module.css';

const SECTION_IDS = navigation.map((item) => item.href.slice(1));
const MENU_ID = 'site-menu';
/** The dock may only hide once the reader is well into the page. */
const HIDE_AFTER = 600;
/** Scrollspy line, as a fraction of the viewport height. */
const SPY_LINE = 0.38;

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

/** Keep Tab / Shift+Tab inside `container` (the header: dock + open sheet). */
function trapFocus(event: KeyboardEvent, container: HTMLElement) {
  const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden',
  );
  if (items.length === 0) return;
  const first = items[0];
  const last = items[items.length - 1];
  const current = document.activeElement;
  const outside = !container.contains(current);
  if (event.shiftKey && (current === first || outside)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (current === last || outside)) {
    event.preventDefault();
    first.focus();
  }
}

/** Make everything beside the header inert while the menu sheet is open. Dialogs are left alone. */
function inertSiblings(keep: HTMLElement): () => void {
  const parent = keep.parentElement;
  if (!parent) return () => {};
  const changed: HTMLElement[] = [];
  for (const child of Array.from(parent.children)) {
    if (!(child instanceof HTMLElement) || child === keep || child.inert) continue;
    if (child.tagName === 'SCRIPT' || child.tagName === 'STYLE' || child.tagName === 'DIALOG') continue;
    if (child.querySelector('dialog')) continue;
    child.inert = true;
    changed.push(child);
  }
  return () => changed.forEach((element) => (element.inert = false));
}

export function Header() {
  const theme = useTheme();
  const isApple = useIsApple();
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuOpenRef = useRef(false);
  const releaseMenuRef = useRef<(() => void) | null>(null);
  /** performance.now() until which scrollspy waits (a jump is in flight). */
  const spyPauseRef = useRef(0);
  /** performance.now() until which the dock may not hide. */
  const pinRef = useRef(0);
  const recomputeRef = useRef<() => void>(() => {});

  // Scrollspy: the active section is the last one whose top has crossed a line
  // ~38% down the viewport. The shared scroll frame below keeps this in sync.
  useEffect(() => {
    const compute = () => {
      if (performance.now() < spyPauseRef.current) return;
      const line = window.innerHeight * SPY_LINE;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      const doc = document.documentElement;
      if (current && window.scrollY + window.innerHeight >= doc.scrollHeight - 4) {
        current = SECTION_IDS[SECTION_IDS.length - 1];
      }
      setActive(current);
    };
    recomputeRef.current = compute;
    compute();
    return () => {
      recomputeRef.current = () => {};
    };
  }, []);

  // Scroll: progress line, "scrolled" style, hide on scroll-down / show on scroll-up.
  useEffect(() => {
    const root = rootRef.current;
    const dock = dockRef.current;
    if (!root || !dock) return;

    let frame = 0;
    let lastY = window.scrollY;
    let anchorY = lastY;
    let direction = 0;
    let hidden = false;
    let scrolled: boolean | null = null;

    const setHidden = (next: boolean) => {
      if (next === hidden) return;
      hidden = next;
      root.dataset.hidden = String(next);
    };

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const y = Math.max(0, window.scrollY);
      const max = doc.scrollHeight - window.innerHeight;
      dock.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');

      const nextScrolled = y > 24;
      if (nextScrolled !== scrolled) {
        scrolled = nextScrolled;
        root.dataset.scrolled = String(nextScrolled);
      }

      const nextDirection = y > lastY ? 1 : y < lastY ? -1 : direction;
      if (nextDirection !== direction) {
        anchorY = lastY;
        direction = nextDirection;
      }
      lastY = y;

      const pinned =
        menuOpenRef.current || performance.now() < pinRef.current || root.querySelector(':focus-visible') !== null;
      if (y < HIDE_AFTER || pinned) setHidden(false);
      else if (direction > 0 && y - anchorY > 16) setHidden(true);
      else if (direction < 0 && anchorY - y > 8) setHidden(false);

      recomputeRef.current();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const reveal = () => setHidden(false);

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    root.addEventListener('focusin', reveal);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      root.removeEventListener('focusin', reveal);
    };
  }, []);

  // Programmatic jumps (nav clicks, command palette): move the pill straight to
  // the destination, keep the dock visible, and resume scrollspy once settled.
  useEffect(() => {
    let timer = 0;
    const settle = () => {
      window.clearTimeout(timer);
      spyPauseRef.current = 0;
      pinRef.current = 0;
      recomputeRef.current();
    };
    const onNavigate = (event: Event) => {
      const { id } = (event as CustomEvent<NavigateDetail>).detail;
      const section = id.startsWith('project-') ? 'work' : id;
      setActive(SECTION_IDS.includes(section) ? section : null);
      const until = performance.now() + 1600;
      spyPauseRef.current = until;
      pinRef.current = until;
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 1600);
    };
    const onScrollEnd = () => {
      if (spyPauseRef.current) settle();
    };
    window.addEventListener(NAVIGATE_EVENT, onNavigate);
    window.addEventListener('scrollend', onScrollEnd);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(NAVIGATE_EVENT, onNavigate);
      window.removeEventListener('scrollend', onScrollEnd);
    };
  }, []);

  // Sliding pill: measure the active link and move the pill with CSS vars.
  useEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const place = () => {
      const link = active ? nav.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`) : null;
      if (!link || link.offsetWidth === 0) {
        pill.dataset.visible = 'false';
        return;
      }
      const wasVisible = pill.dataset.visible === 'true';
      if (!wasVisible) pill.dataset.snap = 'true';
      pill.style.setProperty('--pill-x', `${link.offsetLeft}px`);
      pill.style.setProperty('--pill-w', `${link.offsetWidth}px`);
      pill.dataset.visible = 'true';
      if (!wasVisible) {
        requestAnimationFrame(() => requestAnimationFrame(() => delete pill.dataset.snap));
      }
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active]);

  // Mobile menu: scroll lock, inert page, focus trap, Esc, auto-close.
  useEffect(() => {
    menuOpenRef.current = menuOpen;
    const root = rootRef.current;
    if (!menuOpen || !root) return;

    const unlock = lockScroll();
    const restoreInert = inertSiblings(root);
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      unlock();
      restoreInert();
    };
    releaseMenuRef.current = release;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      } else if (event.key === 'Tab') {
        trapFocus(event, root);
      }
    };
    const desktop = window.matchMedia('(min-width: 900px)');
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    const onPalette = () => setMenuOpen(false);

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onDesktop);
    window.addEventListener(PALETTE_OPEN_EVENT, onPalette);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onDesktop);
      window.removeEventListener(PALETTE_OPEN_EVENT, onPalette);
      release();
      releaseMenuRef.current = null;
    };
  }, [menuOpen]);

  const onThemeClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  const onSheetLink = (id: string) => {
    // Unlock synchronously so the browser's own anchor scroll can run right after this handler.
    releaseMenuRef.current?.();
    setMenuOpen(false);
    announceNavigation(id);
  };

  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <header ref={rootRef} className={styles.root} data-menu={menuOpen ? 'open' : 'closed'}>
      <div ref={dockRef} className={styles.dock}>
        <a className={styles.brand} href="#top" onClick={() => announceNavigation('top')}>
          <span className={styles.avatarWrap}>
            <Avatar size={34} />
            <span className={styles.online} aria-hidden="true" />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandRole}>{site.role}</span>
          </span>
          <span className="visually-hidden">, back to top</span>
        </a>

        <nav ref={navRef} className={styles.nav} aria-label="Primary">
          <span ref={pillRef} className={styles.pill} aria-hidden="true" />
          <ul className={styles.navList}>
            {navigation.map((item) => {
              const id = item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    className={styles.navLink}
                    href={item.href}
                    aria-current={active === id ? 'location' : undefined}
                    onClick={() => announceNavigation(id)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cmdk}
            onClick={openCommandPalette}
            aria-label="Open command palette"
            aria-keyshortcuts={isApple ? 'Meta+K' : 'Control+K'}
          >
            <Icon name="search" size={15} />
            <kbd className="kbd">{isApple ? '⌘K' : 'Ctrl K'}</kbd>
          </button>

          <button
            type="button"
            className={styles.iconButton}
            onClick={onThemeClick}
            aria-label={`Switch to ${nextTheme} theme`}
            data-theme-toggle=""
          >
            <span className={styles.themeIcons} aria-hidden="true">
              <Icon name="sun" size={18} className={styles.sun} />
              <Icon name="moon" size={17} className={styles.moon} />
            </span>
          </button>

          <a className={`btn btn-primary ${styles.cta}`} href={`mailto:${site.email}`}>
            Let’s talk
            <span className="btn-icon">
              <Icon name="arrow-right" size={14} strokeWidth={2} />
            </span>
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.burger} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <span className={styles.progress} aria-hidden="true">
          <span className={styles.progressFill} />
          <span className={styles.progressHead} />
        </span>
      </div>

      <div id={MENU_ID} className={styles.sheet}>
        <nav aria-label="Menu">
          <p className={`label ${styles.sheetLabel}`} aria-hidden="true">
            Index
          </p>
          <ol className={styles.sheetList}>
            {navigation.map((item, index) => {
              const id = item.href.slice(1);
              return (
                <li key={item.href} className={styles.sheetItem} style={{ '--i': index } as CSSProperties}>
                  <a
                    className={styles.sheetLink}
                    href={item.href}
                    aria-current={active === id ? 'location' : undefined}
                    onClick={() => onSheetLink(id)}
                  >
                    <span className={styles.sheetIndex} aria-hidden="true">
                      {item.index}
                    </span>
                    <span className={styles.sheetText}>{item.label}</span>
                    <Icon name="arrow-right" size={22} className={styles.sheetArrow} />
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className={`${styles.sheetFooter} ${styles.sheetItem}`} style={{ '--i': navigation.length } as CSSProperties}>
          <div className={styles.sheetCtas}>
            <a className="btn btn-primary" href={`mailto:${site.email}`}>
              Email me
            </a>
            <a className="btn btn-ghost" href={site.resume} target="_blank" rel="noopener noreferrer">
              Résumé
              <Icon name="arrow-up-right" size={16} />
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          </div>
          <ul className={styles.sheetSocial}>
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={17} />
                GitHub
                <span className="visually-hidden">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" size={17} />
                LinkedIn
                <span className="visually-hidden">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <p className={styles.sheetStatus}>
            <span className="status-dot" aria-hidden="true" />
            {site.availability}
          </p>
        </div>
      </div>
    </header>
  );
}
