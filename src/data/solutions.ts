import type { ImageMetadata } from 'astro';
import type { IconName } from '@/components/ui/Icon.astro';
import type { Faq } from './catalog';

import salaVentanales from '@/assets/images/sala-ventanales.jpg';
import oficinaParticiones from '@/assets/images/oficina-particiones.jpg';
import localComercial from '@/assets/images/local-comercial.jpg';

export interface Solution {
  slug: string;
  name: string;
  icon: IconName;
  h1: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  image: ImageMetadata;
  imageAlt: string;
  problems: { icon: IconName; title: string; text: string; products: string[] }[];
  faqs: Faq[];
}

export const solutions: Solution[] = [
  {
    slug: 'hogares',
    name: 'Hogares',
    icon: 'house',
    h1: 'Películas para ventanas de casas y apartamentos',
    lead: 'Un hogar más fresco, más privado y más seguro, sin perder la luz ni la vista. Instalación limpia, en un día y sin obras.',
    seoTitle: 'Películas para ventanas de casa y apartamento',
    seoDescription:
      'Películas para vidrios de casas y apartamentos: menos calor, más privacidad y seguridad para niños y primeros pisos. Asesoría e instalación en Bogotá.',
    image: salaVentanales,
    imageAlt: 'Sala de apartamento con ventanal amplio',
    problems: [
      { icon: 'thermometer-sun', title: 'La sala se calienta en la tarde', text: 'Nanocerámica para rechazar calor sin oscurecer, o MKR70 si el reglamento de la fachada lo exige.', products: ['polarizado-nanoceramico', 'nanoceramica-mkr70'] },
      { icon: 'eye-off', title: 'Los vecinos ven hacia adentro', text: 'Polarizado en tono 20 % o 35 % para habitaciones, u opalizado en baños.', products: ['polarizado-convencional', 'blanca-mate-opalizada'] },
      { icon: 'shield-check', title: 'Niños, mascotas o primer piso', text: 'Película de seguridad para que el vidrio no se convierta en esquirlas.', products: ['seguridad-transparente-4-mil', 'seguridad-tono-nanoceramico-4-mil'] },
      { icon: 'sun', title: 'Pisos y muebles decolorados', text: 'Cualquiera de nuestras películas bloquea hasta 99 % de los rayos UV.', products: ['nanoceramica-mkr70', 'polarizado-nanoceramico'] },
    ],
    faqs: [
      { q: '¿Necesito permiso de la administración para instalar película?', a: 'Para películas interiores que no cambian la fachada (transparentes o nanocerámica de alta visibilidad) normalmente no. Para tonos oscuros o espejo, revisa el reglamento de propiedad horizontal. Te asesoramos en el proceso.' },
      { q: '¿Cuánto se demora la instalación en un apartamento?', a: 'La mayoría de apartamentos se instalan en una jornada. No hay escombros ni olores y puedes seguir usando el espacio.' },
    ],
  },
  {
    slug: 'empresas-y-oficinas',
    name: 'Empresas y oficinas',
    icon: 'building',
    h1: 'Películas para vidrios de oficinas y empresas',
    lead: 'Equipos más productivos con menos calor y deslumbramiento, salas de juntas con privacidad y una oficina que comunica tu marca.',
    seoTitle: 'Películas para vidrios de oficinas y empresas',
    seoDescription:
      'Películas para oficinas: control solar en fachadas, esmerilado para salas de juntas, vinilo con tu marca y seguridad. Instalamos fuera de horario laboral.',
    image: oficinaParticiones,
    imageAlt: 'Oficina abierta con divisiones de vidrio',
    problems: [
      { icon: 'scan-eye', title: 'Reflejos en pantallas y calor', text: 'Control solar nanocerámico o reflectivo en la fachada para reducir la carga térmica.', products: ['polarizado-nanoceramico', 'pelicula-reflectiva-espejo'] },
      { icon: 'eye-off', title: 'Salas de juntas sin privacidad', text: 'Franjas esmeriladas tipo sandblasting o venetian que dejan pasar la luz.', products: ['frosted-esmerilado', 'venetian-persiana'] },
      { icon: 'palette', title: 'Una oficina que no habla de tu marca', text: 'Logos en esmerilado, vinilo de color o impresión digital en recepciones y puertas.', products: ['vinilo-decorativo-color', 'frosted-esmerilado'] },
      { icon: 'shield-check', title: 'Riesgo en vidrios de alto tránsito', text: 'Película de seguridad en divisiones, puertas y barandas de vidrio.', products: ['seguridad-transparente-4-mil', 'seguridad-transparente-8-mil'] },
    ],
    faqs: [
      { q: '¿Pueden instalar fuera del horario laboral?', a: 'Sí. Programamos instalaciones en la noche o en fines de semana para no interrumpir la operación de tu empresa.' },
      { q: '¿Emiten factura electrónica?', a: 'Sí. Somos una S.A.S. y emitimos factura electrónica para que tu empresa pueda deducir la inversión.' },
    ],
  },
  {
    slug: 'comercios-y-vitrinas',
    name: 'Comercios y vitrinas',
    icon: 'store',
    h1: 'Películas para vitrinas y locales comerciales',
    lead: 'Vitrinas que venden, protegen el producto del sol y resisten el vandalismo. Publicidad en vidrio que no oscurece tu local.',
    seoTitle: 'Películas para vitrinas y locales comerciales',
    seoDescription:
      'Películas para locales: seguridad antivandálica de 8 mil, microperforado publicitario, vinilo de marca y control solar que protege tu mercancía.',
    image: localComercial,
    imageAlt: 'Local comercial con vitrina de vidrio',
    problems: [
      { icon: 'shield-check', title: 'Vitrinas expuestas a vandalismo', text: 'Seguridad de 8 mil con anclaje perimetral opcional para retrasar intrusiones.', products: ['seguridad-transparente-8-mil'] },
      { icon: 'sun', title: 'El sol decolora la mercancía', text: 'Nanocerámica MKR70: casi invisible, bloquea UV y no esconde tu producto.', products: ['nanoceramica-mkr70'] },
      { icon: 'sparkles', title: 'La vitrina no comunica', text: 'Microperforado publicitario y vinilo de marca en corte o impresión.', products: ['microperforada', 'vinilo-decorativo-color'] },
      { icon: 'thermometer-sun', title: 'Clientes incómodos por el calor', text: 'Control solar para que el local se sienta fresco y el aire acondicionado rinda más.', products: ['polarizado-nanoceramico', 'pelicula-reflectiva-espejo'] },
    ],
    faqs: [
      { q: '¿Puedo cambiar la publicidad de la vitrina por temporadas?', a: 'Sí. El vinilo y el microperforado se retiran sin dañar el vidrio, así que puedes renovar tu vitrina en cada campaña.' },
      { q: '¿La película de seguridad evita completamente un robo?', a: 'Ninguna película hace un vidrio irrompible, pero la de 8 mil retrasa y hace ruidoso el intento de ingreso, que es lo que más disuade. Combinada con alarma y cámaras es una gran capa de protección.' },
    ],
  },
];

