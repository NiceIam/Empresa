// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Dominio canónico. Cámbialo aquí o con la variable SITE_URL al desplegar.
const SITE_URL = process.env.SITE_URL ?? 'https://www.mavenfilms.com.co';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  output: 'static', // Todas las páginas se pre-renderizan; solo /api/* corre en el servidor Node.
  // Límite de cuerpo de 64 KB: el formulario nunca necesita más y evita agotar memoria.
  adapter: node({ mode: 'standalone', bodySizeLimit: 64 * 1024 }),
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  build: { format: 'directory', inlineStylesheets: 'auto' },
  image: { responsiveStyles: true },
  integrations: [
    sitemap({
      filter: (page) => !/\/(gracias|404)\/?$/.test(page),
      i18n: { defaultLocale: 'es', locales: { es: 'es-CO' } },
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const url = new URL(item.url);
        const depth = url.pathname.split('/').filter(Boolean).length;
        item.priority = depth === 0 ? 1 : depth === 1 ? 0.9 : depth === 2 ? 0.8 : 0.7;
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
