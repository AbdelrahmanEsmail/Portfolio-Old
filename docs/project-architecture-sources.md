# Project architecture sources

All 20 portfolio projects have a high-level architecture diagram. Fifteen reuse Za Studio’s structured diagram data; five were created from inspected local application code and documentation.

Diagrams live in `app/project-architecture.ts`. The native React/SVG renderer is adapted from Za Studio’s `src/components/modules.tsx` and uses the portfolio’s existing theme. Each diagram appears below the story’s build notes and in a dedicated Architecture view.

| Project identifier | Origin | Evidence |
| --- | --- | --- |
| `bee3a` | Za Studio | `../za-studio/src/content/portfolio.json#bee3a` |
| `saas-erp` | Za Studio | `../za-studio/src/content/portfolio.json#saas-erp` |
| `ghaith-adex` | Za Studio | `../za-studio/src/content/portfolio.json#ghaith-adex` |
| `china-erp` | Za Studio | `../za-studio/src/content/portfolio.json#china-erp`<br>`../adex/china-system-django/docs/adr/0004-shared-company-wide-data.md` |
| `sahifatty` | Za Studio | `../za-studio/src/content/portfolio.json#sahifatty` |
| `aljadriya` | Za Studio | `../za-studio/src/content/portfolio.json#aljadriya` |
| `sukoon` | Za Studio | `../za-studio/src/content/portfolio.json#sukoon` |
| `barcode-jackets` | Za Studio | `../za-studio/src/content/portfolio.json#barcode-jackets` |
| `ai-call-center` | Za Studio | `../za-studio/src/content/portfolio.json#ai-call-center` |
| `jobbee` | Za Studio | `../za-studio/src/content/portfolio.json#jobbee` |
| `realstate-management` | Za Studio | `../za-studio/src/content/portfolio.json#alpha-apartments` |
| `ambassador360` | Za Studio | `../za-studio/src/content/portfolio.json#ambassador360` |
| `fei` | Za Studio | `../za-studio/src/content/portfolio.json#fei-health` |
| `game-discovery` | Za Studio | `../za-studio/src/content/portfolio.json#game-hub` |
| `xdisplay-bridge` | Za Studio | `../za-studio/src/content/portfolio.json#xdisplay-tahoe-bridge` |
| `key-academy` | Created from local source | `../key-academy-django/project/urls.py`<br>`../key-academy-django/project/settings.py`<br>`../key-academy-django/chat/routing.py`<br>`../key-academy-django/chat/consumers.py`<br>`../key-academy-django/requirements.txt`<br>`../key-academy-front/package.json`<br>`../key_academy_app/pubspec.yaml` |
| `fiva-health` | Created from local source | `../fiva_health_django/docs/architecture.md`<br>`../fiva_health_django/project/urls.py`<br>`../fiva_health_django/project/celery.py`<br>`../fiva_health_django/project/asgi.py`<br>`../fiva_health_django/apps/medications/urls.py`<br>`../fiva_health_django/apps/reminders/urls.py`<br>`../fiva_health_django/requirements.txt` |
| `nourseen-store` | Created from local source | `../Nourseen/NourseenStore/src/api/client.js`<br>`../Nourseen/NourseenStore/package.json`<br>`../Nourseen/Nourseen-Store-Backend/api/urls.py`<br>`../Nourseen/Nourseen-Store-Backend/api/services/order_service.py`<br>`../Nourseen/Nourseen-Store-Backend/api/models/product.py`<br>`../Nourseen/Nourseen-Store-Backend/nourseen_backend/settings.py` |
| `za-studio` | Created from local source | `../za-studio/src/App.tsx`<br>`../za-studio/src/content/types.ts`<br>`../za-studio/src/content/index.ts`<br>`../za-studio/src/state/AppState.tsx`<br>`../za-studio/src/lib/scroll.tsx`<br>`../za-studio/package.json` |
| `assignment-reports-auditor` | Created from local source | `../reports_el7ag/app.py`<br>`../reports_el7ag/app_tk.py`<br>`../reports_el7ag/web_app.py`<br>`../reports_el7ag/processor.py`<br>`../reports_el7ag/README.md` |

## Verified adaptations

- China ERP: the database node says shared company-wide records, following ADR-0004. The older studio note about isolated company data was superseded.
- AI Call Center: OpenAI is classified as an external integration, rather than a queue. Its call/agent/tool topology remains the original Za Studio diagram.
- Nourseen Store: the diagram shows the actual local SQLite default behind the Django ORM, and catalog image URLs. PostgreSQL deployment or active Cloudinary uploads were not inferred from installed dependencies.
- Yotell: the map represents the health backend stored in `fiva_health_django`, not the removed social app. Its services, Redis, Celery/Beat, Channels, and Firebase notification paths follow the local routes, runtime setup, and requirements.
- Key Academy: the React/Flutter clients, course/enrollment/exam endpoints, Channels consumers, Redis layer, PostgreSQL, and S3-compatible media configuration are grounded in their named source files.
- Za Studio: the diagram shows a content/build/client-routing system, without inventing a backend or database.
- Assignment Reports Auditor: both the Flask browser interface and Tkinter desktop interface feed the same pandas processor. The map shows local files, review, exports, and clipboard output, without an invented server queue or persistent database.

## Rendering and accessibility

Cards and connections are code-native, not screenshots. Layout measurements route arrows between real node bounds and update after resize and font loading. Narrow layouts stack lanes; longer mobile connections use outside routes. A text list exposes every connection through the keyboard-accessible “View connections” control. Direct paths and asynchronous/queued paths have separate line styles.

Flow dots and dashed-line motion are ambient. Animation pauses when the diagram is outside the viewport or the document is hidden, and is disabled for reduced-motion preferences. No interaction is needed to read the diagram.
