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
- `/Harsh_Dobariya_Resume.pdf`: resume
- `/sitemap.xml` and `/robots.txt`: search metadata

## Editing content

Structured profile, project, experience, education, and skill content lives in `app/portfolio-data.ts`. Project architecture diagrams are built as responsive interface components in `app/ProjectDiagram.tsx`.

## Deployment

The repository is connected to Sites hosting. Publish the current `main` commit through the Sites deployment workflow; the active custom domain is `harshdobariya.com`.
