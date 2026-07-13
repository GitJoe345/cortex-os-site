# cortex-os.dev — Astro Migration + Blog Section — Design Spec

- **Date:** 2026-07-12
- **Status:** Approved (brainstorming complete)
- **Related:** sibling specs from the same brainstorm — Cayman blog
  (`X:\cayman-affiliate\docs\superpowers\specs\2026-07-12-blog-section-design.md`),
  SEO generator fix (`X:\Cortex-Agentic-OS\docs\superpowers\specs\2026-07-12-seo-generator-fix-design.md`).

## 1. Context

cortex-os-site is currently a single hand-written `index.html` (no framework, no `src/`, no
`package.json`) pushed straight to GitHub Pages via a `CNAME` file — no build step. The SEO
generator (Cortex-Agentic-OS) already targets `src/content/blog` as this site's `postsDir`,
which doesn't exist. This spec covers introducing Astro 5 (matching Cayman's proven
pattern) purely as infrastructure for the blog, porting the existing homepage with minimal
risk, and standing up the same collection/routes/RSS pattern as Cayman.

## 2. Goals / Non-goals

**Goals**
- Introduce Astro 5 without changing the existing homepage's visual output or behavior
  (scroll-reveal, reduced-motion handling, OS-window showcase).
- `blog` content collection + `/blog`, `/blog/[slug]` routes, styled with the site's
  existing black/gold cosmic design tokens.
- GitHub Actions build+deploy to GitHub Pages (replaces the current raw-push model).
- Sitemap + RSS.

**Non-goals**
- No componentization of the existing homepage beyond what's needed to share a layout with
  blog pages — that's a possible later refactor, not part of this build.
- No design changes to the homepage itself.
- No change to DNS/TLS/custom-domain setup (already working) — only the deploy mechanism
  changes (raw push → Actions build).

## 3. Locked decisions (from brainstorming)

| Decision | Choice | Why |
|---|---|---|
| Framework | Astro 5, static output | Matches Cayman's pattern; makes the generator's `src/content/blog` path real |
| Homepage migration depth | Minimal-wrapper: port `index.html` → `src/pages/index.astro` near-verbatim | Avoids regressing already-tuned motion/accessibility behavior for a task that's only about adding a blog |
| Deploy | GitHub Actions (`astro build` → `actions/deploy-pages`) | Standard, keeps `dist/` out of git, required once a build step exists |
| Content format | `.md`, same collection pattern as Cayman | Consistency across both sites; matches generator's file filter |

## 4. Architecture

- New: `package.json`, `astro.config.mjs` (`site: 'https://cortex-os.dev'`,
  `integrations: [sitemap()]`).
- `index.html` → `src/pages/index.astro`: markup, inline `<style>`, and any inline
  `<script>` carried over as-is inside the Astro page — same DOM/CSS/JS output. `CNAME`
  moves to `public/CNAME` (Astro copies `public/` verbatim into `dist/`),
  `favicon.svg`/`og.png`/`img/*.webp` move to `public/` too.
- `src/layouts/BaseLayout.astro`: the shared `<head>` (meta, OG tags, design-token
  `<style>` block) factored out for blog pages to use. The homepage keeps rendering the
  same output either by using this layout too, or keeping its own head block — whichever
  turns out simpler during implementation; visual output must match exactly either way.
- `src/content.config.ts`: same `blog` collection shape as Cayman's spec (§6 there),
  independent content — different topics (agentic OS / AI agents), not shared with Cayman.
- `.github/workflows/deploy.yml`: on push to `main`, `npm ci && npm run build`, deploy
  `dist/` via `actions/deploy-pages`. GitHub Pages source setting changes from "Deploy from
  branch" to "GitHub Actions."

## 5. Pages / routes

| Route | Purpose |
|---|---|
| `/` | Existing homepage, ported near-verbatim |
| `/blog` | Listing: card grid, newest first |
| `/blog/[slug]` | Post detail: rendered markdown, Article JSON-LD |
| `/blog/rss.xml` | RSS feed |

## 6. Data model

Same shape as the Cayman spec's `src/content/blog/<slug>.md` frontmatter, minus
`relatedProducts` (no product catalog on this site) — `title`, `description`,
`publishDate`, `updatedDate?`, `keyword`, `tags`, `heroImage?`, `draft`.

## 7. Verification / testing

- Build must produce a `dist/` whose `/` is visually identical to the current live
  homepage (manual screenshot compare before/after, per this site's existing
  capture-and-compare habit from the motion-showcase work).
- GitHub Actions workflow runs green on a test push before relying on it.
- Confirm HTTPS/custom-domain still resolves correctly after switching the Pages source to
  "GitHub Actions" — this setting change is the one place this could visibly break; verify
  `https://cortex-os.dev` loads post-switch.
- Sitemap + RSS reachable at their URLs post-deploy.

## 8. Success criteria

- Homepage unchanged visually and functionally, now served from an Astro build.
- `blog` collection building with zero posts (empty-state listing).
- One seed post renders end-to-end and is reachable via sitemap + RSS.
- Actions workflow is the deploy path; no more raw commits of built HTML as the deploy mechanism.

## 9. Deferred / out of scope

- Homepage componentization/refactor.
- Category/tag landing pages.
- The generator itself — separate spec.

## 10. Deferred decisions (settled at build time)

- Whether the homepage reuses `BaseLayout.astro` verbatim or keeps an independent head
  block — implementation detail, doesn't change the design, must preserve identical output
  either way.
