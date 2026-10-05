# Harsh Dobariya Portfolio

Personal portfolio for [harshdobariya.com](https://harshdobariya.com), designed for recruiters and engineering managers evaluating backend, full-stack, and distributed-systems work. The visual system uses a warm off-white canvas, near-black type, one blue accent, and responsive HTML/CSS architecture diagrams.

## Stack

- React 19 with TypeScript
- Vinext / Vite
- CSS design tokens and responsive layouts
- Cloudflare-backed Sites hosting

The site avoids third-party font and animation downloads. Motion is implemented with CSS and IntersectionObserver, respects `prefers-reduced-motion`, and never gates server-rendered content.

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
- `/work/distributed-key-value-store`: distributed key-value store case study
- `/work/realtime-collaborative-workspace`: real-time collaborative workspace case study
- `/Harsh_Dobariya_Resume.pdf`: resume
- `/sitemap.xml` and `/robots.txt`: search metadata

## Editing content

Structured profile, project, case-study, experience, education, and skill content lives in `app/portfolio-data.ts`. Project architecture diagrams are built as responsive interface components in `app/ProjectDiagram.tsx`. Shared navigation and footer components live in `app/SiteHeader.tsx` and `app/SiteFooter.tsx`.

## Deployment

The repository is connected to Sites hosting. Publish the current `main` commit through the Sites deployment workflow; the active custom domain is `harshdobariya.com`.
