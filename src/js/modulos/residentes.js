// Cada residente muestra cuándo toca, según su nombre en las noches de la agenda.
// Sin JavaScript, o sin una noche próxima, el enlace no aparece.

import { suscribirNoches } from "./noches.js";
import { revelar } from "./revelar.js";

function cuandoToca({ faltan, semana, numero, mes }) {
  if (faltan === 0) return "Toca esta noche";
  if (faltan === 1) return "Toca mañana";
  return `Toca el ${semana} ${numero} de ${mes}`;
}

// Un nombre largo no se parte a mitad de palabra: si su palabra más larga no cabe, la letra se achica.
// Sin JavaScript el nombre baja de línea donde haga falta, pero se lee completo.
function ajustarNombres(nombres) {
  for (const nombre of nombres) nombre.style.removeProperty("--ajuste");
  const disponibles = nombres.map((nombre) => nombre.clientWidth);
  // Midiendo, el nombre toma el ancho de su palabra más larga.
  for (const nombre of nombres) nombre.classList.add("residente__nombre--midiendo");
  const escalas = nombres.map((nombre, i) => disponibles[i] / nombre.offsetWidth);
  nombres.forEach((nombre, i) => {
    nombre.classList.remove("residente__nombre--midiendo");
    if (escalas[i] < 1) nombre.style.setProperty("--ajuste", (escalas[i] * 0.98).toFixed(3));
  });
}

export function iniciarResidentes() {
  const lista = document.querySelector(".residentes__lista");
  if (!lista) return;

  const nombres = [...lista.querySelectorAll(".residente__nombre")];
  let pendiente = 0;
  const ajustar = () => {
    cancelAnimationFrame(pendiente);
    pendiente = requestAnimationFrame(() => ajustarNombres(nombres));
  };
  new ResizeObserver(ajustar).observe(lista);
  document.fonts.ready.then(ajustar);

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
