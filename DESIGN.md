---
name: Contraluz
description: Siluetas en tinta contra campos de luz roja; una discoteca ficticia de techno y house en Bogotá.
colors:
  tinta: "#06080f"
  tinta-alta: "#0d111c"
  tinta-linea: "#232a3b"
  tinta-borde: "#6f7a94"
  hielo: "#e8ecf5"
  hielo-suave: "#aab3c7"
  laser: "#ff2d46"
  laser-nucleo: "#ffd6db"
  sobre-laser: "#06080f"
typography:
  marca:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "min(22.6cqi, 38svh)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 62"
  display:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.86
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3.6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  dia:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "5.5rem"
    fontWeight: 900
    lineHeight: 0.86
  title:
    fontFamily: "Anybody Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(1.375rem, 1.1rem + 1vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.05
    fontVariation: "'wdth' 125"
  body:
    fontFamily: "Manrope Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-large:
    fontFamily: "Manrope Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  radio: "4px"
spacing:
  espacio-2: "0.5rem"
  espacio-3: "0.75rem"
  espacio-4: "1rem"
  espacio-5: "1.5rem"
  espacio-6: "2rem"
  espacio-7: "3rem"
  espacio-8: "5rem"
  espacio-9: "8rem"
  margen: "clamp(1rem, 0.5rem + 2.5vw, 3rem)"
components:
  boton:
    backgroundColor: "{colors.laser-nucleo}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.radio}"
    padding: "0.75rem 1.5rem"
  boton-hover:
    backgroundColor: "{colors.hielo}"
    textColor: "{colors.tinta}"
  boton-sobre-luz:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.hielo}"
    rounded: "{rounded.radio}"
  campo:
    backgroundColor: "{colors.tinta-alta}"
    textColor: "{colors.hielo}"
    rounded: "{rounded.radio}"
    padding: "0.75rem 1rem"
    height: "3rem"
  noche-proxima:
    backgroundColor: "{colors.laser}"
    textColor: "{colors.sobre-laser}"
    padding: "3rem 0"
  cabecera:
    backgroundColor: "rgb(6 8 15 / 0.86)"
    textColor: "{colors.hielo-suave}"
---

# Design System: Contraluz

## Overview

**Creative North Star: "Siluetas contra la luz"**

A contraluz, la gente se ve como silueta contra la luz de la cabina. Todo el sistema sale de esa imagen: la luz roja no es un acento sino un campo que ocupa regiones enteras (la neblina de la puerta, la franja de la próxima noche, la foto de las reservas), y lo que va delante de ella (texto, botones, personas) se dibuja como silueta en tinta. Donde no hay luz, la página es tinta casi negra con texto en blanco frío.

La página se recorre como una entrada al club. El espectáculo está en la puerta: al bajar, la puerta se atraviesa sola en 1,5 s y los láseres salen con ella. Lo que sigue es tranquilo y legible, pensado para el celular, de noche y con poca luz. La densidad es baja: pocos elementos, grandes y con mucho aire.

Se rechaza a propósito la discoteca de plantilla: fondo negro con acentos de neón, títulos con degradado y un hero centrado sobre una fila de tarjetas.

**Key Characteristics:**
- Un solo tema, oscuro, elegido por la escena de uso: de noche y en el celular.
- La luz roja llena regiones; nunca es un borde, un brillo ni un detalle suelto.
- Títulos en Anybody condensada y en mayúsculas, como un cartel; texto en Manrope.
- Esquinas casi rectas (4px) y líneas de 1px. Sin sombras decorativas ni tarjetas.
- Fotos de autores distintos llevadas a la misma luz: grises mapeados a tinta, rojo láser y blanco rosado.

## Colors

Tres luces y una oscuridad: tinta, el rojo de la cabina, su centro quemado y un blanco frío.

### Primary
- **Rojo láser** (`laser`): la luz de la cabina. Llena regiones enteras: la neblina de la portada, la franja de la próxima noche en la agenda, los láseres, el umbral de la página 404. Sobre tinta también sirve para el texto de un enlace destacado («Toca el jueves…», 5,4:1).
- **Núcleo quemado** (`laser-nucleo`): el centro de la luz, donde el rojo se vuelve casi blanco. Es el color del botón principal (sobre la neblina roja, un botón rojo se perdería), de los mensajes de error y de los hover de los enlaces.

