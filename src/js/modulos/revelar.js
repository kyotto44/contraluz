// Los hijos de un elemento entran una sola vez, la primera vez que aparece en pantalla.
// Sin JavaScript o con «reducir movimiento» todo se ve desde el inicio.

export function revelar(elemento) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  elemento.classList.add("revelar--oculto");
  const observador = new IntersectionObserver(
    ([entrada]) => {
      if (!entrada.isIntersecting) return;
      observador.disconnect();
      elemento.classList.replace("revelar--oculto", "revelar--entra");
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  observador.observe(elemento);
}
