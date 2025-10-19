async function Personajes() {
  elementos = await conexionLista("characters");
  document.getElementById("root").innerHTML = generarLista(elementos);
}
