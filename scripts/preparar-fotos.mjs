// Convierte las fotos originales en las versiones que publica el sitio.
//
//   npm run fotos
//
// Cada foto pasa a escala de grises, se ajustan sus negros y blancos, y cada tono se
// mapea a la luz del club: tinta en las sombras, rojo láser en los medios, blanco
// rosado en lo más quemado. Así fotos de autores distintos parecen de la misma noche.
// Los originales viven en fuentes/fotos/ (Git los ignora) y se bajan solos si faltan.

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const ENTRADA = "fuentes/fotos";
const SALIDA = "public/imagenes";

// Mismos colores que --tinta, --laser y --laser-nucleo en tokens.css.
const TONOS = [
  { en: 0, color: [6, 8, 15] },
  { en: 0.5, color: [255, 45, 70] },
  { en: 1, color: [255, 214, 219] },
];

const FOTOS = [
  {
    nombre: "puerta",
    autor: "Viktor Forgacs",
    url: "https://images.unsplash.com/photo-1634335572482-c43700ecbc23?q=88&fm=jpg",
    // Solo la zona de la puerta y sus haces: el resto de la foto es negro.
    recorte: { left: 0, top: 700, width: 3000, height: 1600 },
    negro: 12,
    blanco: 235,
    // Un grano mínimo evita que la neblina oscura se vea en bandas.
    grano: 3,
    // La neblina se pinta en la foto para que el rojo ocupe la pantalla desde el inicio.
    // Los radios terminan antes del borde del recorte: fuera de la foto todo sigue en tinta.
    neblina: { x: 1160, y: 732, radioX: 1150, radioY: 725, fuerza: 0.3 },
    // El celular baja la de 2000: ocupa menos de la mitad de memoria al decodificarla.
    anchos: [2000, 3000],
  },
  {
    nombre: "multitud",
    autor: "Jorik Kleen",
    url: "https://images.unsplash.com/photo-1540496817185-62c9f059f1c7?w=2400&q=85&fm=jpg",
    negro: 18,
    blanco: 245,
    anchos: [828, 1280, 1920, 2400],
  },
  {
    nombre: "cabina",
    autor: "Marcela Laskoski",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=2400&q=85&fm=jpg",
    // El fondo morado es oscuro en grises: se abre el rango para que se vuelva luz roja.
    negro: 8,
    blanco: 150,
    anchos: [828, 1280, 1920, 2400],
  },
  {
    nombre: "barra",
    autor: "Lucas Chizzali",
    url: "https://images.unsplash.com/photo-1670781601343-74a4737c22ac?w=2400&q=85&fm=jpg",
    // Casi todo es sombra: abrir el rango deja ver las botellas detrás del neón.
    negro: 6,
    blanco: 120,
    anchos: [828, 1280, 1920],
  },
  {
    nombre: "sonido",
    autor: "Zahotoo",
    url: "https://images.unsplash.com/photo-1767558715201-8d5658abcd0b?w=2400&q=85&fm=jpg",
    negro: 8,
    blanco: 190,
    anchos: [828, 1280, 1920],
  },
  {
    nombre: "patio",
    autor: "Pavel Lozovikov",
    url: "https://images.unsplash.com/photo-1520259075182-da7db177117b?w=2400&q=85&fm=jpg",
    negro: 8,
    blanco: 225,
    anchos: [828, 1280, 1920],
  },
  {
    nombre: "manos",
    autor: "Kelvin Moquete",
    url: "https://images.unsplash.com/photo-1590721791974-d6c8ca43f6bc?w=2400&q=85&fm=jpg",
    // Con cielo de sobra para el título. Abajo solo queda sombra, que empalma con la tinta de la página.
    recorte: { left: 0, top: 200, width: 2400, height: 1800 },
    // El cielo es casi blanco: con este rango cae en rojo láser y no en blanco quemado.
    negro: 20,
    blanco: 430,
    anchos: [828, 1280, 1920, 2400],
  },
];

// Azar con semilla fija: repetir el script da exactamente las mismas imágenes.
let semilla = 44;
function azar() {
  semilla = (semilla * 1664525 + 1013904223) >>> 0;
  return semilla / 4294967296;
}

function crearMapaDeTonos() {
  const mapa = new Uint8Array(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    const fin = TONOS.findIndex((tono) => t <= tono.en);
    const b = TONOS[fin];
    const a = TONOS[Math.max(fin - 1, 0)];
    const avance = b.en === a.en ? 0 : (t - a.en) / (b.en - a.en);
    for (let canal = 0; canal < 3; canal++) {
      mapa[i * 3 + canal] = Math.round(a.color[canal] + (b.color[canal] - a.color[canal]) * avance);
    }
  }
  return mapa;
}

async function asegurarOriginal({ nombre, url }) {
  const ruta = `${ENTRADA}/${nombre}.jpg`;
  if (existsSync(ruta)) return ruta;
  await mkdir(ENTRADA, { recursive: true });
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(`No se pudo bajar ${nombre}: ${respuesta.status}`);
  await writeFile(ruta, Buffer.from(await respuesta.arrayBuffer()));
  return ruta;
}

function aplicarNeblina(gris, x, y, neblina) {
  if (!neblina) return gris;
  const dx = (x - neblina.x) / neblina.radioX;
  const dy = (y - neblina.y) / neblina.radioY;
  const distancia = Math.min(Math.hypot(dx, dy), 1);
  // Curva suave: se apaga del todo antes del borde del recorte.
  const luz = neblina.fuerza * (1 - distancia) ** 2 * (1 + 2 * distancia);
  return 1 - (1 - gris) * (1 - luz);
}

async function procesar(foto, mapa) {
  const original = await asegurarOriginal(foto);
  let imagen = sharp(original);
  if (foto.recorte) imagen = imagen.extract(foto.recorte);
  const { data, info } = await imagen.grayscale().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const rango = foto.blanco - foto.negro;
  const color = Buffer.alloc(width * height * 3);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const base = Math.min(Math.max((data[i * channels] - foto.negro) / rango, 0), 1);
      const gris = aplicarNeblina(base, x, y, foto.neblina);
      const grano = foto.grano ? (azar() - 0.5) * foto.grano : 0;
      const tono = Math.min(Math.max(Math.round(gris * 255 + grano), 0), 255);
      color[i * 3] = mapa[tono * 3];
      color[i * 3 + 1] = mapa[tono * 3 + 1];
      color[i * 3 + 2] = mapa[tono * 3 + 2];
    }
  }

  const entrada = { raw: { width, height, channels: 3 } };
  for (const ancho of foto.anchos) {
    const base = sharp(color, entrada).resize({ width: ancho, withoutEnlargement: true });
    // Solo WebP: estas fotos decodifican más rápido que en AVIF y las grandes pesan menos.
    const webp = `${SALIDA}/${foto.nombre}-${ancho}.webp`;
    const w = await base.webp({ quality: 76, effort: 6 }).toFile(webp);
    console.log(`${foto.nombre}-${ancho} (${w.width}x${w.height}): ${(w.size / 1024).toFixed(0)} KB`);
  }
}

await mkdir(SALIDA, { recursive: true });
const mapa = crearMapaDeTonos();
for (const foto of FOTOS) await procesar(foto, mapa);
