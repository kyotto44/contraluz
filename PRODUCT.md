# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + HTML, CSS y JavaScript sin frameworks (módulos ES), igual que los proyectos anteriores del portafolio (Páramo). Fuentes autoalojadas con Fontsource. Publicación en Netlify con cabeceras de seguridad y CSP estricta (solo recursos del propio dominio). Formularios con Netlify Forms. Sin librerías de animación: las animaciones son CSS y corren por tiempo; el scroll solo indica el sentido, y un módulo de JavaScript decide cuándo corren. IntersectionObserver revela cada bloque la primera vez que entra en pantalla.

## Users

- **Quien evalúa el portafolio** (reclutadores, clientes de desarrollo web): abre el sitio para juzgar oficio de diseño, animación, rendimiento y accesibilidad. Supuesto: es la audiencia real, igual que en Páramo.
- **El visitante simulado del club**: alguien en Bogotá que decide a qué fiesta ir este fin de semana, casi siempre desde el celular y de noche. Quiere saber quién toca, cuándo, cuánto cuesta entrar y cómo reservar.

## Product Purpose

Contraluz es una discoteca **ficticia** de techno y house en Bogotá, hecha como pieza de portafolio. El sitio debe dejar claro en segundos qué noche viene, quién toca y cómo reservar, y a la vez demostrar una experiencia inmersiva de alto nivel que funcione rápido en un celular.

Éxito: el visitante entiende la próxima noche y llega a reservar sin buscar; quien evalúa el portafolio recuerda la entrada al club y no encuentra fallas de rendimiento ni de accesibilidad.

## Positioning

El nombre es el mecanismo: a contraluz, la gente se ve como silueta contra la luz de la cabina. El sitio está construido con esa idea (siluetas contra campos de luz roja), no con una plantilla de discoteca con acentos de neón.

## Operating Context

- Se consulta de noche, en el celular, a menudo con poca luz y señal irregular.
- Agenda semanal de noches de techno y house con DJs residentes e invitados.
- Reservas de mesa o de lista por fecha, recibidas con Netlify Forms.

## Capabilities and Constraints

- Contenido de demostración: noches, DJs, precios, dirección y horario son inventados y se marcan como ficticios en el sitio y en el README.
- Sin claves de API en el navegador. Si algún día hace falta una, va en variables de entorno de Netlify y se usa desde una función del lado del servidor.
- Debe funcionar sin JavaScript (contenido y formulario llegan como HTML).
- Sin decidir todavía: secciones exactas más allá de agenda, residentes, espacios, galería, reservas y ubicación; si habrá páginas por evento.

## Brand Commitments

- Nombre: **Contraluz**. Ciudad: Bogotá. Música: techno y house.
- Dirección visual elegida por el usuario: «Umbral», cinematográfica e inmersiva. Al bajar con el scroll, la puerta del club se atraviesa sola en 1,5 segundos; al subir, la escena se devuelve. Hay fotos en capas con zoom y láseres que salen con la puerta. Paleta de tinta casi negra, blanco frío y rojo láser.
- Textos en español de Colombia, directos, sin exceso de jerga.

## Evidence on Hand

No hay fotos, logos, testimonios ni datos reales. Las fotos serán de bancos con licencia libre (Unsplash o Pexels), descargadas con permiso del usuario y optimizadas dentro del sitio. No se inventan reseñas, cifras de asistencia ni marcas aliadas.

## Product Principles

1. La próxima noche y la reserva siempre se encuentran en segundos, con o sin la experiencia inmersiva.
2. El espectáculo es la entrada; el resto de la página es legible y tranquilo.
3. Rendimiento de celular de gama media primero: si un efecto no aguanta ahí, no va.
4. Honestidad: todo lo inventado se presenta como demostración.

## Accessibility & Inclusion

WCAG 2.1 AA. Respeto por «reducir movimiento» (la entrada se convierte en un fundido sin desplazamientos). Ningún destello supera 3 por segundo (WCAG 2.3.1). Todo se usa con teclado y foco visible sobre fondos oscuros y rojos.
