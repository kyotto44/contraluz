# Contraluz · Techno y house en Bogotá

Sitio de una discoteca **ficticia** de Bogotá, hecho para mi portafolio. La idea sale del nombre: a contraluz, la gente se ve como silueta contra la luz de la cabina. El sitio se recorre como una entrada al club: con el scroll se atraviesa la puerta, las fotos se abren en capas y los láseres siguen el movimiento.

> Contraluz no existe: las noches, los DJs, los precios, la dirección y el horario son de demostración.

## Estado

En construcción, módulo por módulo. Cada módulo queda en su propio commit.

- [x] Base del proyecto: Vite, fuentes autoalojadas, tokens de diseño y configuración segura.
- [x] Entrada: con el scroll se cruza la puerta y aparece la pista.
- [x] Agenda: las próximas noches, con fechas que se calculan solas.
- [x] Residentes: cartel con los cuatro DJs y cuándo toca cada uno.
- [x] Espacios: mosaico de fotos con el patio, la barra y el sonido.
- [x] Reservas: formulario con Netlify Forms, con y sin JavaScript.
- [ ] Ubicación, horario y pie

## La entrada

- **Cruzar la puerta.** Al bajar, la puerta crece sola, el nombre se ensancha hasta salirse de la pantalla, pasa por la luz y aparece la pista. Al subir, la escena se devuelve desde cualquier punto, y se puede revertir a mitad de camino.
- **Sin librerías y en la GPU.** Son animaciones de CSS que mueven `transform` y `opacity`. Corren por tiempo y no ligadas al scroll: la inercia del touchpad no puede hacer saltar la escena.
- **Reducir movimiento y sin JavaScript.** La portada queda como dos pantallas quietas, con todo el contenido disponible.
- **Fotos con una sola luz.** `npm run fotos` pasa cada foto a grises y mapea sus tonos a la paleta: tinta, rojo láser y blanco rosado. Genera WebP en `public/imagenes/`.

## La agenda

- **Nunca queda en el pasado.** Las noches viven en el HTML y se repiten cada dos semanas. `agenda.js` las lleva a sus próximas fechas según la hora de Bogotá, y la noche sigue vigente hasta el cierre, a las 3 a. m.
- **La próxima noche manda.** Va en una franja de luz roja, y la ficha de la portada copia sus datos: «Esta noche», «Mañana» o «Próxima noche».
- **Sin JavaScript** la agenda se lee completa, con las fechas escritas en el HTML.

## Las reservas

- **Funciona sin JavaScript.** El formulario es HTML: Netlify Forms lo recibe y lleva a `/gracias/`. Un campo trampa frena a los robots.
- **Con JavaScript es mejor.** Las noches salen de la agenda, «Reservar» en una fila deja esa noche elegida, los errores se explican junto a cada campo y la confirmación aparece sin recargar.
- **Honesto.** El club no existe, y el formulario pide no dejar datos reales. Lo que se envíe llega al panel de Netlify de quien publique el sitio.

## Tecnologías

- HTML, CSS y JavaScript sin frameworks (módulos ES).
- [Vite](https://vite.dev) para desarrollo y compilación.
- Fuentes servidas desde el propio sitio (Anybody y Manrope, vía Fontsource): nada se carga de Google ni de otros dominios. Anybody tiene ancho variable: el nombre usa su versión condensada.
- Netlify para publicar, con cabeceras de seguridad y una CSP que solo permite recursos del propio dominio.

## Cómo abrirlo

Necesitas Node.js 20.19 o más reciente.

```bash
npm install
npm run dev
```

Para ver la versión final:

```bash
npm run build
npm run preview
```

## Fotos

Fotos de [Unsplash](https://unsplash.com/license), con color y recorte modificados. Los originales no se suben al repositorio; `npm run fotos` los descarga si faltan.

- Puerta: [Viktor Forgacs](https://unsplash.com/es/fotos/iDF0FXUxGhE)
- Pista: [Jorik Kleen](https://unsplash.com/es/fotos/pxCGO2S9Db0)
- Cabina: [Marcela Laskoski](https://unsplash.com/es/fotos/YrtFlrLo2DQ)
- Patio: [Pavel Lozovikov](https://unsplash.com/es/fotos/HYovA7yPPvI)
- Barra: [Lucas Chizzali](https://unsplash.com/es/fotos/K_JK5mpSLl0)
- Sonido: [Zahotoo](https://unsplash.com/es/fotos/Boo4sKszgOI)
- Reservas: [Kelvin Moquete](https://unsplash.com/es/fotos/LOV7Gbmgm30)

## Seguridad y claves

- El sitio no usa claves de API. `.env` y cualquier `.env.*` están en `.gitignore`. Solo se sube `.env.example`, con nombres de variables y sin valores.
- En Vite, toda variable con prefijo `VITE_` queda dentro del JavaScript público. Una clave secreta nunca lleva ese prefijo: se guarda en las variables de entorno de Netlify y se usa desde una función del lado del servidor.
- `.npmrc` fija versiones exactas y no ejecuta scripts de instalación de paquetes de terceros.
- `netlify.toml` define la CSP y las cabeceras de seguridad (sin iframes, sin adivinar tipos de archivo, HTTPS siempre).

## Arquitectura

```
contraluz/
├── index.html              Página principal
├── gracias/                Página tras reservar sin JavaScript
├── public/
│   ├── favicon.svg
│   └── imagenes/           Fotos procesadas (WebP)
├── scripts/
│   └── preparar-fotos.mjs  Aplica la luz del club a las fotos originales
├── src/
│   ├── main.js             Punto de entrada: fuentes, estilos y módulos
│   ├── js/modulos/         umbral.js (el cruce), agenda.js (las fechas), residentes.js, reservas.js, revelar.js
│   └── styles/
│       ├── main.css        Orden de importación
│       ├── base/           tokens.css, reset.css, global.css
│       ├── componentes/    Piezas reutilizables (cabecera…)
│       └── secciones/      Una hoja por sección de la página
├── PRODUCT.md              Para quién es y qué debe lograr
├── netlify.toml            Publicación y cabeceras de seguridad
├── .env.example            Plantilla de variables (sin valores)
└── .npmrc                  Versiones exactas, sin scripts de instalación
```
