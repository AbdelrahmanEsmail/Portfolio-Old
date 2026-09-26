'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
];

const heroStack = ['Python', 'Django', 'React', 'Next.js', 'PostgreSQL'];
const marqueeSkills = [
  'Python',
  'Django',
  'Django REST',
  'PostgreSQL',
  'MySQL',
  'Multi-Tenancy',
  'Transactions',
  'Row-Level Locking',
  'Service-Layer Architecture',
  'Celery',
  'Redis',
  'RabbitMQ',
  'Django Channels',
  'WebSockets',
  'Pytest',
  'Docker',
  'Linux',
  'Nginx',
  'Gunicorn',
  'JWT & OAuth',
  'OpenAPI',
  'Postman',
  'CI/CD',
  'AWS S3',
  'Cloudinary',
  'React',
  'Next.js',
  'TypeScript',
];
const filters = ['All', 'SaaS', 'Platform', 'Commerce'] as const;
type ProjectFilter = (typeof filters)[number];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const assetPath = (path: string) => `${basePath}${path}`;

type Project = {
  title: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  technologies: string[];
  stats: { value: string; label: string }[];
  categories: Exclude<ProjectFilter, 'All'>[];
  accent: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: 'Multi-Tenant SaaS ERP',
    label: 'ERP & financial systems',
    description:
      'A schema-per-tenant ERP with double-entry accounting, multi-currency COGS, controlled payroll workflows, and transaction-safe financial services.',
    image: assetPath('/assets/project-erp.webp'),
    imageAlt: 'Conceptual multi-tenant ERP and financial operations dashboard',
    technologies: ['Django', 'PostgreSQL', 'Tenant schemas', 'Transactions'],
    stats: [
      { value: '25+', label: 'Tenant environments' },
      { value: '100K+', label: 'Accounting records' },
      { value: 'Multi', label: 'Currency ledgers' },
    ],
    categories: ['SaaS'],
    accent: 'cobalt',
    featured: true,
  },
  {
    title: 'China ERP Systems',
    label: 'Multi-tenant B2B trade',
    description:
      'A tenant-isolated trade platform per company with resilient CSV/XLSX imports, automated balance-sheet aggregation, and multi-currency foreign-exchange tracking.',
    image: assetPath('/assets/project-china-trade.webp'),
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
  {
    title: 'Sahifatty',
    label: 'Quran learning & assessment',
    description:
      'A modular education API for Quran content, assessments, study plans, teacher–student groups, recommendations, onboarding, and secure family accounts.',
    image: assetPath('/assets/project-sahifatty.webp'),
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
    title: 'AquaCloud / Geenade',
    label: 'Multi-tenant delivery platform',
    description:
      'A delivery backend spanning tenants, branches, orders, prepaid-coupon ledgers, real-time notifications, and Celery-powered recurring tours.',
    image: assetPath('/assets/project-aquacloud.webp'),
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
    title: 'Barcode Jackets',
    label: 'Custom apparel commerce',
    description:
      'A custom-apparel API with layered garment personalization, multi-store catalogs, inventory reservations, pricing rules, and atomic payment/refund lifecycles.',
    image: assetPath('/assets/project-barcode-jackets.webp'),
    imageAlt: 'Conceptual jacket customization and commerce studio',
    technologies: ['Django REST', 'SVG engine', 'PostgreSQL', 'OpenAPI'],
    stats: [
      { value: 'Layered', label: 'Customization' },
      { value: 'Multi-store', label: 'Catalog model' },
      { value: 'Atomic', label: 'Payments & refunds' },
    ],
    categories: ['Commerce'],
    accent: 'violet',
  },
  {
    title: 'Sukoon',
    label: 'Real estate platform API',
    description:
      'A versioned property-discovery and visit-booking API with hardened authentication, query optimization, Cloudinary media, and Redis-backed WebSockets.',
    image: assetPath('/assets/project-sukoon.webp'),
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
];

const experience = [
  {
    period: 'Mar 2026 — Present',
    role: 'Full Stack Developer',
    company: 'Adex',
    description:
      'Building production backends across multi-tenant ERP, B2B trade, education, delivery, and commerce—covering financial ledgers, secure identity, real-time workflows, and high-volume data.',
    tag: 'Amman, Jordan',
  },
  {
    period: 'Jun — Sep 2026',
    role: 'Full Stack Developer',
    company: 'Sukoon',
    description:
      'Developed property discovery and visit-booking APIs with JWT/OAuth security, Cloudinary media, Redis-backed WebSockets, query optimization, and 100+ automated tests.',
    tag: 'Egypt',
  },
  {
    period: 'Jan — Mar 2026',
    role: 'Full Stack Developer',
    company: 'Freelance',
    description:
      'Delivered full-stack web applications, pairing Django APIs and PostgreSQL data models with responsive React and Next.js interfaces.',
    tag: 'Remote · Egypt',
  },
  {
    period: 'Oct 2024 — Mar 2025',
    role: 'Backend Developer',
    company: 'Negm Feed',
    description:
      'Developed invoicing, payments, client and employee management, balance summaries, and financial reporting APIs; integrated Stripe and WeasyPrint PDF generation.',
    tag: 'Mansoura, Egypt',
  },
  {
    period: 'Jul — Sep 2023',
    role: 'Full Stack Developer',
    company: 'Information Technology Institute (ITI)',
    description:
      'Built Django features, PostgreSQL schemas, secure REST APIs, and optimized queries using Redis, Docker, and Git.',
    tag: 'Mansoura, Egypt',
  },
  {
    period: 'Oct 2022 — Feb 2023',
    role: 'System Administrator',
    company: 'New Horizons',
    description:
      'Managed Linux and Windows Server infrastructure, networking, server provisioning, and cloud-related services.',
    tag: 'Mansoura, Egypt',
  },
  {
    period: 'Aug — Oct 2022',
    role: 'Full Stack Developer Intern',
    company: 'Mansoura University',
    description:
      'Developed Django backend modules, REST APIs, and PostgreSQL-backed functionality for academic projects.',
    tag: 'Mansoura, Egypt',
  },
  {
    period: 'Sep 2020 — Jan 2021',
    role: 'Networking & Systems Intern',
    company: 'New Horizons',
    description:
      'Completed hands-on training in CCNA networking, MCSA and Windows Server administration, and Linux system administration.',
    tag: 'Mansoura, Egypt',
  },
];

const skillGroups = [
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
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'HTML & CSS',
    ],
  },
  {
    number: '03',
    title: 'Platform',
    description: 'The path from commit to production.',
    skills: ['Docker', 'Git', 'CI/CD', 'Linux', 'Deployment', 'REST APIs'],
  },
];

