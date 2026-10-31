// Punto de entrada: fuentes autoalojadas, estilos y módulos.
// Las fuentes salen de node_modules y Vite las copia al sitio: nada se carga de otros dominios.
import "@fontsource-variable/anybody/wdth.css";
import "@fontsource-variable/manrope";
import "./styles/main.css";

import { iniciarAgenda } from "./js/modulos/agenda.js";
import { iniciarReservas } from "./js/modulos/reservas.js";
import { iniciarResidentes } from "./js/modulos/residentes.js";
import { revelar } from "./js/modulos/revelar.js";
import { iniciarUmbral } from "./js/modulos/umbral.js";

iniciarUmbral();
iniciarAgenda();
iniciarResidentes();
iniciarReservas();
revelar(document.querySelector(".espacios__lista"));
