// Solo en desarrollo (npm run dev): cambia los datos del HTML por casos difíciles, para ver qué se rompe.
// Se elige con ?datos=peor, ?datos=una o ?datos=vacia. Corre antes que los módulos, que leen el HTML.
// main.js lo importa solo si import.meta.env.DEV: no llega al sitio publicado.

// Datos posibles en un club de verdad: nombres largos con guion y tildes, uno muy corto, entrada libre.
const NOCHES = [
  { titulo: "Aleksandra Wiśniewska-Kowalczyk b2b Señal 808", genero: "Techno", precio: "Entrada $120.000", djs: "senal-808" },
  { titulo: "Jo", genero: "House", precio: "Entrada libre", djs: "" },
  { titulo: "Cuarto Oscuro presenta: sellos independientes de Medellín, Cali y Barranquilla", genero: "Techno, house y electro", precio: "Entrada $35.000", djs: "mara-k" },
  { titulo: "Ángela Núñez y Óscar Ibáñez", genero: "House", precio: "Entrada $45.000", djs: "vera-ohm tundra" },
];

const RESIDENTES = {
  "senal-808": {
    nombre: "Aleksandra Wiśniewska-Kowalczyk",
    texto: "Techno industrial de Cracovia, con bombo partido, ruido blanco, sintetizadores modulares armados en vivo y pausas que duran más de lo que uno espera.",
  },
  tundra: { nombre: "Jo" },
};

const MODOS = ["demo", "peor", "una", "vacia"];
const NOMBRES = { demo: "Demo", peor: "Peor caso", una: "Una noche", vacia: "Sin noches" };

function aplicar(modo) {
  const filas = [...document.querySelectorAll(".noche")];
  const opciones = document.querySelector("#reserva-noche");

  if (modo === "vacia") {
    filas.forEach((fila) => fila.remove());
    opciones?.replaceChildren();
    return;
  }
  if (modo === "una") {
    filas.slice(1).forEach((fila) => fila.remove());
    return;
  }

  filas.forEach((fila, i) => {
    const datos = NOCHES[i % NOCHES.length];
    fila.querySelector(".noche__titulo").textContent = datos.titulo;
    fila.querySelector(".noche__genero").textContent = datos.genero;
    fila.querySelector(".noche__precio").textContent = datos.precio;
    fila.dataset.djs = datos.djs;
  });

  for (const [dj, datos] of Object.entries(RESIDENTES)) {
    const residente = document.querySelector(`.residente[data-dj="${dj}"]`);
    if (!residente) continue;
    residente.querySelector(".residente__nombre").textContent = datos.nombre;
    if (datos.texto) residente.querySelector(".residente__datos p").textContent = datos.texto;
  }
}

function dibujarSelector(actual) {
  const barra = document.createElement("nav");
  barra.setAttribute("aria-label", "Datos de prueba");
  barra.style.cssText =
    "position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:999;display:flex;gap:2px;padding:3px;" +
    "background:#d4d4d8;border-radius:8px;font:500 12px/1 system-ui,sans-serif;box-shadow:0 2px 8px rgb(0 0 0 / .3)";
  for (const modo of MODOS) {
    const enlace = document.createElement("a");
    const url = new URL(location.href);
    url.searchParams.set("datos", modo);
    enlace.href = url.pathname + url.search;
    enlace.textContent = NOMBRES[modo];
    enlace.style.cssText =
      "padding:7px 10px;border-radius:6px;color:#18181b;text-decoration:none;" +
      (modo === actual ? "background:#fff" : "");
    barra.append(enlace);
  }
  document.body.append(barra);
}

const modo = new URLSearchParams(location.search).get("datos") ?? "demo";
if (MODOS.includes(modo)) {
  if (modo !== "demo") aplicar(modo);
  dibujarSelector(modo);
}
