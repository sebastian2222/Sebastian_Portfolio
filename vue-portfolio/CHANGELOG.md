# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### To do

- Add a public repository link for SignalStack once it is published.
- Replace the self-hosted CloudPose demo with a YouTube/Vimeo embed if bandwidth becomes a concern.
- Add screenshots for the Hush and PantryPals case studies.

## [1.4.1] - 2026-09-25

### Changed

- Removed the Solo/Team tags from project cards and case-study headers, along with the `team` data field.
- PantryPals is now credited as sole software engineer, with a "My part" note covering the full build.
- BirdTag: the figure caption no longer mentions the team report, and the build section is titled "How it works" (via a new optional `builtHeading` field).

## [1.4.0] - 2026-09-25

### Added

- **"From the report" figures** on case studies, taken from the original submissions:
  - MATE AWS architecture diagram
  - BirdTag architecture (Fig 1 of the team report)
  - Monash Equipment Center star schema
  - PTV bus-access heatmap

  Each figure is lazy-loaded with alt text, intrinsic dimensions and an "Open full size" link.
- Test ensuring every figure has alt text, a caption and dimensions.

### Changed

- The hero stat reads "2+ years of production impact" instead of "2 yrs C++" (also updated in the intro, the journey and the experience heading).
- MOSAIC: added the Notion-based incident triage for the production sites.
- NCR: added the C# .NET automation suite work alongside the C++ processor services. C# and .NET added to the toolbox.
- Case-study section numbers are now computed from the sections a project actually has, so there are no gaps.

## [1.3.0] - 2026-09-25

### Changed

- **Hosting moved to Vercel.** `vercel.json` adds SPA rewrites, immutable caching for hashed assets and security headers (HSTS, nosniff, frame-deny, referrer and permissions policies).
- CI is now quality gates only (format, lint, tests, audit, build). The GitHub Pages deploy job was removed.

## [1.2.1] - 2026-09-25

### Changed

- Project cards and case-study headers now show what kind of project each one is (for example "Cloud-native ML inference service" or "Serverless AI media platform") instead of unit codes.
- The unit, employer or personal-project origin moved to a new `course` field, shown as a "Built at" line on each case study.
- Generic titles now use the real project names from the briefs: **MATE: AI fitness platform on AWS**, **Monash Equipment Center data warehouse** and **PTV green-space accessibility analysis**. URLs and slugs are unchanged.

## [1.2.0] - 2026-09-25

### Changed

- **Complete visual redesign** to the "Engineer's Notebook" style from the Google Stitch design: cream dotted paper, navy ink, neo-brutalist hard shadows, sticker badges, washi tape, polaroid photos and Caveat handwritten notes. Fonts are now Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono and Caveat.
- The Stitch mock-up's AI stock images were replaced with the real portrait and event photos.
- Header now has the "Open to work" status, pill navigation, a CV button and a portrait avatar. The mobile menu is a full-width sticker panel.
- Project cards and case-study headers each get their own accent colour. Decisions render as index cards, the "My part" section as a sticky note, and the architecture diagram uses hand-drawn arrows.
- Open Graph image regenerated in the new palette.
- **Content:** MOSAIC CTO role ended July 2026. Teaching now lists FIT5032 Internet Applications Development alongside FIT5046 and FIT1056. The NCR role is described as a payment processor, with its test-automation work added.

### Added

- "My journey" route map: Calicut → Hyderabad → Melbourne → now.

### Removed

- Dark/light theme toggle and `useTheme`. The notebook design is light-only by intent.

## [1.1.0] - 2026-09-25

### Changed

- **Hush**: now credited as sole software engineer, covering frontend, Lambdas, routing, the ML pipeline, Terraform-managed AWS infrastructure and CI/CD. Terraform and Dependabot added to the stack.
- **Marking harness → Agentic marking harnesses**: rewritten from the harness sources. It now covers four harnesses across FIT5046 (A1, A2, A4) and FIT1056 (Deliverable 1), including the verifier and uniqueness agents, bibliography verification against Semantic Scholar/OpenAlex, horizontal marking, versioned rubric iterations and validation gates.
- **SignalStack**: rewritten from the source code. Covers topic extraction, Redis dedup, batched at-least-once consumption, cache-aside API, cross-container Prometheus metrics, Grafana dashboards, Trivy scanning and architecture decision records. Promoted to a featured project.
- **eXpOS kernel** promoted to featured (8 featured projects keeps the grid balanced).
- Teaching Associate experience updated to describe all four harnesses.

### Security

- Proprietary NCR source code was deliberately not read or used. The NCR role is described from the resume only.
- Harness material was extracted without student submissions, feedback or marks data.

## [1.0.0] - 2026-09-25

Complete rebuild of the portfolio from the Vite starter into a content-driven site with recruiter-focused case studies.

### Added

- **Content layer** (`src/data`) with profile, experience (MOSAIC, Monash, NCR), education, grouped skills and gallery.
- **13 project case studies** based on the source repositories, reports and briefs: IFRC World Disasters Report 2026, Hush, multi-agent marking harness, CloudPose, SignalStack, BirdTag, PantryPals, eXpOS kernel, AWS fitness architecture, equipment data warehouse, PTV bus-accessibility analysis, GetFit Victoria and the AFL match simulator.
- **Case-study pages** (`/projects/:slug`) with problem, build summary, contribution callout, architecture lanes, key decisions, results tables, an embedded demo video and previous/next navigation.
- **Home page** with hero and key stats, experience timeline, filterable project grid, about/education/toolbox, photo gallery and contact section.
- **Design system**: dark and light themes (OS-aware, persisted, no flash), self-hosted Inter / Space Grotesk / JetBrains Mono, reduced-motion-aware scroll reveals.
- **Accessibility**: skip link, landmarks, focus styles, `aria-pressed` filters, keyboard-dismissable mobile menu.
- **SEO and sharing**: meta description, Open Graph/Twitter card with a generated 1200×630 image, JSON-LD `Person`, SVG favicon and `robots.txt`.
- **Media**: WebP portrait and gallery photos; CloudPose demo re-encoded from 87 MB to 8.6 MB; downloadable resume PDF.
- **Tooling**: ESLint 10 flat config, Prettier, EditorConfig, `.nvmrc`, Vitest with 30 tests (content integrity, utilities, components).
- **CI/CD**: GitHub Actions for format, lint, test, audit and build, deploying to GitHub Pages; Dependabot for npm and Actions.
- History-mode routing with a generated `404.html` SPA fallback, plus a `BASE_PATH` option for project-page hosting.

### Changed

- `vue-router` is now declared as a dependency. It previously resolved from a stray root `node_modules`.
- Raw source material moved to a git-ignored `materials/` folder outside the app.

### Removed

- Placeholder data (example.com links, stock images), the Vite starter components, and the unused Bootstrap, Bootstrap Icons and EmailJS dependencies.
- The accidentally committed root `node_modules/`, `package.json` and `package-lock.json`.

### Fixed

- Stripped a UTF-8 BOM from `package.json` that broke Vite's PostCSS config loading.

## [0.2.0] - 2025-11-27

### Added

- Timeline component for experience (commit `1a35373`).
- Bootstrap-based portfolio with a project carousel (commits `b13c962`; carousel WIP snapshotted in `c3fdeea`).

## [0.1.0] - 2025-11-22

### Added

- Initial Vite + Vue 3 scaffold (commit `5e2d9e1`).

[Unreleased]: https://github.com/sebastian2222/Sebastian_Portfolio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/sebastian2222/Sebastian_Portfolio/releases/tag/v1.0.0
