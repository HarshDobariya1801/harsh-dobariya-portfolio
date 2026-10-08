# Portfolio improvement roadmap

Audit date: 2026-10-08

## Repository assessment

The application is already compact and understandable: React 19 with TypeScript runs through Vinext/Vite, content is centralized, interactive behavior is limited to six focused client components, visual design lives in one tokenized stylesheet, and Cloudflare Sites provides the runtime. Three server-render regression tests existed before this audit. The highest-value first step is stronger review and browser verification, not an architectural rewrite.

## Prioritized work

| Priority | Issue | Why it matters | Proposed solution | Expected impact | Verification |
| --- | --- | --- | --- | --- | --- |
| P0 — established in this change | No documented AI engineering contract or human release boundary | Future automated work could drift in design, scope, or deployment behavior | Use `AGENTS.md`, the six-stage workflow, PR template, CODEOWNERS, and a non-deploying pull-request workflow | Consistent small changes with explicit owner control | Review a sample PR against the template; confirm CI has no deploy step |
| P0 — established in this change | Browser behavior and responsive layouts lacked regression coverage | Server-render tests cannot catch overflow, console errors, interaction failures, or visual changes | Add Playwright checks and baselines at 1440×900, 768×1024, and 390×844 | Earlier detection of production-facing regressions | `npm run test:e2e`; inspect failure artifacts and baseline diffs |
| P0 — established in this change | Accessibility checks were lint-only | Runtime names, contrast, states, and DOM relationships need browser inspection | Add axe WCAG A/AA scans plus keyboard and focus interaction tests | More reliable keyboard and assistive-technology behavior | Playwright accessibility and mobile-menu tests |
| P1 — established in this change | The hero was delivered as a roughly 1.84 MB PNG at every viewport | The oversized LCP asset delayed rendering and dominated mobile transfer cost | Preserve the artwork while serving native 640/960/1254 WebP variants through `srcset` | Lighthouse performance improved from 71 to 89; total transfer fell from about 2.26 MB to 467 KB | Production Lighthouse report plus unchanged visual baselines at all three viewports |
| P1 | No explicit security-header policy is visible in the application configuration | A static portfolio still benefits from a clear CSP, referrer policy, and anti-sniffing posture | Verify current Cloudflare response headers, then add the narrowest compatible policy in the supported runtime layer | Reduced browser attack surface and clearer operational ownership | Header integration test and external security-header scan after approved deployment |
| P1 — established in this change | Performance budgets were not recorded | Visual refinements can silently add asset or JavaScript cost | Enforce Lighthouse minimums of 85 performance and 90 for accessibility, best practices, and SEO; retain reports as CI artifacts | Prevents gradual performance erosion | `npm run audit:lighthouse` and PR report comparison |
| P1 | The beta Vinext/Cloudflare/Vite build graph reports 27 audit findings, and the pinned RSC package is among the flagged development dependencies | Forced upgrades could destabilize the working deployment, but ignored findings create maintenance and build-time risk | Review compatible React/Vinext/Cloudflare/Vite releases in an isolated dependency PR; do not use `npm audit fix --force`; retain the clean production-dependency audit | Lower supply-chain risk without reckless churn | `npm audit --omit=dev`, full audit review, build, E2E, Lighthouse, and preview smoke test |
| P2 | External profile links are operational dependencies | LinkedIn or GitHub URL changes can create dead ends even when the site builds | Keep deterministic URL validation in PR tests and periodically perform owner-approved live checks | Fewer broken recruiter paths | Link test plus manual check when a profile changes |
| P2 | One large stylesheet concentrates all visual behavior | It is currently manageable, but unrelated future edits could raise regression risk | Keep it until repeated ownership boundaries emerge; then split by stable sections without changing selectors or tokens | Better maintainability only when complexity justifies it | No visual diffs, unchanged computed styles, full browser suite |

## Dependency audit note

`npm audit --omit=dev` reports no production dependency vulnerabilities at the time of this audit. The full graph reports 27 findings (2 low, 4 moderate, and 21 high) across the beta Vinext/Vite/Cloudflare build graph and related utilities, including the pinned React Server Components package. This change deliberately removed the vulnerable `@lhci/cli` wrapper and uses Lighthouse directly. Do not apply a forced audit fix; update compatible framework packages together in a dedicated, tested pull request.

## Recommended sequence

1. Land this test and review foundation after owner approval.
2. Keep Lighthouse and screenshots on the pinned CI environment for comparable results.
3. Optimize the 666 KB social image separately, preserving its required 1200×630 dimensions and checking social-preview quality.
4. Verify and document production response headers before altering runtime configuration.
5. Continue with small design refinements, one section or behavior per reviewed pull request.
