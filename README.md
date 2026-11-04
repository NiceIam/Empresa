# Maven Films — sitio web

Sitio oficial de **Maven Films S.A.S.**: películas para vidrio de control solar, seguridad, decorativas y sandblasting.

- **Stack:** [Astro 7](https://astro.build) + Tailwind CSS 4 sobre **Node.js** (adaptador `@astrojs/node`, modo standalone).
- **Enfoque:** páginas 100 % pre-renderizadas (HTML estático, casi sin JavaScript) para máxima velocidad y SEO. Solo el endpoint del formulario (`/api/contacto/`) corre en el servidor.
- **Tipografía:** Sora (títulos, geométrica como el wordmark) + Inter (texto). Autohospedadas y precargadas.
- **Paleta:** Petróleo `#0F2E3A`, Ámbar solar `#E39B2D`, Acero `#C5CBD0`, Concreto `#E9E7E2`, Grafito `#22262A`, Blanco roto `#F7F7F5` (tokens en `src/styles/global.css`).

## Uso

```bash
npm install
npm run dev        # desarrollo en http://localhost:4321
npm run build      # compila a dist/
npm start          # sirve el build en producción (Node >= 22.12)
```

## Dónde se cambia cada cosa

| Qué | Archivo |
| --- | --- |
| **Redes sociales**, teléfono, WhatsApp, correo, dirección, horarios, NIT, Analytics | `src/config/site.ts` |
| Productos, líneas, fichas técnicas y preguntas frecuentes | `src/data/catalog.ts` |
| Soluciones por segmento, proceso, FAQ generales, cifras | `src/data/solutions.ts` |
| Guías (blog) | `src/content/guias/*.md` |
| Colores y estilos globales | `src/styles/global.css` |
| Variables de servidor (SMTP, dominio) | `.env` (ver `.env.example`) |

### Redes sociales

En `src/config/site.ts` → `social`, pega la URL completa de cada perfil. Los que estén vacíos no se muestran. Al llenarlos, aparecen en el pie de página y se agregan a los datos estructurados (`sameAs`) que Google usa para relacionar la marca con sus perfiles.

```ts
social: {
  instagram: 'https://www.instagram.com/mavenfilms',
  facebook: '',
  tiktok: '',
  // ...
}
```

### Formulario de cotización

Sin configuración, las solicitudes quedan en los logs del servidor (`[cotizacion] ...`). Para recibirlas por correo, define `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` y `QUOTE_TO` en `.env`. Incluye validación, anti-spam (honeypot), límite de 5 envíos por IP cada 10 minutos y funciona incluso sin JavaScript.

## Despliegue

1. `npm ci && npm run build`
2. Variables: `SITE_URL`, `HOST=0.0.0.0`, `PORT`, y SMTP si aplica. Si hay proxy/CDN delante, `TRUST_PROXY=true`.
3. Ejecutar `npm start` (o `node dist/server/entry.mjs`) con un gestor de procesos (PM2, systemd o el panel Node.js del hosting).

## SEO incluido

- Títulos y descripciones únicos por página, en longitudes que Google muestra completas.
- URLs semánticas con palabras clave (`/peliculas/control-solar/polarizado-nanoceramico/`).
- Datos estructurados JSON-LD: `Organization`, `LocalBusiness` (SEO local Bogotá y Sabana), `WebSite`, `BreadcrumbList`, `Service` + `OfferCatalog`, `FAQPage`, `Article`, `ItemList`.
- `sitemap-index.xml`, `robots.txt`, canonical, `hreflang es-CO`, Open Graph y Twitter Cards con imagen por página.
- Imágenes AVIF/WebP responsive, fuentes precargadas, CSS mínimo y JS solo donde hay interacción → Core Web Vitals altos.
- 13 páginas de producto, 4 de línea, 3 de soluciones por segmento y 5 guías largas pensadas para las búsquedas que hace la gente.

## ⚠️ Antes de publicar: datos de ejemplo por validar

Se inventaron datos para poder construir el sitio. **Cámbialos o confírmalos antes de salir en vivo:**

- [ ] Teléfono / WhatsApp (`+57 300 000 0000`) y correo (`ventas@mavenfilms.com.co`).
- [ ] Dominio (`https://www.mavenfilms.com.co`) en `SITE_URL`.
- [ ] Dirección física, NIT, horarios y municipios de cobertura.
- [ ] Año de fundación (2024).
- [ ] Promesas comerciales: "visita técnica sin costo", "respuesta en 1 día hábil", "garantía escrita", "instalación en 1 día".
- [ ] Valores técnicos de referencia (rechazo de IR, vida útil) contra las fichas reales del fabricante. El nombre "MKR70" se tomó de la lista interna.
- [ ] Política de tratamiento de datos: es un borrador base; debe revisarla un abogado.
- [ ] No se publicaron testimonios ni calificaciones: inventarlos es publicidad engañosa (Ley 1480) y Google lo penaliza. Agréguenlos cuando tengan reseñas reales.

## Siguientes pasos para posicionar (lo que el código no puede hacer solo)

1. **Google Business Profile** con dirección y fotos reales de instalaciones. Es el factor #1 del SEO local.
2. Verificar el dominio en **Google Search Console** y enviar el sitemap.
3. Pedir **reseñas en Google** a cada cliente instalado.
4. Reemplazar las fotos de stock por **fotos propias** de proyectos (antes/después).
5. Publicar 2 guías nuevas por mes (ej. "precio de polarizado arquitectónico", "película para claraboyas", "película anti-grafiti").

## Créditos de imágenes

Fotografías de [Unsplash](https://unsplash.com) bajo la [Licencia Unsplash](https://unsplash.com/license) (uso comercial gratuito, sin atribución obligatoria): Fabian Kleiser, Alisa Katunina, Invest Europe, Adolfo Félix, Caroline Badran, Nick Russill, Rowan Heuvel, Declan Sun, Victor Rosario, Aalo Lens, Spencer Plouzek y Tim Schmidbauer.

Logo y kit de marca: `kit-cristal/` (dirección «Cristal»).
