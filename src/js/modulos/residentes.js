// Cada residente muestra cuándo toca. La fecha sale de la agenda ya ordenada, así que este
// módulo corre después de ella. Sin JavaScript, o sin una noche próxima, el enlace no aparece.

import { revelar } from "./revelar.js";

function cuandoToca(noche) {
  const aviso = noche.querySelector(".noche__aviso")?.textContent;
  if (aviso === "Esta noche") return "Toca esta noche";
  if (aviso === "Mañana") return "Toca mañana";

  const semana = noche.querySelector(".noche__semana").textContent;
  const numero = noche.querySelector(".noche__numero").textContent;
  const mes = noche.querySelector(".noche__mes").textContent;
  return `Toca el ${semana} ${numero} ${mes}`;
}

export function iniciarResidentes() {
  const lista = document.querySelector(".residentes__lista");
  if (!lista) return;

  const noches = [...document.querySelectorAll(".noche")];
  for (const residente of lista.children) {
    const nombre = residente.querySelector(".residente__nombre").textContent;
    const noche = noches.find((n) => n.querySelector(".noche__titulo").textContent.includes(nombre));
    if (!noche) continue;

    const enlace = residente.querySelector(".residente__proxima");
    enlace.textContent = cuandoToca(noche);
    enlace.hidden = false;
  }

  revelar(lista);
}
