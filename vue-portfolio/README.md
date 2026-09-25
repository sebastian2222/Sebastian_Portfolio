# Sebastian Parakal Jose — Portfolio

Personal portfolio and project case studies for **Sebastian Parakal Jose**, a software engineer in Melbourne working across backend, cloud and mobile.

Built with Vue 3 and Vite. No UI framework, no runtime dependencies beyond `vue` and `vue-router`, and self-hosted fonts.

## Highlights

- **Data-driven content.** Every section renders from plain JS modules in [`src/data`](src/data), so you update content without touching components.
- **Recruiter-focused case studies** at `/projects/:slug`. Each one covers the problem, what was built, personal contribution, architecture lanes, key decisions, results and an embedded demo video.
- **Accessible by default.** Semantic landmarks, a skip link, visible focus, `aria-pressed` filters, a keyboard-dismissable menu and `prefers-reduced-motion` support.
- **"Engineer's Notebook" design.** Cream paper, navy ink, hard offset shadows, sticker badges, polaroids and handwritten notes. The design was made in Google Stitch; its spec lives in `../materials/design/` (git-ignored). Fonts are Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono and Caveat, all self-hosted. Colour tokens live in `src/styles/tokens.css`, and text colours meet WCAG AA.
- **Quality gates.** ESLint, Prettier, Vitest (content-integrity, unit and component tests), npm audit, plus GitHub Actions CI with GitHub Pages deploy.

## Getting started

Requires Node 20.19+ (see [`.nvmrc`](.nvmrc)).

```bash
npm ci
npm run dev        # http://localhost:5173
```

| Script                 | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Vite dev server with HMR                  |
| `npm run build`        | Production build to `dist/` (+ `404.html`) |
| `npm run preview`      | Serve the production build                |
| `npm test`             | Run the Vitest suite once                 |
| `npm run lint`         | ESLint (flat config, Vue recommended)     |
| `npm run format`       | Prettier write                            |
| `npm run format:check` | Prettier check (used in CI)               |

## Project structure

```
vue-portfolio/
├── public/                 # Served as-is: favicon, OG image, resume PDF, demo video
├── src/
│   ├── assets/images/      # Portrait + gallery (WebP, bundled and hashed)
│   ├── components/
│   │   ├── sections/       # Home page sections (Hero, Journey, Experience, Projects, …)
│   │   └── *.vue           # Shared UI: header, footer, cards, icons, flow diagram
│   ├── data/               # ← All site content lives here
│   ├── directives/         # v-reveal scroll animation
│   ├── router/             # Routes, scroll behaviour, document titles
│   ├── styles/             # Design tokens + base styles
│   ├── utils/              # Formatting and base-aware asset URLs
│   └── views/              # Home, ProjectView (case study), NotFound
└── vite.config.js          # Aliases, BASE_PATH, SPA 404 fallback, Vitest config
```

Raw authoring material (coursework archives, work repositories, original photos) lives in `../materials/`. It is git-ignored because it contains third-party code and credentials.

## Editing content

| To change…                 | Edit                                  |
| -------------------------- | ------------------------------------- |
| Headline, intro, stats     | `src/data/profile.js`                 |
| Jobs                       | `src/data/experience.js`              |
| Projects and case studies  | `src/data/projects.js` (schema at top) |
| Skills / education         | `src/data/skills.js`, `education.js`  |
| Gallery photos             | `src/data/gallery.js` + `src/assets/images/gallery/` |
| Resume                     | replace `public/files/Sebastian_Parakal_Jose_Resume.pdf` |

`npm test` validates the content: slugs, required fields, links, and that referenced media exists.

## Deployment

The site deploys on **Vercel** through its Git integration: pushes to `master` go to production, and every pull request gets its own preview URL. [`vercel.json`](vercel.json) sets the build, the SPA rewrites (so deep links like `/projects/hush` work), long-lived caching for hashed assets and security headers.

One-time Vercel setup:

1. **Add New → Project** → import `sebastian2222/Sebastian_Portfolio`.
2. Set **Root Directory** to `vue-portfolio`. Everything else is read from `vercel.json`.
3. Deploy. Optionally add a custom domain under **Settings → Domains**.

GitHub Actions ([`ci.yml`](../.github/workflows/ci.yml)) still runs the quality gates (format, lint, tests, audit, build) on every push and PR.

`BASE_PATH` (default `/`) and the generated `404.html` exist so the same build can also be hosted on a sub-path, such as GitHub Pages.

## License

Code is MIT-style reusable. Personal content (text, photos, resume) © Sebastian Parakal Jose.
