// La entrada al club: el scroll atraviesa la puerta.
// Las animaciones viven en umbral.css. Este módulo solo decide si se activan:
//   - Sin JavaScript o con «reducir movimiento», la portada queda como dos pantallas quietas.
//   - Con animaciones ligadas al scroll en CSS, el navegador hace todo el trabajo.
//   - Sin ellas, un respaldo mueve las mismas animaciones según el progreso, y solo
//     mientras la sección está a la vista.

const DURACION_ANIMACION = 1000; // la misma de umbral.css

function crearRespaldo(seccion) {
  let cuadro = null;
  let ultimoProgreso = -1;

  const animaciones = () => document.getAnimations().filter((a) => a.animationName?.startsWith("umbral-"));

  function pintar() {
    const caja = seccion.getBoundingClientRect();
    const recorrido = caja.height - window.innerHeight;
    const progreso = recorrido > 0 ? Math.min(Math.max(-caja.top / recorrido, 0), 1) : 0;
    if (progreso !== ultimoProgreso) {
      ultimoProgreso = progreso;
      for (const animacion of animaciones()) animacion.currentTime = progreso * DURACION_ANIMACION;
    }
    cuadro = requestAnimationFrame(pintar);
  }

  function detener() {
    cancelAnimationFrame(cuadro);
    cuadro = null;
  }

  const observador = new IntersectionObserver(([entrada]) => {
    if (entrada.isIntersecting && cuadro === null) pintar();
    else if (!entrada.isIntersecting) detener();
  });

  return {
    activar: () => observador.observe(seccion),
    desactivar: () => {
      observador.disconnect();
      detener();
    },
  };
}

export function iniciarUmbral() {
  const seccion = document.querySelector(".umbral");
  if (!seccion) return;

  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");
  const nativo = CSS.supports("animation-timeline: view()");
  const respaldo = nativo ? null : crearRespaldo(seccion);

  function aplicar() {
    document.documentElement.classList.toggle("umbral-viva", !reducir.matches);
    if (reducir.matches) respaldo?.desactivar();
    else respaldo?.activar();
  }

  aplicar();
  reducir.addEventListener("change", aplicar);
}
