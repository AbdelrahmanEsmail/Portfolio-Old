# Zeyad Salama — Portfolio

Personal portfolio of Zeyad Salama, a software engineer building full-stack web products with React, Next.js, TypeScript, Python, Django, and PostgreSQL. Built with React, Next.js, TypeScript, and Vinext.

Live site: [demo-23home.github.io/Portfolio-Website](https://demo-23home.github.io/Portfolio-Website/)

## Design

A dark-first theme with charcoal surfaces, ivory panels, brass hairlines, and lime and periwinkle signals surrounding original product screenshots. Faint map contours, chapter waypoints, and dossier details add a restrained field-journal identity. A light "ivory paper" theme is also available.

- **Hero** — a "Systems depth. Product polish." headline: the word *depth* is stacked in layers and *polish* has a moving shine. Next to it, an animated system diagram connects the portrait to frontend, API, database, and deployment nodes, with packets moving between them and a live `system.log`.
- **⌘K command palette** — jump to any section or project, copy the email address, open the résumé, or switch the theme (also opened with `/`).
- **Work** — five selected projects in the scrollable homepage showcase, followed by “View all”. The `/projects/` page contains the complete searchable collection. Every project opens the same case-study dialog with multiple images; counts come from the data.
- **About** — includes a `zeyad.py` code card. **Experience** — a git-log timeline whose spine fills as you scroll, with `HEAD → main` on the current role.
- **Toolkit** — a grid of cards with small animated diagrams: a database schema with row locking, a stack of interface layers, and a CI pipeline.
- **Contact** — an inverted panel with copy-to-clipboard email and the current local time in Egypt.
- **Field guide** — chapter links with diamond waypoints and a quiet count of sections explored during the visit. It never gates content or requires interaction.
- Theme switching uses a circular View Transition from the toggle. All motion is paused under `prefers-reduced-motion`.

## Structure

```
app/
  content.ts            # all copy, links, projects, experience, skills
  globals.css           # design tokens + shared primitives (buttons, panels, chips, reveal, spotlight)
  layout.tsx            # fonts, metadata, theme boot script
  page.tsx              # section composition
  components/
    site/               # header, command palette, footer
    hero/               # hero, system diagram, live log, marquee
    about/  experience/  work/  toolkit/  contact/
    ui/                 # icons, theme store, toast, shared events
    effects/            # reveal-on-scroll + cursor spotlight
```

To update content, edit `app/content.ts`. Sections read from it, so copy and links aren't repeated in the components.

Each project opens an animated case-study dialog with Story, Gallery, and Architecture views. Edit its overview and engineering highlights in `app/project-details.ts`. To add screenshots, append entries using its imported `asset` helper to the project's `screens` array:

```ts
{ src: asset('/assets/screens/bee3a-pos.webp'), alt: 'Bee3a point-of-sale interface', caption: 'Point of sale' }
```

The gallery uses the project's explicit `screens` list; the cover is not duplicated automatically. Images retain their original proportions and use padded, scale-down frames without hover zoom. Scrolling down or swiping up over the story's image preview opens the Gallery tab; the story text keeps its normal scrolling. Use `kind: 'demo'` for fixture captures, `kind: 'reference'` for source-derived API documentation, `kind: 'source'` for source/documentation references, `kind: 'studio'` for imported Za Studio previews, `kind: 'illustration'` for project illustrations, or `kind: 'app-store'` for official store screenshots. Thumbnails, previous/next controls, and arrow keys browse the expanded gallery. Live and app-store links come from `app/content.ts`.

Every project in the collection has at least two distinct gallery images. Edit `homeProjectSlugs` to choose the five homepage projects; the complete project array always appears on `/projects/`. Seventeen project galleries use the matching media from `../za-studio/public/media/`; three retain their existing local captures at the user’s request. Studio previews, reconstructed app previews, and XDisplay illustrations are labeled by scope.

Authentic media lives in `public/assets/projects/<slug>/`. See [project media sources](docs/project-media-sources.md) for source repositories, public listings, and capture notes. Add new screenshots and their provenance together. If a project has no verified screenshot or live URL, omit those fields; the case study still shows its story without a fabricated interface.

See [the local project inventory](docs/project-inventory.md) for coverage of `~/code`, grouped frontend/backend/mobile repositories, and evidence for the additional entries. Use `kind: 'Tool'` or `kind: 'Experiment'` where appropriate; the remaining entries default to products.

Run `npm run check:portfolio` to validate project and case-study coverage, unique slugs, counts, links, gallery descriptions, and media paths. Run `npx tsc --noEmit --incremental false` for the full type check.

The social preview is rendered from the editable template in `scripts/generate-og.mjs`. After changing its copy, run `node scripts/generate-og.mjs` to regenerate `public/og.svg` and `public/og.png`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

GitHub Pages uses the separate static-export build:

```bash
npm run build:pages
```

## Main stack

- React 19, Next.js 16, TypeScript
- Vinext and Vite, OpenAI Sites deployment plugin
- CSS Modules + design tokens (no UI or animation libraries)
- Fonts: Bricolage Grotesque, Instrument Serif, Geist, JetBrains Mono, Reem Kufi

Every project has a diagram in `app/project-architecture.ts`; see [architecture sources](docs/project-architecture-sources.md). Fifteen diagrams reuse Za Studio data and five are grounded in local source. The renderer uses responsive HTML nodes and SVG connections with ambient flow animation, a readable connection list, and reduced-motion support. The portfolio checker validates complete coverage, unique nodes, and valid edge endpoints.
