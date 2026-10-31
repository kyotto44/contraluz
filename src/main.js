// Punto de entrada: fuentes autoalojadas, estilos y módulos.
// Las fuentes salen de node_modules y Vite las copia al sitio: nada se carga de otros dominios.
import "@fontsource-variable/anybody/wdth.css";
import "@fontsource-variable/manrope";
import "./styles/main.css";

import { iniciarAgenda } from "./js/modulos/agenda.js";
import { iniciarReservas } from "./js/modulos/reservas.js";
import { iniciarResidentes } from "./js/modulos/residentes.js";
import { revelar } from "./js/modulos/revelar.js";
import { iniciarUbicacion } from "./js/modulos/ubicacion.js";
import { iniciarUmbral } from "./js/modulos/umbral.js";

// Si un módulo falla, los demás arrancan igual: el HTML ya funciona sin ellos.
const modulos = {
  umbral: iniciarUmbral,
  agenda: iniciarAgenda,
  residentes: iniciarResidentes,
  reservas: iniciarReservas,
  ubicacion: iniciarUbicacion,
  espacios: () => revelar(document.querySelector(".espacios__lista")),
};

for (const [nombre, iniciar] of Object.entries(modulos)) {
  try {
    iniciar();
  } catch (error) {
    console.error(`[contraluz] falló «${nombre}»`, error);
  }
}