### Neutral
- **Tinta** (`tinta`): fondo de toda la página y color de las siluetas. También es el texto sobre rojo (`sobre-laser`), porque el blanco no llega a 4,5:1 sobre el láser.
- **Tinta alta** (`tinta-alta`): superficies apenas elevadas: campos del formulario, la puerta de la 404.
- **Línea de tinta** (`tinta-linea`): divisiones de 1px entre filas, la barra de desplazamiento.
- **Borde de campo** (`tinta-borde`): el contorno de cada control, a 4,5:1 sobre tinta para que se vea.
- **Hielo** (`hielo`): texto principal, títulos y anillo de foco.
- **Hielo suave** (`hielo-suave`): texto secundario sobre tinta (9,4:1).

### Named Rules
**La regla del campo de luz.** El rojo ocupa una región entera o no aparece. Nada de bordes rojos, sombras rojas de adorno ni texto rojo sobre rojo.

**La regla de la silueta.** Lo que va encima de la luz va en tinta: el texto de la próxima noche, el título de las reservas y el botón de la franja roja.

**La regla del navegador.** La selección, el cursor de texto, la barra de desplazamiento y los controles nativos llevan la paleta: selección en láser con texto en tinta, cursor y `accent-color` en láser.

## Typography

**Display Font:** Anybody Variable (con Arial Narrow)
**Body Font:** Manrope Variable (con Segoe UI y system-ui)

**Character:** Anybody tiene ancho variable y hace de cartel: condensada al 62–75 % en los nombres grandes y ensanchada al 125–150 % en títulos cortos y en la marca de la cabecera. Manrope es geométrica, abierta y se lee bien en pantallas chicas con poca luz. Las dos se sirven desde el propio sitio.

### Hierarchy
- **Marca** (900, `min(22.6cqi, 38svh)`, 0.86, ancho 62 %): el nombre CONTRALUZ en la portada y en el pie, de lado a lado. Al cruzar la puerta se ensancha hasta salirse de la pantalla.
- **Display** (900, hasta 6rem, 0.86, ancho 75 %, mayúsculas): el título de cada sección (Agenda, Residentes) y de las páginas sueltas (gracias, 404).
- **Headline** (800–900, hasta 4,5rem, 0.95): el título de la próxima noche y la confirmación de la reserva.
- **Día** (900, 4rem en la lista, 5.5rem en la próxima noche y 7.5rem en escritorio, 0.86): el número del día en la agenda, que se lee de un vistazo.
- **Title** (800, hasta 1,875rem, 1.05, ancho 125 %): nombres de noches, espacios, la ficha de la portada.
- **Body** (400, 1.0625rem, 1.6): texto corrido, con un máximo de 65ch y 28–34rem en los textos de apoyo.
- **Label** (700, 0.875rem): etiquetas de campos, avisos, errores y el menú.

### Named Rules
**La regla del ancho.** El ancho de Anybody carga el significado: condensada para lo que debe llenar la pantalla, ancha para lo corto que debe sentirse firme. No uses la medida del 100 % en títulos.

**La regla del nombre entero.** Un nombre de DJ o de noche se lee completo. Las palabras largas se parten por sílabas con guion (`hyphens: auto`) o se achica la letra (los residentes, con `--ajuste`). Se recorta solo la ficha de la portada, porque el nombre completo está en la agenda.

## Layout

Una sola página larga en bandas a todo el ancho. El contenido se alinea con `--borde`, que es el margen lateral (`margen`, entre 1 y 3rem) hasta que la página llega a 90rem; desde ahí centra el contenido. Las secciones se separan con `espacio-9` (8rem) y los bloques internos con `espacio-7` (3rem): grupos apretados, separaciones generosas.

El celular manda: una columna, la fecha encima del nombre en la próxima noche y el menú reducido a la marca y «Reservar». Desde 48rem las cabezas de sección ponen el texto de apoyo al lado del título; desde 64rem los residentes y las reservas pasan a dos columnas. Los nombres grandes se miden con unidades de contenedor (`cqi`) para llenar justo su ancho. La cabecera, los rellenos inferiores y la ficha respetan el notch y la barra de inicio con `env(safe-area-inset-*)`.

## Elevation & Depth

El sistema es plano. La profundidad no viene de sombras sino de la luz: las capas son tinta, tinta alta y el campo rojo, y lo que está delante es lo que queda en silueta. Hay solo dos degradados funcionales: la cabecera se funde hacia abajo para que el menú se lea sobre la luz, y una sombra de tinta detrás de la ficha de la portada en pantallas verticales para que el texto se lea junto a la puerta.

