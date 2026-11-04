// Single source of truth for every piece of portfolio content.
// Components import from here; never hard-code copy or links in a section.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix a /public path with the GitHub Pages base path when deployed there. */
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: 'Zeyad Salama',
  firstName: 'Zeyad',
  nameArabic: 'زياد سلامة',
  initials: 'ZS',
  role: 'Backend Software Engineer',
  tagline: 'Backend depth. Frontend polish.',
  email: 'zeyadslama23@gmail.com',
  phone: '+201017595972',
  phoneDisplay: '+20 101 759 5972',
  github: 'https://github.com/Demo-23home',
  linkedin: 'https://www.linkedin.com/in/demo-23home/',
  resume: asset('/assets/Zeyad_Salama_Software_Engineer.pdf'),
  portrait: asset('/assets/Zeyad-portrait.jpg'),
  candid: asset('/assets/Zeyad.jpg'),
  location: 'Mansoura, Egypt',
  locationShort: 'Mansoura, EG',
  timeZone: 'Africa/Cairo',
  availability: 'Open to software engineering opportunities',
  currentRole: { title: 'Full Stack Developer', company: 'Adex', mode: 'Remote' },
} as const;

export type NavItem = { label: string; href: `#${string}`; index: string };

export const navigation: NavItem[] = [
  { label: 'About', href: '#about', index: '01' },
  { label: 'Work', href: '#work', index: '02' },
  { label: 'Experience', href: '#experience', index: '03' },
  { label: 'Stack', href: '#stack', index: '04' },
  { label: 'Contact', href: '#contact', index: '05' },
];

