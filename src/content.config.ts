import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(200),
    publishedAt: z.coerce.date(),
    draft: z.boolean().default(true),
    category: z.enum(['design', 'dev', 'notes']).default('notes'),
    tags: z.array(z.string()).default([]),
    cover: z.string().nullish(),
    coverAlt: z.string().default(''),
  }),
});
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(), excerpt: z.string(), publishedAt: z.coerce.date(),
    draft: z.boolean().default(true), category: z.enum(['design', 'dev', 'notes']).default('design'),
    tags: z.array(z.string()).default([]), cover: z.string().nullish(), coverAlt: z.string().default(''),
    liveUrl: z.string().default(''),
  }),
});
export const collections = { posts, projects };
