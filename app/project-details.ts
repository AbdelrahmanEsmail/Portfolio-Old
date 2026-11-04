import { asset } from './content';

/** Authentic product captures and source-grounded project stories.
 * See docs/project-media-sources.md for provenance and capture limitations.
 */
export type ProjectScreen = {
  src: string;
  alt: string;
  caption: string;
  kind?: 'screen' | 'app-store' | 'demo' | 'photo';
};

export type ProjectDetails = {
  overview: string;
  highlights: { title: string; description: string }[];
  screens: ProjectScreen[];
};

export const projectDetails: Record<string, ProjectDetails> = {
  'barcode-jackets': {
    overview:
      'Barcode Jackets is a bilingual custom-apparel platform where customers choose a garment, personalize its materials, colours and artwork, then review pricing and place individual or group orders. The platform combines a storefront, an interactive design studio and an owner dashboard.',
    highlights: [
      { title: 'A garment made personal', description: 'Customers choose a garment, explore materials and colors, and place artwork in the designer before reviewing their finished design.' },
      { title: 'From design to order', description: 'The studio brings garment options, quantities, and price review into the same journey as individual and group ordering.' },
      { title: 'A connected commerce platform', description: 'The bilingual storefront, interactive design studio, and owner dashboard connect the customer experience with catalog and order operations.' },
    ],
    screens: [
      { src: asset('/assets/projects/barcode-jackets/designer-materials.webp'), alt: 'Desktop designer: leather material and garment colour selection.', caption: 'Desktop designer: leather material and garment colour selection.', kind: 'demo' },
      { src: asset('/assets/projects/barcode-jackets/designer-artwork.webp'), alt: 'Desktop designer: front artwork placement zones.', caption: 'Desktop designer: front artwork placement zones.', kind: 'demo' },
      { src: asset('/assets/projects/barcode-jackets/design-review.webp'), alt: 'Design review: quantity, price and checkout summary.', caption: 'Design review: quantity, price and checkout summary.', kind: 'demo' },
      { src: asset('/assets/projects/barcode-jackets/product-catalogue.webp'), alt: 'Storefront catalogue: jacket, hoodie and shirt models.', caption: 'Storefront catalogue: jacket, hoodie and shirt models.', kind: 'demo' },
      { src: asset('/assets/projects/barcode-jackets/mobile-designer.webp'), alt: 'Mobile garment customizer: materials and colour swatches.', caption: 'Mobile garment customizer: materials and colour swatches.', kind: 'demo' },
    ],
  },
  sukoon: {
    overview:
      'Sukoon connects property owners and tenants directly. Home seekers browse and compare rental options, explore property media and virtual tours, and communicate with owners. Owners manage listings and incoming requests through a dedicated workspace.',
    highlights: [
      { title: 'Find a place with more context', description: 'Home seekers browse rental options, compare prices and terms, and inspect property media before contacting an owner.' },
      { title: 'A workspace for owners', description: 'Property owners manage listings and incoming requests in an Arabic and English app experience.' },
      { title: 'Explore before reaching out', description: 'Implemented 360° and 3D tour viewers bring interactive property media into the app. The gallery shows actual app captures with explicitly labeled demonstration tours.' },
    ],
    screens: [
      { src: asset('/assets/projects/sukoon/public-website.webp'), alt: 'Sukoon’s public website introducing direct owner-to-tenant renting.', caption: 'Public website', kind: 'screen' },
      { src: asset('/assets/projects/sukoon/app-welcome.webp'), alt: 'English app Welcome screen with search/list-property entry points.', caption: 'App welcome screen', kind: 'demo' },
      { src: asset('/assets/projects/sukoon/owner-dashboard.webp'), alt: 'Arabic owner workspace: add property, visit requests and overview metrics.', caption: 'Owner workspace · test account', kind: 'demo' },
      { src: asset('/assets/projects/sukoon/virtual-tour-360.webp'), alt: '360 property tour shown inside the iOS app.', caption: '360° tour viewer · demonstration panorama', kind: 'demo' },
      { src: asset('/assets/projects/sukoon/virtual-tour-3d.webp'), alt: 'Navigable representative interior model shown inside the iOS app.', caption: '3D tour viewer · demonstration model', kind: 'demo' },
      { src: asset('/assets/projects/sukoon/rental-comparison.webp'), alt: 'Rental option comparison: prices, deposits, room capacity and known/unknown terms.', caption: 'Rental comparison · sample listings', kind: 'demo' },
    ],
  },
  bee3a: {
    overview:
      'Bee3a is an Arabic-first business management app for Egyptian salons, clinics, training centers, shops, and supermarkets. A business enables the systems it needs: cashier and inventory, staff calendars and customer bookings, or online ordering and delivery. Customers book or order through a shop link without an account; the owner handles sales reports, customer records, receipts, and direct InstaPay or mobile-wallet payment confirmation.',
    highlights: [
      { title: 'Three systems, one shop', description: 'Cashier sales update stock, bookings share a staff calendar, and online orders move from confirmation through preparation to pickup or delivery.' },
      { title: 'Easy for customers', description: 'Customers book, reschedule, or order from a public shop link without creating an account. Shops share receipts and order tracking links.' },
      { title: 'Built for local operations', description: 'Arabic and English interfaces, owner-only financial reporting, customer histories, direct InstaPay and wallet transfers, and an installable web app.' },
    ],
    screens: [
      { src: asset('/assets/projects/bee3a/point-of-sale.webp'), alt: 'Existing product preview of the Bee3a desktop cashier with a three-item invoice and the mobile booking board.', caption: 'Cashier and bookings · demo shop', kind: 'demo' },
      { src: asset('/assets/projects/bee3a/sales-dashboard.webp'), alt: 'Existing product preview of Bee3a’s owner dashboard and mobile sales receipts for its seeded demo shop.', caption: 'Daily sales and receipts · demo shop', kind: 'demo' },
      { src: asset('/assets/projects/bee3a/booking-calendar.webp'), alt: 'Existing product preview of Bee3a’s booking calendar and mobile customer list for the seeded demo salon.', caption: 'Calendar and customers · demo shop', kind: 'demo' },
      { src: asset('/assets/projects/bee3a/mobile-experience.webp'), alt: 'Existing product preview showing Bee3a’s mobile dashboard, cashier, bookings and customer list.', caption: 'The mobile shop experience · demo shop', kind: 'demo' },
    ],
  },
  sahifatty: {
    overview:
      'Sahifati brings Quran assessment, a personal learning record, teacher follow-up, and thematic knowledge into one experience. Learners see both memorization and understanding, identify passages to revisit, and follow recommendations over time. Teachers and institutions supervise learners and track their progress.',
    highlights: [
      { title: 'Two dimensions of learning', description: 'Assessment distinguishes memorization from understanding, helping learners see what they know and what needs review.' },
      { title: 'A living progress record', description: 'The personal record connects assessments, strengths, gaps, and targeted recommendations across the Quran’s 114 surahs.' },
      { title: 'Connected to a teacher', description: 'Teacher supervision and institutional learning paths connect individual progress with ongoing educational support.' },
    ],
    screens: [
      { src: asset('/assets/projects/sahifatty/sahifati-02.webp'), alt: 'Sahifati Quran reading screen with colored verse annotations.', caption: 'Quran reading', kind: 'app-store' },
      { src: asset('/assets/projects/sahifatty/sahifati-03.webp'), alt: 'Sahifati personal record showing surah progress and assessment results.', caption: 'Personal learning record', kind: 'app-store' },
      { src: asset('/assets/projects/sahifatty/sahifati-04.webp'), alt: 'Sahifati verse assessment with memorization and understanding indicators.', caption: 'Verse assessment', kind: 'app-store' },
      { src: asset('/assets/projects/sahifatty/sahifati-01.webp'), alt: 'Sahifati welcome screen inviting learners to assess Quran memorization.', caption: 'Starting the learning journey', kind: 'app-store' },
    ],
  },
  'saas-erp': {
    overview:
      'An integrated business management platform bringing accounting, HR and payroll, inventory, procurement, and reports into a shared workspace. It supports multiple companies, currencies, roles, and Arabic/English interfaces so teams can coordinate finance and daily operations in one product.',
    highlights: [
      { title: 'Finance in the operational workflow', description: 'Accounting, journal entries, accounts, and reporting sit alongside inventory and purchasing so teams work from the same business records.' },
      { title: 'People and payroll', description: 'HR, attendance, payroll, and employee self-service connect everyday staff workflows with business administration.' },
      { title: 'Built for multiple companies', description: 'Company onboarding, role permissions, currencies, and Arabic and English interfaces support distinct teams in one ERP product.' },
    ],
    screens: [
      { src: asset('/assets/projects/saas-erp/erp-sales-invoices.webp'), alt: 'Sales invoices with customer filters and payment/posting status · Demo tenant', caption: 'Sales invoices with customer filters and payment/posting status · Demo tenant', kind: 'demo' },
      { src: asset('/assets/projects/saas-erp/erp-inventory-overview.webp'), alt: 'Inventory overview with stock valuation and low-stock alerts · Demo tenant', caption: 'Inventory overview with stock valuation and low-stock alerts · Demo tenant', kind: 'demo' },
      { src: asset('/assets/projects/saas-erp/erp-items-catalog.webp'), alt: 'Items and services catalog with demo products · Demo tenant', caption: 'Items and services catalog with demo products · Demo tenant', kind: 'demo' },
      { src: asset('/assets/projects/saas-erp/erp-purchase-orders.webp'), alt: 'Purchase orders and approval workflow · Demo tenant', caption: 'Purchase orders and approval workflow · Demo tenant', kind: 'demo' },
      { src: asset('/assets/projects/saas-erp/erp-dashboard-preview.webp'), alt: 'Company dashboard with revenue chart, employees, inventory and open orders · Demo tenant', caption: 'Company dashboard with revenue chart, employees, inventory and open orders · Demo tenant', kind: 'demo' },
    ],
  },
  aljadriya: {
    overview:
      'A professional learning platform for individuals and corporate teams. Learners take a placement assessment, follow a structured general-to-specialist learning path, preview free lessons, attend live classes, and earn completion certificates. Organizations enroll teams through training agreements and track employee progress; course pricing supports six regional currencies. MIZO answers questions from lesson content while WAISO guides learners through the platform.',
    highlights: [
      { title: 'A guided path to certification', description: 'Placement assessment leads into a general AI-at-work course and then the learner’s specialization; progress, quizzes, module exams, assignments, and completion certificates are integrated.' },
      { title: 'One platform for learners and organizations', description: 'Individuals preview free lessons and enroll in courses. Corporate agreements cover training seats and included courses, electronic contracts, and employee progress reports.' },
      { title: 'Support inside the learning experience', description: 'MIZO explains and summarizes the current lesson content. WAISO navigates courses, lessons, live classes, certificates, plans, notes, and learning progress.' },
    ],
    screens: [
      { src: asset('/assets/projects/aljadriya/learning-path.webp'), alt: 'Arabic learning dashboard showing the next lesson, module progress, and specialization journey.', caption: 'Learning path', kind: 'demo' },
      { src: asset('/assets/projects/aljadriya/course-catalog.webp'), alt: 'Arabic course discovery screen with category filters, course cards, free-lesson counts, and local pricing.', caption: 'Course catalog', kind: 'demo' },
      { src: asset('/assets/projects/aljadriya/course-detail.webp'), alt: 'Course detail screen with instructor, curriculum, free previews, enrollment, and course price.', caption: 'Course curriculum', kind: 'demo' },
      { src: asset('/assets/projects/aljadriya/mizo-lesson-assistant.webp'), alt: 'Actual MIZO lesson assistant interface and question composer.', caption: 'MIZO lesson assistant', kind: 'demo' },
      { src: asset('/assets/projects/aljadriya/mobile-learning-path.webp'), alt: 'Mobile app screen showing completed and active modules, lessons, and bottom navigation.', caption: 'Mobile learning path', kind: 'demo' },
      { src: asset('/assets/projects/aljadriya/mobile-waiso-assistant.webp'), alt: 'Mobile app screen with WAISO platform assistant and navigation prompts.', caption: 'WAISO mobile assistant', kind: 'demo' },
    ],
  },
  'ghaith-adex': {
    overview:
      'A water delivery platform connecting customer ordering with field delivery operations. Customers shop products available for their address, manage prepaid water coupons, and follow orders through delivery. Drivers use a companion app to work through assigned routes, confirm deliveries, sell additional items at the door, and track cash collection.',
    highlights: [
      { title: 'Water ordering for every address', description: 'Customers see available products and prices for their address, place orders, follow delivery status, and keep their delivery information together.' },
      { title: 'Coupons meet cash', description: 'Prepaid water coupons and cash can be used in the same order, with a visible coupon balance and transaction history.' },
      { title: 'A companion for field teams', description: 'The driver app supports assigned tours, delivery confirmation, doorstep sales, and cash collection alongside the customer ordering app.' },
    ],
    screens: [
      { src: asset('/assets/projects/ghaith-adex/customer-01.webp'), alt: 'Customer home — delivery schedule, water coupon balance and available products', caption: 'Customer home — delivery schedule, water coupon balance and available products', kind: 'app-store' },
      { src: asset('/assets/projects/ghaith-adex/customer-05.webp'), alt: 'Prepaid coupon balance and transaction history', caption: 'Prepaid coupon balance and transaction history', kind: 'app-store' },
      { src: asset('/assets/projects/ghaith-adex/customer-08.webp'), alt: 'Customer order list and delivery status', caption: 'Customer order list and delivery status', kind: 'app-store' },
      { src: asset('/assets/projects/ghaith-adex/customer-09.webp'), alt: 'Shopping cart with cash and coupon totals', caption: 'Shopping cart with cash and coupon totals', kind: 'app-store' },
      { src: asset('/assets/projects/ghaith-adex/customer-02.webp'), alt: 'Customer onboarding — water delivery by scheduled routes', caption: 'Customer onboarding — water delivery by scheduled routes', kind: 'app-store' },
      { src: asset('/assets/projects/ghaith-adex/driver-01.webp'), alt: 'Driver home — daily routes and cashbox balance', caption: 'Driver tour dashboard · empty state', kind: 'app-store' },
    ],
  },
  'china-erp': {
    overview:
      'A trade management system for a company sourcing goods from Chinese manufacturers and selling to customers. It connects the product catalog, purchase orders, sales invoices, shipments, customer and supplier payments, partner capital, and company financial reporting across the trading cycle.',
    highlights: [
      { title: 'The full trading cycle', description: 'Manufacturer records and product specifications connect purchase orders to customer sales invoices and delivery movements.' },
      { title: 'Payments and business balances', description: 'Incoming and outgoing payments, partner capital, and financial accounts support company-wide reporting across the trading operation.' },
      { title: 'Shared records for the whole company', description: 'Staff collaborate on one business dataset. CSV and XLSX imports bring existing operational records into the system.' },
    ],
    screens: [],
  },
};
