// Dice si el club está abierto ahora, según la hora de Bogotá y no la del visitante.
// El horario completo está en el HTML; sin JavaScript solo falta este aviso.

import { estadoDelClub } from "./fechas.js";
import { alVolver } from "./noches.js";

export function iniciarUbicacion() {
  const aviso = document.querySelector(".ubicacion__estado");
  if (!aviso) return;

  function actualizar() {
    const { noche, abierto, texto } = estadoDelClub(Date.now());
    aviso.textContent = texto;
    aviso.classList.toggle("ubicacion__estado--abierto", abierto);
    aviso.hidden = false;
    for (const fila of document.querySelectorAll(".horario__fila")) {
      fila.classList.toggle("horario__fila--hoy", fila.dataset.dia === String(noche));
    }
  }

  actualizar();
  alVolver(actualizar);
}
