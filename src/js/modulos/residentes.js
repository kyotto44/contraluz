// Cada residente muestra cuándo toca, según su nombre en las noches de la agenda.
// Sin JavaScript, o sin una noche próxima, el enlace no aparece.

import { suscribirNoches } from "./noches.js";
import { revelar } from "./revelar.js";

function cuandoToca({ faltan, semana, numero, mes }) {
  if (faltan === 0) return "Toca esta noche";
  if (faltan === 1) return "Toca mañana";
  return `Toca el ${semana} ${numero} de ${mes}`;
}

export function iniciarResidentes() {
  const lista = document.querySelector(".residentes__lista");
  if (!lista) return;

  suscribirNoches((noches) => {
    for (const residente of lista.children) {
      const noche = noches.find((n) => n.djs.includes(residente.dataset.dj));
      const enlace = residente.querySelector(".residente__proxima");
      enlace.hidden = !noche;
      if (noche) enlace.textContent = cuandoToca(noche);
    }
  });

  revelar(lista);
}
