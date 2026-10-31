// La entrada al club: al bajar, la puerta se cruza sola; al subir, se devuelve.
// Las animaciones viven en umbral.css. Este módulo solo decide cuándo corren:
//   - Sin JavaScript o con «reducir movimiento», la portada queda como dos pantallas quietas.
//   - Con movimiento, corren por tiempo y no ligadas al scroll: la inercia del touchpad
//     puede mover el scroll de golpe, y así no se lleva la animación con él.
// Lo que decide es la dirección y no la posición: subir responde desde cualquier punto de la
// escena, sin tener que llegar hasta el inicio de la página.

const GIRO = 48; // px en sentido contrario para cambiar de escena: un roce no la dispara
const VELOCIDAD_REGRESO = 1.5; // volver atrás no debe costar lo mismo que descubrir la escena

function crearCruce(seccion) {
  let animaciones = [];
  let adentro = false;
  let ancla = 0; // el punto más avanzado en el sentido actual

  function cruzar() {
    for (const animacion of animaciones) {
      // Cambiar el sentido conserva el punto actual: se puede revertir a mitad de camino.
      animacion.playbackRate = adentro ? 1 : -VELOCIDAD_REGRESO;
      animacion.play();
    }
  }

  function alMover() {
    const y = window.scrollY;

    // La escena ya empezó a salir de la pantalla: al volver debe seguir como quedó.
    if (seccion.getBoundingClientRect().bottom < window.innerHeight) {
      ancla = y;
      return;
    }

    const avance = y - ancla;
    if (adentro ? avance > 0 : avance < 0) {
      ancla = y;
    } else if (Math.abs(avance) >= GIRO) {
      adentro = !adentro;
      ancla = y;
      cruzar();
    }
  }

  return {
    activar() {
      animaciones = document.getAnimations().filter((a) => a.animationName?.startsWith("umbral-"));
      ancla = window.scrollY;
      // Si el navegador restauró el scroll más abajo, ya estamos adentro: no se repite el cruce.
      adentro = ancla >= GIRO;
      if (adentro) for (const animacion of animaciones) animacion.finish();
      window.addEventListener("scroll", alMover, { passive: true });
    },
    desactivar() {
      window.removeEventListener("scroll", alMover);
    },
  };
}

// Decodifica la foto de adentro en un momento libre, para que no frene el cruce.
function prepararAdentro(seccion) {
  const foto = seccion.querySelector(".umbral__multitud img");
  if (!foto) return;
  foto.loading = "eager";
  const preparar = () => foto.decode().catch(() => {});
  if ("requestIdleCallback" in window) requestIdleCallback(preparar, { timeout: 2000 });
  else setTimeout(preparar, 800);
}

export function iniciarUmbral() {
  const seccion = document.querySelector(".umbral");
  if (!seccion) return;

  // Al recargar se vuelve a la puerta. Si el navegador restaura el scroll mientras la página se
  // arma, la posición cambia varias veces y el cruce queda yendo y viniendo a medias.
  history.scrollRestoration = "manual";

  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cruce = crearCruce(seccion);

  function aplicar() {
    cruce.desactivar();
    document.documentElement.classList.toggle("umbral-viva", !reducir.matches);
    if (reducir.matches) return;

    cruce.activar();
    prepararAdentro(seccion);
  }

  aplicar();
  reducir.addEventListener("change", aplicar);
}
