# Project media sources

Updated November 5, 2026. The current portfolio uses **112 images from the local Za Studio repository across 17 projects**. Existing images remain for Nourseen Store, Za Studio itself, and Assignment Reports Auditor, as explicitly requested after confirming these projects have no matching Za Studio media set.

## Current Za Studio media

All unique hero, feature, and gallery images referenced in `../za-studio/src/content/portfolio.json` were matched by project. The originals live in `../za-studio/public/media/`. Reused files are converted to WebP at their original dimensions under `public/assets/projects/<portfolio-slug>/za-studio/`. They are not cropped, repainted, or presented as fresh production captures.

| Portfolio project | Za Studio media folder | Images |
| --- | --- | --- |
| `bee3a` | `bee3a` | 6 |
| `saas-erp` | `saas-erp` | 13 |
| `fiva-health` | `yotell-health` | 6 |
| `ghaith-adex` | `ghaith-adex` | 5 |
| `china-erp` | `china-erp` | 12 |
| `sahifatty` | `sahifatty` | 6 |
| `aljadriya` | `aljadriya` | 7 |
| `key-academy` | `key-academy` | 5 |
| `sukoon` | `sukoon` | 9 |
| `barcode-jackets` | `barcode-jackets` | 6 |
| `ai-call-center` | `ai-call-center` | 3 |
| `jobbee` | `jobbee` | 9 |
| `realstate-management` | `alpha-apartments` | 10 |
| `ambassador360` | `ambassador360` | 6 |
| `fei` | `fei-health` | 3 |
| `game-discovery` | `game-hub` | 4 |
| `xdisplay-bridge` | `xdisplay-tahoe-bridge` | 2 |

The Yotell Health media maps to the health backend stored under `fiva_health_django`, now displayed as Yotell. The separate social app was removed at the user’s request. Alpha Apartments maps to RealState Management; Fei maps to FEI; Game Hub maps to Game Discovery. Removed projects stay excluded.

Za Studio previews use the `studio` gallery kind and a visible “Za Studio preview” label. FEI previews are captioned as reconstructed app previews, following the original studio description. XDisplay images are labeled project illustrations. These source assets do not change the case studies’ verified implementation scope.

## Retained images

| Project | Retained source |
| --- | --- |
| Nourseen Store | Original React storefront and merchant interfaces, captured locally with fictional products and orders |
| Za Studio | Original site home, project staircase, services, and complete case-study architecture module; bundled source fonts verified |
| Assignment Reports Auditor | Implemented browser report and classroom filter using synthetic assessment exports |

All 20 projects have at least two gallery images. Assignment Reports Auditor remains last. The homepage contains five selected projects, and `/projects/` contains the full collection.

Cards and gallery viewers set `objectFit: scale-down` directly on the image component. The complete source image remains visible without hover zoom, and gallery controls and captions sit outside it.

Exact paths, original SHA-256 hashes for the imported images, dimensions, source notes, and retained capture details are in [project-media-sources.json](project-media-sources.json). Superseded media records remain under `archivedAssets` for provenance; they are not displayed in current galleries.

The studio-to-local-project mapping is recorded in [za-studio-project-audit.json](za-studio-project-audit.json). No source repository files were modified.
