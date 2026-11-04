import type { CSSProperties } from 'react';
import { heroStack, site } from '../../content';
import { Icon } from '../ui/Icon';
import styles from './code.module.css';

/* A tiny hand-rolled "syntax highlighter": each line is a list of tokens,
   plain strings render as-is, tuples render as coloured spans. */
type Kind = 'kw' | 'cls' | 'fn' | 'str' | 'com' | 'pun' | 'op' | 'id' | 'self' | 'arg';
type Token = string | readonly [Kind, string];
type CodeLine = { indent: number; tokens: Token[]; added?: boolean };

const str = (value: string): Token => ['str', `"${value}"`];

const list = (items: readonly string[]): Token[] => [
  ['pun', '['],
  ...items.flatMap((item, index): Token[] => (index ? [['pun', ','], ' ', str(item)] : [str(item)])),
  ['pun', ']'],
];

const field = (name: string, value: Token[]): CodeLine => ({
  indent: 4,
  tokens: [['id', name], ' ', ['op', '='], ' ', ...value],
});

const lines: CodeLine[] = [
  {
    indent: 0,
    tokens: [['kw', 'class'], ' ', ['cls', site.firstName], ['pun', '('], ['cls', 'Engineer'], ['pun', '):']],
  },
  field('role', [str(site.role)]),
  // The core stack leads the hero stack list: Python, Django, DRF, PostgreSQL.
  field('stack', list(heroStack.slice(0, 4))),
  field('loves', list(['transactions', 'clean APIs', 'real-time'])),
  field('based_in', [str(site.location)]),
  field('open_to', list(['engineering roles', 'ambitious products'])),
  { indent: 0, tokens: [] },
  {
    indent: 4,
    added: true,
    tokens: [['kw', 'def'], ' ', ['fn', 'build'], ['pun', '('], ['self', 'self'], ['pun', ','], ' ', ['id', 'idea'], ['pun', '):']],
  },
  {
    indent: 8,
    added: true,
    tokens: [
      ['kw', 'with'],
      ' ',
      ['id', 'transaction'],
      ['pun', '.'],
      ['fn', 'atomic'],
      ['pun', '():'],
      '  ',
      ['com', '# all or nothing'],
    ],
  },
  {
    indent: 12,
    added: true,
    tokens: [
      ['kw', 'return'],
      ' ',
      ['fn', 'ship'],
      ['pun', '('],
      ['id', 'idea'],
      ['pun', ','],
      ' ',
      ['arg', 'tested'],
      ['op', '='],
      ['kw', 'True'],
      ['pun', ')'],
    ],
  },
];

const textOf = (line: CodeLine) =>
  ' '.repeat(line.indent) + line.tokens.map((token) => (typeof token === 'string' ? token : token[1])).join('');

const lastLine = lines[lines.length - 1];
const fileName = `${site.firstName.toLowerCase()}.py`;

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

/** Editor-window card: `zeyad.py`, revealed line by line when scrolled into view. */
export function CodeCard({ className = '' }: { className?: string }) {
  return (
    <figure className={`panel ${styles.window} ${className}`}>
      <figcaption className={styles.bar}>
        <span className={styles.lights} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className={styles.tab}>
          <Icon name="file" size={13} className={styles.tabIcon} />
          {fileName}
        </span>
        <span className={`chip ${styles.lang}`}>Python</span>
      </figcaption>

      <pre className={styles.code} translate="no">
        <code>
          {lines.map((line, index) => {
            const isLast = line === lastLine;
            return (
              <span
                key={index}
                className={`${styles.line} ${line.added ? styles.added : ''} ${isLast ? styles.active : ''}`}
                style={{ '--i': index, '--indent': line.indent } as CSSProperties}
              >
                <span className={styles.ln} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.lc}>
                  {' '.repeat(line.indent)}
                  {line.tokens.map((token, t) =>
                    typeof token === 'string' ? (
                      token
                    ) : (
                      <span key={t} className={styles[token[0]]}>
                        {token[1]}
                      </span>
                    ),
                  )}
                  {isLast ? <span className={styles.caret} aria-hidden="true" /> : null}
                </span>
              </span>
            );
          })}
        </code>
      </pre>

      <div className={styles.status} aria-hidden="true">
        <span className={styles.branch}>
          <BranchGlyph />
          main
        </span>
        <span>Python</span>
        <span className={styles.optional}>UTF-8</span>
        <span className={styles.optional}>LF</span>
        <span className={styles.cursor}>
          Ln {lines.length}, Col {textOf(lastLine).length + 1}
        </span>
      </div>
    </figure>
  );
}
