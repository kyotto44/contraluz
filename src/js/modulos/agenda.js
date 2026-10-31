// Lleva la agenda a sus próximas fechas: nunca queda en el pasado,
// y la ficha de la portada siempre muestra la noche que sigue.

import { PUERTA } from "./fechas.js";
import { suscribirNoches } from "./noches.js";
import { revelar } from "./revelar.js";

function escribirFila({ fila, iso, numero, semana, mes, texto }) {
  fila.querySelector(".noche__fecha").dateTime = iso;
  fila.querySelector(".noche__numero").textContent = numero;
  fila.querySelector(".noche__semana").textContent = semana;
  fila.querySelector(".noche__mes").textContent = `de ${mes}`;
  fila.querySelector(".boton").setAttribute("aria-label", `Reservar para el ${texto}`);
}

function actualizarFicha({ aviso, texto, titulo, genero, precio }) {
  const ficha = document.querySelector(".ficha");
  if (!ficha) return;
  ficha.querySelector(".ficha__fecha").textContent = `${aviso}: ${texto}`;
  ficha.querySelector(".ficha__titulo").textContent = titulo;
  ficha.querySelector(".ficha__datos").textContent = `${genero}. Puerta a las ${PUERTA} ${precio}.`;
}

function pintar(lista, etiqueta, noches) {
  const enfocado = document.activeElement;
  noches.forEach((noche, orden) => {
    escribirFila(noche);
    noche.fila.classList.toggle("noche--proxima", orden === 0);
    noche.fila.classList.toggle("sobre-luz", orden === 0);
    if (lista.children[orden] !== noche.fila) lista.insertBefore(noche.fila, lista.children[orden]);
  });
  // Mover una fila le quita el foco: quien navega con teclado no debe perder su lugar.
  if (document.activeElement !== enfocado && lista.contains(enfocado)) enfocado.focus({ preventScroll: true });

  const [proxima] = noches;
  if (!proxima) return;
  etiqueta.textContent = proxima.aviso;
  proxima.fila.querySelector(".noche__cartel").prepend(etiqueta);
  actualizarFicha(proxima);
}

export function iniciarAgenda() {
  const lista = document.querySelector(".agenda__lista");
  if (!lista) return;
  const etiqueta = lista.querySelector(".noche__aviso");
  suscribirNoches((noches) => pintar(lista, etiqueta, noches));
  revelar(lista);
}
