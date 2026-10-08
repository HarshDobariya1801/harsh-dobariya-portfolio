# AI Website Engineering Contract

This file governs AI-assisted work in this repository. The objective is a maintainable, high-quality portfolio, not autonomous production operation. Human approval remains the release boundary.

## Product and design intent

- Preserve the site's calm, premium, editorial character: confident typography, deliberate whitespace, restrained color, and purposeful motion.
- Keep the current content, information architecture, URLs, resume, project demonstrations, SEO metadata, and deployment model unless the task explicitly requires a change.
- Prefer small, focused refinements over redesigns. Do not add generic stock imagery, gratuitous gradients, excessive animation, fake metrics, or invented claims.
- Treat typography, image proportions, responsive composition, interaction states, and reduced-motion behavior as product requirements.
- Reuse the existing CSS tokens and component patterns before introducing a new abstraction or dependency.

## Architecture map

- `app/page.tsx`: single-page portfolio composition and semantic content structure.
- `app/portfolio-data.ts`: canonical profile, experience, education, and skills content.
- `app/*Demo.tsx`: focused client-side project demonstrations.
- `app/ScrollMotion.tsx`: reveal behavior, active navigation, and mobile-menu keyboard handling.
- `app/globals.css`: design tokens, component styling, responsive rules, and motion preferences.
- `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`: metadata and search-engine surface.
- `public/`: resume and image assets.
- `worker/index.ts`, `vite.config.ts`, `.openai/hosting.json`: Cloudflare Sites runtime and hosting integration.
- `tests/rendered-html.test.mjs`: server-render and content regressions.
- `tests/e2e/`: browser behavior, accessibility, link, responsive, and screenshot regressions.

## Required working method

1. Inspect the affected code, tests, and repository state before editing.
2. State the user-visible outcome and the smallest proposed change.
3. Preserve unrelated work. Never overwrite or clean up changes outside the task.
4. Implement one coherent concern at a time. Avoid speculative refactors.
5. Run the validation proportional to risk, using the matrix below.
6. Explain trade-offs, remaining risk, and verification in the pull request.
7. Stop before merge or production deployment. The repository owner must approve both.

## Engineering standards

- Use TypeScript for application and test code. Keep strict typing and avoid `any` unless an external boundary makes it unavoidable and documented.
- Keep server-rendered content semantic. Add client components only for real interaction.
- Prefer native platform behavior and CSS over JavaScript and third-party packages.
- Add a dependency only when it materially reduces risk or maintenance cost. Document why it is needed.
- Never expose, copy, log, or modify credentials, tokens, production variables, or local `.env*` files.
- Do not change `.openai/hosting.json`, Cloudflare bindings, DNS, or production settings without an explicit task and owner approval.
- Do not weaken assertions, accessibility rules, or performance thresholds to hide a regression.
- Keep changes reversible and reviewable. Large changes must be split into independent pull requests.

## Design and accessibility standards

- Start mobile-first, then verify tablet and desktop compositions.
- Maintain a logical heading hierarchy, landmarks, labels, keyboard access, visible focus, meaningful alternative text, and WCAG AA contrast.
- Preserve `prefers-reduced-motion`; essential content must never depend on animation.
- Avoid horizontal scrolling at supported viewports. Interactive targets should remain usable at touch sizes.
- Motion should explain state or hierarchy, generally remain within 150–600 ms, and avoid layout thrashing.
- Optimize raster assets and reserve their dimensions to prevent layout shift.

## Validation matrix

| Change | Required checks |
| --- | --- |
| Content or metadata | `npm run typecheck`, `npm run lint`, `npm test` |
| Component or interaction | Above plus `npm run test:e2e` |
| CSS, layout, image, or motion | Above plus review Playwright screenshots at desktop, tablet, and mobile |
| Dependency or build configuration | `npm audit --omit=dev`, `npm run quality`, and `npm run audit:lighthouse` |
| Performance-sensitive change | `npm run audit:lighthouse` and compare the generated report |

`npm run test:e2e:update` is allowed only after an intentional visual change has been manually reviewed at every viewport. Baseline updates must be committed in the same pull request as the change.

## Pull-request and release rules

- Work on a branch; do not commit directly to `main` for planned improvements.
- Every pull request must describe scope, screenshots or evidence, commands run, risks, and rollback.
- The GitHub quality workflow must pass. Resolve failures; do not bypass the checks.
- Require the repository owner's approval before merge.
- Never deploy automatically from an AI task or this CI workflow. Deployment is a separate, explicit, owner-approved action after merge.

For the complete operating loop and risk levels, see `docs/agent-workflow.md`.
