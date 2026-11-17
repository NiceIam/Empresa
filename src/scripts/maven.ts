/**
 * Utilidades de cliente compartidas: contexto de cotización, WhatsApp, horario, medición y avisos.
 * Se importa desde los <script> de los componentes; Vite lo empaqueta una sola vez.
 */
import { site } from '@/config/site';

/* ─── Contexto de cotización ──────────────────────────────────────────────── */

/** Lo que la persona está mirando: alimenta el cotizador y los mensajes de WhatsApp. */
export interface QuoteContext {
  line?: string; // slug de la línea (control-solar, seguridad…)
  product?: string; // slug del producto
  option?: string; // tono o formato elegido
  message?: string; // mensaje de WhatsApp sugerido para la página
}

// Contexto inicial escrito por BaseLayout en un <script> inline del <head> (window.__mavenCtx).
const ctx: QuoteContext = { ...((window as Window & { __mavenCtx?: QuoteContext }).__mavenCtx ?? {}) };

export function getContext(): QuoteContext {
  return { ...ctx };
}

/** Actualiza el contexto y avisa a quien escuche (barra móvil, widget, enlaces dinámicos). */
export function setContext(patch: QuoteContext): void {
  Object.assign(ctx, patch);
  document.dispatchEvent(new CustomEvent('maven:context', { detail: getContext() }));
}

/* ─── WhatsApp ────────────────────────────────────────────────────────────── */

export function waUrl(message: string = site.contact.whatsappGreeting): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ─── Medición (GA4 / Meta / GTM) ─────────────────────────────────────────── */

type Win = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

/** Envía un evento a las herramientas que estén cargadas. Si no hay ninguna, no hace nada. */
export function track(event: string, params: Record<string, unknown> = {}): void {
  const w = window as Win;
  const payload = { page: location.pathname, ...params };
  w.dataLayer?.push({ event, ...payload });
  w.gtag?.('event', event, payload);
  if (event === 'whatsapp_click' || event === 'quote_submit') w.fbq?.('track', 'Contact', payload);
  // Nota: compartir una guía por WhatsApp se mide como «share», no como contacto (ver guias/[slug].astro).
}

/* ─── Horario de atención (hora de Bogotá) ────────────────────────────────── */

const DAY_INDEX: Record<string, number> = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
const DAY_NAMES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

function bogotaNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Bogota',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0';
  return { day: DAY_INDEX[get('weekday')] ?? 0, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

function scheduleFor(day: number) {
  return site.hours.find((h) => h.schema.some((d) => DAY_INDEX[d] === day));
}

export interface HoursStatus {
  open: boolean;
  /** Texto corto para mostrar: «En línea · respondemos en minutos» o «Te respondemos el lunes desde las 08:00». */
  label: string;
}

export function hoursStatus(): HoursStatus {
  const { day, minutes } = bogotaNow();
  const today = scheduleFor(day);
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: 'En línea · respondemos en minutos' };
  }
  // Próxima apertura (hoy más tarde o en los próximos 7 días).
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const s = scheduleFor(d);
    if (!s) continue;
    if (i === 0 && minutes >= toMin(s.open)) continue;
    const when = i === 0 ? 'hoy' : i === 1 ? 'mañana' : `el ${DAY_NAMES[d]}`;
    return { open: false, label: `Déjanos tu mensaje · respondemos ${when} desde las ${s.open}` };
  }
  return { open: false, label: 'Déjanos tu mensaje y te respondemos pronto' };
}

/** Pinta el estado de atención en todos los elementos [data-hours]. */
export function paintHours(root: ParentNode = document): void {
  const status = hoursStatus();
  root.querySelectorAll<HTMLElement>('[data-hours]').forEach((el) => {
    el.dataset.open = String(status.open);
    const label = el.querySelector<HTMLElement>('[data-hours-label]') ?? el;
    label.textContent = status.label;
  });
}

/* ─── Avisos (toast) ──────────────────────────────────────────────────────── */

export function toast(message: string): void {
  document.dispatchEvent(new CustomEvent('maven:toast', { detail: message }));
}

/* ─── Abrir el cotizador ──────────────────────────────────────────────────── */

export function openQuote(prefill: QuoteContext = {}): void {
  document.dispatchEvent(new CustomEvent('maven:quote', { detail: { ...getContext(), ...prefill } }));
}
