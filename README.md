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
npm run lint
npm run build
npm test
```

## Routes

- `/`: portfolio overview
- `/Harsh_Dobariya_Resume.pdf`: resume
- `/sitemap.xml` and `/robots.txt`: search metadata

## Editing content

Structured profile, experience, education, and tool content lives in `app/portfolio-data.ts`. The abstract hero composition and project demonstrations live in `app/HeroAbstractVisual.tsx`, `app/KVStoreDemo.tsx`, and `app/CollaborativeDemo.tsx`.

## Deployment

The repository is connected to Sites hosting. Publish the current `main` commit through the Sites deployment workflow; the active custom domain is `harshdobariya.com`.
