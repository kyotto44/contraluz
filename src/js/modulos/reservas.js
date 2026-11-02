// El formulario llega en HTML y funciona solo: Netlify lo recibe y lleva a /gracias/.
// Este módulo lo mejora: noches al día, errores claros y confirmación sin recargar la página.

import { suscribirNoches } from "./noches.js";

const TIEMPO_LIMITE = 15000; // con mala señal, el botón no puede quedarse en «Enviando…» para siempre
const SIN_CONEXION = "No pudimos conectar, o la conexión tardó demasiado. Tus datos siguen aquí: inténtalo de nuevo.";
const ERROR_SERVIDOR = "El servidor no pudo recibir tu reserva. Tus datos siguen aquí: inténtalo de nuevo.";

const MENSAJES = {
  nombre: () => "Escribe tu nombre.",
  celular: (campo) => (campo.value.trim() ? "Revisa el número: debe verse como 300 123 4567." : "Escribe tu celular."),
};

function esValido(campo) {
  if (!campo.value.trim() || !campo.checkValidity()) return false;
  // El patrón permite signos; un número de verdad necesita al menos 7 dígitos.
  return campo.name !== "celular" || campo.value.replace(/\D/g, "").length >= 7;
}

function mostrarError(campo, mensaje) {
  const error = document.getElementById(`error-${campo.name}`);
  error.textContent = mensaje ?? "";
  error.hidden = !mensaje;
  if (mensaje) campo.setAttribute("aria-invalid", "true");
  else campo.removeAttribute("aria-invalid");
}

function validar(campos) {
  let primero = null;
  for (const campo of campos) {
    const valido = esValido(campo);
    mostrarError(campo, valido ? null : MENSAJES[campo.name](campo));
    if (!valido) primero ??= campo;
  }
  primero?.focus();
  return !primero;
}

function textoConfirmacion(datos, fecha) {
  const personas = datos.get("personas") === "1" ? "1 persona" : `${datos.get("personas")} personas`;
  return datos.get("tipo") === "mesa"
    ? `Apartaste una mesa para ${personas} el ${fecha}.`
    : `Quedaste en la lista del ${fecha}, para ${personas}.`;
}

export function iniciarReservas() {
  const formulario = document.querySelector(".reserva");
  if (!formulario) return;

  const noche = formulario.elements.noche;
  const campos = [formulario.elements.nombre, formulario.elements.celular];
  const enviar = formulario.querySelector(".reserva__enviar");
  const problema = formulario.querySelector(".reserva__problema");
  const listo = document.querySelector(".reservas__listo");
  let noches = [];
  let enviando = false;

  formulario.noValidate = true;

  // Copia las noches de la agenda. Si la que estaba elegida ya pasó, queda elegida la siguiente.
  suscribirNoches((nuevas) => {
    noches = nuevas;
    // Sin noches no hay qué reservar: el formulario lo dice en vez de quedar con la lista vacía.
    if (!noches.length) {
      noche.replaceChildren(new Option("No hay noches programadas", ""));
      noche.disabled = true;
      enviar.hidden = true;
      return;
    }
    const elegida = noche.value;
    noche.replaceChildren(...noches.map((n) => new Option(`${n.texto} · ${n.titulo}`, n.iso)));
    noche.value = elegida;
    if (noche.selectedIndex < 0) noche.selectedIndex = 0;
  });

  // «Reservar» en una fila de la agenda deja esa noche ya elegida.
  document.querySelector(".agenda__lista")?.addEventListener("click", (evento) => {
    const fila = evento.target.closest(".boton")?.closest(".noche");
    const elegida = noches.find((n) => n.fila === fila);
    if (elegida) noche.value = elegida.iso;
  });

  // La ficha de la portada anuncia la próxima noche: su botón reserva esa.
  document.querySelector(".ficha .boton")?.addEventListener("click", () => {
    noche.selectedIndex = 0;
  });

  for (const campo of campos) {
    campo.addEventListener("input", () => {
      if (campo.hasAttribute("aria-invalid") && esValido(campo)) mostrarError(campo, null);
    });
  }

  function avisarProblema(mensaje) {
    problema.textContent = mensaje;
    problema.hidden = false;
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (enviando || !validar(campos)) return;

    enviando = true;
    problema.hidden = true;
    enviar.textContent = "Enviando…";
    enviar.setAttribute("aria-disabled", "true");

    const datos = new FormData(formulario);
    const nombre = datos.get("nombre").trim();
    datos.set("nombre", nombre);
    const fecha = noches.find((n) => n.iso === noche.value)?.texto ?? noche.selectedOptions[0].text;

    try {
      const respuesta = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(datos).toString(),
        signal: AbortSignal.timeout(TIEMPO_LIMITE),
      });
      if (!respuesta.ok) {
        avisarProblema(ERROR_SERVIDOR);
        return;
      }

      listo.querySelector("h3").textContent = `Listo, ${nombre}`;
      listo.querySelector(".reservas__detalle").textContent = textoConfirmacion(datos, fecha);
      formulario.hidden = true;
      listo.hidden = false;
      listo.focus();
    } catch {
      avisarProblema(SIN_CONEXION);
    } finally {
      enviando = false;
      enviar.textContent = "Enviar reserva";
      enviar.removeAttribute("aria-disabled");
    }
  });

  listo.querySelector(".boton").addEventListener("click", () => {
    formulario.reset();
    listo.hidden = true;
    formulario.hidden = false;
    noche.focus();
  });
}
