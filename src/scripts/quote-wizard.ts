/**
 * Lógica del cotizador guiado (QuoteWizard.astro).
 * Un mismo código maneja el panel lateral global y la versión incrustada en /contacto/.
 */
import { waUrl, track, paintHours, getContext, type QuoteContext } from './maven';

interface ProductInfo { slug: string; name: string; optionLabel: string; options: string[] }
interface WizardData { lines: { slug: string; short: string }[]; products: Record<string, ProductInfo>; whatsapp: string }

const fmtM2 = (n: number) => n.toLocaleString('es-CO', { maximumFractionDigits: 1 });

class QuoteWizard {
  readonly root: HTMLElement;
  private form: HTMLFormElement;
  private data: WizardData;
  private steps: HTMLElement[];
  private step = 0;
  private $ = <T extends Element = HTMLElement>(sel: string) => this.root.querySelector<T>(sel)!;
  private $$ = <T extends Element = HTMLElement>(sel: string) => [...this.root.querySelectorAll<T>(sel)];

  constructor(root: HTMLElement) {
    this.root = root;
    this.form = this.$<HTMLFormElement>('[data-qw-form]');
    this.form.noValidate = true; // Validamos nosotros: el camino de WhatsApp no exige teléfono.
    this.data = JSON.parse(this.$('[data-qw-data]').textContent!);
    this.steps = this.$$('[data-qw-step]');

    this.form.addEventListener('change', (e) => this.onChange(e));
    this.form.addEventListener('input', () => this.renderPreview());
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
    this.$('[data-qw-next]').addEventListener('click', () => this.show(this.step + 1));
    this.$('[data-qw-back]').addEventListener('click', () => this.show(this.step - 1));
    this.$('[data-qw-wa]').addEventListener('click', () => this.sendWhatsApp('cotizador'));
    this.$('[data-qw-skip]').addEventListener('click', () => this.sendWhatsApp('cotizador_atajo'));
    this.$('[data-qw-restart]').addEventListener('click', () => this.reset());
    this.$('[data-qw-add]').addEventListener('click', () => this.addRow(true));
    this.$('[data-qw-rows]').addEventListener('input', () => this.recalc());
    this.$('[data-qw-rows]').addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('[data-qw-remove]');
      if (!btn) return;
      btn.closest('[data-qw-row]')?.remove();
      if (!this.$$('[data-qw-row]').length) this.addRow();
      this.recalc();
    });
    this.addRow();
    paintHours(this.root);
    this.show(0, false);
  }

  /* ─── Navegación ─── */

  show(i: number, focus = true): void {
    this.step = Math.max(0, Math.min(this.steps.length - 1, i));
    const last = this.step === this.steps.length - 1;
    this.steps.forEach((s, j) => s.classList.toggle('is-current', j === this.step));
    this.$$('[data-qw-bar]').forEach((b, j) => {
      b.classList.toggle('bg-ambar-400', j <= this.step);
      b.classList.toggle('bg-petroleo-900/10', j > this.step);
    });
    this.$('[data-qw-count]').textContent = `${this.step + 1} / ${this.steps.length}`;
    this.$('[data-qw-back]').hidden = this.step === 0;
    this.$('[data-qw-next]').hidden = last;
    this.$('[data-qw-wa]').hidden = !last;
    this.$('[data-qw-skip]').hidden = last;
    this.renderPreview();
    const scroller = this.form.scrollHeight > this.form.clientHeight ? this.form : null;
    scroller?.scrollTo({ top: 0 });
    // Solo se mide (y se mueve el foco) cuando la persona navega, no al cargar ni al preparar el cotizador.
    if (focus) {
      this.steps[this.step].querySelector<HTMLElement>('input:not([type=hidden]), textarea')?.focus({ preventScroll: true });
      track('quote_step', { step: this.step + 1 });
    }
  }

  /* ─── Selecciones ─── */

  private val(name: string): string {
    return this.form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? '';
  }

  private check(name: string, value: string | undefined): void {
    if (value === undefined) return;
    const input = this.form.querySelector<HTMLInputElement>(`input[name="${name}"][value="${CSS.escape(value)}"]`);
    if (input) input.checked = true;
  }

  private onChange(e: Event): void {
    const t = e.target as HTMLInputElement;
    if (t.name === 'line') {
      // Cambiar de línea limpia el producto si no pertenece a ella.
      const product = this.val('product');
      const group = this.$(`[data-products-for="${CSS.escape(t.value)}"]`);
      if (product && !group?.querySelector(`input[value="${CSS.escape(product)}"]`)) {
        this.form.querySelectorAll<HTMLInputElement>('input[name="product"], input[name="option"]').forEach((i) => (i.checked = false));
      }
    }
    if (t.name === 'product') this.form.querySelectorAll<HTMLInputElement>('input[name="option"]').forEach((i) => (i.checked = false));
    if (t.name === 'measure') this.$('[data-qw-calc]').classList.toggle('hidden', t.value !== 'propias');
    this.syncGroups();
    this.renderPreview();
  }

  private syncGroups(): void {
    const line = this.val('line');
    this.$$('[data-products-for]').forEach((g) => g.classList.toggle('is-current', g.dataset.productsFor === line));
    // El mismo producto puede estar en dos líneas (esmerilado en decorativas y sandblasting):
    // se marca solo el radio visible para que la selección se vea.
    const product = this.val('product');
    if (product && line) {
      const visible = this.$(`[data-products-for="${CSS.escape(line)}"]`)?.querySelector<HTMLInputElement>(`input[value="${CSS.escape(product)}"]`);
      if (visible && !visible.checked) visible.checked = true;
    }
    this.$$('[data-options-for]').forEach((g) => g.classList.toggle('is-current', g.dataset.optionsFor === product));
  }

  /** ¿Ya terminó (WhatsApp enviado o solicitud registrada)? */
  get isDone(): boolean {
    return !this.$('[data-qw-done]').classList.contains('hidden');
  }

  /**
   * Prepara el cotizador con el contexto de la página.
   * Sin contexto nuevo se conserva lo que la persona ya escribió (cerrar y reabrir no borra nada).
   */
  prefill(ctx: QuoteContext): void {
    const hasContext = Boolean(ctx.line || ctx.product);
    if (!hasContext && !this.isDone) return;
    if (hasContext && !this.isDone && this.val('product') === (ctx.product ?? '') && this.val('line') === (ctx.line ?? '')) {
      // Mismo producto que ya estaba elegido: solo se actualiza el tono si cambió.
      if (ctx.option && ctx.product) this.checkOption(ctx.product, ctx.option);
      return;
    }
    this.reset(false);
    if (ctx.line) this.check('line', ctx.line);
    this.syncGroups();
    if (ctx.product) {
      const group = ctx.line ? this.$(`[data-products-for="${CSS.escape(ctx.line)}"]`) : this.root;
      const input = group?.querySelector<HTMLInputElement>(`input[name="product"][value="${CSS.escape(ctx.product)}"]`);
      if (input) input.checked = true;
    }
    this.syncGroups();
    if (ctx.option && ctx.product) this.checkOption(ctx.product, ctx.option);
    // Si ya viene el producto (desde su página), arrancamos en el paso 2: un clic menos.
    this.show(ctx.product ? 1 : 0, false);
  }

  /** El mismo tono existe en varios productos: se busca solo en el grupo del producto indicado. */
  private checkOption(product: string, option: string): void {
    const group = this.root.querySelector(`[data-options-for="${CSS.escape(product)}"]`);
    const input = group?.querySelector<HTMLInputElement>(`input[name="option"][value="${CSS.escape(option)}"]`);
    if (input) input.checked = true;
  }

  /* ─── Calculadora de área ─── */

  private addRow(focus = false): void {
    const tpl = this.$<HTMLTemplateElement>('[data-qw-row-tpl]');
    const row = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
    this.$('[data-qw-rows]').append(row);
    if (focus) row.querySelector<HTMLInputElement>('[data-w]')?.focus();
  }

  private windows(): { w: number; h: number; q: number }[] {
    return this.$$('[data-qw-row]')
      .map((r) => ({
        w: Number(r.querySelector<HTMLInputElement>('[data-w]')!.value),
        h: Number(r.querySelector<HTMLInputElement>('[data-h]')!.value),
        q: Math.max(1, Number(r.querySelector<HTMLInputElement>('[data-q]')!.value) || 1),
      }))
      .filter((r) => r.w > 0 && r.h > 0);
  }

  private recalc(): void {
    const rows = this.windows();
    const m2 = rows.reduce((s, r) => s + (r.w * r.h * r.q) / 10000, 0);
    const count = rows.reduce((s, r) => s + r.q, 0);
    this.$('[data-qw-total]').textContent = `${fmtM2(m2)} m²`;
    const area = this.$<HTMLInputElement>('[data-qw-area]');
    area.value = rows.length ? `${fmtM2(m2)} m² en ${count} ${count === 1 ? 'vidrio' : 'vidrios'}` : '';
    this.$<HTMLInputElement>('[data-qw-windows-field]').value = rows.map((r) => `${r.w}×${r.h} cm${r.q > 1 ? ` ×${r.q}` : ''}`).join('; ');
    this.renderPreview();
  }

  /* ─── Mensaje ─── */

  private summary() {
    const fd = new FormData(this.form);
    const line = this.data.lines.find((l) => l.slug === this.val('line'));
    const product = this.data.products[this.val('product')];
    const measureOwn = this.val('measure') === 'propias';
    return {
      line: line?.short ?? '',
      lineSlug: line?.slug ?? '',
      product: product?.name ?? '',
      productSlug: product?.slug ?? '',
      option: this.val('option'),
      space: this.val('space'),
      area: measureOwn ? String(fd.get('area') ?? '') : '',
      windows: measureOwn ? String(fd.get('windows') ?? '') : '',
      measureVisit: !measureOwn,
      name: String(fd.get('name') ?? '').trim(),
      city: String(fd.get('city') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    };
  }

  private message(): string {
    const s = this.summary();
    const out = ['Hola Maven Films 👋 Quiero cotizar:'];
    if (s.product) out.push(`• Película: ${s.product}${s.option ? ` (${s.option})` : ''}`);
    else if (s.line) out.push(`• Línea: ${s.line} (necesito asesoría para elegir)`);
    else out.push('• Necesito asesoría para elegir la película');
    if (s.space) out.push(`• Espacio: ${s.space}`);
    if (s.area) out.push(`• Medidas: ${s.area}${s.windows ? ` — ${s.windows}` : ''}`);
    else out.push('• Medidas: prefiero que las tomen en la visita técnica');
    if (s.city) out.push(`• Ubicación: ${s.city}`);
    if (s.message) out.push(`• Comentario: ${s.message}`);
    if (s.name) out.push('', `Soy ${s.name}.`);
    return out.join('\n');
  }

  private renderPreview(): void {
    const el = this.root.querySelector<HTMLElement>('[data-qw-preview]');
    if (el && this.step === this.steps.length - 1) el.textContent = this.message();
  }

  /* ─── Envío ─── */

  private sendWhatsApp(source: string): void {
    const s = this.summary();
    const url = waUrl(this.message());
    // Abrimos con un enlace real para que los bloqueadores de ventanas no lo frenen.
    const a = Object.assign(document.createElement('a'), { href: url, target: '_blank', rel: 'noopener' });
    a.dataset.noTrack = ''; // Este clic ya se mide abajo con más detalle.
    document.body.append(a);
    a.click();
    a.remove();
    track('whatsapp_click', { source, line: s.lineSlug, product: s.productSlug, option: s.option, space: s.space });
    this.finish(
      'Te abrimos WhatsApp',
      'Tu mensaje ya está escrito: solo tienes que enviarlo. Si quieres, adjunta fotos de tus vidrios para orientarte mejor.',
      url,
    );
  }

  private async onSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    // Enter en un campo dispara un «envío implícito» que el navegador atribuye al botón de enviar.
    // Por eso: antes del último paso, Enter avanza; en el último paso solo un clic/Enter sobre el
    // propio botón «Solicitar llamada» (o desde los campos de la llamada) envía al servidor.
    const active = document.activeElement as HTMLElement | null;
    const fromCallback = !!active?.closest('[data-qw-callback]');
    if (this.step < this.steps.length - 1) {
      this.show(this.step + 1);
      return;
    }
    if (!fromCallback) return;
    const err = this.$('[data-qw-error]');
    const fail = (msg: string, field?: HTMLElement | null) => {
      err.textContent = msg;
      err.classList.remove('hidden');
      field?.focus();
    };
    err.classList.add('hidden');
    const name = this.form.elements.namedItem('name') as HTMLInputElement;
    const phone = this.form.elements.namedItem('phone') as HTMLInputElement;
    const email = this.form.elements.namedItem('email') as HTMLInputElement;
    const consent = this.form.elements.namedItem('consent') as HTMLInputElement;
    if (name.value.trim().length < 2) return fail('Escribe tu nombre para poder llamarte.', name);
    if (!phone.checkValidity() || !phone.value.trim()) return fail('Revisa tu número de celular.', phone);
    if (email.value && !email.checkValidity()) return fail('Revisa tu correo electrónico.', email);
    if (!consent.checked) return fail('Para continuar, autoriza el tratamiento de tus datos.', consent);

    const btn = this.$<HTMLButtonElement>('[data-qw-submit]');
    btn.disabled = true;
    btn.querySelector('[data-label]')!.classList.add('hidden');
    btn.querySelector('[data-loading]')!.classList.remove('hidden');
    try {
      const s = this.summary();
      const fd = new FormData(this.form);
      const payload = {
        name: s.name,
        phone: phone.value,
        email: email.value,
        city: s.city,
        space: s.space,
        area: s.area || 'Medición en visita técnica',
        windows: s.windows,
        product: s.product,
        option: s.option,
        message: s.message,
        interest: s.line ? [s.line] : ['No estoy seguro'],
        page: location.pathname,
        consent: '1',
        company: String(fd.get('company') ?? ''),
      };
      const res = await fetch(this.form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || 'No pudimos enviar tu solicitud.');
      track('quote_submit', { method: 'callback', line: s.lineSlug, product: s.productSlug });
      this.finish('¡Recibimos tu solicitud!', 'Un asesor te llamará en horario hábil. Si prefieres adelantar, escríbenos por WhatsApp.', waUrl(this.message()));
    } catch (error) {
      fail(`${(error as Error).message} Inténtalo de nuevo o escríbenos por WhatsApp.`);
    } finally {
      btn.disabled = false;
      btn.querySelector('[data-label]')!.classList.remove('hidden');
      btn.querySelector('[data-loading]')!.classList.add('hidden');
    }
  }

  private finish(title: string, text: string, wa: string): void {
    this.form.classList.add('hidden');
    this.$('[data-qw-nav]').classList.add('hidden');
    const done = this.$('[data-qw-done]');
    done.classList.remove('hidden');
    done.classList.add('flex');
    this.$('[data-done-title]').textContent = title;
    this.$('[data-done-text]').textContent = text;
    const link = this.$<HTMLAnchorElement>('[data-done-wa]');
    link.href = wa;
    link.hidden = false;
    done.focus();
  }

  reset(go = true): void {
    this.form.reset();
    this.$('[data-qw-rows]').replaceChildren();
    this.addRow();
    this.recalc();
    this.$('[data-qw-calc]').classList.add('hidden');
    this.$('[data-qw-error]').classList.add('hidden');
    this.form.classList.remove('hidden');
    this.$('[data-qw-nav]').classList.remove('hidden');
    const done = this.$('[data-qw-done]');
    done.classList.add('hidden');
    done.classList.remove('flex');
    this.syncGroups();
    if (go) this.show(0);
  }
}

