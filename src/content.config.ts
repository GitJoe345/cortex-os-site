import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection for cortex-os.dev. Same shape as the Cayman spec's `blog`
// collection, minus `relatedProducts` (this site has no product catalog).
// The Cortex-Agentic-OS SEO generator writes markdown files into
// `src/content/blog/*.md` matching this frontmatter contract.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keyword: z.string().min(1),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
