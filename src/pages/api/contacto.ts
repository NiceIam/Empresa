/**
 * POST /api/contacto/ — recibe solicitudes de cotización.
 * - Acepta JSON (fetch) o formulario clásico (sin JavaScript → redirige a /gracias/).
 * - Valida con Zod, filtra spam (honeypot) y limita envíos por IP.
 * - Si hay SMTP configurado, envía el correo; si no, deja la solicitud en los logs.
 */
import type { APIRoute } from 'astro';
import { z } from 'astro/zod';
import nodemailer from 'nodemailer';

export const prerender = false;

const schema = z.object({
  name: z.string().trim().min(2, 'Escribe tu nombre.').max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\s-]{7,20}$/, 'Revisa tu número de celular.'),
  email: z.union([z.literal(''), z.string().trim().email('Revisa tu correo electrónico.').max(120)]).optional(),
  city: z.string().trim().max(60).optional(),
  space: z.string().trim().max(40).optional(),
  area: z.string().trim().max(60).optional(),
  windows: z.string().trim().max(400).optional(),
  line: z.string().trim().max(40).optional(),
  product: z.string().trim().max(80).optional(),
  option: z.string().trim().max(40).optional(),
  message: z.string().trim().max(1500).optional(),
  interest: z.array(z.string().trim().max(40)).max(10).optional(),
  page: z.string().trim().max(200).optional(),
  consent: z.union([z.literal('1'), z.literal('on'), z.literal(true)], { message: 'Debes autorizar el tratamiento de datos.' }),
  company: z.string().max(0).optional(), // honeypot
});

// Límite en memoria: 5 solicitudes válidas por IP cada 10 minutos.
// Solo se cuentan envíos válidos, para que errores de digitación no bloqueen a nadie.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();
const recentHits = (ip: string, now: number) => (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
function isRateLimited(ip: string): boolean {
  return recentHits(ip, Date.now()).length >= MAX_HITS;
}
function recordHit(ip: string): void {
  const now = Date.now();
  hits.set(ip, [...recentHits(ip, now), now]);
  // Poda de entradas vencidas (nunca se borra el mapa completo: eso reiniciaría a todos).
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
  }
}

/**
 * IP del visitante. Sin proxy: la del socket. Con TRUST_PROXY=true: la entrada MÁS A LA DERECHA
 * de X-Forwarded-For, que es la que agrega tu propio proxy (las de la izquierda las controla el cliente).
 */
function clientIp(context: Parameters<APIRoute>[0]): string {
  if (process.env.TRUST_PROXY === 'true') {
    const parts = context.request.headers.get('x-forwarded-for')?.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts?.length) return parts[parts.length - 1];
  }
  try {
    return context.clientAddress || 'unknown';
  } catch {
    return 'unknown'; // El adaptador no expone la IP (socket Unix, Passenger…).
  }
}

const esc = (s = '') => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function deliver(data: z.infer<typeof schema>) {
  const env = process.env;
  const lines = [
    ['Nombre', data.name],
    ['Celular', data.phone],
    ['Correo', data.email || '—'],
    ['Ciudad', data.city || '—'],
    ['Espacio', data.space || '—'],
    ['Área aprox.', data.area || '—'],
    ['Medidas', data.windows || '—'],
    ['Interés', data.interest?.join(', ') || data.line || '—'],
    ['Película', [data.product, data.option].filter(Boolean).join(' — ') || '—'],
    ['Mensaje', data.message || '—'],
    ['Página', data.page || '—'],
  ] as const;

  if (!env.SMTP_HOST || !env.QUOTE_TO) {
    console.info('[cotizacion]', JSON.stringify(Object.fromEntries(lines)));
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT ?? 587),
    secure: env.SMTP_SECURE === 'true',
    auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: env.QUOTE_FROM || env.SMTP_USER,
    to: env.QUOTE_TO,
    replyTo: data.email || undefined,
    subject: `Nueva cotización web — ${data.name} (${data.interest?.join(', ') || 'sin línea'})`,
    text: lines.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html: `<h2 style="font-family:sans-serif;color:#0F2E3A">Nueva solicitud de cotización</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${lines.map(([k, v]) => `<tr><td style="padding:6px 12px;color:#555"><b>${k}</b></td><td style="padding:6px 12px">${esc(v)}</td></tr>`).join('')}
      </table>
      <p style="font-family:sans-serif"><a href="https://wa.me/${data.phone.replace(/\D/g, '').replace(/^(?!57)(3\d{9})$/, '57$1')}">Responder por WhatsApp</a></p>`,
  });
}

export const POST: APIRoute = async (context) => {
  const { request, redirect } = context;
  const isJson = request.headers.get('content-type')?.includes('application/json');
  // Con JavaScript: JSON. Sin JavaScript: redirección a /gracias/ o de vuelta al formulario con el error.
  const respond = (status: number, body: Record<string, unknown>) =>
    isJson
      ? new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
      : status === 200
        ? redirect('/gracias/', 303)
        : // Código fijo en la URL (no texto libre) para que nadie pueda fabricar enlaces con mensajes falsos.
          redirect(`/contacto/?error=${status === 429 ? 'limite' : status >= 500 ? 'servidor' : 'datos'}#cotizar`, 303);

  const ip = clientIp(context);
  // Sin IP identificable no se limita (un balde compartido bloquearía a todos los visitantes).
  if (ip !== 'unknown' && isRateLimited(ip)) return respond(429, { ok: false, error: 'Has enviado varias solicitudes seguidas. Espera unos minutos.' });

  let raw: unknown;
  try {
    if (isJson) {
      raw = await request.json();
    } else {
      const fd = await request.formData();
      raw = { ...Object.fromEntries(fd.entries()), interest: fd.getAll('interest') };
    }
  } catch {
    return respond(400, { ok: false, error: 'Solicitud inválida.' });
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return respond(400, { ok: false, error: 'Solicitud inválida.' });
  const body = raw as Record<string, unknown>;

  // Bots que llenan el honeypot reciben "éxito" silencioso.
  if (typeof body.company === 'string' && body.company.length > 0) return respond(200, { ok: true });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return respond(422, { ok: false, error: parsed.error.issues[0]?.message ?? 'Revisa los datos del formulario.' });
  }

  if (ip !== 'unknown') recordHit(ip);
  try {
    await deliver(parsed.data);
    return respond(200, { ok: true });
  } catch (err) {
    console.error('[cotizacion] Error enviando correo:', err);
    return respond(502, { ok: false, error: 'No pudimos enviar tu solicitud en este momento.' });
  }
};

export const ALL: APIRoute = () => new Response('Método no permitido', { status: 405, headers: { Allow: 'POST' } });
