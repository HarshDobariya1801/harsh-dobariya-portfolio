# Harsh Dobariya Portfolio

Product-led personal site for [harshdobariya.com](https://harshdobariya.com), designed for recruiters and engineering managers evaluating backend, full-stack, and distributed-systems work.

## Stack

- React 19 with TypeScript
- Vinext / Vite
- CSS design tokens and responsive layouts
- Cloudflare-backed Sites hosting

The site avoids third-party font and animation downloads. Its distributed key-value store and collaborative workspace demonstrations are built as accessible React interfaces. Motion is implemented with CSS and IntersectionObserver and respects `prefers-reduced-motion`.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
npm test
npm run test:e2e
npm run audit:lighthouse
```

`npm run quality` runs the type, lint, server-render, build, browser, accessibility, interaction, and visual-regression gates. Playwright covers desktop, tablet, and mobile Chromium viewports. Lighthouse starts an isolated local server, writes reports to `artifacts/lighthouse/`, and never deploys the site.

When a visual change is intentional, inspect it at all three viewports before running `npm run test:e2e:update`. Commit the new baseline images with the implementation; never update baselines merely to make a failing test pass.

## Routes

- `/`: portfolio overview
- `/Harsh_Dobariya_Resume.pdf`: resume
- `/sitemap.xml` and `/robots.txt`: search metadata

## Editing content

Structured profile, experience, education, and tool content lives in `app/portfolio-data.ts`. The 3D hero sculpture and project demonstrations live in `app/HeroSculptureVisual.tsx`, `app/KVStoreDemo.tsx`, and `app/CollaborativeDemo.tsx`.

## Deployment

The repository is connected to Sites hosting. Changes are proposed through pull requests and require owner approval before merge or deployment. This repository's quality workflow never publishes the site. After an approved merge, publish the chosen `main` commit through the Sites deployment workflow; the active custom domain is `harshdobariya.com`.

## AI maintenance workflow

- [`AGENTS.md`](./AGENTS.md) is the contract for AI-assisted engineering work.
- [`docs/repository-audit.md`](./docs/repository-audit.md) records the audited architecture and quality baseline.
- [`docs/agent-workflow.md`](./docs/agent-workflow.md) defines the inspect, change, verify, and review loop.
- [`docs/improvement-roadmap.md`](./docs/improvement-roadmap.md) records prioritized follow-up work and its verification method.
- [`.github/pull_request_template.md`](./.github/pull_request_template.md) keeps review evidence consistent.
