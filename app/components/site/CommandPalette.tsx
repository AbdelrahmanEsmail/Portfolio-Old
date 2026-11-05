'use client';

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { accentHex, asset, navigation, projects, site } from '../../content';
import { Icon, type IconName } from '../ui/Icon';
import { copyText, openCommandPalette, PALETTE_OPEN_EVENT, toast } from '../ui/events';
import { toggleTheme, useTheme, type Theme } from '../ui/theme';
import { revealProject } from '../work/events';
import { announceNavigation, lockScroll, scrollToId, useIsApple } from './chrome';
import styles from './palette.module.css';

type GroupName = 'Navigate' | 'Projects' | 'Actions' | 'Elsewhere';
const GROUPS: GroupName[] = ['Navigate', 'Projects', 'Actions', 'Elsewhere'];

type Command = {
  id: string;
  group: GroupName;
  title: string;
  hint?: string;
  keywords?: string;
  icon?: IconName;
  /** Project accent colour (renders a junction dot instead of an icon). */
  accent?: string;
  external?: boolean;
  run: () => void;
};

type IndexedCommand = Command & { titleKey: string; searchKey: string };
type ResultGroup = { name: GroupName; items: IndexedCommand[]; best: number };

/** The palette is a singleton, so stable ids keep SSR and hydration in lockstep. */
const BASE_ID = 'command-palette';

const SECTION_META: Record<string, { icon: IconName; keywords: string }> = {
  about: { icon: 'sparkle', keywords: 'bio profile who story me intro' },
  work: { icon: 'layout', keywords: 'projects portfolio case studies products selected' },
  experience: { icon: 'commit', keywords: 'career jobs history timeline roles git log cv' },
  stack: { icon: 'layers', keywords: 'skills toolkit tech technologies tools full stack fullstack backend frontend' },
  contact: { icon: 'mail', keywords: 'hire email reach talk connect message' },
};

/** Lowercase + strip accents so "resume" finds "Résumé". Keeps string length for Latin text. */
const normalize = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const domain = (url: string) => new URL(url).hostname.replace(/^www\./, '');
const urlLabel = (url: string) => {
  const { hostname, pathname } = new URL(url);
  return `${hostname.replace(/^www\./, '')}${pathname.replace(/\/+$/, '')}`;
};

// ---------- Command actions (run after the dialog has closed) ----------

function goTo(id: string) {
  if (!document.getElementById(id)) {
    window.location.href = id.startsWith('project-') ? `${asset('/projects/')}#${id}` : `${asset('/')}#${id}`;
    return;
  }
  announceNavigation(id);
  if (!scrollToId(id, { focus: true }) && id.startsWith('project-')) {
    // The card is hidden by the Work filter: reset it to "All" and land on the card.
    revealProject(id.slice('project-'.length));
  }
}

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

async function copyEmail() {
  const ok = await copyText(site.email);
  toast(ok ? 'Email copied to clipboard' : `Couldn’t copy — ${site.email}`);
}

/** Grow the new theme from the header toggle when it is on screen. */
function switchTheme() {
  const toggle = document.querySelector<HTMLElement>('[data-theme-toggle]');
  const rect = toggle?.getBoundingClientRect();
  if (rect && rect.width > 0 && rect.bottom > 0) {
    toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  } else {
    toggleTheme({ x: window.innerWidth / 2, y: window.innerHeight * 0.16 });
  }
}

