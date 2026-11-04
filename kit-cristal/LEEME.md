# Maven Films · Kit de logo «Cristal»

Dirección aprobada: **Cristal** — un panel de vidrio y una lámina de película superpuestos; donde se cruzan, el vidrio queda protegido.

## Contenido

| Carpeta / archivo | Qué es |
|---|---|
| `svg/` | Maestros vectoriales: símbolo, horizontal, apilado y wordmark en **color, reverso, negro, blanco y Petróleo**; `simbolo-pequeno`; íconos (`app-icon`, `favicon`, `icono-cuadrado`, `icono-maskable`, `avatar`) |
| `png/` | Los mismos archivos en PNG transparente (símbolos e íconos 1024 px, lockups 2400 px de ancho) |
| `web/` | `favicon.ico` (16/32/48), `favicon.svg`, íconos 16–512 px, `apple-touch-icon`, `maskable-512`, `site.webmanifest`, `head-snippet.html` |
| `presentacion/` | Lámina de presentación con mockups (HTML + 5 slides PNG) |
| `guia-de-uso.pdf` / `.html` | Guía de uso de 2 páginas: espacio de seguridad, tamaños mínimos, color, contraste, fondos, errores comunes |
| `pruebas/` | Hoja de pruebas de la skill (escala, 16/32 px, fondos, desenfoque, espejo, rotación) |

## Cuándo usar cada versión
- **Color**: fondos blancos o Concreto.
- **Reverso**: fondos Petróleo u oscuros. El traslape es un hueco real (transparente).
- **Negro / Blanco / Petróleo**: un solo color (rotulación, vinilo, sellos). El traslape queda vacío y los reflejos son cortes; hay un chaflán en los dos puntos donde vidrio y película se tocan, para evitar un «pellizco».
- **Símbolo pequeño**: menos de 32 px (favicon, íconos). Sin destello.

## Resultados de las pruebas
- Auditoría SVG: símbolos y wordmark 100/100; lockups 91–99 (la advertencia es por los 5 colores de la paleta, intencionales).
- Se lee a 16 px como dos cuadrados con traslape; el destello desaparece desde ~32 px (por eso existe la versión pequeña).
- Espejo y giro 180°: sin lecturas involuntarias.
- Contraste: Petróleo/Concreto 11.5:1; Ámbar/Petróleo 6.1:1; **Ámbar sobre blanco 2.3:1 (no usar como texto)**; Acero sobre blanco 1.6:1 (el vidrio se ve suave sobre claro).

## Pendientes y límites (importante)
1. **Wordmark**: las letras MAVEN FILMS están dibujadas a mano como paths; no son una fuente licenciada. Un diseñador debería revisarlas (espaciado óptico, kerning) antes de producción masiva.
2. **Marca registrada**: no se hizo búsqueda. Consultar la SIC y hacer búsqueda por imagen antes de usar la marca comercialmente.
3. **Pantone y CMYK**: el CMYK de la guía es una conversión aproximada y los Pantone están sin definir. Validar con una prueba física del impresor.
4. **Tamaños mínimos de impresión** (mm) son recomendados a partir de pruebas en pantalla; probar en vinilo real antes de producir.
5. **Prueba de «estantería» frente a competidores** no realizada: la biblioteca de referencia no incluye marcas de películas para vidrio.
6. **Guía**: falta completar el nombre y correo del responsable de marca.
7. **Lámina de presentación**: los nombres de los mockups son de ejemplo («Nombre Apellido», `nombre@mavenfilms.com`).
8. Los SVG a color usan formas simples sin máscaras ni filtros; los de un color usan trazos exactos (sin `<text>`).
