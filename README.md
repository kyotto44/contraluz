# Contraluz · Techno y house en Bogotá

Sitio de una discoteca **ficticia** de Bogotá, hecho para mi portafolio. La idea sale del nombre: a contraluz, la gente se ve como silueta contra la luz de la cabina. El sitio se recorre como una entrada al club: con el scroll se atraviesa la puerta, las fotos se abren en capas y los láseres siguen el movimiento.

> Contraluz no existe: las noches, los DJs, los precios, la dirección y el horario son de demostración.

## Estado

En construcción, módulo por módulo. Cada módulo queda en su propio commit.

- [x] Base del proyecto: Vite, fuentes autoalojadas, tokens de diseño y configuración segura.
- [ ] Entrada (portada inmersiva)
- [ ] Agenda de noches
- [ ] Residentes
- [ ] Espacios y galería
- [ ] Reservas (Netlify Forms)
- [ ] Ubicación, horario y pie

## Tecnologías

- HTML, CSS y JavaScript sin frameworks (módulos ES).
- [Vite](https://vite.dev) para desarrollo y compilación.
- Fuentes servidas desde el propio sitio (Anybody y Manrope, vía Fontsource): nada se carga de Google ni de otros dominios. Anybody tiene ancho variable, y la entrada lo anima.
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

## Seguridad y claves

- El sitio no usa claves de API. `.env` y cualquier `.env.*` están en `.gitignore`. Solo se sube `.env.example`, con nombres de variables y sin valores.
- En Vite, toda variable con prefijo `VITE_` queda dentro del JavaScript público. Una clave secreta nunca lleva ese prefijo: se guarda en las variables de entorno de Netlify y se usa desde una función del lado del servidor.
- `.npmrc` fija versiones exactas y no ejecuta scripts de instalación de paquetes de terceros.
- `netlify.toml` define la CSP y las cabeceras de seguridad (sin iframes, sin adivinar tipos de archivo, HTTPS siempre).

## Arquitectura

```
contraluz/
├── index.html              Página principal
├── public/favicon.svg
├── src/
│   ├── main.js             Punto de entrada: fuentes y estilos
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
