/**
 * Catálogo de Maven Films: líneas (categorías) y productos.
 * Los precios son internos y NO se publican en el sitio.
 * Los valores técnicos son de referencia; ajústalos según la ficha del fabricante.
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '@/components/ui/Icon.astro';

import salaVentanales from '@/assets/images/sala-ventanales.jpg';
import casaTechoPlano from '@/assets/images/casa-techo-plano.jpg';
import casaJardin from '@/assets/images/casa-jardin.jpg';
import fachadaGeometrica from '@/assets/images/fachada-geometrica.jpg';
import fachadaAzul from '@/assets/images/fachada-azul.jpg';
import localComercial from '@/assets/images/local-comercial.jpg';
import salaJuntas from '@/assets/images/sala-juntas-esmerilada.jpg';
import divisorEsmerilado from '@/assets/images/divisor-esmerilado.jpg';
import panelesEsmerilados from '@/assets/images/interior-paneles-esmerilados.jpg';
import luzPersianas from '@/assets/images/luz-persianas.jpg';
import oficinaParticiones from '@/assets/images/oficina-particiones.jpg';
import salaVentanalesWide from '@/assets/images/sala-ventanales-wide.jpg';
import panelesWide from '@/assets/images/interior-paneles-esmerilados-wide.jpg';
import divisorWide from '@/assets/images/divisor-esmerilado-wide.jpg';

export type CategorySlug = 'control-solar' | 'seguridad' | 'decorativas' | 'sandblasting';

export interface Faq {
  q: string;
  a: string;
}

export interface Feature {
  icon: IconName;
  title: string;
  text: string;
}

export interface Product {
  slug: string;
  category: Exclude<CategorySlug, 'sandblasting'>;
  /** Líneas adicionales donde también se muestra. */
  alsoIn?: CategorySlug[];
  name: string;
  /** Frase corta para tarjetas. */
  summary: string;
  seoTitle: string;
  seoDescription: string;
  badge?: string;
  description: string[];
  highlights: string[];
  options?: { label: string; values: string[] };
  specs: { label: string; value: string }[];
  idealFor: string[];
  image: ImageMetadata;
  imageAlt: string;
  faqs: Faq[];
  /** Escala 1–5 para la tabla comparativa de la línea. */
  ratings?: { calor?: number; privacidad?: number; seguridad?: number; visibilidad?: number };
}

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Nombre corto para menús. */
  short: string;
  icon: IconName;
  h1: string;
  eyebrow: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  cardText: string;
  image: ImageMetadata;
  /** Imagen panorámica para el encabezado de la página. */
  heroImage: ImageMetadata;
  imageAlt: string;
  intro: string[];
  benefits: Feature[];
  faqs: Faq[];
}

