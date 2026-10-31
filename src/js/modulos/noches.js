// Las noches viven en el HTML, que funciona sin JavaScript. Este módulo es el único que las lee:
// la agenda, los residentes y las reservas reciben estos datos y solo escriben en su parte.

import { aDia, avisoDe, escribirDia, nocheActual, proximaFecha } from "./fechas.js";

const suscriptores = [];
let filas = null;
let ultimaNoche = null;
let actuales = [];

// Las fechas del HTML se guardan al leerlas: después la agenda las reescribe en la página.
function leerFilas() {
  const texto = (fila, clase) => fila.querySelector(clase).textContent;
  return [...document.querySelectorAll(".noche")]
    .map((fila) => ({
      fila,
      base: aDia(fila.querySelector(".noche__fecha").dateTime),
      titulo: texto(fila, ".noche__titulo"),
      genero: texto(fila, ".noche__genero"),
      precio: texto(fila, ".noche__precio"),
      djs: (fila.dataset.djs ?? "").split(" ").filter(Boolean),
    }))
    .filter((noche) => Number.isFinite(noche.base)); // una fecha mala no se lleva a las demás
}

function calcular(hoy) {
  return filas
    .map((noche) => {
      const dia = proximaFecha(noche.base, hoy);
      return { ...noche, ...escribirDia(dia), dia, faltan: dia - hoy, aviso: avisoDe(dia, hoy) };
    })
    .sort((a, b) => a.dia - b.dia);
}

function refrescar() {
  const hoy = nocheActual(Date.now());
  if (hoy === ultimaNoche) return false;
  ultimaNoche = hoy;
  actuales = calcular(hoy);
  return true;
}

// Una pestaña puede quedar abierta por días: al volver a ella hay que revisar la hora.
export function alVolver(hacer) {
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) hacer();
  });
  window.addEventListener("pageshow", (evento) => {
    if (evento.persisted) hacer();
  });
}

// Llama de inmediato con las noches ordenadas, y otra vez cada vez que cambie la noche vigente.
export function suscribirNoches(alCambiar) {
  if (!filas) {
    filas = leerFilas();
    refrescar();
    alVolver(() => {
      if (!refrescar()) return;
      for (const suscriptor of suscriptores) {
        try {
          suscriptor(actuales);
        } catch (error) {
          console.error("[contraluz] no se pudieron actualizar las noches", error);
        }
      }
    });
  }
  suscriptores.push(alCambiar);
  alCambiar(actuales);
}
