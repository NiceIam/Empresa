/**
 * Datos estructurados (JSON-LD) para Google. Un único grafo enlazado por @id.
 */
import { site, activeSocial } from '@/config/site';
import type { Faq } from '@/data/catalog';

const SITE = (import.meta.env.SITE ?? 'https://www.mavenfilms.com.co').replace(/\/$/, '');
export const abs = (path: string) => (path.startsWith('http') ? path : `${SITE}${path.startsWith('/') ? '' : '/'}${path}`);

export const ids = {
  org: `${SITE}/#organization`,
  business: `${SITE}/#localbusiness`,
  website: `${SITE}/#website`,
};

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': ids.org,
    name: site.name,
    legalName: site.legalName,
    url: `${SITE}/`,
    logo: {
      '@type': 'ImageObject',
      url: abs('/brand/maven-films-logo-512.png'),
      width: 512,
      height: 512,
    },
    description: site.description,
    foundingDate: String(site.foundingYear),
    email: site.contact.email,
    telephone: site.contact.phone,
    ...(site.nit ? { taxID: site.nit } : {}),
    ...(activeSocial.length ? { sameAs: activeSocial.map((s) => s.url) } : {}),
  };
}

export function localBusinessSchema() {
  const a = site.address;
  return {
    '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': ids.business,
    name: site.legalName,
    alternateName: site.name,
    url: `${SITE}/`,
    image: abs('/og/maven-films.jpg'),
    logo: abs('/brand/maven-films-logo-512.png'),
    description: site.description,
    telephone: site.contact.phone,
    email: site.contact.email,
    parentOrganization: { '@id': ids.org },
    address: {
      '@type': 'PostalAddress',
      ...(a.street ? { streetAddress: a.street } : {}),
      addressLocality: a.locality,
      addressRegion: a.region,
      ...(a.postalCode ? { postalCode: a.postalCode } : {}),
      addressCountry: a.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: a.geo.lat, longitude: a.geo.lng },
    areaServed: site.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.schema,
      opens: h.open,
      closes: h.close,
    })),
    knowsAbout: [
      'Películas para vidrio',
      'Polarizado arquitectónico',
      'Película nanocerámica',
      'Películas de control solar',
      'Películas de seguridad para vidrio',
      'Película esmerilada',
      'Sandblasting en vidrio',
      'Vinilo decorativo',
      'Vinilo microperforado',
    ],
    ...(activeSocial.length ? { sameAs: activeSocial.map((s) => s.url) } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: site.contact.phone,
      email: site.contact.email,
      areaServed: 'CO',
      availableLanguage: ['es'],
    },
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${SITE}/`,
    name: site.name,
    alternateName: site.legalName,
    inLanguage: site.lang,
    publisher: { '@id': ids.org },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string; image?: string; serviceType: string; offers?: { name: string; url: string }[] }) {
  return {
    '@type': 'Service',
    '@id': `${abs(opts.url)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: abs(opts.url),
    ...(opts.image ? { image: opts.image } : {}),
    provider: { '@id': ids.business },
    areaServed: site.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    ...(opts.offers?.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: opts.name,
            itemListElement: opts.offers.map((o) => ({
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: o.name, url: abs(o.url) },
            })),
          },
        }
      : {}),
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: abs(it.url) })),
  };
}

export function articleSchema(opts: { title: string; description: string; url: string; image: string; published: Date; updated?: Date }) {
  return {
    '@type': 'Article',
    '@id': `${abs(opts.url)}#article`,
    headline: opts.title,
    description: opts.description,
    image: [opts.image],
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    author: { '@type': 'Organization', name: site.name, url: `${SITE}/` },
    publisher: { '@id': ids.org },
    mainEntityOfPage: abs(opts.url),
    inLanguage: site.lang,
  };
}

export function howToSchema(name: string, steps: { title: string; text: string }[]) {
  return {
    '@type': 'HowTo',
    name,
    step: steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })),
  };
}
