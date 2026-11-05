# Local project inventory

Reviewed on 5 November 2026. The inventory covers all **33 top-level directories** in `~/code`, plus the distinct products inside the `adex` collection. Multiple checkouts, web/mobile clients, and backend variants are grouped by product.

The portfolio now contains **20 distinct entries**: 17 products, two tools, and one experiment. These labels describe the work's scope; they do not assert that every product has a public release. The portfolio itself is the current viewing surface and is not repeated as a case study.

No environment files, credentials, databases, customer records, or stored conversations were inspected. Sources were READMEs, package manifests, route definitions, and model definitions. Newly added entries have no invented live links or product imagery. Verified local captures accompany the entries where an interface is available; backend references and remaining text case studies are labeled by scope.

## Coverage of every top-level directory

| Directory under `~/code` | Portfolio entry or disposition |
| --- | --- |
| `Ai-call-center` | AI Call Center; grouped with its `adex` checkout. |
| `DRF-GameDiscovery-App` | Game Discovery backend; grouped with the React product. |
| `DRF-React-RealStateManagement` | RealState Management; admin/tenant app and API grouped. |
| `DRF_NEXT_Jobs-portal` | Jobbee; Next.js frontend and Django/PostGIS backend grouped. |
| `DRF_React_NextJS-Ambassador360` | Ambassador360; ambassador, admin, checkout, and API clients grouped. |
| `FeiAPI` | FEI graduation-project healthcare coordination API. |
| `React-VideoGame-DiscoveryApp` | Game Discovery frontend and backend checkout; grouped. |
| `china-system-react` | China ERP frontend, grouped with its existing trade-management backend. |
| `xdisplay-tahoe-bridge` | XDisplay Compatibility Bridge; packaged display utility and release notes. |
| `Nourseen` | Nourseen Store; frontend and backend grouped. |
| `Portfolio-Website` | This portfolio; current viewing surface, not repeated as another case study. |
| `React-Ecommerce` | Excluded from the portfolio at the user’s request. |
| `SAHIFATI_API` | Sahifati; NestJS/TypeScript/MongoDB backend variant, grouped with the existing product. |
| `adex` | Collection containing Mathaq, AI Call Center, and additional checkouts of Aljadriya, China ERP, Ghaith Adex, FIVA Health, and Barcode Jackets. Virtual environments are excluded. |
| `adex-erp` | Multi-Tenant SaaS ERP backend. |
| `adex-erp-react` | Multi-Tenant SaaS ERP frontend; grouped with its backend. |
| `aljadriya-platform` | Aljadriya/Masar Academy; duplicate `adex/aljadriya-platform` checkout grouped. |
| `bee3a` | Bee3a. |
| `fiva_health_django` | Yotell health product (formerly displayed as FIVA Health); duplicate `adex/fiva_health_django` checkout grouped. |
| `ghaith_adex_django` | Ghaith Adex; duplicate `adex/ghaith_adex_django` checkout grouped. |
| `jaketets-mohammad-edits` | Barcode Jackets designer variant; grouped with the same product. |
| `jakets-project` | Barcode Jackets; grouped with the designer variant and `adex/jackets`. |
| `key-academy-django` | Key Academy backend. |
| `key-academy-front` | Key Academy React web app; grouped with backend and mobile app. |
| `key_academy_app` | Key Academy Flutter app; its local `glass_nav` package remains part of that app. |
| `node_modules` | Dependency installation; not a project. |
| `react-revision` | Excluded from the portfolio at the user’s request. |
| `reports_el7ag` | Assignment Reports Auditor desktop and browser reporting tool. |
| `yotell_app` | Social/community app excluded at the user’s request; distinct from the Yotell health product. |
| `sahifati-backups` | Backup collection; excluded from distinct-project counts. |
| `sahifati-django` | Sahifati Django backend/template variant; grouped with the existing product. |
| `sukoon` | Sukoon API, Flutter app, and marketing-site directories grouped. |
| `za-studio` | Za Studio bilingual portfolio. |

## Evidence for the added entries

