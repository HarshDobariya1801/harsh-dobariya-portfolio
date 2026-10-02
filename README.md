# Harsh Dobariya Portfolio

Personal portfolio for [harshdobariya.com](https://harshdobariya.com), designed for recruiters and engineering managers evaluating backend, full-stack, and distributed-systems work.

## Stack

- React 19 with TypeScript
- Vinext / Vite
- CSS design tokens and responsive layouts
- Cloudflare-backed Sites hosting

The site avoids third-party font and animation downloads. Motion is implemented with CSS and IntersectionObserver, and respects `prefers-reduced-motion`.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
npm test
```

## Routes

- `/`: portfolio overview
- `/work/distributed-key-value-store`: case study
- `/work/realtime-collaborative-workspace`: case study
- `/Harsh_Dobariya_Resume.pdf`: resume
- `/sitemap.xml` and `/robots.txt`: search metadata

## Editing content

Structured profile, project, experience, education, and skill content lives in `app/portfolio-data.ts`. The case-study routes use the same data to avoid duplicated claims.

## Content still needed

- Project-specific GitHub URLs for both selected projects
- A live demo URL for the real-time workspace, if one is public
- A 1600 × 1000 screenshot or optimized recording of the real-time workspace
- Verified benchmark data and test conditions for both projects
- Concrete “what I would do next” notes for both case studies

These are shown as labeled placeholders in the interface so missing evidence is not replaced with invented facts.

## Deployment

The repository is connected to Sites hosting. Publish the current `main` commit through the Sites deployment workflow; the active custom domain is `harshdobariya.com`.
