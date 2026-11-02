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

// Si el HTML no trae noches (el club está en pausa), la portada y la agenda lo dicen
// en vez de mostrar una noche vieja.
function mostrarSinNoches(lista) {
  if (!lista.nextElementSibling?.matches(".agenda__vacia")) {
    const aviso = document.createElement("p");
    aviso.className = "agenda__vacia";
    aviso.textContent = "No hay noches programadas por ahora. Las próximas fechas aparecen aquí.";
    lista.after(aviso);
  }

  const ficha = document.querySelector(".ficha");
  if (!ficha) return;
  ficha.querySelector(".ficha__fecha").textContent = "Sin noches programadas";
  ficha.querySelector(".ficha__titulo").textContent = "Pronto, nuevas fechas";
  ficha.querySelector(".ficha__datos").textContent = `Techno y house de jueves a sábado, desde las ${PUERTA}`;
  ficha.querySelector(".boton").hidden = true;
}

function pintar(lista, etiqueta, noches) {
  if (!noches.length) {
    mostrarSinNoches(lista);
    return;
  }

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