| Entry | Evidence files under `~/code` | Supported scope |
| --- | --- | --- |
| Key Academy | `key-academy-front/README.md`, `key-academy-front/package.json`, `key-academy-django/requirements.txt`, `key_academy_app/pubspec.yaml` | React website, Django courses/enrollment/progress APIs, Channels/Redis live chat, Flutter companion and lesson media. The mobile README is a default Flutter README; its manifest supplies the mobile-stack evidence. |
| Yotell (health) | `fiva_health_django/README.md`, `requirements.txt`, `apps/health_profile/urls.py`, `apps/nutrition/urls.py`, `apps/water/urls.py`, `apps/medications/urls.py`, `apps/gamification/urls.py`, `apps/challenges/urls.py` | Health records, nutrition summaries, water goals, medication and dose actions, challenges, achievements, and levels. No clinical effectiveness or treatment claims are made. |
| Mathaq | `adex/adex_mathaq_django/requirements.txt`, `apps/delivery/urls.py`, `apps/delivery/models.py`, `apps/subscriptions/urls.py`, `apps/subscriptions/models.py` | Food menus and options, cart and checkout summaries, delivery quotes, ordering, meal subscriptions, daily redemption limits, renewals. No public deployment verified. |
| Nourseen Store | `Nourseen/NourseenStore/package.json`, `src/App.jsx`; `Nourseen/Nourseen-Store-Backend/requirements.txt`, `api/urls.py`, model filenames | Customer catalog, product details, discounts, cart, checkout, order history, admin products/orders/customer analytics. The README is a Vite starter, so feature statements use routes and models. |
| Za Studio | `za-studio/README.md`, `za-studio/package.json` | React/TypeScript/Vite portfolio with CSS 3D project staircase, reusable case studies, four brand themes, English/Arabic content, and reduced-motion behavior. No public deployment verified. |
| Assignment Reports Auditor | `reports_el7ag/README.md`, `reports_el7ag/requirements.txt` | Python/CustomTkinter desktop app, pandas/openpyxl processing, unassessed-mark detection, multi-file/multi-sheet import, search/filter, Excel/CSV/clipboard outputs. |
| AI Call Center | `adex/Ai-call-center/requirements.txt`, `callcenter/urls.py`, `callcenter/models.py`, `callcenter/views.py` | Django/OpenAI voice and text ordering prototype, Arabic/English calls, menu/order models, streamed tool/reply events, speech/replay routes, turn measurements. Labeled an experiment; no real telephony deployment is claimed. |
| React Commerce Lab | `React-Ecommerce/ecommerce-front/package.json`, `src/main.tsx`, `React-Ecommerce/ecommerce-backend/package.json` | Minimal React entry point, TypeScript/Vite setup, Redux/routing dependencies, separate json-server package. No functioning storefront is claimed. |
| React Revision | `react-revision/package.json`, `react-revision/src/components/App/App.js` | Reusable cards, props, local state, and deletion-driven list updates. Labeled a practice experiment. No sample personal fields from the source are reproduced. |
| Game Discovery | `DRF-GameDiscovery-App/README.md`, `games/urls.py`; `React-VideoGame-DiscoveryApp/README.md`, `game-hub/package.json` | Game filters, search, sorting, themes, React/TypeScript/Chakra UI, and Django catalog/review APIs. The README credits a collaboration; no sole-authorship or current deployment claim is added. |
| RealState Management | `DRF-React-RealStateManagement/README.md`, `client/package.json`, `core_apps/apartments/urls.py` | Admin/tenant apartment and community workflows, maintenance issues, posts, reports, background tasks, and Next.js/Django integration. |
| Jobbee | `DRF_NEXT_Jobs-portal/README.md`, `core_apps/job/urls.py`, `models.py`, `client/package.json` | Listings, applications, résumé uploads, candidates, and PostGIS job-location records. |
| Ambassador360 | `DRF_React_NextJS-Ambassador360/README.md` and its three web-client manifests | Ambassador/admin workspaces, Next.js checkout, rankings, orders, and Stripe integration. |
| FEI | `FeiAPI/README.md`, `requirements.txt`, doctor/laboratory/pharmacy URLs and model declarations | Graduation-project coordination APIs: bookings, plans, prescriptions, messaging, and pharmacy workflows. No diagnostic accuracy or clinical effectiveness is claimed. |
| XDisplay Compatibility Bridge | `xdisplay-tahoe-bridge/README.md`, `XDisplay-Tahoe-Synced-r18-README.md` | Packaged utility with documented virtual-display/capture mode synchronization and legacy iPad-client support. No unverified source language or measured performance is claimed. |

## Existing-product variants

`SAHIFATI_API/README.md` identifies a NestJS/TypeScript/MongoDB Quran backend, while `sahifati-django/README.md` describes a Django API base/template. Both are retained under the existing Sahifati product rather than inflated into separate product counts. This inventory does not determine which backend currently serves the public app.

The new entries deliberately omit public URLs: their inspected evidence did not establish a current public product destination. Existing verified links remain. A November 5 capture pass added 20 images across 15 projects, including three explicitly labeled API references; see [media provenance](project-media-sources.md) for datasets and limitations.

The final scan also identified the China System React/TypeScript frontend. It is grouped with China ERP. Its README describes local mock authentication/data when no backend URL is configured, so it is not presented as a verified public deployment.

The machine-readable directory map is in [project-inventory.json](project-inventory.json). Run `npm run check:portfolio -- --workspace` to compare it with the current `~/code` directory names.

Yotell evidence: `../yotell_app/pubspec.yaml`, `lib/app/router/routes.dart`, `lib/data/providers/group_api.dart`, `lib/data/providers/chat_api.dart`, `lib/presentation/controllers/app/chat/message_thread/messages_thread_socket_manager.dart`, and `lib/app/localization/localization_service.dart`. Its boilerplate README does not reflect the implemented client. No public release status is asserted.

## Za Studio cross-check

The 27 project entries in `../za-studio/src/content/portfolio.json` were compared with local application directories. Seventeen map to existing portfolio entries; ten lack a matching app under `~/code` and are excluded under the local-source requirement. No extra distinct local product was missing. Za Studio itself is included and featured on the homepage. The complete alias mapping, exclusions, source evidence, and description revisions are in [za-studio-project-audit.json](za-studio-project-audit.json).

Mathaq, React Commerce Lab, and React Revision were removed from the displayed collection at the user’s request. Their source folders remain accounted for as exclusions. Assignment Reports Auditor is the last project in the collection and dialog navigation.

The social Yotell app was removed at the user’s request. FIVA Health is now displayed as **Yotell**; its `fiva-health` identifier and existing health-app media remain stable.
