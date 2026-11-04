import { asset } from './content';

/**
 * Longer project stories and gallery screens, keyed by the slug in content.ts.
 * The concept cover is included automatically. Add real screenshots to screens:
 * { src: asset('/assets/screens/bee3a-pos.webp'), alt: '...', caption: 'Point of sale' }
 * asset() also supports the GitHub Pages base path.
 */
export type ProjectScreen = {
  src: string;
  alt: string;
  caption: string;
  kind?: 'screen' | 'concept';
};

export type ProjectDetails = {
  overview: string;
  highlights: { title: string; description: string }[];
  screens: ProjectScreen[];
};

export const projectDetails: Record<string, ProjectDetails> = {
  'barcode-jackets': {
    overview:
      'A commerce system built around a product that customers can make their own. Garment personalization connects to multi-store catalogs, inventory, pricing, and payment workflows, with APIs that keep those moving parts consistent throughout an order.',
    highlights: [
      { title: 'Personalization as a system', description: 'Layered garment customization and an SVG engine support configurable apparel rather than a fixed product catalog.' },
      { title: 'Inventory meets checkout', description: 'Reservations and pricing rules connect product configuration to stock availability across multiple stores.' },
      { title: 'Consistent money movement', description: 'Payment and refund lifecycles use atomic transactions. OpenAPI documents the API contract for integration.' },
    ],
    screens: [],
  },
  sukoon: {
    overview:
      'A real-estate platform connecting property discovery with visit booking. The engineering work brings together versioned APIs, media management, authentication, and real-time communication to support the journey from finding a property to arranging a visit.',
    highlights: [
      { title: 'Discovery to booking', description: 'Property discovery and visit-booking APIs give the product a structured foundation for its core customer journey.' },
      { title: 'Secure, connected accounts', description: 'JWT and OAuth authentication work alongside Redis-backed WebSockets for secure access and real-time features.' },
      { title: 'A testable API contract', description: 'Versioned endpoints, optimized queries, Cloudinary media integration, and more than 100 automated tests support maintainable delivery.' },
    ],
    screens: [],
  },
  bee3a: {
    overview:
      'An Arabic-first business-management product for Egyptian small businesses. Point of sale, inventory, bookings, and online ordering come together in a bilingual PWA, with separate business and platform administration experiences.',
    highlights: [
      { title: 'One business, connected workflows', description: 'POS, inventory, bookings, and online ordering share a product experience built with React, TypeScript, Node.js, Express, and MongoDB.' },
      { title: 'Arabic is a first-class experience', description: 'Arabic and English interfaces, including right-to-left layouts, serve the same product across mobile and desktop.' },
      { title: 'Boundaries that matter', description: 'Tenant isolation, role-based access, local payment verification, and dedicated administration apps support distinct business and platform responsibilities.' },
    ],
    screens: [
      { src: asset('/assets/project-bee3a.svg'), alt: 'Conceptual Bee3a interface showing point of sale, bookings, inventory, and online ordering', caption: 'Interface concept · connected business workflows', kind: 'concept' },
    ],
  },
  sahifatty: {
    overview:
      'A Quran-learning and assessment platform with a modular education API. Content, study plans, assessments, and progress sit alongside teacher–student groups and family accounts, connecting learning material with the people and routines around it.',
    highlights: [
      { title: 'Structured learning content', description: 'Quran content covering 6,236 verses connects to assessments, recommendations, and study plans through modular APIs.' },
      { title: 'Progress with context', description: 'A weighted progress model supports the learning experience, alongside teacher–student groups and secure family accounts.' },
      { title: 'A dependable foundation', description: 'OAuth, OTP, onboarding, OneSignal integration, and Pytest support account access, communication, and verification.' },
    ],
    screens: [],
  },
  'saas-erp': {
    overview:
      'A multi-tenant ERP for financial and operational workflows. Schema-per-tenant isolation separates business environments, while accounting, inventory costs, and payroll rely on transaction-safe services that keep financial records coherent.',
    highlights: [
      { title: 'Isolation by design', description: 'A PostgreSQL schema-per-tenant architecture supports more than 25 tenant environments.' },
      { title: 'Financial consistency', description: 'Double-entry accounting and multi-currency ledgers support more than 100,000 accounting records.' },
      { title: 'Business rules made explicit', description: 'Multi-currency cost of goods sold, controlled payroll workflows, and transaction-safe financial services handle operational complexity.' },
    ],
    screens: [],
  },
  aljadriya: {
    overview:
      'A learning and corporate-training platform spanning multiple countries. Next.js interfaces connect with Django APIs for placement, learning tracks, assessments, and certificates, alongside the agreements, pricing, and finances behind corporate training.',
    highlights: [
      { title: 'A connected learning pathway', description: 'AI placement assessments, structured learning tracks, study plans, and certificates connect the stages of the learning experience.' },
      { title: 'Training across markets', description: 'Corporate agreements, localized pricing, and financial management support multi-country training operations.' },
      { title: 'From interface to real-time', description: 'Next.js, Django REST, PostgreSQL, and Channels bring the web experience, application data, and real-time messaging together.' },
    ],
    screens: [
      { src: asset('/assets/project-aljadriya.svg'), alt: 'Conceptual Aljadriya learning interface with tracks, assessments, and certificates', caption: 'Interface concept · the learning pathway', kind: 'concept' },
    ],
  },
  'ghaith-adex': {
    overview:
      'A multi-tenant delivery platform serving customer and driver apps on Android and iOS. Its operational systems connect branches, orders, coupon ledgers, notifications, and recurring delivery tours across tenant boundaries.',
    highlights: [
      { title: 'Two sides of delivery', description: 'Customer and driver apps connect to delivery operations spanning tenants, branches, and orders.' },
      { title: 'Live and scheduled work', description: 'Django Channels and Redis support real-time notifications, while Celery powers recurring delivery tours.' },
      { title: 'Operational depth', description: 'More than 60 API handlers, prepaid-coupon ledgers, and over 300 automated tests support the platform’s delivery workflows.' },
    ],
    screens: [],
  },
  'china-erp': {
    overview:
      'A B2B trade platform that keeps company data separate while handling large imports and financial reporting. Tenant isolation, resilient data ingestion, and multi-currency tracking support the operational details of international trade.',
    highlights: [
      { title: 'Company-level boundaries', description: 'A tenant-isolated environment per company separates trade operations and their financial data.' },
      { title: 'Imports that contain failures', description: 'CSV and XLSX ingestion handles batches of more than 50,000 rows with isolated import failures.' },
      { title: 'A clearer financial picture', description: 'Automated balance-sheet aggregation and multi-currency foreign-exchange tracking bring reporting into the operational system.' },
    ],
    screens: [],
  },
};
