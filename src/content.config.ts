import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guias' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(110),
      /** Título SEO (≤ 60 caracteres ideal). Si falta, se usa title. */
      seoTitle: z.string().optional(),
      description: z.string().max(170),
      category: z.enum(['Control solar', 'Seguridad', 'Decorativas', 'Sandblasting', 'Cuidado y mantenimiento']),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      readingTime: z.number().int().positive(),
      image: image(),
      imageAlt: z.string(),
      /** Slugs de productos relacionados (src/data/catalog.ts). */
      related: z.array(z.string()).default([]),
      faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    }),
});

export const collections = { guias };
