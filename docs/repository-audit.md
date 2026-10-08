# Repository audit

Audit date: 2026-10-08

## Executive assessment

This is a small, coherent portfolio application rather than a candidate for re-platforming. Its existing separation is appropriate: server-rendered page composition, centralized content data, focused client interactions, one design-system stylesheet, and a thin Cloudflare runtime adapter. The maintenance architecture added by this audit surrounds that application with standards and verification; it does not replace it.

## Framework and dependencies

- React 19.2.6 and React DOM 19.2.6.
- TypeScript 5.9 in strict, no-emit mode.
- Vinext 1.0.0 beta on Vite 8, with the Cloudflare Vite plugin and Wrangler.
- ESLint 9 with TypeScript, React, React Hooks, JSX accessibility, and Next core-web-vitals rules.
- No application state library, CSS framework, UI kit, font package, analytics SDK, database client, or runtime API dependency.
- New engineering-only tools: Playwright, axe for Playwright, and Lighthouse. Lighthouse is called directly instead of through an additional CI wrapper.

## Application architecture

- `app/layout.tsx` owns global metadata, Open Graph/Twitter metadata, canonical URL, favicon, and Person JSON-LD.
- `app/page.tsx` server-renders the single portfolio route and composes navigation, hero, selected work, capabilities, experience, about, education, tools, contact, and footer.
- `app/portfolio-data.ts` is the source of truth for profile, experience, education, metrics, and skills content.
- `app/KVStoreDemo.tsx` and `app/CollaborativeDemo.tsx` are isolated client-side demonstrations with local state only.
- `app/ScrollMotion.tsx` handles reveal observers, active navigation state, and mobile-menu focus/keyboard behavior.
- `app/CopyEmail.tsx` and `app/CountUp.tsx` provide small progressive interactions.
- `app/HeroSculptureVisual.tsx` owns the responsive hero artwork.
- `app/globals.css` defines the color, type, spacing, radius, shadow, and easing tokens plus all responsive and reduced-motion rules.
- `app/robots.ts` and `app/sitemap.ts` provide the search crawler surface.
- There are no `/work/<slug>` routes; the two projects intentionally remain on the main page.

## Runtime and deployment

- `vite.config.ts` composes Vinext, Sites, and the Cloudflare plugin, and keeps local Wrangler/Miniflare state inside the repository's ignored directories.
- `worker/index.ts` delegates application requests to Vinext and contains the Cloudflare Images optimization path.
- `.openai/hosting.json` connects the project to Sites hosting. No D1 database or R2 bucket is configured.
- The public production URL is `https://harshdobariya.com`.
- Deployment is intentionally outside the new GitHub quality workflow. The owner approves merge and triggers publishing separately.

## Existing tests before this audit

`tests/rendered-html.test.mjs` contained three tests. They build and execute the Worker output to verify the primary page content and metadata, confirm removed case-study routes do not return to the sitemap, and verify required assets while rejecting starter-only files and stale content.

## Quality foundation added

- `playwright.config.ts` defines Chromium projects at 1440×900, 768×1024, and 390×844.
- Browser tests detect console and page errors, failed requests and HTTP responses, horizontal overflow, broken local anchors and destinations, missing external profile URLs, clipboard feedback, both project interactions, anchor navigation, mobile-menu focus/escape behavior, and axe WCAG A/AA violations.
- Full-page screenshot comparisons are stored for each supported viewport, with motion and caret noise disabled during capture.
- `scripts/lighthouse-audit.mjs` builds and starts the production server, runs Lighthouse in Playwright's pinned Chromium, saves HTML/JSON reports, and enforces score minimums.
- `.github/workflows/quality.yml` runs the complete gate for pull requests and uploads failure evidence. It has no deploy permissions or deploy job.
- CODEOWNERS and the pull-request template document owner review, evidence, risk, and rollback expectations.

## Verified baseline

- TypeScript: pass.
- ESLint: pass with no reported warnings.
- Production build and server-render tests: 3 of 3 pass.
- Playwright: 17 applicable checks pass; 4 checks are intentionally skipped outside their applicable viewport/project.
- Visual baselines: pass at desktop, tablet, and mobile.
- Lighthouse: performance 89, accessibility 100, best practices 100, SEO 100.
- Production dependency audit: 0 vulnerabilities.
- Full dependency graph: 27 known findings in the beta framework/build toolchain; see `docs/improvement-roadmap.md` for the non-forced upgrade plan.

## Architectural conclusion

Keep the current stack and structure. The next improvements should be isolated asset, header-policy, dependency, or visual refinements verified by the new gates. A framework migration, component-library introduction, or autonomous deployment layer would add cost without solving a demonstrated problem.
