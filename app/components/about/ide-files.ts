import { heroStack, site } from '../../content';

/* A tiny hand-rolled "syntax highlighter": each line is a list of tokens,
   plain strings render as-is, tuples render as coloured spans. */
type Kind = 'kw' | 'cls' | 'fn' | 'str' | 'com' | 'pun' | 'op' | 'id' | 'self' | 'arg';
type Token = string | readonly [Kind, string];
export type CodeLine = { indent: number; tokens: Token[]; added?: boolean };

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

const property = (name: string, items: readonly string[]): CodeLine => ({
  indent: 2,
  tokens: [['id', name], ['pun', ':'], ' ', ...list(items), ['pun', ',']],
});

const profile: CodeLine[] = [
  {
    indent: 0,
    tokens: [['kw', 'class'], ' ', ['cls', site.firstName], ['pun', '('], ['cls', 'Engineer'], ['pun', '):']],
  },
  field('role', [str(site.role)]),
  field('focus', [str('Full Stack')]),
  field('stack', list(heroStack.slice(0, 5))),
  field('loves', list(['clear interfaces', 'clean APIs', 'reliable systems'])),
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

export type EditorFile = {
  id: string;
  name: string;
  language: string;
  icon: 'file' | 'braces' | 'terminal';
  lines: CodeLine[];
  command: string;
  steps: string[];
  badge: string;
};

export { textOf };

export const editorFiles: EditorFile[] = [
  {
    id: 'profile',
    name: `${site.firstName.toLowerCase()}.py`,
    language: 'Python',
    icon: 'file',
    lines: profile,
    command: 'python zeyad.py',
    steps: ['Loading engineer profile', 'Connecting ideas to systems', 'Checking the details', 'Profile ready'],
    badge: 'Explorer',
  },
  {
    id: 'stack',
    name: 'stack.ts',
    language: 'TypeScript',
    icon: 'braces',
    lines: [
      { indent: 0, tokens: [['com', '// From the interface to the infrastructure.']] },
      { indent: 0, tokens: [['kw', 'export const'], ' ', ['id', 'stack'], ' ', ['op', '='], ' ', ['pun', '{']] },
      property('web', ['React', 'Next.js', 'TypeScript']),
      property('mobile', ['Flutter', 'React Native']),
      property('backend', ['Python', 'Django', 'Node.js']),
      property('data', ['PostgreSQL', 'MongoDB', 'Redis']),
      property('delivery', ['Docker', 'Git', 'CI/CD']),
      { indent: 0, tokens: [['pun', '}'], ' ', ['kw', 'as const'], ['pun', ';']] },
      { indent: 0, tokens: [] },
      { indent: 0, added: true, tokens: [['kw', 'export type'], ' ', ['cls', 'Toolkit'], ' ', ['op', '='], ' ', ['kw', 'typeof'], ' ', ['id', 'stack'], ['pun', ';']] },
      { indent: 0, added: true, tokens: [['com', '// Many tools. One connected product.']] },
    ],
    command: 'tsc --noEmit',
    steps: ['Reading the toolkit', 'Resolving web + mobile', 'Checking type contracts', 'Types looking good'],
    badge: 'Type safe',
  },
  {
    id: 'ship',
    name: 'ship.yml',
    language: 'YAML',
    icon: 'terminal',
    lines: [
      { indent: 0, tokens: [['com', '# A little care at every step.']] },
      { indent: 0, tokens: [['arg', 'name'], ['pun', ':'], ' ', str('Build with intent')] },
      { indent: 0, tokens: [['arg', 'on'], ['pun', ':'], ' ', ['pun', '['], ['str', 'push'], ['pun', ']']] },
      { indent: 0, tokens: [['arg', 'jobs'], ['pun', ':']] },
      { indent: 2, tokens: [['arg', 'ship'], ['pun', ':']] },
      { indent: 4, tokens: [['arg', 'runs-on'], ['pun', ':'], ' ', ['str', 'ubuntu-latest']] },
      { indent: 4, tokens: [['arg', 'steps'], ['pun', ':']] },
      { indent: 6, tokens: [['pun', '-'], ' ', ['arg', 'uses'], ['pun', ':'], ' ', ['str', 'actions/checkout@v4']] },
      { indent: 6, tokens: [['pun', '-'], ' ', ['arg', 'uses'], ['pun', ':'], ' ', ['str', 'actions/setup-node@v4']] },
      { indent: 8, tokens: [['arg', 'with'], ['pun', ': { '], ['arg', 'node-version'], ['pun', ': '], ['str', '22'], ['pun', ' }']] },
      { indent: 6, tokens: [['pun', '-'], ' ', ['arg', 'run'], ['pun', ':'], ' ', ['str', 'npm ci']] },
      { indent: 6, added: true, tokens: [['pun', '-'], ' ', ['arg', 'run'], ['pun', ':'], ' ', ['str', 'npx tsc --noEmit']] },
      { indent: 6, added: true, tokens: [['pun', '-'], ' ', ['arg', 'run'], ['pun', ':'], ' ', ['str', 'npm run build']] },
    ],
    command: 'npm run build',
    steps: ['Preparing the workspace', 'Checking types', 'Building the product', 'Build complete. Ship it.'],
    badge: 'Ship it',
  },
];

