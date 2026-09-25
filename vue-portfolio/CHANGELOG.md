# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### To do

- Add a public repository link for SignalStack once it is published.
- Replace the self-hosted CloudPose demo with a YouTube/Vimeo embed if bandwidth becomes a concern.
- Add screenshots for Hush and PantryPals case studies.

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
