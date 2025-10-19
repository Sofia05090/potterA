async function Hechizos() {
  elementos = await conexionLista("spells");
  const root = document.getElementById("root");
  root.innerHTML = generarLista(elementos);
}