export const heroStack = ['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'React', 'Next.js'];

/** Headline numbers, all taken from the project and experience data below. */
export const heroStats = [
  { value: '08', label: 'Production products' },
  { value: '25+', label: 'Tenant environments' },
  { value: '100K+', label: 'Ledger records' },
  { value: '07', label: 'Professional roles' },
];

export const marqueeSkills = [
  'Python',
  'Django',
  'Django REST',
  'PostgreSQL',
  'Multi-Tenancy',
  'Transactions',
  'Row-Level Locking',
  'Celery',
  'Redis',
  'RabbitMQ',
  'Django Channels',
  'WebSockets',
  'Pytest',
  'Docker',
  'Nginx',
  'JWT & OAuth',
  'OpenAPI',
  'CI/CD',
  'AWS S3',
  'React',
  'Next.js',
  'TypeScript',
];

/** Log lines for the hero's live "system" console. Purely illustrative. */
export const systemLog = [
  { method: 'POST', text: '/api/v1/orders', status: '201', meta: '42ms' },
  { method: 'SQL', text: 'BEGIN · SELECT … FOR UPDATE · COMMIT', status: 'OK', meta: 'atomic' },
  { method: 'TASK', text: 'payroll.run[tenant=acme]', status: 'DONE', meta: 'celery' },
  { method: 'WS', text: 'driver:17 ▸ order.assigned', status: 'SENT', meta: 'channels' },
  { method: 'GET', text: '/api/v2/properties?city=cairo', status: '200', meta: '18ms' },
  { method: 'TEST', text: 'pytest -q · 312 passed', status: 'PASS', meta: '41.2s' },
  { method: 'POST', text: '/api/v1/ledger/entries', status: '201', meta: '27ms' },
  { method: 'AUTH', text: 'oauth.callback · jwt.rotate', status: 'OK', meta: 'secure' },
];

export const projectFilters = ['All', 'SaaS', 'Platform', 'Commerce'] as const;
export type ProjectFilter = (typeof projectFilters)[number];
export type ProjectCategory = Exclude<ProjectFilter, 'All'>;

export type ProjectAccent = 'violet' | 'sand' | 'emerald' | 'cobalt' | 'coral' | 'amber';

/** Accent colours sampled to sit alongside the project cover renders. */
export const accentHex: Record<ProjectAccent, string> = {
  violet: '#a596ff',
  sand: '#e0bf8f',
  emerald: '#62d69d',
  cobalt: '#7b93ff',
  coral: '#ff8f70',
  amber: '#f3bd52',
};

export type Project = {
  slug: string;
  title: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  stats: { value: string; label: string }[];
  categories: ProjectCategory[];
  accent: ProjectAccent;
  liveUrl?: string;
  appLinks?: { label: string; googlePlay: string; appStore: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'barcode-jackets',
    title: 'Barcode Jackets',
    liveUrl: 'https://barcodejackets.com/',
    label: 'Custom apparel commerce',
    description:
      'A custom-apparel API with layered garment personalization, multi-store catalogs, inventory reservations, pricing rules, and atomic payment/refund lifecycles.',
    image: asset('/assets/project-barcode-jackets.webp'),
    imageAlt: 'Conceptual jacket customization and commerce studio',
    technologies: ['Django REST', 'SVG engine', 'PostgreSQL', 'OpenAPI'],
    stats: [
      { value: 'Layered', label: 'Customization' },
      { value: 'Multi-store', label: 'Catalog model' },
      { value: 'Atomic', label: 'Payments & refunds' },
    ],
    categories: ['Commerce'],
    accent: 'violet',
    featured: true,
  },
  {
    slug: 'sukoon',
    title: 'Sukoon',
    liveUrl: 'https://sukoon.rent/',
    label: 'Real estate platform API',
    description:
      'A versioned property-discovery and visit-booking API with hardened authentication, query optimization, Cloudinary media, and Redis-backed WebSockets.',
    image: asset('/assets/project-sukoon.webp'),
    imageAlt: 'Conceptual real estate discovery and visit-booking interface',
    technologies: ['Django REST', 'PostgreSQL', 'Cloudinary', 'Channels'],
    stats: [
      { value: '100+', label: 'Automated tests' },
      { value: 'Real-time', label: 'WebSockets' },
      { value: 'Versioned', label: 'API contract' },
    ],
    categories: ['Platform'],
    accent: 'sand',
  },
  {
    slug: 'bee3a',
    title: 'Bee3a (بيعة)',
    liveUrl: 'https://bee3a.site/',
    label: 'Business management SaaS',
    description:
      'An Arabic-first, bilingual SaaS for Egyptian small businesses, combining POS, inventory, bookings, and online ordering with tenant isolation, role-based access, local payment verification, and dedicated business and platform administration apps.',
    image: asset('/assets/project-bee3a.webp'),
    imageAlt:
      'Custom 3D Bee3a scene with a point-of-sale tablet, receipt printer, inventory shelves, booking calendar, and order-tracking phone',
    technologies: ['React', 'TypeScript', 'Express', 'MongoDB'],
    stats: [
      { value: '3', label: 'Business systems' },
      { value: 'AR / EN', label: 'Bilingual & RTL' },
      { value: 'PWA', label: 'Mobile & desktop' },
    ],
    categories: ['SaaS', 'Commerce'],
    accent: 'emerald',
  },
  {
    slug: 'sahifatty',
    title: 'Sahifatty',
    liveUrl: 'https://sahifati.org/#top',
    label: 'Quran learning & assessment',
    description:
      'A modular education API for Quran content, assessments, study plans, teacher–student groups, recommendations, onboarding, and secure family accounts.',
    image: asset('/assets/project-sahifatty.webp'),
    imageAlt: 'Respectful conceptual Quran learning and assessment platform',
    technologies: ['Django REST', 'Pytest', 'OAuth & OTP', 'OneSignal'],
    stats: [
      { value: '6,236', label: 'Quran verses' },
      { value: 'Weighted', label: 'Progress model' },
      { value: 'Secure', label: 'Family accounts' },
    ],
    categories: ['Platform'],
    accent: 'emerald',
  },
  {
    slug: 'saas-erp',
    title: 'Multi-Tenant SaaS ERP',
    liveUrl: 'https://adex-erp-react.vercel.app/',
    label: 'ERP & financial systems',
    description:
      'A schema-per-tenant ERP with double-entry accounting, multi-currency COGS, controlled payroll workflows, and transaction-safe financial services.',
    image: asset('/assets/project-erp.webp'),
    imageAlt: 'Conceptual multi-tenant ERP and financial operations dashboard',
    technologies: ['Django', 'PostgreSQL', 'Tenant schemas', 'Transactions'],
    stats: [
      { value: '25+', label: 'Tenant environments' },
      { value: '100K+', label: 'Accounting records' },
      { value: 'Multi', label: 'Currency ledgers' },
    ],
    categories: ['SaaS'],
    accent: 'cobalt',
  },
  {
    slug: 'aljadriya',
    title: 'Aljadriya',
    liveUrl: 'https://aljadriya-platform.vercel.app/track',
    label: 'Learning & corporate training',
    description:
      'A multi-country training platform combining AI placement assessments, structured learning tracks, certificates, and real-time messaging with corporate agreements, localized pricing, and financial management.',
    image: asset('/assets/project-aljadriya.webp'),
    imageAlt:
      'Custom 3D Aljadriya scene with a learning dashboard, course pathway, assessments, books, and a certificate',
    technologies: ['Next.js', 'Django REST', 'PostgreSQL', 'Channels'],
    stats: [
      { value: 'AI', label: 'Placement & study plans' },
      { value: 'Multi-country', label: 'Regional operations' },
      { value: 'Corporate', label: 'Training agreements' },
    ],
    categories: ['Platform'],
    accent: 'cobalt',
  },
  {
    slug: 'ghaith-adex',
    title: 'Ghaith Adex',
    appLinks: [
      {
        label: 'Customer app',
        googlePlay: 'https://play.google.com/store/apps/details?id=com.adex.aquacloud.junaidi',
        appStore: 'https://apps.apple.com/us/app/6795517365',
      },
      {
        label: 'Driver app',
        googlePlay: 'https://play.google.com/store/apps/details?id=com.adex.aquacloud.junaidi.driver',
        appStore: 'https://apps.apple.com/us/app/6796311081',
      },
    ],
    label: 'Multi-tenant delivery platform',
    description:
      'A delivery backend spanning tenants, branches, orders, prepaid-coupon ledgers, real-time notifications, and Celery-powered recurring tours.',
    image: asset('/assets/project-aquacloud.webp'),
    imageAlt: 'Conceptual delivery operations, routing, and ledger dashboard',
    technologies: ['Django REST', 'Channels', 'Celery', 'Redis'],
    stats: [
      { value: '60+', label: 'API handlers' },
      { value: '300+', label: 'Automated tests' },
      { value: 'Real-time', label: 'Notifications' },
    ],
    categories: ['SaaS', 'Platform'],
    accent: 'coral',
  },
  {
    slug: 'china-erp',
    title: 'China ERP Systems',
    liveUrl: 'https://www.china-systems.com/',
    label: 'Multi-tenant B2B trade',
    description:
      'A tenant-isolated trade platform per company with resilient CSV/XLSX imports, automated balance-sheet aggregation, and multi-currency foreign-exchange tracking.',
    image: asset('/assets/project-china-trade.webp'),
    imageAlt: 'Conceptual international B2B trade and data import dashboard',
    technologies: ['Django', 'PostgreSQL', 'CSV/XLSX', 'Financial reporting'],
    stats: [
      { value: '50K+', label: 'Rows per batch' },
      { value: '2', label: 'Import formats' },
      { value: 'Isolated', label: 'Import failures' },
    ],
    categories: ['SaaS'],
    accent: 'amber',
  },
];

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
  tag: string;
  /** Decorative short "commit hash" for the git-log styled timeline. */
  hash: string;
  current?: boolean;
};

