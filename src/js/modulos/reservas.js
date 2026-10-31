// El formulario llega en HTML y funciona solo: Netlify lo recibe y lleva a /gracias/.
// Este módulo lo mejora: noches al día, errores claros y confirmación sin recargar la página.

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

// Copia a la lista las noches de la agenda, ya ordenadas y con sus fechas al día.
function actualizarNoches(lista) {
  const opciones = [...document.querySelectorAll(".noche")].map((noche) => {
    const semana = noche.querySelector(".noche__semana").textContent;
    const numero = noche.querySelector(".noche__numero").textContent;
    const mes = noche.querySelector(".noche__mes").textContent;
    const titulo = noche.querySelector(".noche__titulo").textContent;
    return new Option(`${semana} ${numero} ${mes} · ${titulo}`, noche.querySelector(".noche__fecha").dateTime);
  });
  if (opciones.length) lista.replaceChildren(...opciones);
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
  let enviando = false;

  actualizarNoches(noche);
  formulario.noValidate = true;

  // «Reservar» en una fila de la agenda deja esa noche ya elegida.
  document.querySelector(".agenda__lista")?.addEventListener("click", (evento) => {
    const fila = evento.target.closest(".boton")?.closest(".noche");
    if (fila) noche.value = fila.querySelector(".noche__fecha").dateTime;
  });

  for (const campo of campos) {
    campo.addEventListener("input", () => {
      if (campo.hasAttribute("aria-invalid") && esValido(campo)) mostrarError(campo, null);
    });
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (enviando || !validar(campos)) return;

    enviando = true;
    problema.hidden = true;
    enviar.textContent = "Enviando…";
    enviar.setAttribute("aria-disabled", "true");

    const datos = new FormData(formulario);
    const fecha = noche.selectedOptions[0].text.split(" · ")[0];

    try {
      const respuesta = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(datos).toString(),
      });
      if (!respuesta.ok) throw new Error(String(respuesta.status));

      listo.querySelector("h3").textContent = `Listo, ${datos.get("nombre").trim()}`;
      listo.querySelector(".reservas__detalle").textContent = textoConfirmacion(datos, fecha);
      formulario.hidden = true;
      listo.hidden = false;
      listo.focus();
    } catch {
      problema.textContent = "No pudimos enviar tu reserva. Revisa tu conexión e inténtalo de nuevo: tus datos siguen aquí.";
      problema.hidden = false;
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