export const categories: Category[] = [
  {
    slug: 'control-solar',
    name: 'Películas de control solar',
    short: 'Control solar',
    icon: 'sun',
    eyebrow: 'Control solar y polarizado arquitectónico',
    h1: 'Películas de control solar para ventanas y fachadas',
    lead: 'Bloquea hasta el 99 % de los rayos UV y reduce el calor que entra por el vidrio, sin perder la vista. Tonos de 5 %, 20 %, 35 % y 50 %, y nanocerámica de alta visibilidad.',
    seoTitle: 'Películas de control solar y polarizado para vidrio',
    seoDescription: 'Polarizado arquitectónico convencional, nanocerámico y espejo. Menos calor y brillo, 99 % de bloqueo UV. Tonos 5 %, 20 %, 35 % y 50 %. Instalación en Bogotá.',
    cardText: 'Menos calor, menos brillo y 99 % de protección UV en casas, oficinas y fachadas.',
    image: salaVentanales,
    heroImage: salaVentanalesWide,
    imageAlt: 'Sala moderna con ventanales de piso a techo y vista a la montaña',
    intro: [
      'Una película de control solar es una lámina de poliéster ópticamente transparente que se adhiere a la cara interior del vidrio. Filtra la radiación ultravioleta, una parte de la luz visible y, según la tecnología, la radiación infrarroja que produce la sensación de calor.',
      'En Maven Films trabajamos tres tecnologías: polarizado convencional (teñido), nanocerámica y reflectiva tipo espejo. La elección depende de cuánto calor quieres rechazar, cuánta privacidad necesitas y cuánta luz natural quieres conservar. Te ayudamos a decidir con una visita técnica.',
    ],
    benefits: [
      { icon: 'thermometer-sun', title: 'Espacios más frescos', text: 'Reduce la ganancia de calor solar y las zonas calientes junto a las ventanas.' },
      { icon: 'sun', title: '99 % de bloqueo UV', text: 'Protege la piel y evita que pisos, muebles y cortinas se decoloren.' },
      { icon: 'scan-eye', title: 'Menos deslumbramiento', text: 'Trabaja frente a pantallas y ventanales sin reflejos molestos.' },
      { icon: 'leaf', title: 'Ahorro en climatización', text: 'Menos carga térmica significa aire acondicionado trabajando menos horas.' },
    ],
    faqs: [
      {
        q: '¿Qué significan los porcentajes 5 %, 20 %, 35 % y 50 %?',
        a: 'Indican la transmisión de luz visible (VLT): el porcentaje de luz que deja pasar la película. Un 5 % es muy oscuro y da máxima privacidad; un 50 % es sutil y conserva casi toda la luz natural. La nanocerámica MKR70 deja pasar alrededor del 70 %.',
      },
      {
        q: '¿El polarizado oscurece mucho la casa por dentro?',
        a: 'Depende del tono. Para viviendas recomendamos 35 % o 50 %, o nanocerámica de alta visibilidad, que rechaza calor sin oscurecer. Los tonos de 5 % y 20 % se usan cuando la prioridad es privacidad o hay sol directo muy intenso.',
      },
      {
        q: '¿La película de control solar se ve desde afuera?',
        a: 'Las películas teñidas y nanocerámicas dan un aspecto ligeramente ahumado. Las reflectivas tipo espejo (plata o bronce) se ven como espejo desde afuera durante el día, lo que da privacidad diurna y una fachada uniforme.',
      },
      {
        q: '¿Cuánto calor bloquea una película nanocerámica?',
        a: 'Las nanocerámicas pueden rechazar una gran parte de la radiación infrarroja (en fichas técnicas suele verse hasta 90 % o más del IR), sin metales y sin oscurecer en exceso. El rechazo de energía solar total depende del tono y del tipo de vidrio.',
      },
    ],
  },
  {
    slug: 'seguridad',
    name: 'Películas de seguridad para vidrio',
    short: 'Seguridad',
    icon: 'shield-check',
    eyebrow: 'Seguridad y antivandalismo',
    h1: 'Películas de seguridad para vidrios: 4 mil y 8 mil',
    lead: 'Mantiene unidos los fragmentos del vidrio cuando se rompe, retrasa intentos de intrusión y protege a las personas. Transparente o con tono para sumar control solar.',
    seoTitle: 'Película de seguridad para vidrios 4 y 8 mil',
    seoDescription: 'Películas de seguridad antiimpacto de 4 y 8 mil para ventanas, vitrinas y puertas. Retienen fragmentos y retrasan intrusiones. Instalación en Bogotá.',
    cardText: 'Retiene los fragmentos del vidrio y retrasa intrusiones en vitrinas, ventanas y puertas.',
    image: localComercial,
    heroImage: localComercial,
    imageAlt: 'Local comercial con fachada y puertas de vidrio',
    intro: [
      'Una película de seguridad es una lámina de poliéster de alta resistencia, más gruesa que una de control solar, con un adhesivo agresivo diseñado para mantener el vidrio unido si se quiebra. El espesor se mide en milésimas de pulgada (mil): 4 mil equivalen a unos 100 micrones y 8 mil a unos 200 micrones.',
      'No convierte el vidrio en blindado, pero sí cambia lo que pasa en un impacto: en lugar de esquirlas sueltas, el vidrio queda adherido a la película. Eso reduce lesiones por accidentes, sismos o vandalismo y hace más lento y ruidoso un intento de ingreso.',
    ],
    benefits: [
      { icon: 'shield-check', title: 'Retiene fragmentos', text: 'El vidrio queda unido a la película y no se convierte en esquirlas.' },
      { icon: 'timer', title: 'Retrasa intrusiones', text: 'Atravesar el vidrio toma más tiempo y hace más ruido.' },
      { icon: 'users', title: 'Protege a las personas', text: 'Menos riesgo de cortes por accidentes, golpes o movimientos sísmicos.' },
      { icon: 'sun', title: 'Filtra UV', text: 'Todas bloquean la radiación UV; las versiones con tono también reducen calor.' },
    ],
    faqs: [
      {
        q: '¿Cuál es la diferencia entre película de seguridad de 4 mil y de 8 mil?',
        a: 'El espesor. La de 4 mil (≈100 micrones) es ideal para prevención de accidentes en ventanas y divisiones. La de 8 mil (≈200 micrones) ofrece mayor resistencia al impacto y se recomienda para vitrinas, primeros pisos, puertas y zonas expuestas a vandalismo.',
      },
      {
        q: '¿La película de seguridad hace el vidrio irrompible?',
        a: 'No. El vidrio puede romperse, pero los fragmentos quedan adheridos a la película. Eso protege a las personas y retrasa el ingreso. Para mayor desempeño se puede complementar con un sistema de anclaje perimetral.',
      },
      {
        q: '¿Se nota la película de seguridad transparente?',
        a: 'Prácticamente no. La versión transparente es ópticamente clara; desde una distancia normal el vidrio se ve igual. Si quieres además control solar o privacidad, existe la versión con tono.',
      },
      {
        q: '¿Sirve para vidrios de edificios y conjuntos residenciales?',
        a: 'Sí. Es muy usada en porterías, lobbies, escaleras, barandas de vidrio y ventanas de primeros pisos en propiedad horizontal, donde un vidrio roto representa un riesgo para residentes y visitantes.',
      },
    ],
  },
  {
    slug: 'decorativas',
    name: 'Películas decorativas para vidrio',
    short: 'Decorativas',
    icon: 'palette',
    eyebrow: 'Diseño, privacidad y marca',
    h1: 'Películas decorativas y vinilos para vidrio',
    lead: 'Privacidad con luz, identidad de marca y diseño en cualquier superficie de vidrio. Esmerilado, opalizado, vinilo de color, venetian y microperforado, en corte o impresión.',
    seoTitle: 'Películas decorativas y vinilo para vidrio',
    seoDescription: 'Películas decorativas para vidrio: esmerilado, opalizado, vinilo, venetian y microperforado, en corte o impresión. Privacidad y marca. Instalación profesional.',
    cardText: 'Privacidad con luz, diseño y señalética de marca en divisiones, vitrinas y puertas.',
    image: salaJuntas,
    heroImage: panelesWide,
    imageAlt: 'Sala de juntas con divisiones de vidrio decoradas con franja esmerilada y vinilo',
    intro: [
      'Las películas decorativas transforman un vidrio común en un elemento de diseño. Permiten dar privacidad sin bloquear la luz, señalizar puertas de vidrio para evitar accidentes, aplicar la identidad de tu marca o crear patrones a la medida.',
      'Se instalan en horas, no generan escombros ni olores, y se pueden retirar o renovar cuando cambias la imagen de tu espacio. Es una alternativa limpia, rápida y económica al vidrio grabado o pintado.',
    ],
    benefits: [
      { icon: 'eye-off', title: 'Privacidad con luz', text: 'Oculta lo que necesitas sin oscurecer el espacio.' },
      { icon: 'scissors', title: 'Corte a la medida', text: 'Franjas, logos, letras y patrones cortados en plotter.' },
      { icon: 'printer', title: 'Impresión digital', text: 'Diseños a todo color con tu marca o tu propia imagen.' },
      { icon: 'rotate-ccw', title: 'Renovable', text: 'Se retira sin dañar el vidrio cuando quieras cambiar.' },
    ],
    faqs: [
      {
        q: '¿Puedo poner el logo de mi empresa en el vidrio?',
        a: 'Sí. Lo hacemos en película esmerilada (efecto sandblasting), en vinilo de color o impreso a todo color. Recibimos tu logo en vector (AI, PDF, SVG) y preparamos un montaje para que lo apruebes antes de instalar.',
      },
      {
        q: '¿La película decorativa se puede retirar?',
        a: 'Sí. Se retira con calor moderado y el adhesivo residual se limpia sin dañar el vidrio. Por eso es ideal para oficinas arrendadas y locales comerciales.',
      },
      {
        q: '¿Qué es una película microperforada?',
        a: 'Es un vinilo impreso con miles de perforaciones pequeñas. Desde afuera se ve la imagen impresa; desde adentro se ve hacia el exterior. Es muy usada en vitrinas y fachadas comerciales.',
      },
    ],
  },
  {
    slug: 'sandblasting',
    name: 'Sandblasting para vidrio',
    short: 'Sandblasting',
    icon: 'sparkles',
    eyebrow: 'Efecto sandblasting sin arena',
    h1: 'Sandblasting para vidrio con película esmerilada',
    lead: 'El acabado elegante del vidrio arenado, sin desmontar, sin polvo y sin riesgo de romper el vidrio. Franjas, logos, patrones y privacidad total o parcial.',
    seoTitle: 'Sandblasting para vidrio en Bogotá | Película esmerilada',
    seoDescription: 'Efecto sandblasting en vidrio con película esmerilada: franjas, logos y diseños a medida para oficinas y baños. Sin polvo, sin desmontar y removible.',
    cardText: 'El acabado del vidrio arenado con película: franjas, logos y diseños sin polvo ni obra.',
    image: divisorEsmerilado,
    heroImage: divisorWide,
    imageAlt: 'Puerta corrediza de vidrio con acabado esmerilado tipo sandblasting',
    intro: [
      'El sandblasting tradicional desgasta el vidrio con chorro de arena a presión: es permanente, requiere desmontar el vidrio y debilita su superficie. La película esmerilada logra el mismo acabado satinado aplicándose en sitio, en pocas horas y sin alterar el vidrio.',
      'Además permite lo que el arenado no: cortar diseños complejos con precisión, imprimir degradados, cambiar el diseño en el futuro y retirarlo si el espacio cambia de uso. Por eso hoy es la opción preferida en oficinas, baños, consultorios, puertas de ducha y divisiones.',
    ],
    benefits: [
      { icon: 'sparkles', title: 'Acabado satinado', text: 'El mismo aspecto elegante del vidrio arenado.' },
      { icon: 'hammer', title: 'Sin obra ni polvo', text: 'Se instala en sitio, sin desmontar el vidrio.' },
      { icon: 'frame', title: 'Diseño a la medida', text: 'Franjas, logos, numeración y patrones cortados en plotter.' },
      { icon: 'rotate-ccw', title: 'Reversible', text: 'Se retira o cambia sin dejar marcas en el vidrio.' },
    ],
    faqs: [
      {
        q: '¿Qué diferencia hay entre sandblasting y película esmerilada?',
        a: 'El sandblasting graba el vidrio con arena a presión: es permanente y requiere desmontarlo. La película esmerilada logra un acabado visualmente muy similar, se instala en sitio, no debilita el vidrio y se puede retirar o cambiar.',
      },
      {
        q: '¿La película esmerilada se puede usar en baños y duchas?',
        a: 'Sí. Se instala por la cara seca del vidrio cuando es posible y resiste la humedad del ambiente. Se limpia con agua y jabón neutro, sin productos abrasivos.',
      },
      {
        q: '¿Qué ancho tienen los rollos de película esmerilada?',
        a: 'Trabajamos rollos de 1,52 m y de 1,22 m de ancho. En vidrios más grandes se hacen uniones casi imperceptibles, o se diseña la pieza con franjas para aprovechar el material.',
      },
    ],
  },
];