export const experience: Experience[] = [
  {
    period: 'Mar 2026 — Present',
    role: 'Full Stack Developer',
    company: 'Adex',
    description:
      'Building production backends across multi-tenant ERP, B2B trade, education, delivery, and commerce—covering financial ledgers, secure identity, real-time workflows, and high-volume data.',
    tag: 'Remote · Amman, Jordan',
    hash: 'a7e3f19',
    current: true,
  },
  {
    period: 'Jun — Sep 2026',
    role: 'Full Stack Developer',
    company: 'Sukoon',
    description:
      'Developed property discovery and visit-booking APIs with JWT/OAuth security, Cloudinary media, Redis-backed WebSockets, query optimization, and 100+ automated tests.',
    tag: 'Egypt',
    hash: '5c0d2b8',
  },
  {
    period: 'Jan — Mar 2026',
    role: 'Full Stack Developer',
    company: 'Freelance',
    description:
      'Delivered full-stack web applications, pairing Django APIs and PostgreSQL data models with responsive React and Next.js interfaces.',
    tag: 'Egypt',
    hash: 'e41b97a',
  },
  {
    period: 'Oct 2024 — Mar 2025',
    role: 'Backend Developer',
    company: 'Negm Feed',
    description:
      'Developed invoicing, payments, client and employee management, balance summaries, and financial reporting APIs; integrated Stripe and WeasyPrint PDF generation.',
    tag: 'Mansoura, Egypt',
    hash: '9f2a6c4',
  },
  {
    period: 'Jul — Sep 2023',
    role: 'Full Stack Developer',
    company: 'Information Technology Institute (ITI)',
    description:
      'Built Django features, PostgreSQL schemas, secure REST APIs, and optimized queries using Redis, Docker, and Git.',
    tag: 'Mansoura, Egypt',
    hash: '3d8e5f0',
  },
  {
    period: 'Oct 2022 — Feb 2023',
    role: 'System Administrator',
    company: 'New Horizons',
    description:
      'Managed Linux and Windows Server infrastructure, networking, server provisioning, and cloud-related services.',
    tag: 'Mansoura, Egypt',
    hash: 'b62c1e7',
  },
  {
    period: 'Aug — Oct 2022',
    role: 'Full Stack Developer Intern',
    company: 'Mansoura University',
    description:
      'Developed Django backend modules, REST APIs, and PostgreSQL-backed functionality for academic projects.',
    tag: 'Mansoura, Egypt',
    hash: '71fa0d3',
  },
  {
    period: 'Sep 2020 — Jan 2021',
    role: 'Networking & Systems Intern',
    company: 'New Horizons',
    description:
      'Completed hands-on training in CCNA networking, MCSA and Windows Server administration, and Linux system administration.',
    tag: 'Mansoura, Egypt',
    hash: '0c4d9a2',
  },
];