type ProjectCardProps = {
  project: Project;
  index: number;
  inDialog?: boolean;
};

function ProjectCard({ project, index, inDialog = false }: ProjectCardProps) {
  return (
    <article
      className={`project-card ${project.featured ? 'is-featured' : ''} accent-${project.accent}`}
      data-reveal={inDialog ? undefined : true}
      style={inDialog ? undefined : { '--delay': `${Math.min(index, 4) * 70}ms` } as CSSProperties}
    >
      <div className="project-media">
        <span className="project-count">0{projects.indexOf(project) + 1}</span>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={inDialog
            ? '(max-width: 820px) 100vw, 46vw'
            : project.featured
              ? '(max-width: 1020px) 100vw, 56vw'
              : '(max-width: 820px) 100vw, 38vw'}
          className="project-image"
        />
      </div>
      <div className="project-body">
        <p className="project-label">{project.label}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <ul className="project-technologies" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <dl className="project-stats" aria-label={`${project.title} project statistics`}>
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsDialogRef = useRef<HTMLDialogElement>(null);
  const viewAllProjectsRef = useRef<HTMLButtonElement>(null);

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((project) => project.categories.includes(activeFilter)),
    [activeFilter],
  );
  const visibleProjects = projects.slice(0, 3);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark) ? 'dark' : 'light';

    const frame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
      document.documentElement.dataset.theme = initialTheme;
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(progress));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('js-ready');
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = projectsDialogRef.current;
    if (!dialog) return;

    if (projectsOpen && !dialog.open) dialog.showModal();
    if (!projectsOpen && dialog.open) dialog.close();
  }, [projectsOpen]);

  useEffect(() => {
    if (!projectsOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [projectsOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('portfolio-theme', nextTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <span className="scroll-progress" aria-hidden="true" />

        <a className="brand" href="#top" aria-label="Zeyad Salama — home" onClick={closeMenu}>
          <span className="brand-mark brand-avatar" aria-hidden="true">
            <Image
              src={assetPath('/assets/Zeyad-portrait.jpg')}
              alt=""
              fill
              sizes="38px"
              className="brand-avatar-image"
            />
          </span>
          <span className="brand-name">Zeyad Salama</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
          </button>
          <a className="header-cta" href="mailto:zeyadslama23@gmail.com">
            Let&apos;s talk <span aria-hidden="true">↗</span>
          </a>
          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label="Mobile navigation"
        >
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
          <a href="mailto:zeyadslama23@gmail.com" onClick={closeMenu}>
            <span>05</span>Contact
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />

          <div className="hero-copy" data-reveal>
            <p className="availability">
              <span aria-hidden="true" /> Open to software engineering opportunities
            </p>
            <h1 id="hero-title">Backend depth.<br />Frontend <em>polish.</em></h1>
            <p className="hero-intro">
              I&apos;m Zeyad, a backend software engineer building secure, transaction-heavy
              products with Python, Django, and PostgreSQL—from multi-tenant ERP and
              financial systems to real-time product APIs.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <span aria-hidden="true">↓</span>
              </a>
              <a
                className="button button-secondary"
                href={assetPath('/assets/Zeyad_Salama_Software_Engineer.pdf')}
                target="_blank"
                rel="noreferrer"
              >
                View résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
            <ul className="hero-stack" aria-label="Core technologies">
              {heroStack.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="portrait-shell">
              <div className="portrait-grid" aria-hidden="true" />
              <div className="portrait-frame">
                <Image
                  src={assetPath('/assets/Zeyad-portrait.jpg')}
                  alt="Zeyad Salama wearing a light gray suit"
                  fill
                  priority
                  sizes="(max-width: 1020px) 82vw, 38vw"
                  className="portrait-image"
                />
              </div>
              <div className="floating-card floating-card-code">
                <span className="floating-icon" aria-hidden="true">{'{ }'}</span>
                <div><strong>Full-stack</strong><small>API to interface</small></div>
              </div>
              <div className="floating-card floating-card-projects">
                <strong>06</strong><small>selected builds</small>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Portfolio highlights" data-reveal>
          <p>Built for the whole product</p>
          <div className="proof-item"><strong>07</strong><span>professional roles</span></div>
          <div className="proof-item"><strong>06</strong><span>selected projects</span></div>
          <div className="proof-item"><strong>∞</strong><span>room to keep learning</span></div>
        </section>

        <div className="technology-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-content" key={copy}>
                {marqueeSkills.map((skill) => (
                  <span className="marquee-skill" key={skill}>
                    {skill}<i>✦</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="about section-shell" id="about">
          <div className="section-heading about-heading" data-reveal>
            <p className="eyebrow"><span>01</span> About</p>
            <h2>I enjoy the invisible work—<em>and</em> the interface people remember.</h2>
          </div>
          <div className="about-grid">
            <div className="about-photo-wrap" data-reveal>
              <div className="about-photo">
                <Image
                  src={assetPath('/assets/Zeyad.jpg')}
                  alt="Zeyad Salama at the Arab Collegiate Programming Contest"
                  fill
                  sizes="(max-width: 820px) 100vw, 42vw"
                  className="about-image"
                />
              </div>
              <p className="photo-note"><span>Think in systems.</span><strong>Ship with intent.</strong></p>
            </div>
            <div className="about-copy" data-reveal>
              <p className="about-lead">
                I&apos;m a backend software engineer specializing in Python, Django,
                Django REST Framework, and PostgreSQL. My sweet spot is turning
                complex business rules into dependable product systems.
              </p>
              <p>
                I&apos;ve worked across multi-tenant SaaS, ERP, finance, delivery,
                education, e-commerce, and real estate—designing transactional
                workflows, secure authentication, real-time systems, background jobs,
                tests, and production-ready APIs that remain clear as they grow.
              </p>
              <dl className="about-facts">
                <div><dt>Education</dt><dd>B.Sc. Computer & Information Sciences · 2020–2024</dd></div>
                <div><dt>Focus</dt><dd>Software Engineering · Mansoura University</dd></div>
                <div><dt>Based in</dt><dd>Egypt · Open to remote collaboration</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="work section-shell" id="work">
          <div className="work-top" data-reveal>
            <div className="section-heading">
              <p className="eyebrow"><span>02</span> Selected work</p>
              <h2>Products with a strong <em>backbone.</em></h2>
            </div>
          </div>

          <div className="projects-grid" aria-live="polite">
            {visibleProjects.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.title} />
            ))}
          </div>

          <div className="projects-actions" data-reveal>
            <button
              className="button button-primary view-all-projects"
              type="button"
              aria-haspopup="dialog"
              aria-controls="projects-dialog"
              ref={viewAllProjectsRef}
              onClick={() => setProjectsOpen(true)}
            >
              View all projects <span aria-hidden="true">0{projects.length} ↗</span>
            </button>
          </div>
        </section>

        <dialog
          className="projects-dialog"
          id="projects-dialog"
          ref={projectsDialogRef}
          aria-labelledby="projects-dialog-title"
          aria-describedby="projects-dialog-description"
          onCancel={() => setProjectsOpen(false)}
          onClose={() => {
            setProjectsOpen(false);
            window.requestAnimationFrame(() => viewAllProjectsRef.current?.focus());
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            const clickedOutside = event.clientX < bounds.left
              || event.clientX > bounds.right
              || event.clientY < bounds.top
              || event.clientY > bounds.bottom;
            if (clickedOutside) setProjectsOpen(false);
          }}
        >
          <div className="projects-dialog-header">
            <div>
              <p className="eyebrow"><span>06</span> Complete project archive</p>
              <h2 id="projects-dialog-title">All selected projects.</h2>
              <p id="projects-dialog-description">
                Explore the full collection of SaaS, platform, and commerce systems.
              </p>
            </div>
            <button
              className="projects-dialog-close"
              type="button"
              aria-label="Close all projects"
              onClick={() => setProjectsOpen(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="project-filters modal-project-filters" role="group" aria-label="Filter all projects">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                  className={activeFilter === filter ? 'is-active' : ''}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="projects-modal-grid" aria-live="polite">
            {filteredProjects.map((project, index) => (
                <ProjectCard project={project} index={index} inDialog key={project.title} />
            ))}
          </div>
        </dialog>

        <section className="experience section-shell" id="experience">
          <div className="experience-intro" data-reveal>
            <div className="section-heading">
              <p className="eyebrow"><span>03</span> Experience</p>
              <h2>A path built through <em>practice.</em></h2>
            </div>
            <p>
              From infrastructure and systems administration to production backend
              architecture, each role sharpened how I build secure, observable, and
              transaction-safe software.
            </p>
          </div>
          <div className="timeline">
            {experience.map((item, index) => (
              <article
                className="timeline-item"
                key={`${item.company}-${item.period}`}
                data-reveal
                style={{ '--delay': `${index * 60}ms` } as CSSProperties}
              >
                <span className="timeline-marker" aria-hidden="true" />
                <time>{item.period}</time>
                <div className="timeline-main">
                  <p>{item.company}</p><h3>{item.role}</h3><span>{item.tag}</span>
                </div>
                <p className="timeline-description">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stack section-shell" id="stack">
          <div className="stack-header" data-reveal>
            <div className="section-heading">
              <p className="eyebrow"><span>04</span> Toolkit</p>
              <h2>Backend is home. Frontend makes it <em>whole.</em></h2>
            </div>
            <div className="orbit-mark" aria-hidden="true"><span>{'<ZS />'}</span></div>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article
                className="skill-card"
                key={group.title}
                data-reveal
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
              >
                <div className="skill-card-top"><span>{group.number}</span><p>{group.description}</p></div>
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => <li key={skill}><span aria-hidden="true">+</span> {skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="principles" data-reveal>
            <article><span>01</span><h3>Architecture first</h3><p>Shape the data and boundaries before reaching for complexity.</p></article>
            <article><span>02</span><h3>Clarity in the UI</h3><p>Make the important action obvious and every interaction feel considered.</p></article>
            <article><span>03</span><h3>Ship, learn, refine</h3><p>Deliver dependable increments, then improve with real feedback.</p></article>
          </div>
        </section>

        <section className="contact section-shell" id="contact" data-reveal>
          <div className="contact-card">
            <div className="contact-orb" aria-hidden="true">↗</div>
            <p className="eyebrow light"><span>05</span> Let&apos;s connect</p>
            <h2>Have a system to build—or an idea to make <em>real?</em></h2>
            <p className="contact-intro">
              I&apos;m open to software engineering roles, ambitious products, and thoughtful collaborations.
            </p>
            <a className="contact-email" href="mailto:zeyadslama23@gmail.com">
              zeyadslama23@gmail.com <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-links">
              <a href="https://github.com/Demo-23home" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/demo-23home/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="tel:+201017595972">+20 101 759 5972</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top" aria-label="Back to top">
          <span className="brand-mark brand-avatar" aria-hidden="true">
            <Image
              src={assetPath('/assets/Zeyad-portrait.jpg')}
              alt=""
              fill
              sizes="34px"
              className="brand-avatar-image"
            />
          </span>
          <span className="brand-name">Zeyad Salama</span>
        </a>
        <p>Software engineer · Backend depth, frontend polish.</p>
        <p>© {new Date().getFullYear()} Zeyad Salama</p>
      </footer>
    </>
  );
}
