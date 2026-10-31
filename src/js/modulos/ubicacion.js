// Dice si el club está abierto ahora, según la hora de Bogotá y no la del visitante.
// El horario completo está en el HTML; sin JavaScript solo falta este aviso.

const HORA = 60 * 60 * 1000;
const BOGOTA = 5; // horas detrás de UTC; Colombia no cambia de hora
const ABRE = 22;
const CIERRA = 3;
const JUEVES = 4;
const SABADO = 6;

const abreEse = (dia) => dia >= JUEVES && dia <= SABADO;

function estadoDelClub(ahora) {
  const local = new Date(ahora - BOGOTA * HORA);
  const dia = local.getUTCDay();
  const hora = local.getUTCHours();
  const ayer = (dia + 6) % 7;

  // Antes de las 3 a. m. todavía es la noche de ayer.
  const noche = hora < CIERRA ? ayer : dia;
  const abierto = abreEse(noche) && (hora >= ABRE || hora < CIERRA);

  if (abierto) return { noche, abierto, texto: "Abierto ahora, hasta las 3 a. m." };
  if (abreEse(dia)) return { noche: dia, abierto, texto: "Hoy abrimos a las 10 p. m." };
  if ((dia + 1) % 7 === JUEVES) return { noche: null, abierto, texto: "Mañana abrimos a las 10 p. m." };
  return { noche: null, abierto, texto: "Abrimos el jueves a las 10 p. m." };
}

export function iniciarUbicacion() {
  const aviso = document.querySelector(".ubicacion__estado");
  if (!aviso) return;

  const { noche, abierto, texto } = estadoDelClub(Date.now());
  aviso.textContent = texto;
  aviso.classList.toggle("ubicacion__estado--abierto", abierto);
  aviso.hidden = false;
  document.querySelector(`.horario__fila[data-dia="${noche}"]`)?.classList.add("horario__fila--hoy");
}