export const processSteps = [
  { icon: 'message-circle' as IconName, title: 'Cuéntanos tu necesidad', text: 'Escríbenos por WhatsApp o el formulario. Fotos de tus vidrios nos ayudan a orientarte desde el primer mensaje.' },
  { icon: 'ruler' as IconName, title: 'Visita técnica y muestras', text: 'Medimos, revisamos el tipo de vidrio y te mostramos muestras reales sobre tu ventana.' },
  { icon: 'clipboard-check' as IconName, title: 'Propuesta clara', text: 'Recibes una cotización detallada con la película recomendada, área exacta y tiempos.' },
  { icon: 'wrench' as IconName, title: 'Instalación profesional', text: 'Instaladores certificados, protección de tu espacio y limpieza final. Sin obras ni escombros.' },
];

export const generalFaqs: Faq[] = [
  { q: '¿Cuánto dura una película para vidrio?', a: 'Una película arquitectónica de calidad, instalada por la cara interior, tiene una vida útil de 10 años o más según el producto y la exposición al sol. Las decorativas suelen durar entre 5 y 8 años en interiores.' },
  { q: '¿Las películas se instalan por dentro o por fuera?', a: 'Casi siempre por la cara interior del vidrio, donde están protegidas del clima y la suciedad. Para casos especiales existen películas exteriores.' },
  { q: '¿Cuánto tiempo tarda en secar la película?', a: 'Se puede tocar el mismo día, pero el adhesivo termina de curar en 1 a 4 semanas según el clima. Durante ese tiempo es normal ver pequeñas burbujas de agua o neblina que desaparecen solas. No limpies el vidrio durante los primeros 30 días.' },
  { q: '¿Cómo se limpia el vidrio con película?', a: 'Con un paño suave o de microfibra, agua y jabón neutro. Evita productos con amoníaco, esponjas abrasivas o cuchillas.' },
  { q: '¿Tienen garantía?', a: 'Sí. Todas nuestras instalaciones tienen garantía escrita sobre el material y la mano de obra. El plazo depende de la película y te lo indicamos en la cotización.' },
  { q: '¿Hacen visitas técnicas fuera de Bogotá?', a: 'Atendemos Bogotá y municipios de la Sabana como Chía, Cajicá, Cota, Funza, Mosquera y La Calera. Para otras ciudades, escríbenos y evaluamos el proyecto.' },
  { q: '¿Cómo cotizo?', a: 'Envíanos por WhatsApp o el formulario el tipo de espacio, el problema que quieres resolver y, si es posible, fotos y medidas aproximadas. Te respondemos con una recomendación y agendamos la visita técnica.' },
  { q: '¿La visita técnica tiene costo?', a: 'Sí. El valor varía según el caso y te lo confirmamos antes de agendarla, para que no haya sorpresas. Si quieres una primera orientación, envíanos fotos y medidas aproximadas por WhatsApp.' },
  { q: '¿La película sirve en vidrio templado o laminado?', a: 'Sí, en la mayoría de casos. En vidrios dobles (termopanel) o de gran formato evaluamos la absorción térmica para recomendar una película compatible y evitar estrés térmico.' },
];

export const stats = [
  { value: '99 %', label: 'de bloqueo de rayos UV' },
  { value: '1 día', label: 'de instalación en la mayoría de proyectos' },
  { value: '13', label: 'referencias de película para cada necesidad' },
  { value: '0', label: 'escombros, olores u obras' },
];