function buildCommands(theme: Theme): IndexedCommand[] {
  const next: Theme = theme === 'light' ? 'dark' : 'light';
  const commands: Command[] = [
    {
      id: 'top',
      group: 'Navigate',
      title: 'Back to top',
      hint: '#top',
      icon: 'arrow-up',
      keywords: 'home hero start intro beginning',
      run: () => goTo('top'),
    },
    ...navigation.map((item): Command => {
      const id = item.href.slice(1);
      return {
        id: `section-${id}`,
        group: 'Navigate',
        title: item.label,
        hint: item.href,
        icon: SECTION_META[id]?.icon ?? 'arrow-right',
        keywords: SECTION_META[id]?.keywords,
        run: () => goTo(id),
      };
    }),
    ...projects.map(
      (project): Command => ({
        id: `project-${project.slug}`,
        group: 'Projects',
        title: project.title,
        hint: project.liveUrl ? domain(project.liveUrl) : project.appLinks?.length ? 'Android & iOS apps' : project.label,
        accent: accentHex[project.accent],
        keywords: [project.label, ...project.technologies, ...project.categories, project.slug].join(' '),
        run: () => goTo(`project-${project.slug}`),
      }),
    ),
    {
      id: 'copy-email',
      group: 'Actions',
      title: 'Copy email address',
      hint: site.email,
      icon: 'copy',
      keywords: 'clipboard mail address contact',
      run: () => void copyEmail(),
    },
    {
      id: 'send-email',
      group: 'Actions',
      title: 'Send an email',
      hint: 'Opens your mail app',
      icon: 'mail',
      keywords: 'mail contact hire message write talk',
      run: () => {
        window.location.href = `mailto:${site.email}`;
      },
    },
    {
      id: 'resume',
      group: 'Actions',
      title: 'Open résumé',
      hint: 'PDF',
      icon: 'file',
      external: true,
      keywords: 'resume cv pdf download curriculum vitae',
      run: () => openExternal(site.resume),
    },
    {
      id: 'theme',
      group: 'Actions',
      title: `Switch to ${next} theme`,
      hint: `${theme} → ${next}`,
      icon: next === 'light' ? 'sun' : 'moon',
      keywords: 'theme dark light mode appearance color colour toggle',
      run: switchTheme,
    },
    {
      id: 'github',
      group: 'Elsewhere',
      title: 'GitHub',
      hint: urlLabel(site.github),
      icon: 'github',
      external: true,
      keywords: 'code repositories source open',
      run: () => openExternal(site.github),
    },
    {
      id: 'linkedin',
      group: 'Elsewhere',
      title: 'LinkedIn',
      hint: urlLabel(site.linkedin),
      icon: 'linkedin',
      external: true,
      keywords: 'profile network connect career',
      run: () => openExternal(site.linkedin),
    },
    {
      id: 'call',
      group: 'Elsewhere',
      title: `Call ${site.firstName}`,
      hint: site.phoneDisplay,
      icon: 'phone',
      keywords: 'phone telephone tel mobile number',
      run: () => {
        window.location.href = `tel:${site.phone}`;
      },
    },
  ];

  return commands.map((command) => ({
    ...command,
    titleKey: normalize(command.title),
    searchKey: normalize([command.title, command.hint, command.keywords, command.group].filter(Boolean).join(' ')),
  }));
}

// ---------- Filtering ----------

