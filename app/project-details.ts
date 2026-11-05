import { asset } from './content';

/** Project media from Za Studio and retained local captures, with source-grounded stories.
 * See docs/project-media-sources.md for provenance and capture limitations.
 */
export type ProjectScreen = {
  src: string;
  alt: string;
  caption: string;
  kind?: 'screen' | 'app-store' | 'demo' | 'photo' | 'reference' | 'source' | 'studio' | 'illustration';
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
      { src: asset('/assets/projects/barcode-jackets/za-studio/hero.webp'), alt: "Barcode Jackets storefront on desktop and mobile", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/barcode-jackets/za-studio/feature.webp'), alt: "The jacket designer: a varsity jacket coloured part by part", caption: "The jacket designer", kind: 'studio' },
      { src: asset('/assets/projects/barcode-jackets/za-studio/app-01.webp'), alt: "Group dashboard: the colour set, members, sizes and payments", caption: "Group dashboard: the colour set, members, sizes and payments", kind: 'studio' },
      { src: asset('/assets/projects/barcode-jackets/za-studio/app-02.webp'), alt: "Designing on the phone and the group board", caption: "Designing on the phone and the group board", kind: 'studio' },
      { src: asset('/assets/projects/barcode-jackets/za-studio/app-03.webp'), alt: "Inside view: choosing the lining", caption: "Inside view: choosing the lining", kind: 'studio' },
      { src: asset('/assets/projects/barcode-jackets/za-studio/app-04.webp'), alt: "My group orders in the customer account", caption: "My group orders in the customer account", kind: 'studio' },
    ],
  },
  sukoon: {
    overview:
      'Sukoon connects property owners and tenants directly. Home seekers browse and compare rental options, explore property media and virtual tours, and communicate with owners. Owners manage listings and incoming requests through a dedicated workspace.',
    highlights: [
      { title: 'Find a place with more context', description: 'Home seekers browse rental options, compare prices and terms, and inspect property media before contacting an owner.' },
      { title: 'A workspace for owners', description: 'Property owners manage listings and incoming requests in an Arabic and English app experience.' },
      { title: 'Explore before reaching out', description: 'Property media, listing capture, and tour viewers give tenants more context before contacting an owner. The gallery uses Za Studio’s landing-page and mobile app previews.' },
    ],
    screens: [
      { src: asset('/assets/projects/sukoon/za-studio/hero.webp'), alt: "Sukoon landing page on desktop and mobile", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/sukoon/za-studio/feature.webp'), alt: "Sukoon mobile app: welcome, roles, home and offer", caption: "The mobile app", kind: 'studio' },
      { src: asset('/assets/projects/sukoon/za-studio/landing-01.webp'), alt: "Inside Sukoon: features for tenants and owners", caption: "Inside Sukoon: features for tenants and owners", kind: 'studio' },
      { src: asset('/assets/projects/sukoon/za-studio/landing-02.webp'), alt: "Simple steps for both sides of a rental", caption: "Simple steps for both sides of a rental", kind: 'studio' },
      { src: asset('/assets/projects/sukoon/za-studio/landing-03.webp'), alt: "No brokers, no commission, verified accounts", caption: "No brokers, no commission, verified accounts", kind: 'studio' },
      { src: asset('/assets/projects/sukoon/za-studio/landing-04.webp'), alt: "The landing page on the phone", caption: "The landing page on the phone", kind: 'studio' },
      { src: asset('/assets/projects/sukoon/za-studio/app-01.webp'), alt: "Owner subscription, tenant selection and listing details", caption: "Owner subscription, tenant selection and listing details", kind: 'studio' },
      { src: asset('/assets/projects/sukoon/za-studio/app-02.webp'), alt: "Group chat with voice notes, a contract file and live location; paying an invoice through Paymob", caption: "Group chat with voice notes, a contract file and live location; paying an invoice through Paymob", kind: 'studio' },
      { src: asset('/assets/projects/sukoon/za-studio/app-03.webp'), alt: "Capturing a listing: photos, a guided room scan and the published offer", caption: "Capturing a listing: photos, a guided room scan and the published offer", kind: 'studio' },
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
      { src: asset('/assets/projects/bee3a/za-studio/hero.webp'), alt: "Bee3a shop app: bookings board and the till on a phone", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/bee3a/za-studio/feature.webp'), alt: "Bee3a on the phone: sales, calendar and reports", caption: "On the phone", kind: 'studio' },
      { src: asset('/assets/projects/bee3a/za-studio/app-01.webp'), alt: "Bee3a till with a three-item invoice", caption: "Bee3a till with a three-item invoice", kind: 'studio' },
      { src: asset('/assets/projects/bee3a/za-studio/app-02.webp'), alt: "Shop dashboard with today’s sales and receipts", caption: "Shop dashboard with today’s sales and receipts", kind: 'studio' },
      { src: asset('/assets/projects/bee3a/za-studio/app-03.webp'), alt: "Bookings calendar and customer list", caption: "Bookings calendar and customer list", kind: 'studio' },
      { src: asset('/assets/projects/bee3a/za-studio/app-04.webp'), alt: "Bee3a on the phone: today, till, bookings and customers", caption: "Bee3a on the phone: today, till, bookings and customers", kind: 'studio' },
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
      { src: asset('/assets/projects/sahifatty/za-studio/hero.webp'), alt: "Sahifatty staff portal: user statistics dashboard", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/sahifatty/za-studio/feature.webp'), alt: "Sahifatty app screens from the App Store", caption: "The app", kind: 'studio' },
      { src: asset('/assets/projects/sahifatty/za-studio/portal-01.webp'), alt: "Portal home with account totals and governance shortcuts", caption: "Portal home with account totals and governance shortcuts", kind: 'studio' },
      { src: asset('/assets/projects/sahifatty/za-studio/portal-02.webp'), alt: "Teacher groups and pending join requests", caption: "Teacher groups and pending join requests", kind: 'studio' },
      { src: asset('/assets/projects/sahifatty/za-studio/portal-03.webp'), alt: "License purchase requests awaiting review", caption: "License purchase requests awaiting review", kind: 'studio' },
      { src: asset('/assets/projects/sahifatty/za-studio/portal-04.webp'), alt: "Governance documents by section", caption: "Governance documents by section", kind: 'studio' },
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
      { src: asset('/assets/projects/saas-erp/za-studio/hero.webp'), alt: "UnifiedCore ERP dashboard with revenue vs expenses", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/feature.webp'), alt: "UnifiedCore on mobile: invoices, items and purchase orders", caption: "On mobile", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-01.webp'), alt: "Payroll dashboard: four monthly runs, draft to paid", caption: "Payroll dashboard: four monthly runs, draft to paid", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-02.webp'), alt: "October 2026 payroll: gross, deductions, tax, social security and net per employee", caption: "October 2026 payroll: gross, deductions, tax, social security and net per employee", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-03.webp'), alt: "HR overview: monthly payroll cost by department", caption: "HR overview: monthly payroll cost by department", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-04.webp'), alt: "Auditor change requests waiting for the company's approval", caption: "Auditor change requests waiting for the company's approval", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-05.webp'), alt: "General ledger: payroll payments posted to the corporate bank account", caption: "General ledger: payroll payments posted to the corporate bank account", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-06.webp'), alt: "Journal entries generated by payroll and sales, with locked accounting periods", caption: "Journal entries generated by payroll and sales, with locked accounting periods", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-07.webp'), alt: "Sales invoices by status, with send and pay actions", caption: "Sales invoices by status, with send and pay actions", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-08.webp'), alt: "Bank and cash accounts with live balances", caption: "Bank and cash accounts with live balances", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/erp-09.webp'), alt: "Inventory: stock value, low-stock alerts and warehouses", caption: "Inventory: stock value, low-stock alerts and warehouses", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/app-01.webp'), alt: "Sales invoices", caption: "Sales invoices", kind: 'studio' },
      { src: asset('/assets/projects/saas-erp/za-studio/app-04.webp'), alt: "Purchase orders and approvals", caption: "Purchase orders and approvals", kind: 'studio' },
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
      { src: asset('/assets/projects/aljadriya/za-studio/hero.webp'), alt: "Masar Academy learner dashboard with the instructor view on a phone", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/aljadriya/za-studio/feature.webp'), alt: "Masar Academy dashboards on mobile", caption: "On mobile", kind: 'studio' },
      { src: asset('/assets/projects/aljadriya/za-studio/app-01.webp'), alt: "Course catalogue with prices in the learner’s currency", caption: "Course catalogue with prices in the learner’s currency", kind: 'studio' },
      { src: asset('/assets/projects/aljadriya/za-studio/app-02.webp'), alt: "Admin overview with enrollments, revenue and alerts", caption: "Admin overview with enrollments, revenue and alerts", kind: 'studio' },
      { src: asset('/assets/projects/aljadriya/za-studio/app-03.webp'), alt: "Instructor analytics for courses and students", caption: "Instructor analytics for courses and students", kind: 'studio' },
      { src: asset('/assets/projects/aljadriya/za-studio/app-04.webp'), alt: "Organization dashboard: seats, contract and assigned courses", caption: "Organization dashboard: seats, contract and assigned courses", kind: 'studio' },
      { src: asset('/assets/projects/aljadriya/za-studio/app-05.webp'), alt: "Certificates earned by a learner", caption: "Certificates earned by a learner", kind: 'studio' },
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
      { src: asset('/assets/projects/ghaith-adex/za-studio/hero.webp'), alt: "Ghaith customer and driver apps", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/ghaith-adex/za-studio/feature.webp'), alt: "Ghaith customer app: home, orders, cart and checkout", caption: "Customer app", kind: 'studio' },
      { src: asset('/assets/projects/ghaith-adex/za-studio/customer-01.webp'), alt: "Customer app: home with coupon balance, product page and onboarding", caption: "Customer app: home with coupon balance, product page and onboarding", kind: 'studio' },
      { src: asset('/assets/projects/ghaith-adex/za-studio/customer-02.webp'), alt: "Customer app: sign-in, account and orders", caption: "Customer app: sign-in, account and orders", kind: 'studio' },
      { src: asset('/assets/projects/ghaith-adex/za-studio/driver-01.webp'), alt: "Driver app: today’s tour, account and sign-in", caption: "Driver app: today’s tour, account and sign-in", kind: 'studio' },
    ],
  },
  'china-erp': {
    overview:
      'A trade management system for a company sourcing goods from Chinese manufacturers and selling to customers. It connects the product catalog, purchase orders, sales invoices, shipments, customer and supplier payments, partner capital, and company financial reporting across the trading cycle. A React and TypeScript frontend organizes the ERP modules, with local mock data available when a backend connection is not configured.',
    highlights: [
      { title: 'The full trading cycle', description: 'Manufacturer records and product specifications connect purchase orders to customer sales invoices and delivery movements.' },
      { title: 'Payments and business balances', description: 'Incoming and outgoing payments, partner capital, and financial accounts support company-wide reporting across the trading operation.' },
      { title: 'Shared records for the whole company', description: 'Staff collaborate on one business dataset. CSV and XLSX imports bring existing operational records into the system.' },
    ],
    screens: [
      { src: asset('/assets/projects/china-erp/za-studio/hero.webp'), alt: "China ERP dashboard on desktop and mobile: revenue, customer balances and factory payables", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/feature.webp'), alt: "China ERP purchase orders by factory, status and payment progress", caption: "Purchase orders", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-01.webp'), alt: "A purchase order: delivery movements, factory payments and items in cartons", caption: "A purchase order: delivery movements, factory payments and items in cartons", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-02.webp'), alt: "A paid sales invoice with delivered cartons and the billing breakdown", caption: "A paid sales invoice with delivered cartons and the billing breakdown", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-03.webp'), alt: "Building a new invoice: customer, carton lines, deposit and logistics", caption: "Building a new invoice: customer, carton lines, deposit and logistics", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-04.webp'), alt: "Factories with contracts, purchases and review status", caption: "Factories with contracts, purchases and review status", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-05.webp'), alt: "Customers across Jordan, Iraq and Saudi Arabia with balances", caption: "Customers across Jordan, Iraq and Saudi Arabia with balances", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-06.webp'), alt: "Money accounts: funds, expenses and receipts this month", caption: "Money accounts: funds, expenses and receipts this month", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-07.webp'), alt: "Every payment in and out, linked to invoices, orders and expenses", caption: "Every payment in and out, linked to invoices, orders and expenses", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-08.webp'), alt: "Partners and their share of company capital", caption: "Partners and their share of company capital", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/ch-09.webp'), alt: "Dashboard, a purchase order and payments on the phone", caption: "Dashboard, a purchase order and payments on the phone", kind: 'studio' },
      { src: asset('/assets/projects/china-erp/za-studio/app-03.webp'), alt: "Balance sheet", caption: "Balance sheet", kind: 'studio' },
    ],
  },
  'key-academy': {
    overview:
      'Key Academy connects a React learning website, Django course APIs, and a companion Flutter app. Courses, modules, lesson progress, enrollments, and real-time conversations form a shared learning experience across web and mobile.',
    highlights: [
      { title: 'A connected course structure', description: 'Courses, modules, lessons, enrollment, and progress tracking connect learning material with access to the next step.' },
      { title: 'Conversation alongside content', description: 'Django Channels and Redis support live chat, with account and moderation checks at the WebSocket layer.' },
      { title: 'Web and mobile delivery', description: 'The React web app and Flutter companion support lesson experiences spanning video, PDF, and other course content.' },
    ],
    screens: [
      { src: asset('/assets/projects/key-academy/za-studio/hero.webp'), alt: "Key Academy student dashboard on desktop and phone", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/key-academy/za-studio/app-01.webp'), alt: "Course browser and certificates", caption: "Course browser and certificates", kind: 'studio' },
      { src: asset('/assets/projects/key-academy/za-studio/app-02.webp'), alt: "HQ command center with enrollments, questions and top courses", caption: "HQ command center with enrollments, questions and top courses", kind: 'studio' },
      { src: asset('/assets/projects/key-academy/za-studio/app-03.webp'), alt: "Teacher analytics and assistant performance", caption: "Teacher analytics and assistant performance", kind: 'studio' },
      { src: asset('/assets/projects/key-academy/za-studio/app-04.webp'), alt: "Student certificates and lesson notes", caption: "Student certificates and lesson notes", kind: 'studio' },
    ],
  },
  'fiva-health': {
    overview:
      'Yotell’s Django REST backend supports daily health routines. Its APIs connect a personal health profile with nutrition summaries, water intake, medication schedules and dose logs, alongside challenges and achievement journeys. The gallery presents the companion Yotell Health app previews used by Za Studio.',
    highlights: [
      { title: 'Daily records with context', description: 'Health profiles, nutrition analyses, water entries, goals, and summaries give the app a structured record of day-to-day routines.' },
      { title: 'Medication routines', description: 'Medication APIs support schedules, dose logs, and explicit take, skip, and undo actions.' },
      { title: 'Progress across a journey', description: 'Challenges, achievements, levels, and a journey endpoint connect ongoing participation with visible progress in the product.' },
    ],
    screens: [
      { src: asset('/assets/projects/fiva-health/za-studio/hero.webp'), alt: "Yotell Health app: home, diabetes tracker, steps, nutrition and journey", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/fiva-health/za-studio/app-01.webp'), alt: "Home, steps tracker and nutrition analysis", caption: "Home, steps tracker and nutrition analysis", kind: 'studio' },
      { src: asset('/assets/projects/fiva-health/za-studio/app-02.webp'), alt: "Diabetes tracker with a 7-day trend and recent readings", caption: "Diabetes tracker with a 7-day trend and recent readings", kind: 'studio' },
      { src: asset('/assets/projects/fiva-health/za-studio/app-03.webp'), alt: "Journey, social feed and profile", caption: "Journey, social feed and profile", kind: 'studio' },
      { src: asset('/assets/projects/fiva-health/za-studio/app-04.webp'), alt: "FIVA AI assistant, daily progress and quick actions", caption: "FIVA AI assistant, daily progress and quick actions", kind: 'studio' },
      { src: asset('/assets/projects/fiva-health/za-studio/app-05.webp'), alt: "Health score and the sleep tracker with a new entry — from the Play Store listing", caption: "Health score and the sleep tracker with a new entry — from the Play Store listing", kind: 'studio' },
    ],
  },
  'nourseen-store': {
    overview:
      'Nourseen Store connects a React shopping experience with Django REST commerce APIs. Customers explore products and discounts, manage a cart, check out, and revisit their orders. An administration workspace covers products, orders, customer summaries, and sales analytics.',
    highlights: [
      { title: 'From catalog to order', description: 'Catalog, product detail, discount, cart, checkout, and order-history routes connect the core customer shopping journey.' },
      { title: 'A separate merchant workspace', description: 'Admin routes support product creation and editing, order management, sales dashboards, and top-customer summaries.' },
      { title: 'Commerce behind the interface', description: 'Django REST endpoints cover account access, categories, products, orders, cart items, and merchant analytics.' },
    ],
    screens: [
      { src: asset('/assets/projects/nourseen-store/storefront.webp'), alt: "Nourseen storefront with its original family campaign and collection navigation.", caption: "Storefront · local preview", kind: 'demo' },
      { src: asset('/assets/projects/nourseen-store/products.webp'), alt: "Nourseen product catalog with garment imagery and shopping filters.", caption: "Product catalog · sample collection", kind: 'demo' },
      { src: asset('/assets/projects/nourseen-store/merchant-workspace.webp'), alt: "Nourseen merchant dashboard with sample sales, order totals, and fulfillment analytics.", caption: "Merchant workspace · sample sales", kind: 'demo' },
    ],
  },
  'za-studio': {
    overview: "Za Studio is the shared software-and-design studio website for Ahmed Magdy and Zeyad Salama. Its identity carries through a CSS 3D project staircase, layered route transitions, per-project palettes, and four coordinated themes. A typed bilingual content system builds case studies from galleries, architecture diagrams, metrics, and editorial blocks; Arabic layouts, keyboard access, and reduced-motion behavior are part of the implementation.",
    highlights: [
      { title: 'A studio identity in motion', description: 'Perspective typography, project stairs, layered navigation, and theme-aware illustrations make the identity part of the browsing experience.' },
      { title: 'One content system, many stories', description: 'Typed English and Arabic content drives reusable galleries, diagrams, metrics, quotes, and product sections, with a palette for each case study.' },
      { title: 'Responsive and motion-aware', description: 'Responsive routes, keyboard controls, Arabic text direction, and reduced-motion fallbacks support the same work across devices and visitor preferences.' },
    ],
    screens: [
      { src: asset('/assets/projects/za-studio/studio-home.webp'), alt: "Za Studio home with perspective typography and its illustrated studio identity.", caption: "Studio home", kind: 'screen' },
      { src: asset('/assets/projects/za-studio/selected-work.webp'), alt: "Za Studio project staircase with bilingual navigation and project names.", caption: "Selected work", kind: 'screen' },
      { src: asset('/assets/projects/za-studio/studio-services.webp'), alt: "Za Studio services page with outlined typography, studio navigation, and an original animated line illustration.", caption: "Studio services · original site", kind: 'screen' },
      { src: asset('/assets/projects/za-studio/studio-case-study.webp'), alt: "Original Za Studio case-study module showing the Bee3a architecture with clients, API, business systems, and data services.", caption: "Case-study architecture · original site", kind: 'screen' },
    ],
  },
  'ai-call-center': {
    overview:
      'An experimental bilingual ordering assistant built with Django and OpenAI. A browser-based call interface accepts spoken or typed input, streams assistant and tool activity, and keeps a draft order beside the conversation before confirmation.',
    highlights: [
      { title: 'A conversation that can place an order', description: 'Menu lookup and order tools connect the assistant’s replies with stored menu items, quantities, notes, and draft or confirmed orders.' },
      { title: 'Voice and text in the same interface', description: 'Routes support typed exchanges, audio input, live speech, replayable replies, and ending a call in Arabic or English.' },
      { title: 'Visible progress and measured turns', description: 'Server-sent events expose reply and tool progress, while turn logs record elapsed time, invoked tools, and errors for review.' },
    ],
    screens: [
      { src: asset('/assets/projects/ai-call-center/za-studio/hero.webp'), alt: "AI call center: an Arabic call on desktop and an English call on the phone", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/ai-call-center/za-studio/feature.webp'), alt: "English call: order built line by line and confirmed as order 41", caption: "A confirmed order", kind: 'studio' },
      { src: asset('/assets/projects/ai-call-center/za-studio/app-01.webp'), alt: "Arabic and English calls on the phone", caption: "Arabic and English calls on the phone", kind: 'studio' },
    ],
  },
  'game-discovery': {
    overview:
      'A collaborative game-discovery project pairing a React and TypeScript interface with Django APIs. Players can explore games by genre and platform, search and sort the catalog, and access review records. The separate frontend and backend repositories are documented as one product.',
    highlights: [
      { title: 'Find the next game', description: 'Genre and platform filters, search, sorting, and changing page headings keep the discovery context clear.' },
      { title: 'A considered browsing experience', description: 'Loading skeletons and light and dark themes support the React interface built with Chakra UI.' },
      { title: 'Catalog and review APIs', description: 'Django models and endpoints cover games, genres, developers, platforms, and paginated reviews.' },
    ],
    screens: [
      { src: asset('/assets/projects/game-discovery/za-studio/hero.webp'), alt: "Game Hub in dark mode on desktop and phone", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/game-discovery/za-studio/feature.webp'), alt: "Action games with platforms and Metacritic scores", caption: "Filtered by genre", kind: 'studio' },
      { src: asset('/assets/projects/game-discovery/za-studio/app-01.webp'), alt: "Game Hub in light mode", caption: "Game Hub in light mode", kind: 'studio' },
      { src: asset('/assets/projects/game-discovery/za-studio/app-02.webp'), alt: "Game Hub on the phone", caption: "Game Hub on the phone", kind: 'studio' },
    ],
  },
  'realstate-management': {
    overview:
      'A property-community project with Django APIs for apartment records, tenant accounts, maintenance issues, posts, ratings, and reports. Celery and Redis support background work. The inspected Next.js client contains the landing page and account-page placeholders; the gallery presents Za Studio’s broader community interface previews.',
    highlights: [
      { title: 'Two sides of the community', description: 'Admin and tenant roles organize access to apartment, profile, and issue records in the Django backend.' },
      { title: 'From issue to follow-up', description: 'Maintenance records, staff assignments, ratings, and email notifications support the issue lifecycle.' },
      { title: 'A modular application', description: 'Separate apartment, profile, issue, post, rating, and reporting modules sit within a Docker-based development setup.' },
    ],
    screens: [
      { src: asset('/assets/projects/realstate-management/za-studio/hero.webp'), alt: "Alpha Apartments community feed on desktop and mobile", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/feature.webp'), alt: "Technicians rated by tenants, in dark mode", caption: "Technicians", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/app-01.webp'), alt: "Tenant directory with apartment, origin and reputation", caption: "Tenant directory with apartment, origin and reputation", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/app-02.webp'), alt: "A tenant profile with reported issues", caption: "A tenant profile with reported issues", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/app-03.webp'), alt: "Reporting an issue, in dark mode", caption: "Reporting an issue, in dark mode", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/app-05.webp'), alt: "A community post with votes and replies", caption: "A community post with votes and replies", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/app-06.webp'), alt: "Bookmarked posts", caption: "Bookmarked posts", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/app-07.webp'), alt: "Creating a post with tags", caption: "Creating a post with tags", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/app-08.webp'), alt: "Reporting a tenant and how reports affect reputation", caption: "Reporting a tenant and how reports affect reputation", kind: 'studio' },
      { src: asset('/assets/projects/realstate-management/za-studio/app-04.webp'), alt: "Community, technicians and profile on the phone", caption: "Community, technicians and profile on the phone", kind: 'studio' },
    ],
  },
  'jobbee': {
    overview:
      'A jobs-portal project with separate applicant and employer workflows. Next.js pages connect to Django APIs for listings, applications, candidate records, and accounts, while PostGIS stores job locations for map previews.',
    highlights: [
      { title: 'Search with location context', description: 'Searchable, filtered, paginated job listings connect to map-based previews backed by PostGIS points.' },
      { title: 'An application record', description: 'Candidates submit applications and résumés, review their applications, and check whether they have already applied.' },
      { title: 'Employer visibility', description: 'Employers manage listings and retrieve the candidate records associated with each posted role.' },
    ],
    screens: [
      { src: asset('/assets/projects/jobbee/za-studio/hero.webp'), alt: "Jobbee: job search on desktop and a job's location map on the phone", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/jobbee/za-studio/feature.webp'), alt: "A job's location in Zamalek on the map", caption: "Every job on the map", kind: 'studio' },
      { src: asset('/assets/projects/jobbee/za-studio/app-01.webp'), alt: "A job page with summary and employer details", caption: "A job page with summary and employer details", kind: 'studio' },
      { src: asset('/assets/projects/jobbee/za-studio/app-02.webp'), alt: "Search filtered to Bachelor's internships", caption: "Search filtered to Bachelor's internships", kind: 'studio' },
      { src: asset('/assets/projects/jobbee/za-studio/app-03.webp'), alt: "Candidates who applied to a position, with their CVs", caption: "Candidates who applied to a position, with their CVs", kind: 'studio' },
      { src: asset('/assets/projects/jobbee/za-studio/app-04.webp'), alt: "Salary stats for the topic \"developer\"", caption: "Salary stats for the topic \"developer\"", kind: 'studio' },
      { src: asset('/assets/projects/jobbee/za-studio/app-05.webp'), alt: "Posting a new job", caption: "Posting a new job", kind: 'studio' },
      { src: asset('/assets/projects/jobbee/za-studio/app-06.webp'), alt: "Jobs, a job page and its map on the phone", caption: "Jobs, a job page and its map on the phone", kind: 'studio' },
      { src: asset('/assets/projects/jobbee/za-studio/app-07.webp'), alt: "Employer jobs, candidates and applications on the phone", caption: "Employer jobs, candidates and applications on the phone", kind: 'studio' },
    ],
  },
  'ambassador360': {
    overview:
      'An ambassador-commerce application with React clients for administrators and ambassadors, plus a Next.js checkout. Django APIs connect product records, ambassador profiles, sales rankings, orders, and payment confirmation.',
    highlights: [
      { title: 'A connected sales journey', description: 'Ambassadors browse products, manage their profiles, review rankings, and follow their order history.' },
      { title: 'An administration workspace', description: 'Administrators manage products and ambassadors, inspect orders, and track revenue records.' },
      { title: 'Checkout and confirmation', description: 'Stripe integration connects purchases with order confirmation; MailHog supports development email testing.' },
    ],
    screens: [
      { src: asset('/assets/projects/ambassador360/za-studio/hero.webp'), alt: "Ambassador360 admin products on desktop and the ambassador app on the phone", caption: "Project overview", kind: 'studio' },
      { src: asset('/assets/projects/ambassador360/za-studio/feature.webp'), alt: "Checkout page for an ambassador's link", caption: "Checkout", kind: 'studio' },
      { src: asset('/assets/projects/ambassador360/za-studio/app-01.webp'), alt: "Admin: all orders", caption: "Admin: all orders", kind: 'studio' },
      { src: asset('/assets/projects/ambassador360/za-studio/app-02.webp'), alt: "Ambassador rankings by revenue", caption: "Ambassador rankings by revenue", kind: 'studio' },
      { src: asset('/assets/projects/ambassador360/za-studio/app-03.webp'), alt: "Ambassador app: products and earnings", caption: "Ambassador app: products and earnings", kind: 'studio' },
      { src: asset('/assets/projects/ambassador360/za-studio/app-04.webp'), alt: "Ambassador app, rankings and checkout on the phone", caption: "Ambassador app, rankings and checkout on the phone", kind: 'studio' },
    ],
  },
  'fei': {
    overview:
      'A graduation-project API for coordinating patient, doctor, laboratory, and pharmacy workflows. The backend organizes bookings, care plans, prescriptions, laboratory records, pharmacy products, and conversations.',
    highlights: [
      { title: 'Appointments and follow-up', description: 'Doctor and laboratory bookings support appointment details, rescheduling, and follow-up records.' },
      { title: 'Connected care records', description: 'Patient plans, tests, questions, and prescriptions link the participants involved in a care journey.' },
      { title: 'Messaging and pharmacy flows', description: 'Channels supports conversations, while product, cart, and ordering endpoints connect to pharmacy workflows.' },
    ],
    screens: [
      { src: asset('/assets/projects/fei/za-studio/hero.webp'), alt: "Fei app: home, doctor profile, treatment plan, pharmacy and appointments", caption: "Project overview · reconstructed app preview", kind: 'studio' },
      { src: asset('/assets/projects/fei/za-studio/feature.webp'), alt: "Fei home, doctor booking and treatment plan", caption: "The patient app · reconstructed app preview", kind: 'studio' },
      { src: asset('/assets/projects/fei/za-studio/app-01.webp'), alt: "Appointments, pharmacy and treatment plan", caption: "Appointments, pharmacy and treatment plan · reconstructed app preview", kind: 'studio' },
    ],
  },
  'xdisplay-bridge': {
    overview:
      'A macOS compatibility utility for a legacy wired iPad display client. Its documented revision coordinates virtual-display resolution, screen capture, and JPEG transport dimensions so mode changes remain synchronized. The work focuses on compatibility and predictable resolution changes for existing hardware.',
    highlights: [
      { title: 'Keep existing hardware useful', description: 'The compatibility layer targets an older iPad client that cannot move to a modern display protocol.' },
      { title: 'Synchronize the display pipeline', description: 'Resolution changes update the virtual display before capture restarts with matching pixel dimensions.' },
      { title: 'A focused utility', description: 'Normal and Highest modes serve the same wired-display workflow. The release notes document the compatibility behavior and limitations.' },
    ],
    screens: [
      { src: asset('/assets/projects/xdisplay-bridge/za-studio/hero.webp'), alt: "Illustration: a Mac display with an iPad mini 2 wired as an external screen", caption: "Project overview · illustration", kind: 'illustration' },
      { src: asset('/assets/projects/xdisplay-bridge/za-studio/feature.webp'), alt: "Illustration: Mac display and iPad mini 2 showing the project READMEs", caption: "The setup · illustration", kind: 'illustration' },
    ],
  },
  'assignment-reports-auditor': {
    overview:
      'A Python reporting tool for teachers and administrators who need to find assignments awaiting assessment. Desktop and browser interfaces share the reporting workflow: read Excel or CSV exports, distinguish an assessed zero from an unassessed mark, and consolidate outstanding assignments for each learner. The gallery shows the implemented browser interface with fictional assessment records.',
    highlights: [
      { title: 'Find the work awaiting assessment', description: 'The processor distinguishes completed grades, including zero, from empty or unassessed grade fields, with support for Arabic and English digits.' },
      { title: 'Combine messy source reports', description: 'Multiple files and multi-sheet workbooks feed one searchable report, with file-signature detection for mislabeled spreadsheet extensions.' },
      { title: 'Take the result back to the team', description: 'Search, grade and classroom filters, sortable columns, Excel and CSV export, and clipboard copying make the report practical to review and share.' },
    ],
    screens: [
      { src: asset('/assets/projects/assignment-reports-auditor/assessment-report.webp'), alt: "Assignment auditor browser interface showing a populated Arabic assessment report.", caption: "Browser report · sample assessments", kind: 'demo' },
      { src: asset('/assets/projects/assignment-reports-auditor/classroom-review.webp'), alt: "Filtered assessment report showing outstanding work for one fictional classroom.", caption: "Classroom review · sample assessments", kind: 'demo' },
    ],
  },
};
