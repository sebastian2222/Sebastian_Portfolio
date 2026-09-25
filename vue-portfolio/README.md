# Sebastian Parakal Jose — Portfolio

Personal portfolio and project case studies for **Sebastian Parakal Jose**, a software engineer in Melbourne working across backend, cloud and mobile.

Built with Vue 3 and Vite. No UI framework, no runtime dependencies beyond `vue` and `vue-router`, and self-hosted fonts.

## Highlights

- **Data-driven content.** Every section renders from plain JS modules in [`src/data`](src/data), so you update content without touching components.
- **Recruiter-focused case studies** at `/projects/:slug`. Each one covers the problem, what was built, personal contribution, architecture lanes, key decisions, results and an embedded demo video.
- **Accessible by default.** Semantic landmarks, a skip link, visible focus, `aria-pressed` filters, a keyboard-dismissable menu and `prefers-reduced-motion` support.
- **Dark and light themes.** Follows the OS setting, can be toggled and persisted, and is applied before first paint.
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
│   │   ├── sections/       # Home page sections (Hero, Experience, Projects, …)
│   │   └── *.vue           # Shared UI: header, footer, cards, icons, flow diagram
│   ├── composables/        # useTheme
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

Pushing to `master` runs [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). It verifies the build and then deploys to **GitHub Pages**.

One-time setup: **Settings → Pages → Source: GitHub Actions**.

The workflow sets `BASE_PATH=/<repo-name>/` for a project site. For a custom domain or a user site, set `BASE_PATH=/` (and add `public/CNAME` if needed). The build also emits `404.html` so deep links like `/projects/hush` work on Pages.

## License

Code is MIT-style reusable. Personal content (text, photos, resume) © Sebastian Parakal Jose.
