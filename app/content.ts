// Shared portfolio content and links. Longer project stories and screenshot
// galleries live in project-details.ts, keyed by the project slugs below.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix a /public path with the GitHub Pages base path when deployed there. */
export const asset = (path: string) => `${basePath}${path}`;

export const site = {
  name: 'Zeyad Salama',
  firstName: 'Zeyad',
  nameArabic: 'زياد سلامة',
  initials: 'ZS',
  role: 'Software Engineer',
  tagline: 'Systems depth. Product polish.',
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

export const heroStack = ['React', 'TypeScript', 'Next.js', 'Python', 'Django', 'PostgreSQL', 'Redis'];

/** Headline numbers, all taken from the project and experience data below. */
export const heroStats = [
  { value: '08', label: 'Products built' },
  { value: '25+', label: 'Tenant environments' },
  { value: '100K+', label: 'Ledger records' },
  { value: '07', label: 'Professional roles' },
];

export const marqueeSkills = [
  'React',
  'React Native',
  'Flutter',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Python',
  'Django',
  'Django REST',
  'Responsive UI',
  'HTML & CSS',
  'Tailwind CSS',
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
];

/** Log lines for the hero's live "system" console. Purely illustrative. */
export const systemLog = [
  { method: 'UI', text: 'React · responsive interface', status: 'READY', meta: 'client' },
  { method: 'POST', text: '/api/v1/orders', status: '201', meta: '42ms' },
  { method: 'BUILD', text: 'Next.js · production build', status: 'PASS', meta: 'web' },
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

/** Portfolio accents used around the original project imagery. */
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
  image?: string;
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
      'A custom-apparel platform where customers choose a garment, personalize materials, colors, and artwork, then review pricing and place individual or group orders.',
    image: asset('/assets/projects/barcode-jackets/designer-materials.webp'),
    imageAlt: 'Barcode Jackets’ actual garment designer showing leather materials, color options, and a jacket preview.',
    technologies: ['React', 'Django REST', 'SVG engine', 'PostgreSQL'],
    stats: [
      { value: 'Custom', label: 'Materials & artwork' },
      { value: 'Solo / Group', label: 'Ordering' },
      { value: 'AR / EN', label: 'Storefront languages' },
    ],
    categories: ['Commerce'],
    accent: 'violet',
    featured: true,
  },
  {
    slug: 'sukoon',
    title: 'Sukoon',
    liveUrl: 'https://sukoon.rent/',
    label: 'Real estate platform',
    description:
      'A direct connection between tenants and property owners, bringing rental discovery, comparison, in-app conversations, property tours, and listing management into one experience.',
    image: asset('/assets/projects/sukoon/public-website.webp'),
    imageAlt: 'Sukoon’s public website introducing a rental experience that connects tenants directly with property owners.',
    technologies: ['Flutter', 'Django REST', 'PostgreSQL', 'Cloudinary', 'Channels'],
    stats: [
      { value: 'Direct', label: 'Owner & tenant connection' },
      { value: '360° / 3D', label: 'Property tours' },
      { value: 'AR / EN', label: 'App languages' },
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
      'An Arabic-first app for local businesses that brings cashier sales, stock, staff bookings, and online orders into one place. Customers book or order through a shop link without creating an account.',
    image: asset('/assets/projects/bee3a/point-of-sale.webp'),
    imageAlt: 'Bee3a’s actual demo shop cashier and mobile booking interface.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
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
    title: 'Sahifati (صحيفتي)',
    liveUrl: 'https://sahifati.org/#top',
    appLinks: [
      {
        label: 'Sahifati app',
        googlePlay: 'https://play.google.com/store/apps/details?id=org.sahifati.app',
        appStore: 'https://apps.apple.com/us/app/id6758934985',
      },
    ],
    label: 'Quran learning & assessment',
    description:
      'A Quran companion that assesses memorization and understanding, turns results into a personal learning record, and connects learners with teachers and targeted recommendations.',
    image: asset('/assets/projects/sahifatty/cover.webp'),
    imageAlt:
      'Official Sahifati app screens showing Quran reading, a learner progress record, and verse assessment.',
    technologies: ['Django REST', 'Pytest', 'OAuth & OTP', 'OneSignal'],
    stats: [
      { value: '114', label: 'Surahs' },
      { value: '2', label: 'Assessment dimensions' },
      { value: 'Connected', label: 'Teacher follow-up' },
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
      'An integrated workspace for accounting, HR and payroll, inventory, procurement, and reporting, with multiple companies, currencies, role permissions, and Arabic and English interfaces.',
    image: asset('/assets/projects/saas-erp/erp-sales-invoices.webp'),
    imageAlt: 'UnifiedCore sales invoices on desktop and mobile, using a documented demo tenant.',
    technologies: ['React', 'Django', 'PostgreSQL', 'Tenant schemas'],
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
    label: 'Masar Academy · professional learning',
    description:
      'Professional learning for individuals and teams, with assessed learning paths, expert-led courses, live classes, certificates, and lesson-aware AI assistants.',
    image: asset('/assets/projects/aljadriya/learning-path.webp'),
    imageAlt: 'Masar Academy learning dashboard with lesson progress and a structured learning path.',
    technologies: ['Next.js', 'Django REST', 'PostgreSQL', 'Channels'],
    stats: [
      { value: 'AI', label: 'Learning assistants' },
      { value: '6', label: 'Regional currencies' },
      { value: 'Teams', label: 'Corporate training' },
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
    label: 'Al Junaidi water delivery',
    description:
      'Water delivery for Al Junaidi customers and drivers, connecting bottled-water orders, prepaid coupon balances, scheduled delivery tours, and order follow-up.',
    image: asset('/assets/projects/ghaith-adex/cover.webp'),
    imageAlt:
      'Official Al Junaidi customer app screenshots showing the home screen, prepaid coupon balance, and delivery orders.',
    technologies: ['Django REST', 'Channels', 'Celery', 'Redis'],
    stats: [
      { value: '2', label: 'Customer & driver apps' },
      { value: 'Coupons + cash', label: 'Order payment' },
      { value: 'iOS / Android', label: 'Mobile platforms' },
    ],
    categories: ['SaaS', 'Platform'],
    accent: 'coral',
  },
  {
    slug: 'china-erp',
    title: 'China ERP Systems',
    label: 'Trade operations & finance',
    description:
      'A trading-intermediary system connecting manufacturers, purchase orders, sales invoices, partner balances, and multi-currency payments in one company-wide workspace.',
    imageAlt: '',
    technologies: ['Django', 'PostgreSQL', 'CSV/XLSX', 'Financial reporting'],
    stats: [
      { value: 'CSV / XLSX', label: 'Data imports' },
      { value: 'Company-wide', label: 'Shared operations' },
      { value: 'Multi-currency', label: 'Payment records' },
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
      'Building production software across multi-tenant ERP, B2B trade, education, delivery, and commerce, with secure identity, financial workflows, real-time features, and high-volume data.',
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
      'Node.js',
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
    skills: ['React', 'React Native', 'Flutter', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML & CSS'],
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
