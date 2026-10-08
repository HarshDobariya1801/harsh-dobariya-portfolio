# AI-assisted website engineering workflow

## Purpose

The website remains a normal reviewed software project. The AI agent acts as an engineering collaborator that can inspect, propose, implement, and verify changes; it is not a production operator and cannot merge or deploy on its own.

## Change loop

1. **Inspect**: read the affected components, styles, content data, tests, recent Git state, and hosting constraints. Reproduce the issue when applicable.
2. **Frame**: state the problem, user impact, smallest viable change, risks, and verification plan. Separate facts from assumptions.
3. **Implement**: make a focused change that follows the existing architecture and design tokens. Do not mix unrelated cleanup into the patch.
4. **Verify**: run the validation matrix in `AGENTS.md`. Inspect browser results at 1440×900, 768×1024, and 390×844. Review diffs instead of blindly accepting snapshots.
5. **Review**: open a pull request using the template. Include before/after evidence for visual changes and explain architectural trade-offs.
6. **Approve and release**: the owner reviews and approves. Merge and production publishing remain separate, explicit human actions.

## Review lenses

Every change is evaluated through six lenses:

- **Design**: typography, spacing rhythm, hierarchy, image treatment, motion restraint, and consistency with the current visual language.
- **Code quality**: component responsibility, type safety, dead code, dependency cost, and maintainability.
- **Responsiveness**: content order, legibility, touch targets, overflow, and layout behavior at the three supported viewports.
- **Accessibility**: semantics, keyboard flow, focus, labels, contrast, reduced motion, and automated axe results.
- **Performance**: asset weight, layout shift, JavaScript cost, runtime errors, failed requests, and Lighthouse categories.
- **Regression risk**: server-rendered content, links, critical interactions, browser console, and visual snapshots.

## Risk levels

- **Low**: copy, metadata, or an isolated style correction. One reviewer; focused validation.
- **Medium**: component behavior, responsive layout, asset replacement, or dependency update. Full browser matrix and screenshots.
- **High**: architecture, runtime, deployment, hosting, authentication, or data changes. Written proposal first, isolated pull request, rollback plan, full quality suite, and explicit owner approval.

## Automated gates

- TypeScript and ESLint catch type, React, Next, and accessibility lint issues.
- Server-render tests protect important portfolio content, metadata, assets, and removed routes.
- Playwright checks browser errors, failed requests, local and external links, overflow, keyboard behavior, project demos, clipboard feedback, and axe WCAG A/AA rules.
- Playwright snapshots cover the complete page at desktop, tablet, and mobile sizes.
- Lighthouse audits performance, accessibility, best practices, and SEO against documented minimum scores.
- GitHub Actions runs these checks on pull requests and stores failure reports as artifacts. It contains no deploy step.

## Visual baseline policy

Screenshot changes are review evidence, not disposable test output. A failing comparison should first be treated as a regression. If the visual change is intentional, review the rendered page at all three viewports, run `npm run test:e2e:update`, and commit the changed images with a short explanation in the pull request.

## Ownership and secrets

The agent must not read or modify ignored environment files, production credentials, DNS, or Cloudflare settings. Repository configuration may document required behavior but must never contain secrets. Only the owner can approve merge and initiate production deployment.

## One-time GitHub repository settings

The committed workflow and CODEOWNERS file provide the checks and reviewer identity, but GitHub branch protection remains an owner-controlled repository setting. Configure `main` to require a pull request, at least one approving review, CODEOWNER review, the `Type, lint, render, and browser checks` status check, dismissal of stale approvals after new commits, and resolution of review conversations. Do not enable automatic deployment in this quality workflow.
