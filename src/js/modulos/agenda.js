// La agenda se repite cada dos semanas y sus noches viven en el HTML, que funciona sin JavaScript.
// Este módulo solo las lleva a sus próximas fechas: la agenda nunca queda en el pasado,
// y la ficha de la portada siempre muestra la noche que sigue.

const DIA = 24 * 60 * 60 * 1000;
const HORA = 60 * 60 * 1000;
const CICLO = 14; // días
const BOGOTA = 5; // horas detrás de UTC; Colombia no cambia de hora
const CIERRE = 3; // a las 3 a. m. la noche anterior todavía está abierta

const formato = (opciones) => new Intl.DateTimeFormat("es-CO", { ...opciones, timeZone: "UTC" });
const SEMANA = formato({ weekday: "long" });
const MES = formato({ month: "long" });

// Días desde 1970, para contar sin husos horarios ni cambios de mes.
const aDia = (iso) => Date.parse(`${iso}T00:00:00Z`) / DIA;
const nocheActual = () => Math.floor((Date.now() - (BOGOTA + CIERRE) * HORA) / DIA);

function proximaFecha(dia, hoy) {
  return dia + Math.ceil((hoy - dia) / CICLO) * CICLO;
}

function escribirFecha(noche, dia) {
  const fecha = new Date(dia * DIA);
  const numero = fecha.getUTCDate();
  const semana = SEMANA.format(fecha);
  const mes = MES.format(fecha);
  const texto = `${semana} ${numero} de ${mes}`;

  noche.querySelector(".noche__fecha").dateTime = fecha.toISOString().slice(0, 10);
  noche.querySelector(".noche__numero").textContent = numero;
  noche.querySelector(".noche__semana").textContent = semana;
  noche.querySelector(".noche__mes").textContent = `de ${mes}`;
  noche.querySelector(".boton").setAttribute("aria-label", `Reservar para el ${texto}`);
  return texto;
}

function avisoDe(dia, hoy) {
  if (dia === hoy) return "Esta noche";
  if (dia === hoy + 1) return "Mañana";
  return "Próxima noche";
}

// Copia la noche que sigue a la ficha de la portada.
function actualizarFicha(noche, aviso, texto) {
  const ficha = document.querySelector(".ficha");
  if (!ficha) return;
  const genero = noche.querySelector(".noche__genero").textContent;
  const precio = noche.querySelector(".noche__precio").textContent;
  ficha.querySelector(".ficha__fecha").textContent = `${aviso}: ${texto}`;
  ficha.querySelector(".ficha__titulo").textContent = noche.querySelector(".noche__titulo").textContent;
  ficha.querySelector(".ficha__datos").textContent = `${genero}. Puerta a las 10 p. m. ${precio}.`;
}

function ordenar(lista) {
  const hoy = nocheActual();
  const noches = [...lista.children]
    .map((noche) => ({ noche, dia: proximaFecha(aDia(noche.querySelector(".noche__fecha").dateTime), hoy) }))
    .sort((a, b) => a.dia - b.dia);

  const etiqueta = lista.querySelector(".noche__aviso");
  noches.forEach(({ noche, dia }, orden) => {
    const texto = escribirFecha(noche, dia);
    noche.classList.toggle("noche--proxima", orden === 0);
    noche.classList.toggle("sobre-luz", orden === 0);
    lista.append(noche);

    if (orden === 0) {
      const aviso = avisoDe(dia, hoy);
      etiqueta.textContent = aviso;
      noche.querySelector(".noche__cartel").prepend(etiqueta);
      actualizarFicha(noche, aviso, texto);
    }
  });
}

// Las filas entran una sola vez, la primera vez que la agenda aparece.
function revelar(lista) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lista.classList.add("agenda__lista--oculta");
  const observador = new IntersectionObserver(
    ([entrada]) => {
      if (!entrada.isIntersecting) return;
      observador.disconnect();
      lista.classList.replace("agenda__lista--oculta", "agenda__lista--entra");
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  observador.observe(lista);
}

export function iniciarAgenda() {
  const lista = document.querySelector(".agenda__lista");
  if (!lista) return;
  ordenar(lista);
  revelar(lista);
}