export const products: Product[] = [
  // ─── CONTROL SOLAR ─────────────────────────────────────────────────────────
  {
    slug: 'polarizado-convencional',
    category: 'control-solar',
    name: 'Polarizado convencional',
    summary: 'Privacidad y menos brillo con la mejor relación costo-beneficio.',
    seoTitle: 'Polarizado convencional para ventanas: 5 % a 50 %',
    seoDescription: 'Polarizado convencional para ventanas de casas y oficinas: privacidad, menos brillo y 99 % de bloqueo UV. Tonos 5 %, 20 %, 35 % y 50 %. Cotiza gratis.',
    description: [
      'El polarizado convencional es una película de poliéster teñida que reduce la cantidad de luz que entra por el vidrio. Es la forma más directa de ganar privacidad, controlar el deslumbramiento y bloquear la radiación ultravioleta.',
      'Es la opción ideal cuando la prioridad es la privacidad o el confort visual, y el presupuesto importa. Si el problema principal es el calor intenso, te recomendaremos considerar la nanocerámica.',
    ],
    highlights: ['Bloquea hasta 99 % de rayos UV', 'Reduce el deslumbramiento en pantallas', 'Privacidad diurna según el tono', 'Excelente relación costo-beneficio'],
    options: { label: 'Tonos disponibles (VLT)', values: ['5 %', '20 %', '35 %', '50 %'] },
    specs: [
      { label: 'Tecnología', value: 'Poliéster teñido' },
      { label: 'Bloqueo UV', value: 'Hasta 99 %' },
      { label: 'Transmisión de luz visible', value: '5 %, 20 %, 35 % o 50 %' },
      { label: 'Instalación', value: 'Cara interior del vidrio' },
      { label: 'Interferencia de señal', value: 'No interfiere' },
    ],
    idealFor: ['Habitaciones y estudios', 'Ventanas a la calle', 'Oficinas con pantallas', 'Locales con presupuesto ajustado'],
    image: casaTechoPlano,
    imageAlt: 'Casa moderna con ventanales corridos en el segundo piso',
    ratings: { calor: 2, privacidad: 4, seguridad: 1, visibilidad: 3 },
    faqs: [
      {
        q: '¿El polarizado convencional se decolora con el tiempo?',
        a: 'Las películas teñidas pueden perder intensidad tras varios años de sol directo. Si buscas máxima estabilidad de color a largo plazo, la nanocerámica no se decolora porque su desempeño no depende de tintes.',
      },
      {
        q: '¿Qué tono me recomiendan para una habitación?',
        a: 'Para dormir con más oscuridad y privacidad, 20 % o 5 %. Para conservar luz natural con algo de privacidad, 35 %. Te llevamos muestras para que compares en tu propio vidrio.',
      },
    ],
  },
  {
    slug: 'polarizado-nanoceramico',
    category: 'control-solar',
    name: 'Polarizado nanocerámico',
    badge: 'Más vendido',
    summary: 'Máximo rechazo de calor sin metales, sin decolorarse y sin bloquear señales.',
    seoTitle: 'Polarizado nanocerámico para vidrios | Rechazo de calor',
    seoDescription: 'Película nanocerámica para ventanas: alto rechazo de calor, 99 % UV, no se decolora ni afecta el WiFi. Tonos 5 %, 20 %, 35 % y 50 %. Instalación en Bogotá.',
    description: [
      'El polarizado nanocerámico incorpora partículas cerámicas a escala nanométrica que absorben y rechazan la radiación infrarroja, la responsable de la sensación de calor. Por eso enfría mucho más que un polarizado convencional del mismo tono.',
      'Al no contener metales, no interfiere con WiFi, celular ni GPS, no genera efecto espejo y mantiene su color estable durante toda su vida útil. Es la película que más recomendamos cuando el problema es el calor.',
    ],
    highlights: ['Alto rechazo de calor infrarrojo', 'Bloquea hasta 99 % de rayos UV', 'Sin metales: no interfiere con señales', 'Color estable, no se decolora'],
    options: { label: 'Tonos disponibles (VLT)', values: ['5 %', '20 %', '35 %', '50 %'] },
    specs: [
      { label: 'Tecnología', value: 'Nanocerámica, sin metales' },
      { label: 'Rechazo de infrarrojo', value: 'Alto (hasta 90 % o más según tono)' },
      { label: 'Bloqueo UV', value: 'Hasta 99 %' },
      { label: 'Transmisión de luz visible', value: '5 %, 20 %, 35 % o 50 %' },
      { label: 'Interferencia de señal', value: 'Ninguna' },
      { label: 'Reflectividad', value: 'Baja, sin efecto espejo' },
    ],
    idealFor: ['Salas y apartamentos con sol de tarde', 'Oficinas con fachada de vidrio', 'Consultorios y salas de espera', 'Espacios con aire acondicionado'],
    image: casaJardin,
    imageAlt: 'Casa contemporánea con ventanales de piso a techo y jardín',
    ratings: { calor: 4, privacidad: 3, seguridad: 1, visibilidad: 4 },
    faqs: [
      {
        q: '¿Vale la pena pagar más por la nanocerámica?',
        a: 'Si el calor es tu problema principal, sí. A igual tono, la nanocerámica rechaza mucho más calor que una película teñida, conserva su color y no afecta las señales inalámbricas.',
      },
      {
        q: '¿La nanocerámica afecta el WiFi o la señal del celular?',
        a: 'No. A diferencia de las películas metalizadas, la nanocerámica no contiene metales y no bloquea señales de radio.',
      },
    ],
  },
  {
    slug: 'pelicula-reflectiva-espejo',
    category: 'control-solar',
    name: 'Película reflectiva tipo espejo',
    summary: 'Efecto espejo plata o bronce: privacidad diurna y alto rechazo solar.',
    seoTitle: 'Película reflectiva tipo espejo para vidrio',
    seoDescription: 'Película reflectiva tipo espejo plata o bronce: privacidad diurna, alto rechazo solar y fachada uniforme. Ideal para oficinas y edificios. Cotiza gratis.',
    description: [
      'La película reflectiva tiene una capa metalizada que refleja buena parte de la energía solar antes de que entre al espacio. Desde afuera el vidrio se ve como un espejo plateado o bronce; desde adentro se mantiene la visibilidad hacia el exterior.',
      'Es la solución clásica para fachadas comerciales y oficinas con sol directo: unifica la apariencia del edificio y da privacidad durante el día. De noche, con la luz encendida adentro, el efecto se invierte; lo explicamos en la asesoría para que tomes la mejor decisión.',
    ],
    highlights: ['Privacidad durante el día', 'Alto rechazo de energía solar', 'Fachada uniforme y elegante', 'Disponible en plata y bronce'],
    options: { label: 'Acabados', values: ['Plata', 'Bronce'] },
    specs: [
      { label: 'Tecnología', value: 'Película metalizada reflectiva' },
      { label: 'Acabado exterior', value: 'Espejo plata o bronce' },
      { label: 'Bloqueo UV', value: 'Hasta 99 %' },
      { label: 'Privacidad', value: 'Diurna (se invierte de noche)' },
      { label: 'Uso recomendado', value: 'Fachadas y ventanas con sol directo' },
    ],
    idealFor: ['Fachadas de oficinas', 'Edificios corporativos', 'Ventanas con sol directo todo el día', 'Locales que buscan privacidad diurna'],
    image: fachadaGeometrica,
    imageAlt: 'Fachada de edificio con paneles de vidrio reflectivo',
    ratings: { calor: 5, privacidad: 5, seguridad: 1, visibilidad: 2 },
    faqs: [
      {
        q: '¿De noche se ve hacia adentro con película espejo?',
        a: 'Sí. El efecto espejo funciona hacia el lado con más luz. De noche, si adentro hay luces encendidas, desde afuera se podrá ver. Para privacidad nocturna se complementa con cortinas o se elige otra película.',
      },
      {
        q: '¿Puedo instalar película espejo en un apartamento?',
        a: 'Técnicamente sí, pero en propiedad horizontal conviene revisar el reglamento, porque cambia la apariencia de la fachada. En esos casos solemos recomendar nanocerámica.',
      },
    ],
  },
  {
    slug: 'nanoceramica-mkr70',
    category: 'control-solar',
    name: 'Nanocerámica MKR70',
    badge: 'Alta visibilidad',
    summary: 'Casi invisible: rechaza calor dejando pasar cerca del 70 % de la luz.',
    seoTitle: 'Nanocerámica MKR70: película clara que rechaza calor',
    seoDescription: 'Nanocerámica MKR70 de alta visibilidad: rechaza calor y 99 % UV dejando pasar cerca del 70 % de la luz. Casi invisible, ideal para fachadas y conjuntos.',
    description: [
      'La nanocerámica MKR70 es una película de alta visibilidad: deja pasar alrededor del 70 % de la luz visible, por lo que el vidrio se ve prácticamente igual, pero rechaza una parte importante del calor infrarrojo y bloquea la radiación UV.',
      'Es la elección cuando quieres confort térmico sin cambiar la apariencia del espacio: apartamentos con reglamentos de fachada, oficinas que necesitan mucha luz natural o vitrinas donde el producto debe verse perfecto.',
    ],
    highlights: ['Prácticamente invisible', 'Rechaza calor sin oscurecer', 'Bloquea hasta 99 % de rayos UV', 'No altera la fachada'],
    options: { label: 'Transmisión de luz visible', values: ['≈ 70 %'] },
    specs: [
      { label: 'Tecnología', value: 'Nanocerámica de alta visibilidad' },
      { label: 'Transmisión de luz visible', value: '≈ 70 %' },
      { label: 'Bloqueo UV', value: 'Hasta 99 %' },
      { label: 'Reflectividad', value: 'Muy baja' },
      { label: 'Interferencia de señal', value: 'Ninguna' },
    ],
    idealFor: ['Conjuntos con reglamento de fachada', 'Vitrinas y showrooms', 'Oficinas que necesitan luz natural', 'Salas con vista panorámica'],
    image: salaVentanales,
    imageAlt: 'Ventanal panorámico en sala de estar luminosa',
    ratings: { calor: 3, privacidad: 1, seguridad: 1, visibilidad: 5 },
    faqs: [
      {
        q: '¿Si casi no se ve, de verdad enfría?',
        a: 'Sí. El calor que sentimos viene principalmente del infrarrojo, que es invisible. La nanocerámica filtra ese infrarrojo sin necesidad de bloquear la luz visible.',
      },
      {
        q: '¿La MKR70 da privacidad?',
        a: 'No de forma significativa, porque está diseñada para conservar la visibilidad. Si necesitas privacidad, combínala con un tono más oscuro o con película decorativa en las zonas que lo requieran.',
      },
    ],
  },

  // ─── SEGURIDAD ─────────────────────────────────────────────────────────────
  {
    slug: 'seguridad-transparente-4-mil',
    category: 'seguridad',
    name: 'Seguridad transparente 4 mil',
    summary: 'Prevención de accidentes: el vidrio queda unido si se rompe.',
    seoTitle: 'Película de seguridad transparente 4 mil para vidrio',
    seoDescription: 'Película de seguridad transparente de 4 mil (≈100 micrones) para ventanas, divisiones y barandas. Retiene fragmentos y previene accidentes.',
    description: [
      'La película de seguridad transparente de 4 mil (aproximadamente 100 micrones) es la protección esencial para cualquier vidrio. Si el vidrio se rompe por un golpe, un accidente o un movimiento sísmico, los fragmentos quedan adheridos a la película.',
      'Es ópticamente clara: tu ventana se ve igual que antes. Es la opción recomendada para hogares con niños, divisiones de oficina, ventanas de escaleras y zonas de alto tránsito.',
    ],
    highlights: ['Retiene fragmentos en caso de rotura', 'Ópticamente transparente', 'Bloquea hasta 99 % de rayos UV', 'Ideal para prevención de accidentes'],
    specs: [
      { label: 'Espesor', value: '4 mil (≈ 100 micrones)' },
      { label: 'Apariencia', value: 'Transparente' },
      { label: 'Función principal', value: 'Retención de fragmentos' },
      { label: 'Bloqueo UV', value: 'Hasta 99 %' },
    ],
    idealFor: ['Hogares con niños', 'Divisiones de oficina', 'Ventanas de escaleras', 'Puertas y paneles de vidrio'],
    image: casaJardin,
    imageAlt: 'Vivienda con puertas y ventanales de vidrio hacia el jardín',
    ratings: { calor: 1, privacidad: 1, seguridad: 3, visibilidad: 5 },
    faqs: [
      {
        q: '¿La película de 4 mil sirve contra robos?',
        a: 'Ayuda a retrasar, pero para vitrinas, primeros pisos y zonas expuestas recomendamos la de 8 mil, que ofrece mayor resistencia al impacto.',
      },
    ],
  },
  {
    slug: 'seguridad-transparente-8-mil',
    category: 'seguridad',
    name: 'Seguridad transparente 8 mil',
    badge: 'Máxima resistencia',
    summary: 'Doble espesor para vitrinas, primeros pisos y zonas vulnerables.',
    seoTitle: 'Película de seguridad 8 mil antivandálica',
    seoDescription: 'Película de seguridad de 8 mil (≈200 micrones), antivandálica para vitrinas, locales, primeros pisos y puertas. Retrasa intrusiones y retiene fragmentos.',
    description: [
      'Con 8 mil de espesor (aproximadamente 200 micrones), esta película duplica el cuerpo de la versión de 4 mil. Resiste mejor los impactos repetidos y hace que atravesar el vidrio tome más tiempo y genere más ruido: dos factores que disuaden un intento de ingreso.',
      'Es la protección recomendada para locales comerciales, vitrinas, primeros pisos, porterías y puertas de vidrio. Se mantiene transparente para que tu fachada siga luciendo igual.',
    ],
    highlights: ['Mayor resistencia al impacto', 'Retrasa intentos de intrusión', 'Ópticamente transparente', 'Recomendada para vitrinas y primeros pisos'],
    specs: [
      { label: 'Espesor', value: '8 mil (≈ 200 micrones)' },
      { label: 'Apariencia', value: 'Transparente' },
      { label: 'Función principal', value: 'Antiimpacto y antivandálica' },
      { label: 'Bloqueo UV', value: 'Hasta 99 %' },
      { label: 'Complemento opcional', value: 'Anclaje perimetral' },
    ],
    idealFor: ['Vitrinas y locales comerciales', 'Primeros pisos y casas', 'Porterías y lobbies', 'Puertas de vidrio exteriores'],
    image: localComercial,
    imageAlt: 'Fachada de vidrio de un local comercial',
    ratings: { calor: 1, privacidad: 1, seguridad: 5, visibilidad: 5 },
    faqs: [
      {
        q: '¿Qué es el anclaje perimetral?',
        a: 'Es un sellado estructural que une la película al marco de la ventana. Así, si el vidrio se rompe, la lámina completa permanece sujeta al marco. Mejora mucho el desempeño en vitrinas.',
      },
    ],
  },
  {
    slug: 'seguridad-tono-convencional-4-mil',
    category: 'seguridad',
    name: 'Seguridad con tono convencional 4 mil',
    summary: 'Seguridad y privacidad en una sola película.',
    seoTitle: 'Película de seguridad polarizada 4 mil',
    seoDescription: 'Película de seguridad de 4 mil con tono polarizado: retiene fragmentos, da privacidad y reduce el brillo. Ideal para ventanas a la calle y oficinas.',
    description: [
      'Combina en una sola lámina la protección de una película de seguridad de 4 mil con el tono de un polarizado convencional. El vidrio queda protegido contra rotura y, al mismo tiempo, ganas privacidad y menos brillo.',
      'Es una solución muy eficiente para ventanas que dan a la calle, oficinas en primeros pisos y consultorios, donde se necesitan las dos cosas.',
    ],
    highlights: ['Retiene fragmentos', 'Privacidad y menos deslumbramiento', 'Bloquea hasta 99 % de rayos UV', 'Dos beneficios en una instalación'],
    specs: [
      { label: 'Espesor', value: '4 mil (≈ 100 micrones)' },
      { label: 'Apariencia', value: 'Con tono (polarizado convencional)' },
      { label: 'Funciones', value: 'Seguridad + privacidad + UV' },
    ],
    idealFor: ['Ventanas a la calle', 'Oficinas y consultorios', 'Primeros pisos residenciales'],
    image: oficinaParticiones,
    imageAlt: 'Oficina abierta con ventanas y divisiones de vidrio',
    ratings: { calor: 2, privacidad: 4, seguridad: 3, visibilidad: 3 },
    faqs: [
      {
        q: '¿En qué tonos viene la película de seguridad polarizada?',
        a: 'La definimos contigo en la visita técnica según el nivel de privacidad que necesitas. Te llevamos muestras para que veas el resultado sobre tu vidrio.',
      },
    ],
  },
  {
    slug: 'seguridad-tono-nanoceramico-4-mil',
    category: 'seguridad',
    name: 'Seguridad con tono nanocerámico 4 mil',
    badge: 'Premium',
    summary: 'Seguridad, privacidad y el mayor rechazo de calor, sin metales.',
    seoTitle: 'Película de seguridad nanocerámica 4 mil',
    seoDescription: 'Película de seguridad 4 mil con nanocerámica: retiene fragmentos, rechaza calor y bloquea 99 % UV sin afectar señales. La protección más completa.',
    description: [
      'Es la película más completa de nuestro portafolio: la estructura de una película de seguridad de 4 mil con la tecnología nanocerámica de control solar. Protege a las personas, reduce el calor y bloquea la radiación UV en una sola instalación.',
      'Ideal para fachadas residenciales y corporativas donde la seguridad y el confort térmico importan por igual, sin efecto espejo y sin interferir con WiFi ni celular.',
    ],
    highlights: ['Retiene fragmentos', 'Alto rechazo de calor', 'Sin metales: no interfiere con señales', 'Color estable en el tiempo'],
    specs: [
      { label: 'Espesor', value: '4 mil (≈ 100 micrones)' },
      { label: 'Tecnología', value: 'Nanocerámica, sin metales' },
      { label: 'Funciones', value: 'Seguridad + control solar + UV' },
      { label: 'Interferencia de señal', value: 'Ninguna' },
    ],
    idealFor: ['Casas y apartamentos en primeros pisos', 'Fachadas corporativas', 'Consultorios y clínicas', 'Colegios y jardines infantiles'],
    image: fachadaAzul,
    imageAlt: 'Fachada de edificio corporativo en vidrio azul',
    ratings: { calor: 4, privacidad: 3, seguridad: 3, visibilidad: 4 },
    faqs: [
      {
        q: '¿Conviene más esta película que instalar dos por separado?',
        a: 'Sí. Una sola lámina que integra seguridad y nanocerámica tiene mejor claridad óptica y una instalación más limpia que superponer dos películas.',
      },
    ],
  },

  // ─── DECORATIVAS ───────────────────────────────────────────────────────────
  {
    slug: 'frosted-esmerilado',
    category: 'decorativas',
    alsoIn: ['sandblasting'],
    name: 'Frosted esmerilado',
    badge: 'Efecto sandblasting',
    summary: 'El acabado del vidrio arenado, en corte o impresión.',
    seoTitle: 'Película esmerilada frosted: efecto sandblasting',
    seoDescription: 'Película esmerilada frosted con efecto sandblasting: franjas, logos y diseños en corte o impresión. Rollos de 1,52 y 1,22 m. Privacidad con luz.',
    description: [
      'La película frosted reproduce el acabado satinado del vidrio arenado. Deja pasar la luz pero difumina la vista, por lo que es perfecta para dar privacidad en divisiones, puertas, baños y salas de juntas.',
      'Se puede instalar completa, en franjas o con diseños cortados en plotter: logos, numeración, patrones geométricos o mensajes. También se puede imprimir para lograr degradados y efectos especiales.',
    ],
    highlights: ['Acabado tipo sandblasting', 'Privacidad sin perder luz', 'Corte en plotter o impresión', 'Removible sin dañar el vidrio'],
    options: { label: 'Formatos', values: ['En corte', 'En impresión', 'Rollo 1,52 m', 'Rollo 1,22 m'] },
    specs: [
      { label: 'Acabado', value: 'Esmerilado satinado' },
      { label: 'Ancho de rollo', value: '1,52 m o 1,22 m' },
      { label: 'Personalización', value: 'Corte en plotter o impresión digital' },
      { label: 'Remoción', value: 'Sin dañar el vidrio' },
    ],
    idealFor: ['Salas de juntas y oficinas', 'Baños y puertas de ducha', 'Consultorios', 'Señalética de seguridad en vidrios'],
    image: divisorEsmerilado,
    imageAlt: 'Divisor de vidrio esmerilado con marco negro',
    ratings: { privacidad: 4, visibilidad: 1 },
    faqs: [
      {
        q: '¿Puedo poner solo una franja esmerilada?',
        a: 'Sí, es lo más común en oficinas: una franja a la altura de los ojos da privacidad y además señaliza el vidrio para evitar que alguien choque con él.',
      },
    ],
  },
  {
    slug: 'blanca-mate-opalizada',
    category: 'decorativas',
    alsoIn: ['sandblasting'],
    name: 'Blanca mate opalizada',
    summary: 'Privacidad total con luz difusa y acabado lechoso uniforme.',
    seoTitle: 'Película blanca mate opalizada para vidrio',
    seoDescription: 'Película blanca mate opalizada para vidrio: privacidad total con luz difusa y acabado uniforme. Ideal para baños, consultorios y divisiones.',
    description: [
      'La película opalizada tiene un acabado blanco lechoso más denso que el esmerilado. Bloquea por completo la visión a través del vidrio, pero sigue dejando pasar una luz suave y difusa.',
      'Es la elección para baños, consultorios, vestidores y cualquier espacio donde se necesita privacidad total sin renunciar a la luz natural.',
    ],
    highlights: ['Privacidad total', 'Luz suave y difusa', 'Acabado uniforme y elegante', 'Fácil de limpiar'],
    specs: [
      { label: 'Acabado', value: 'Blanco mate opalizado' },
      { label: 'Privacidad', value: 'Total' },
      { label: 'Paso de luz', value: 'Difusa' },
    ],
    idealFor: ['Baños y vestidores', 'Consultorios médicos', 'Ventanas a patios vecinos', 'Divisiones de archivo'],
    image: panelesEsmerilados,
    imageAlt: 'Paneles de vidrio con acabado opalizado iluminados',
    ratings: { privacidad: 5, visibilidad: 1 },
    faqs: [
      {
        q: '¿Qué diferencia hay entre opalizada y esmerilada?',
        a: 'La opalizada es más blanca y densa, y bloquea totalmente la vista. La esmerilada es más translúcida y conserva el aspecto del vidrio arenado.',
      },
    ],
  },
  {
    slug: 'vinilo-decorativo-color',
    category: 'decorativas',
    name: 'Vinilo decorativo de color',
    summary: 'Tu marca y tus colores en el vidrio, en corte o impresión.',
    seoTitle: 'Vinilo decorativo para vidrio y vitrinas',
    seoDescription: 'Vinilo de color para vidrio: logos, letreros, horarios y decoración de vitrinas en corte o impresión digital. Señalética de marca con instalación profesional.',
    description: [
      'El vinilo de color convierte cualquier vidrio en un soporte de comunicación: logos, nombres, horarios, señalética y decoración de temporada. Lo cortamos en plotter para acabados nítidos o lo imprimimos a todo color.',
      'Es la forma más rápida de darle identidad a una vitrina, una oficina o una sala de juntas. Preparamos el montaje digital para que lo apruebes antes de instalar.',
    ],
    highlights: ['Amplia gama de colores', 'Corte de precisión en plotter', 'Impresión digital a todo color', 'Montaje previo para aprobación'],
    options: { label: 'Formatos', values: ['En corte', 'En impresión'] },
    specs: [
      { label: 'Material', value: 'Vinilo autoadhesivo' },
      { label: 'Personalización', value: 'Corte en plotter o impresión digital' },
      { label: 'Uso', value: 'Interior y exterior' },
    ],
    idealFor: ['Vitrinas comerciales', 'Logos en recepciones', 'Señalética y horarios', 'Campañas de temporada'],
    image: salaJuntas,
    imageAlt: 'Sala de juntas con vinilo de marca en la puerta de vidrio',
    ratings: { privacidad: 2, visibilidad: 3 },
    faqs: [
      {
        q: '¿En qué formato debo enviar mi logo?',
        a: 'Idealmente en vector (AI, PDF, EPS o SVG). Si solo lo tienes en imagen, te ayudamos a vectorizarlo.',
      },
    ],
  },
  {
    slug: 'venetian-persiana',
    category: 'decorativas',
    name: 'Venetian tipo persiana',
    summary: 'Diseño de persiana prediseñado que además controla el sol.',
    seoTitle: 'Película venetian tipo persiana para vidrio',
    seoDescription:
      'Película decorativa venetian con diseño de persiana: privacidad por franjas y control solar incluido. Alternativa moderna a las cortinas en oficinas y hogares.',
    description: [
      'La película venetian tiene un diseño prediseñado de franjas que imita una persiana horizontal. Da privacidad parcial con un look ordenado y moderno, sin cortinas que acumulen polvo.',
      'Su gran diferencia: incluye control solar, así que además de decorar reduce el brillo y el calor que entran por el vidrio.',
    ],
    highlights: ['Diseño de persiana prediseñado', 'Incluye control solar', 'Privacidad parcial por franjas', 'Sin cortinas que limpiar'],
    specs: [
      { label: 'Diseño', value: 'Franjas tipo persiana (prediseñado)' },
      { label: 'Control solar', value: 'Incluido' },
      { label: 'Privacidad', value: 'Parcial' },
    ],
    idealFor: ['Oficinas y salas de juntas', 'Ventanas de cocina y estudio', 'Consultorios', 'Fachadas internas'],
    image: luzPersianas,
    imageAlt: 'Luz del sol filtrada en franjas sobre el piso de una habitación',
    ratings: { calor: 2, privacidad: 3, visibilidad: 3 },
    faqs: [
      {
        q: '¿La venetian reemplaza una persiana real?',
        a: 'Para privacidad y control de brillo en el día, en muchos casos sí. A diferencia de una persiana, no se abre ni se cierra: el diseño es fijo.',
      },
    ],
  },
  {
    slug: 'microperforada',
    category: 'decorativas',
    name: 'Microperforada',
    summary: 'Publicidad en tu vitrina que deja ver hacia afuera.',
    seoTitle: 'Vinilo microperforado para vitrinas',
    seoDescription: 'Vinilo microperforado para vitrinas: tu publicidad se ve desde afuera y desde adentro se conserva la vista. Ideal para fachadas comerciales.',
    description: [
      'La película microperforada es un vinilo impreso con miles de orificios diminutos. Desde afuera se ve tu imagen o publicidad a todo color; desde adentro, el ojo atraviesa las perforaciones y se mantiene la vista hacia la calle.',
      'Es el formato estrella para vitrinas y fachadas comerciales: convierte el vidrio en una valla publicitaria sin oscurecer el local.',
    ],
    highlights: ['Visión unidireccional', 'Impresión a todo color', 'No oscurece el interior', 'Ideal para publicidad en vitrinas'],
    specs: [
      { label: 'Material', value: 'Vinilo microperforado' },
      { label: 'Visión', value: 'Unidireccional' },
      { label: 'Personalización', value: 'Impresión digital a todo color' },
    ],
    idealFor: ['Vitrinas comerciales', 'Fachadas de locales', 'Ventanas de oficinas a la calle', 'Campañas publicitarias'],
    image: localComercial,
    imageAlt: 'Vitrina de vidrio de un local comercial',
    ratings: { privacidad: 3, visibilidad: 3 },
    faqs: [
      {
        q: '¿Se ve hacia afuera con la microperforada?',
        a: 'Sí. Desde el lado más oscuro (normalmente el interior durante el día) se ve hacia afuera con un ligero efecto de malla.',
      },
    ],
  },
];

export const getCategory = (slug: CategorySlug) => categories.find((c) => c.slug === slug)!;

export const productsIn = (slug: CategorySlug) =>
  products.filter((p) => p.category === slug || p.alsoIn?.includes(slug));

export const productUrl = (p: Product) => `/peliculas/${p.category}/${p.slug}/`;
export const categoryUrl = (slug: CategorySlug) => `/peliculas/${slug}/`;
