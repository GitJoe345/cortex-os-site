---
name: blog-post
description: Write an SEO blog post for cortex-os.dev in the site's voice. AI / agentic-OS thought-leadership and product content, US English. Emits a single Markdown file for src/content/blog/<slug>.md with frontmatter matching the blog collection schema exactly. Use when generating or drafting a post for cortex-os.dev.
---

# cortex-os.dev blog post

Generate one Markdown blog post for **cortex-os.dev**, the site for Cortex — an
*agentic operating system* (a desktop environment where AI agents plan, remember, and
act, presided over by a living orb). Output is a single `.md` file written to
`src/content/blog/<slug>.md`.

## Voice & audience

- **Topic space:** agentic operating systems, AI agents and multi-agent orchestration,
  persistent / file-based memory, model routing, voice interfaces, and Cortex's own
  modules (the Orb, the Pantheon of companion agents, the Neural Map, Mission Control,
  OmniRoute, the Hermes spine). Thought-leadership and product content, not generic
  "top 10 AI tools" filler.
- **Reader:** technically literate builders and early adopters — people who ship
  software and automation. Assume working knowledge; skip 101 explanations.
- **Tone:** confident, concrete, a little cosmic to match the black/gold Cortex
  aesthetic — but substance first. No hype, no em-dash-salad, no "in today's
  fast-paced world" openers. Lead with the idea.
- **Language:** **US English** spelling and idiom (organize, color, behavior).
- **Length:** ~600–1100 words. Use `##` / `###` headings, short paragraphs, and lists
  where they earn their place.

## Frontmatter contract (EXACT — matches `src/content.config.ts`)

Emit YAML frontmatter with these keys and nothing else. This schema has **no
`relatedProducts` field** — cortex-os.dev has no product catalog. Do not add fields
the schema doesn't define; the build validates frontmatter with Zod and will fail on
extras that aren't in the schema.

```yaml
---
title: "Post Title in Title Case"            # required, non-empty string
description: "One CTR-optimized meta description, ~150 chars." # required, non-empty
publishDate: 2026-07-12                        # required, YYYY-MM-DD
updatedDate: 2026-07-20                        # OPTIONAL — omit unless revising
keyword: "primary target keyword"              # required, the post's SEO keyword
tags: ["agentic-os", "ai-agents"]              # array of strings; [] if none
heroImage: "/img/blog/my-post.webp"            # OPTIONAL — omit if no image exists
draft: false                                   # false to publish, true to hold back
---
```

Rules:
- `publishDate` (and `updatedDate` if present) are plain `YYYY-MM-DD` dates — the
  schema coerces them, so no quotes and no time component are needed.
- `tags` are free-form lowercase-hyphenated strings, not a fixed enum.
- Omit `updatedDate` and `heroImage` entirely when they don't apply — do not emit
  empty strings for them.
- `draft: false` publishes; the listing, sitemap, and RSS all exclude `draft: true`.

## Body

- Markdown only. Raw HTML (e.g. an `<iframe>` embed) passes through Astro's default
  Markdown renderer, so embeds work without MDX — use sparingly.
- Open with the idea, not a preamble. Earn the headline in the first two sentences.
- Link internally to `/blog/<other-slug>/` and to the homepage (`/`) or its sections
  (`/#modules`, `/#proof`) where relevant; link out only to authoritative sources.
- **Do NOT hand-write JSON-LD / structured data.** The `/blog/[slug]` page template
  builds the Article and BreadcrumbList schema from the frontmatter automatically.
  Writing your own `<script type="application/ld+json">` in the body would duplicate
  it. Just fill the frontmatter correctly.

## Filename

Write to `src/content/blog/<slug>.md` where `<slug>` is lowercase, hyphenated, and
derived from the title (this becomes the URL: `/blog/<slug>/`).
