/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN CENTRAL DE MAVEN FILMS
 *  Todo dato de contacto, redes sociales y SEO global vive aquí.
 *  Cambia un valor en este archivo y se actualiza en todo el sitio
 *  (encabezado, pie de página, botones de WhatsApp y datos estructurados).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Maven Films',
  legalName: 'Maven Films S.A.S.',
  /** NIT de la empresa. Déjalo vacío hasta tenerlo; no se muestra si está vacío. */
  nit: '',
  tagline: 'Películas para vidrio que protegen, enfrían y transforman',
  description:
    'Películas para vidrio en Bogotá: control solar, nanocerámica, seguridad, esmerilado tipo sandblasting y vinilo decorativo. Visita técnica con muestras reales.',
  locale: 'es_CO',
  lang: 'es-CO',
  foundingYear: 2024,

  contact: {
    /** Número en formato internacional, solo dígitos (se usa para wa.me y tel:). */
    whatsapp: '573000000000',
    phone: '+573000000000',
    phoneDisplay: '+57 300 000 0000',
    email: 'ventas@mavenfilms.com.co',
    whatsappGreeting: 'Hola Maven Films, quiero cotizar películas para vidrio.',
  },

  address: {
    /** Dirección física. Si la dejas vacía, el sitio solo muestra ciudad y país. */
    street: '',
    locality: 'Bogotá',
    region: 'Bogotá D.C.',
    postalCode: '',
    country: 'CO',
    countryName: 'Colombia',
    /** Coordenadas para Google (opcional). */
    geo: { lat: 4.711, lng: -74.0721 },
  },

  /** Ciudades donde se instala. Alimenta el SEO local (areaServed). */
  serviceAreas: ['Bogotá', 'Chía', 'Cajicá', 'Zipaquirá', 'Soacha', 'Mosquera', 'Funza', 'Madrid', 'La Calera', 'Sopó', 'Cota'],

  hours: [
    { days: 'Lunes a viernes', open: '08:00', close: '18:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
    { days: 'Sábados', open: '08:00', close: '13:00', schema: ['Saturday'] },
  ],

  /**
   * REDES SOCIALES — pega aquí la URL completa de cada perfil cuando esté creado.
   * Las que queden vacías no se muestran en el sitio ni en los datos de Google.
   */
  social: {
    instagram: '',
    facebook: '',
    tiktok: '',
    youtube: '',
    linkedin: '',
    pinterest: '',
    /** Ficha de Google Business Profile (muy importante para SEO local). */
    googleBusiness: '',
  },

  /** Integraciones opcionales. Vacías = desactivadas. */
  integrations: {
    /** ID de Google Analytics 4, ej. G-XXXXXXXXXX */
    ga4: '',
    /** Código de verificación de Google Search Console (solo el valor de content). */
    googleSiteVerification: '',
    /** Código de verificación de Bing Webmaster Tools. */
    bingSiteVerification: '',
    /** ID del píxel de Meta (Facebook/Instagram Ads). */
    metaPixel: '',
  },
} as const;

export type SocialNetwork = keyof typeof site.social;

export const socialLabels: Record<SocialNetwork, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
  pinterest: 'Pinterest',
  googleBusiness: 'Google',
};

/** Redes con URL definida, en orden de aparición. */
export const activeSocial = (Object.entries(site.social) as [SocialNetwork, string][])
  .filter(([, url]) => url.trim().length > 0)
  .map(([network, url]) => ({ network, url, label: socialLabels[network] }));

export function whatsappUrl(message: string = site.contact.whatsappGreeting): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mainNav = [
  { label: 'Control solar', href: '/peliculas/control-solar/' },
  { label: 'Seguridad', href: '/peliculas/seguridad/' },
  { label: 'Decorativas', href: '/peliculas/decorativas/' },
  { label: 'Sandblasting', href: '/peliculas/sandblasting/' },
  { label: 'Guías', href: '/guias/' },
  { label: 'Nosotros', href: '/nosotros/' },
] as const;