export const education = {
  degree: 'B.Sc. Computer & Information Sciences',
  focus: 'Software Engineering',
  school: 'Mansoura University',
  years: '2020–2024',
};

export const aboutFacts = [
  { label: 'Education', value: 'B.Sc. Computer & Information Sciences · 2020–2024' },
  { label: 'Focus', value: 'Software Engineering · Mansoura University' },
  { label: 'Based in', value: 'Egypt · Open to remote collaboration' },
];

export type SkillGroup = {
  number: string;
  title: string;
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    number: '01',
    title: 'Backend',
    description: 'The systems behind the screen.',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'Django Channels',
      'PostgreSQL',
      'Celery',
      'Redis',
    ],
  },
  {
    number: '02',
    title: 'Frontend',
    description: 'The experience people remember.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML & CSS'],
  },
  {
    number: '03',
    title: 'Platform',
    description: 'The path from commit to production.',
    skills: ['Docker', 'Git', 'CI/CD', 'Linux', 'Deployment', 'REST APIs'],
  },
];

export const principles = [
  {
    number: '01',
    title: 'Architecture first',
    description: 'Shape the data and boundaries before reaching for complexity.',
  },
  {
    number: '02',
    title: 'Clarity in the UI',
    description: 'Make the important action obvious and every interaction feel considered.',
  },
  {
    number: '03',
    title: 'Ship, learn, refine',
    description: 'Deliver dependable increments, then improve with real feedback.',
  },
];
