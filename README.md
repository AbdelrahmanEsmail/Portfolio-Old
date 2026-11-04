# Zeyad Salama — Portfolio

Personal portfolio of Zeyad Salama, a backend software engineer building secure, transaction-heavy products with Python, Django, and PostgreSQL. Built with React, Next.js, TypeScript, and Vinext.

Live site: [demo-23home.github.io/Portfolio-Website](https://demo-23home.github.io/Portfolio-Website/)

## Design

A dark-first "systems diorama" theme sampled from the project cover renders: charcoal surfaces, ivory panels, brass hairlines, and lime and periwinkle signal lines. A light "ivory paper" theme is also available.

- **Hero** — a "Backend depth. Frontend polish." headline: the word *depth* is stacked in layers and *polish* has a moving shine. Next to it, an animated system diagram connects the portrait to API, database, real-time, and job-queue nodes, with packets moving between them and a live `system.log`.
- **⌘K command palette** — jump to any section or project, copy the email address, open the résumé, or switch the theme (also opened with `/`).
- **Selected work** — all eight projects as sticky, stacking case cards with category filters, stats, and live/app-store links.
- **About** — includes a `zeyad.py` code card. **Experience** — a git-log timeline whose spine fills as you scroll, with `HEAD → main` on the current role.
- **Toolkit** — a grid of cards with small animated diagrams: a database schema with row locking, a stack of interface layers, and a CI pipeline.
- **Contact** — an inverted panel with copy-to-clipboard email and the current local time in Mansoura.
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
