# UI system audit

Audit date: 2026-10-10

## Installed interface stack

| Concern | Current implementation | Installed library |
| --- | --- | --- |
| Application UI | React server-rendered composition with focused client components | React 19.2.6, React DOM 19.2.6 |
| Framework/runtime | Vinext on Vite and Cloudflare Workers | Vinext 1.0.0 beta, Vite 8.0.13 |
| Styling | One tokenized global stylesheet using CSS variables, media queries, and native responsive layout | No Tailwind, CSS-in-JS, Sass, or CSS Modules dependency |
| Reusable UI | Local semantic components and native HTML controls | No shadcn/ui, Radix UI, Headless UI, or component-kit dependency |
| Icons | Small local inline SVG components in `app/ui/Icons.tsx` | No icon-library dependency |
| Motion | CSS transitions/keyframes, IntersectionObserver reveals, and a local count-up component | No Motion, Framer Motion, GSAP, or animation-library dependency |
| Accessibility QA | Semantic markup, keyboard tests, ESLint JSX a11y, and axe browser scans | `eslint-plugin-jsx-a11y`, `@axe-core/playwright` |

## Adoption decision

The current portfolio does not need a component-library migration. shadcn/ui assumes a Tailwind and Radix-oriented component layer; introducing that stack for simple links, buttons, and tabs would duplicate working native controls and make the small site harder to maintain. The same applies to Motion for reveal effects already handled by a few lines of CSS and IntersectionObserver.

The preferred path is to keep shadcn's useful principles without importing its entire dependency graph: semantic primitives, explicit variants, visible focus, predictable state attributes, and composable local components. `ActionLink` is the first such primitive. Motion remains the preferred option if a future interaction needs coordinated layout animation, gestures, or presence transitions that CSS cannot express cleanly.

Aceternity UI should remain an occasional source of visual ideas, not a default dependency or copy-paste source. A component is appropriate only when it supports the portfolio narrative, can be simplified to the existing tokens, passes reduced-motion and accessibility checks, and does not make the site look like a generic SaaS template.

## This refinement pass

- Consolidated primary and supporting CTA behavior in a reusable `ActionLink` component.
- Added a tiny, consistent local icon set for directional and clipboard feedback.
- Refined navigation, button, card, and segmented-tab hover/press states using existing tokens.
- Added arrow-key, Home, and End navigation plus roving tab stops to the mobile project tabs.
- Preserved all layout, content, project behavior, color tokens, and existing motion architecture.

## Future threshold for new libraries

- Add a shadcn/Radix primitive only when a genuinely complex accessible control such as a dialog, popover, select, or combobox is required.
- Add Motion only for coordinated animation that would otherwise require substantial custom state or imperative code.
- Add an icon library only when the interface needs enough unique icons that maintaining the local SVG set becomes more expensive than the dependency.
