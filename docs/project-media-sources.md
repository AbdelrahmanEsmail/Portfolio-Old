# Project media sources

Updated November 4, 2026. The portfolio uses real project captures and official publisher screenshots. No generated interface imagery is used in the updated galleries. Exact source paths and image URLs are recorded in [project-media-sources.json](project-media-sources.json).

| Project | Business description source | Gallery source |
| --- | --- | --- |
| Barcode Jackets | `../adex/jackets/README.md` and storefront/studio components | Existing project QA captures in `../jakets-project/jaketets/tools/debug/qa/` |
| Sukoon | Landing dictionaries and implemented Flutter features | Actual Flutter and iOS QA captures in `../sukoon/sokoun/docs/`; public website captured from [sukoon.rent/en](https://sukoon.rent/en) |
| Bee3a | Landing translations, application routes, and fixture definitions in `../bee3a/` | Existing demo-shop product previews in `../za-studio/public/media/bee3a/`, matched to source components and seeded data |
| Sahifati | [Official website](https://sahifati.org/) and publisher description | [Official App Store listing](https://apps.apple.com/us/app/id6758934985) |
| SaaS ERP / UnifiedCore | Landing translations and routes in `../adex-erp-react/` | Existing demo-tenant product previews in `../za-studio/public/media/saas-erp/`, matched to frontend components and backend demo fixtures |
| Aljadriya / Masar Academy | Landing components in `../aljadriya-platform/frontend/` | Shipped product screenshots in `frontend/public/landing/` |
| Ghaith Adex / Al Junaidi Water | Publisher descriptions and delivery backend | Official [customer](https://apps.apple.com/us/app/id6795517365) and [driver](https://apps.apple.com/us/app/id6796311081) App Store listings |
| China ERP | Documentation and domain code in `../adex/china-system-django/` | Awaiting the matching frontend or verified screenshots |

The Barcode captures come from an earlier project checkout, rather than a fresh production session. Its public site currently has a coming-soon gate.

Sukoon's gallery shows implemented app features with QA data. The owner dashboard is a test account; rental comparisons use sample listings. The 360° viewer uses a demonstration panorama and the 3D viewer a representative model, as documented by the project's verification reports. They are not customer property scans. Design-proposal exports and promotional interface recreations were excluded. The public website image is labeled separately from app captures.

Aljadriya's source currently presents the product as Masar Academy. Its existing marketing screenshots show sample learning content. Ghaith Adex is shown with the Al Junaidi Water brand used by its published customer and driver apps.

Bee3a's existing previews show the seeded Al Negma salon and its sample products, staff, and bookings. ERP previews show the documented Nile Valley Trading demo tenant. Their controls, copy, styles, and fixture records correspond to the actual source. These are existing screenshot compositions; the original capture script was not found, so they are not presented as newly captured or current production sessions. The ERP customer-contact table was omitted.

App Store screenshots are resized and compressed to WebP. The Sahifati and Al Junaidi covers arrange three original screenshots on a neutral background; their individual screenshots remain available in each gallery. The UI itself is not repainted, recolored, or reconstructed.

China ERP's latest shared-company-data decision supersedes its old per-user isolation design. Its description now follows that decision. The former `china-systems.com` link has no verified connection to this local project and was removed, together with its concept image. Screenshots should be added only after the correct application is identified.

No production customer, employee, payment, or private account data was used for capture. Original repositories were inspected read-only; temporary previews use isolated copies without environment files.