/** Lower is better; -1 = no match. Every token must match the title or the keywords. */
function score(command: IndexedCommand, tokens: string[]): number {
  let total = 0;
  for (const token of tokens) {
    const at = command.titleKey.indexOf(token);
    if (at === 0) continue;
    if (at > 0) {
      total += /[\s(\-./]/.test(command.titleKey[at - 1]) ? 1 : 2;
      continue;
    }
    if (command.searchKey.includes(token)) {
      total += 4;
      continue;
    }
    return -1;
  }
  return total;
}

function search(commands: IndexedCommand[], query: string) {
  const tokens = normalize(query).trim().split(/\s+/).filter(Boolean);
  const groups: ResultGroup[] = [];
  for (const name of GROUPS) {
    const scored: { command: IndexedCommand; value: number }[] = [];
    for (const command of commands) {
      if (command.group !== name) continue;
      const value = tokens.length ? score(command, tokens) : 0;
      if (value >= 0) scored.push({ command, value });
    }
    if (scored.length === 0) continue;
    scored.sort((a, b) => a.value - b.value);
    groups.push({ name, items: scored.map((entry) => entry.command), best: scored[0].value });
  }
  // With a query, the group holding the best match comes first.
  if (tokens.length) groups.sort((a, b) => a.best - b.best);
  return { tokens, groups, flat: groups.flatMap((group) => group.items) };
}

// ---------- Rendering helpers ----------

const ARABIC = /([؀-ۿ]+(?:\s+[؀-ۿ]+)*)/;

/** Wrap Arabic runs (e.g. "بيعة") in lang="ar" for the right font + pronunciation. */
function withScript(text: string): ReactNode {
  if (!ARABIC.test(text)) return text;
  return text.split(ARABIC).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} lang="ar">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** Highlight the matched query tokens inside a title. */
function highlight(title: string, tokens: string[]): ReactNode[] {
  const key = normalize(title);
  const ranges: [number, number][] = [];
  if (key.length === title.length) {
    for (const token of tokens) {
      const at = key.indexOf(token);
      if (at >= 0) ranges.push([at, at + token.length]);
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const [start, end] of ranges) {
    const last = merged[merged.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else merged.push([start, end]);
  }

  const parts: ReactNode[] = [];
  let cursor = 0;
  merged.forEach(([start, end], index) => {
    if (start > cursor) parts.push(<Fragment key={`t${index}`}>{withScript(title.slice(cursor, start))}</Fragment>);
    parts.push(
      <mark key={`m${index}`} className={styles.mark}>
        {withScript(title.slice(start, end))}
      </mark>,
    );
    cursor = end;
  });
  if (cursor < title.length) parts.push(<Fragment key="rest">{withScript(title.slice(cursor))}</Fragment>);
  return parts;
}

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.closest('[role="textbox"], [role="combobox"]') !== null
  );
}

// ---------- Component ----------

export function CommandPalette() {
  const theme = useTheme();
  const isApple = useIsApple();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const releaseRef = useRef<(() => void) | null>(null);
  /** Set when the keyboard moves the selection, so it is scrolled into view. */
  const revealRef = useRef(false);
  const backdropPressRef = useRef(false);

  const commands = useMemo(() => buildCommands(theme), [theme]);
  const { tokens, groups, flat } = useMemo(() => search(commands, query), [commands, query]);

  const activeIndex = flat.length ? Math.min(active, flat.length - 1) : -1;
  const activeCommand = activeIndex >= 0 ? flat[activeIndex] : undefined;
  const optionId = (id: string) => `${BASE_ID}-option-${id}`;
  const activeOptionId = activeCommand ? `${BASE_ID}-option-${activeCommand.id}` : undefined;
  const listboxId = `${BASE_ID}-listbox`;
  const inputId = `${BASE_ID}-input`;

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    // Release synchronously: a command may scroll the page right after this.
    releaseRef.current?.();
    releaseRef.current = null;
  }, []);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    releaseRef.current = lockScroll();
    if (listRef.current) listRef.current.scrollTop = 0;
    inputRef.current?.focus();
  }, []);

  // ⌘K / Ctrl+K toggles, "/" opens (outside text fields), and the shared event opens.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      const isOpen = dialogRef.current?.open ?? false;
      if ((event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (isOpen) close();
        else openCommandPalette();
        return;
      }
      if (
        event.key === '/' &&
        !isOpen &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isEditable(event.target)
      ) {
        event.preventDefault();
        openCommandPalette();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(PALETTE_OPEN_EVENT, open);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(PALETTE_OPEN_EVENT, open);
    };
  }, [open, close]);

  // Keep the keyboard selection visible; bring a group's label along with its first option.
  useEffect(() => {
    if (!revealRef.current || !activeOptionId) return;
    revealRef.current = false;
    const option = document.getElementById(activeOptionId);
    if (!option) return;
    const previous = option.previousElementSibling;
    if (previous?.getAttribute('role') === 'presentation') previous.scrollIntoView({ block: 'nearest' });
    option.scrollIntoView({ block: 'nearest' });
  }, [activeOptionId]);

  const execute = (command: IndexedCommand) => {
    close();
    command.run();
  };

  const move = (delta: number) => {
    if (flat.length === 0) return;
    revealRef.current = true;
    setActive((activeIndex + delta + flat.length) % flat.length);
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    // Ctrl+N / Ctrl+P (emacs-style) only on Apple keyboards, where they aren't browser shortcuts.
    const emacs = isApple && event.ctrlKey && !event.metaKey && !event.altKey;
    if (event.key === 'ArrowDown' || (emacs && event.key === 'n')) {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowUp' || (emacs && event.key === 'p')) {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeCommand) execute(activeCommand);
    }
  };

  const onDialogClose = () => {
    releaseRef.current?.();
    releaseRef.current = null;
    setQuery('');
    setActive(0);
  };

  // Light dismiss: only when the press both starts and ends on the backdrop.
  const onDialogPointerDown = (event: ReactPointerEvent<HTMLDialogElement>) => {
    backdropPressRef.current = event.target === event.currentTarget;
  };
  const onDialogClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (backdropPressRef.current && event.target === event.currentTarget) close();
    backdropPressRef.current = false;
  };

  const status = query.trim()
    ? flat.length
      ? `${flat.length} result${flat.length === 1 ? '' : 's'}`
      : 'No results'
    : `${flat.length} commands`;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Command palette"
      onClose={onDialogClose}
      onPointerDown={onDialogPointerDown}
      onClick={onDialogClick}
    >
      <div className={`${styles.frame} panel panel-brass`}>
        <div className={styles.search}>
          <Icon name="search" size={18} className={styles.searchIcon} />
          <label htmlFor={inputId} className="visually-hidden">
            Search sections, projects and actions
          </label>
          <input
            ref={inputRef}
            id={inputId}
            className={styles.input}
            type="text"
            role="combobox"
            aria-expanded={flat.length > 0}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={activeOptionId}
            placeholder="Search sections, projects, actions…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
              if (listRef.current) listRef.current.scrollTop = 0;
            }}
            onKeyDown={onInputKeyDown}
          />
          <button type="button" className={styles.esc} onClick={close} aria-label="Close command palette">
            <kbd className="kbd">esc</kbd>
          </button>
        </div>

        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Commands"
          className={styles.list}
          data-empty={flat.length === 0}
        >
          {groups.map((group) => {
            const labelId = `${BASE_ID}-group-${group.name}`;
            return (
              <ul key={group.name} role="group" aria-labelledby={labelId} className={styles.group}>
                <li role="presentation" id={labelId} className={styles.groupLabel}>
                  <span>{group.name}</span>
                  <span className={styles.groupCount} aria-hidden="true">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </li>
                {group.items.map((command) => {
                  const index = flat.indexOf(command);
                  const selected = index === activeIndex;
                  return (
                    <li
                      key={command.id}
                      id={optionId(command.id)}
                      role="option"
                      aria-selected={selected}
                      className={styles.option}
                      onPointerMove={() => {
                        if (index !== activeIndex) setActive(index);
                      }}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => execute(command)}
                    >
                      <span className={styles.icon} aria-hidden="true">
                        {command.accent ? (
                          <span className={styles.dot} style={{ '--accent': command.accent } as CSSProperties} />
                        ) : command.icon ? (
                          <Icon name={command.icon} size={16} />
                        ) : null}
                      </span>
                      <span className={styles.title}>
                        <span className={styles.titleText}>{highlight(command.title, tokens)}</span>
                        {command.external ? (
                          <>
                            <Icon name="arrow-up-right" size={13} className={styles.external} />
                            <span className="visually-hidden">(opens in a new tab)</span>
                          </>
                        ) : null}
                      </span>
                      <span className={styles.hint}>{command.hint}</span>
                      <span className={styles.enter} aria-hidden="true">
                        <Icon name="enter" size={14} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>

        {flat.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyLine}>
              <span className={styles.prompt} aria-hidden="true">
                $
              </span>
              command not found: <span className={styles.emptyQuery}>{query.trim()}</span>
            </p>
            <p className={styles.emptyHint}>Try a section, a project name, or “email”.</p>
          </div>
        ) : null}

        <div className={styles.footer}>
          <span className={styles.keys} aria-hidden="true">
            <span className={styles.key}>
              <kbd className="kbd">↑</kbd>
              <kbd className="kbd">↓</kbd>
              navigate
            </span>
            <span className={styles.key}>
              <kbd className="kbd">↵</kbd>
              select
            </span>
            <span className={styles.key}>
              <kbd className="kbd">esc</kbd>
              close
            </span>
          </span>
          <span className={styles.count} role="status" aria-live="polite">
            {status}
          </span>
        </div>
      </div>
    </dialog>
  );
}
