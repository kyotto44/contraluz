// Dibuja la imagen que se ve al compartir el enlace en redes y chats.
//
//   npm run compartir
//
// Abre scripts/compartir/plantilla.html en Edge o Chrome sin ventana, toma una captura
// de 1200×630 y la guarda como JPG en public/imagenes/compartir.jpg. La plantilla usa las
// mismas fuentes y la misma foto de la puerta que el sitio.
// Si el navegador está en otra ruta, pásala en la variable NAVEGADOR.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const PLANTILLA = resolve("scripts/compartir/plantilla.html");
const SALIDA = "public/imagenes/compartir.jpg";

const CANDIDATOS = [
  process.env.NAVEGADOR,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const navegador = CANDIDATOS.find((ruta) => ruta && existsSync(ruta));
if (!navegador) {
  console.error("No encontré Edge ni Chrome. Pasa la ruta en la variable NAVEGADOR.");
  process.exit(1);
}

const carpeta = await mkdtemp(join(tmpdir(), "contraluz-"));
const captura = join(carpeta, "captura.png");

try {
  execFileSync(navegador, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    // Tiempo para que carguen las fuentes y la foto antes de la captura.
    "--virtual-time-budget=4000",
    `--user-data-dir=${join(carpeta, "perfil")}`,
    `--screenshot=${captura}`,
    pathToFileURL(PLANTILLA).href,
  ]);

  await sharp(captura).jpeg({ quality: 84, mozjpeg: true }).toFile(SALIDA);
  console.log(`Listo: ${SALIDA}`);
} finally {
  await rm(carpeta, { recursive: true, force: true });
}