/* ─── Arranque y apertura ─── */

let started = false;

export function initQuoteWizards(): void {
  if (started) return;
  started = true;

  const wizards = [...document.querySelectorAll<HTMLElement>('[data-qw]')].map((el) => new QuoteWizard(el));
  const dialog = document.getElementById('quote-dialog') as HTMLDialogElement | null;
  const dialogWizard = wizards.find((w) => w.root.dataset.mode === 'dialog');
  const inlineWizard = wizards.find((w) => w.root.dataset.mode === 'inline');

  const open = (ctx: QuoteContext) => {
    // En /contacto/ usamos el cotizador de la página en vez de abrir el panel.
    if (inlineWizard) {
      inlineWizard.prefill(ctx);
      inlineWizard.root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (!dialog || !dialogWizard) return;
    dialogWizard.prefill(ctx);
    dialog.showModal();
    document.documentElement.classList.add('overflow-hidden');
    track('quote_open', { line: ctx.line, product: ctx.product });
    requestAnimationFrame(() => dialogWizard.root.querySelector<HTMLElement>('.qw-step.is-current input')?.focus({ preventScroll: true }));
  };

  document.addEventListener('maven:quote', (e) => open((e as CustomEvent<QuoteContext>).detail ?? {}));

  // Cualquier enlace/botón con [data-quote] abre el cotizador (sin JS, el enlace lleva a /contacto/).
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-quote]');
    if (!el || e.defaultPrevented || (e as MouseEvent).metaKey || (e as MouseEvent).ctrlKey) return;
    e.preventDefault();
    const base = getContext();
    const d = el.dataset;
    const explicit = d.quoteLine !== undefined || d.quoteProduct !== undefined;
    open({
      line: explicit ? d.quoteLine || undefined : base.line,
      product: explicit ? d.quoteProduct || undefined : base.product,
      option: explicit ? d.quoteOption || undefined : base.option,
    });
  });

  if (dialog) {
    dialog.addEventListener('close', () => {
      // Solo se libera el scroll si no queda otra ventana modal abierta (p. ej. buscador sobre el cotizador).
      if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('overflow-hidden');
    });
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close(); // Clic fuera del panel.
    });
    dialog.querySelector('[data-qw-close]')?.addEventListener('click', () => dialog.close());
  }

  // Enlace directo: /contacto/?linea=seguridad o /#cotizar
  const params = new URLSearchParams(location.search);
  if (inlineWizard && (params.get('linea') || params.get('producto'))) {
    inlineWizard.prefill({ line: params.get('linea') ?? undefined, product: params.get('producto') ?? undefined });
  } else if (location.hash === '#cotizar') {
    open(getContext());
  }
}