### Named Rules
**La regla sin tarjetas.** Nada de rectángulos con sombra suave. Una fila se separa con una línea de 1px; un grupo se separa con espacio.

## Shapes

Esquinas casi rectas en todo: 4px (`radio`) en botones, campos, opciones y foco; nada de píldoras. Las líneas son de 1px y del color de la tinta. Los láseres son geometría lineal fina. La puerta (en la foto de la portada, en el favicon y en la 404) es la única silueta propia: un rectángulo alto con la luz entrando por el borde.

## Components

### Buttons
- **Shape:** esquinas casi rectas (4px).
- **Primary:** fondo núcleo quemado, texto en tinta, 700, relleno de 0.75rem × 1.5rem. Con el dedo llega a 44px de alto.
- **Hover / Focus:** con mouse, el fondo pasa a hielo en 200 ms. Al apoyar el dedo se encoge a 0.97 en 140 ms con la curva de salida. Foco: anillo de 2px en hielo, separado 3px; sobre rojo, en tinta.
- **Sobre luz:** en la franja de la próxima noche el botón invierte: fondo tinta, texto hielo.
- **Enlace secundario:** texto subrayado en hielo, con relleno vertical para el dedo; con mouse pasa a núcleo quemado.

### Inputs / Fields
- **Style:** fondo tinta alta, borde de 1px en `tinta-borde`, 4px, mínimo 3rem de alto, letra de 16px como mínimo para que iOS no haga zoom. Los select usan una flecha propia en SVG.
- **Focus:** el anillo global en hielo.
- **Error / Disabled:** el borde pasa a láser y el error se escribe debajo, en núcleo quemado y 700, diciendo qué falta y cómo arreglarlo.
- **Opciones (Lista / Mesa):** cajas de 1px con radio dentro; la elegida toma un velo rojo al 12 % y borde láser.

### Navigation
- **Cabecera:** fija, en una línea, sobre tinta al 86 % que se funde hacia abajo. Marca en Anybody ancha al 150 %; enlaces en hielo suave, 600, 0.875rem, que pasan a hielo con el mouse. En el celular solo quedan la marca y el botón «Reservar».
- **Pie:** los mismos enlaces en columna y el nombre a todo el ancho en láser, como firma.

### La entrada (componente firma)
La portada es una escena de dos capas. Afuera: la foto de la puerta a sangre, los láseres, la marca y la ficha de la próxima noche abajo a la izquierda. Adentro: la pista. Al bajar, un módulo de JavaScript corre una animación de CSS de 1,5 s por tiempo, no ligada al scroll: la puerta crece, la marca se ensancha, los láseres barren y un destello lleva a la pista. Al subir, la escena se devuelve desde cualquier punto. Con «reducir movimiento» o sin JavaScript queda como dos pantallas quietas.

### La próxima noche
La primera fila de la agenda es un campo de luz roja a todo el ancho con el texto en tinta, el día en grande y el nombre en headline. Las demás noches son líneas sobre tinta. La ficha de la portada copia sus datos: «Esta noche», «Mañana» o «Próxima noche».

## Do's and Don'ts

### Do:
- **Do** llenar regiones enteras con `laser` y poner encima texto en `tinta`.
- **Do** usar Anybody condensada (62–75 %) y en mayúsculas para los nombres que deben llenar la pantalla.
- **Do** separar filas con líneas de 1px en `tinta-linea` y grupos con `espacio-7`.
- **Do** llevar toda foto nueva por `npm run fotos`, para que comparta la luz del club.
- **Do** dar a cada animación su versión con «reducir movimiento» (fundido sin desplazamiento) y no pasar de 3 destellos por segundo.
- **Do** poner todo hover dentro de `(hover: hover) and (pointer: fine)` y dar respuesta al tocar con `:active`.

### Don't:
- **Don't** usar el rojo como borde, brillo o acento suelto sobre fondo negro (el neón de discoteca de plantilla).
- **Don't** poner texto blanco sobre `laser`: no llega a 4,5:1.
- **Don't** usar tarjetas con sombra, esquinas de más de 4px ni botones en forma de píldora.
- **Don't** usar degradados en el texto.
- **Don't** cargar fuentes, imágenes o scripts de otros dominios: la CSP solo permite el propio sitio.
- **Don't** inventar reseñas, cifras ni marcas aliadas: todo lo del club se presenta como demostración.
