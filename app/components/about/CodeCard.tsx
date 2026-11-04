'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from 'react';
import { Icon } from '../ui/Icon';
import { IdePet } from './IdePet';
import { editorFiles, textOf } from './ide-files';
import styles from './code.module.css';

const FRAMES_PER_FILE = 12;
const FRAMES_PER_LOOP = FRAMES_PER_FILE * editorFiles.length;
const FRAME_MS = 850;

const subscribeToMotion = (onChange: () => void) => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const motionSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverMotionSnapshot = () => true;

function BranchGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

/** An ambient demo workspace. Everything plays automatically; no tasks to complete. */
export function CodeCard({ className = '' }: { className?: string }) {
  const id = useId();
  const windowRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [workspaceFocused, setWorkspaceFocused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToMotion, motionSnapshot, serverMotionSnapshot);
  const stopped = paused || reducedMotion || workspaceFocused;

  // The animation sleeps outside the viewport and when the browser is hidden.
  useEffect(() => {
    if (stopped || !windowRef.current) return;
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(timer);
      timer = undefined;
      if (visible && !document.hidden) {
        timer = setInterval(() => setFrame((current) => current + 1), FRAME_MS);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.15 });
    observer.observe(windowRef.current);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      clearInterval(timer);
    };
  }, [stopped]);

  const loopFrame = frame % FRAMES_PER_LOOP;
  const fileIndex = Math.floor(loopFrame / FRAMES_PER_FILE);
  const file = editorFiles[fileIndex];
  const fileFrame = loopFrame % FRAMES_PER_FILE;
  const step = Math.floor(fileFrame / 3);
  const activeLine = Math.floor(fileFrame / FRAMES_PER_FILE * file.lines.length);
  const xp = loopFrame >= 33 ? 100 : loopFrame >= 21 ? 50 : loopFrame >= 9 ? 25 : 0;
  const level = Math.floor(frame / FRAMES_PER_LOOP) + 1;
  const line = file.lines[activeLine];
  const chooseFile = (index: number) => setFrame((current) => Math.floor(current / FRAMES_PER_LOOP) * FRAMES_PER_LOOP + index * FRAMES_PER_FILE);

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number;
    if (event.key === 'ArrowRight') next = (fileIndex + 1) % editorFiles.length;
    else if (event.key === 'ArrowLeft') next = (fileIndex + editorFiles.length - 1) % editorFiles.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = editorFiles.length - 1;
    else return;
    event.preventDefault();
    chooseFile(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <figure ref={windowRef} className={`panel ${styles.window} ${className}`} data-paused={stopped ? 'true' : undefined} aria-label="Animated demo of Zeyad's development workspace">
      <figcaption className="visually-hidden">An automatic tour of the profile, toolkit, and build pipeline, with a demo XP loop.</figcaption>
      <div className={styles.bar}>
        <span className={styles.lights} aria-hidden="true"><span /><span /><span /></span>
        <div
          className={styles.tabs}
          ref={tabsRef}
          role="tablist"
          aria-label="Workspace files"
          onKeyDown={onTabKeyDown}
          onFocusCapture={() => setWorkspaceFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setWorkspaceFocused(false); }}
        >
          {editorFiles.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${id}-tab-${item.id}`}
              aria-controls={`${id}-panel-${item.id}`}
              aria-selected={fileIndex === index}
              tabIndex={fileIndex === index ? 0 : -1}
              className={styles.tab}
              onClick={() => chooseFile(index)}
            >
              <Icon name={item.icon} size={13} className={styles.tabIcon} />
              {item.name}
              <span className={styles.fileDot} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <div className={styles.breadcrumb} aria-hidden="true">
        <span>workspace <span className={styles.slash}>/</span> {file.name}</span>
        <span className={styles.demo}><span />Demo loop</span>
      </div>

      <div
        className={styles.editors}
        onFocusCapture={() => setWorkspaceFocused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setWorkspaceFocused(false); }}
      >
        {editorFiles.map((item, index) => (
          <div key={item.id} role="tabpanel" id={`${id}-panel-${item.id}`} aria-labelledby={`${id}-tab-${item.id}`} hidden={fileIndex !== index} aria-hidden={fileIndex !== index} tabIndex={fileIndex === index ? 0 : -1} className={styles.editor}>
            <pre className={styles.code} translate="no">
              <code>
                {item.lines.map((codeLine, lineIndex) => (
                  <span
                    key={lineIndex}
                    className={`${styles.line} ${codeLine.added ? styles.added : ''} ${lineIndex === activeLine ? styles.active : ''}`}
                    style={{ '--i': lineIndex, '--indent': codeLine.indent } as CSSProperties}
                  >
                    <span className={styles.ln} aria-hidden="true">{lineIndex + 1}</span>
                    <span className={styles.lc}>
                      {' '.repeat(codeLine.indent)}
                      {codeLine.tokens.map((token, tokenIndex) => typeof token === 'string' ? token : <span key={tokenIndex} className={styles[token[0]]}>{token[1]}</span>)}
                      {lineIndex === activeLine ? <span className={styles.caret} aria-hidden="true" /> : null}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
        ))}
        <IdePet celebrating={step === 3} />
      </div>

      <div className={styles.console} aria-hidden="true">
        <div className={styles.consoleHead}>
          <span><Icon name="terminal" size={12} />Terminal</span>
          <span className={styles.consoleHint}>auto build</span>
        </div>
        <div className={styles.command}><span>❯</span> {file.command}</div>
        <div className={styles.output}>
          <span className={step === 3 ? styles.passed : styles.working} key={`${file.id}-${step}`}>
            <Icon name={step === 3 ? 'check' : 'activity'} size={12} />
            {file.steps[step]}
          </span>
          <span className={`${styles.reward} ${step === 3 ? styles.rewardVisible : ''}`}>+{fileIndex === 2 ? '50' : '25'} XP</span>
        </div>
      </div>

      <div className={styles.quest} aria-hidden="true">
        <div className={styles.questTop}>
          <span className={styles.level}><Icon name="zap" size={12} />LVL {String(level).padStart(2, '0')}<span>Builder</span></span>
          <span className={styles.xp}>{xp} / 100 XP</span>
        </div>
        <div className={styles.track}><span style={{ '--progress': `${xp}%` } as CSSProperties} /></div>
        <div className={styles.badges}>
          {editorFiles.map((item, index) => {
            const earned = loopFrame >= index * FRAMES_PER_FILE + 9;
            return (
              <span key={item.id} className={`${styles.badge} ${earned ? styles.earned : ''}`}>
                <Icon name={earned ? 'check' : item.icon} size={11} />{item.badge}
                {earned ? <span className={styles.badgeGlow} /> : null}
              </span>
            );
          })}
          <span className={styles.loopLabel}><span className={styles.loopDot} />{stopped ? 'idle' : 'in the flow'}</span>
        </div>
      </div>

      <div className={styles.status}>
        <span className={styles.branch}><BranchGlyph />main</span>
        <span aria-hidden="true">{file.language}</span>
        <span className={styles.cursor} aria-hidden="true">Ln {activeLine + 1}, Col {textOf(line).length + 1}</span>
        <button type="button" className={styles.motionButton} onClick={() => setPaused((current) => !current)} disabled={reducedMotion} aria-label={reducedMotion ? 'Animation disabled by reduced motion preference' : paused ? 'Resume IDE animation' : 'Pause IDE animation'}>
          {paused || reducedMotion ? <Icon name="play" size={11} /> : <span className={styles.pauseIcon} aria-hidden="true" />}
          {reducedMotion ? 'Motion reduced' : paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </figure>
  );
}
