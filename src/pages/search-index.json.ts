/**
 * Índice de búsqueda estático (se genera al compilar). El buscador lo descarga solo al abrirse.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categories, products, productUrl, categoryUrl } from '@/data/catalog';
import { solutions, generalFaqs } from '@/data/solutions';

export interface SearchItem {
  t: string; // título
  u: string; // url
  k: 'Línea' | 'Película' | 'Guía' | 'Pregunta' | 'Página';
  d: string; // descripción corta (se muestra)
  x: string; // texto extra para buscar (no se muestra)
}

/** Palabras con que la gente busca cada línea, aunque no aparezcan en el texto. */
const synonyms: Record<string, string> = {
  'control-solar': 'polarizado polarizar tinte oscurecer calor sol ventanas termico uv rayos ahorro energia nanoceramica espejo reflectivo',
  seguridad: 'antivandalica antivandalismo antirrobo robo vidrio roto antiimpacto impacto astillas esquirlas laminado proteccion ninos sismo',
  decorativas: 'vinilo logo marca privacidad diseno vitrina publicidad letrero oficina persiana microperforado',
  sandblasting: 'esmerilado arenado frosted satinado opaco privacidad bano ducha division grabado',
};

export const GET: APIRoute = async () => {
  const items: SearchItem[] = [];

  for (const c of categories) {
    items.push({ t: c.name, u: categoryUrl(c.slug), k: 'Línea', d: c.cardText, x: `${c.short} ${c.eyebrow} ${synonyms[c.slug] ?? ''}` });
  }
  for (const p of products) {
    const lines = [p.category, ...(p.alsoIn ?? [])];
    items.push({
      t: p.name,
      u: productUrl(p),
      k: 'Película',
      d: p.summary,
      x: [p.highlights.join(' '), p.idealFor.join(' '), p.options?.values.join(' ') ?? '', lines.map((l) => synonyms[l] ?? '').join(' ')].join(' '),
    });
  }
  for (const g of await getCollection('guias')) {
    items.push({ t: g.data.title, u: `/guias/${g.id}/`, k: 'Guía', d: g.data.description, x: `${g.data.category} ${(g.body ?? '').slice(0, 1500)}` });
  }
  for (const s of solutions) {
    items.push({ t: `Soluciones para ${s.name.toLowerCase()}`, u: `/soluciones/${s.slug}/`, k: 'Página', d: s.lead, x: s.problems.map((p) => `${p.title} ${p.text}`).join(' ') });
  }
  items.push(
    { t: 'Cotizar / contacto', u: '/contacto/', k: 'Página', d: 'Cotización en menos de un día hábil y visita técnica con muestras reales.', x: 'cotizacion precio cuanto cuesta valor contacto telefono whatsapp correo visita medir' },
    { t: 'Nosotros', u: '/nosotros/', k: 'Página', d: 'Quiénes somos, cómo trabajamos y dónde instalamos.', x: 'empresa cobertura bogota sabana chia cajica' },
    { t: 'Catálogo completo', u: '/peliculas/', k: 'Página', d: 'Las 13 películas en cuatro líneas.', x: 'productos todas referencias' },
  );

  const faqSources = [
    ...generalFaqs.map((f) => ({ f, u: '/preguntas-frecuentes/#general' })),
    ...categories.flatMap((c) => c.faqs.map((f) => ({ f, u: `${categoryUrl(c.slug)}#preguntas` }))),
    ...products.flatMap((p) => p.faqs.map((f) => ({ f, u: `${productUrl(p)}#preguntas` }))),
  ];
  const seen = new Set<string>();
  for (const { f, u } of faqSources) {
    if (seen.has(f.q)) continue;
    seen.add(f.q);
    items.push({ t: f.q, u, k: 'Pregunta', d: f.a.length > 140 ? `${f.a.slice(0, 137)}…` : f.a, x: f.a });
  }

  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
