// Las cuentas de fechas y horario del club, sin tocar la página: reciben la hora como dato,
// así que se pueden probar con cualquier momento (ver test/fechas.test.js).

export const HORA = 60 * 60 * 1000;
export const DIA = 24 * HORA;
export const BOGOTA = 5; // horas detrás de UTC; Colombia no cambia de hora
export const CIERRE = 3; // a las 3 a. m. la noche anterior todavía está abierta
export const ABRE = 22;
export const PUERTA = "10 p. m.";

const CICLO = 14; // la agenda se repite cada dos semanas
const JUEVES = 4;
const SABADO = 6;

const formato = (opciones) => new Intl.DateTimeFormat("es-CO", { ...opciones, timeZone: "UTC" });
const SEMANA = formato({ weekday: "long" });
const MES = formato({ month: "long" });

const abreEse = (dia) => dia >= JUEVES && dia <= SABADO;

// Días desde 1970, para contar sin husos horarios ni cambios de mes.
export const aDia = (iso) => Date.parse(`${iso}T00:00:00Z`) / DIA;

// Cómo se escribe una noche: «sábado 7 de noviembre».
export function escribirDia(dia) {
  const fecha = new Date(dia * DIA);
  const numero = fecha.getUTCDate();
  const semana = SEMANA.format(fecha);
  const mes = MES.format(fecha);
  return { iso: fecha.toISOString().slice(0, 10), numero, semana, mes, texto: `${semana} ${numero} de ${mes}` };
}

export function nocheActual(ahora) {
  return Math.floor((ahora - (BOGOTA + CIERRE) * HORA) / DIA);
}

// La primera repetición de esa noche que todavía no ha pasado.
export function proximaFecha(dia, hoy, ciclo = CICLO) {
  return dia + Math.ceil((hoy - dia) / ciclo) * ciclo;
}

export function avisoDe(dia, hoy) {
  if (dia === hoy) return "Esta noche";
  if (dia === hoy + 1) return "Mañana";
  return "Próxima noche";
}

export function estadoDelClub(ahora) {
  const local = new Date(ahora - BOGOTA * HORA);
  const dia = local.getUTCDay();
  const hora = local.getUTCHours();
  const ayer = (dia + 6) % 7;

  // Antes de las 3 a. m. todavía es la noche de ayer.
  const noche = hora < CIERRE ? ayer : dia;
  const abierto = abreEse(noche) && (hora >= ABRE || hora < CIERRE);

  if (abierto) return { noche, abierto, texto: "Abierto ahora, hasta las 3 a. m." };
  if (abreEse(dia)) return { noche: dia, abierto, texto: `Hoy abrimos a las ${PUERTA}` };
  if ((dia + 1) % 7 === JUEVES) return { noche: null, abierto, texto: `Mañana abrimos a las ${PUERTA}` };
  return { noche: null, abierto, texto: `Abrimos el jueves a las ${PUERTA}` };
}
