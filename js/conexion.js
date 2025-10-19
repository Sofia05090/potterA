let elementos = []; // lista general de elementos

// Conexión para obtener la lista según tipo
async function conexionLista(filtrotipo) {
  let url = "";

  if (filtrotipo == "All" || filtrotipo == "characters") {
    url = "https://api.potterdb.com/v1/characters";
  } else if (filtrotipo == "spells") {
    url = "https://api.potterdb.com/v1/spells";
  } else if (filtrotipo == "books") {
    url = "https://api.potterdb.com/v1/books";
  }

  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}

// Cargar al iniciar
async function General() {
  if (elementos.length === 0) {
    elementos = await conexionLista("characters");
  }
  Home();
}

// Filtrar manual (como tu FiltroConexion)
async function FiltroConexion(filtroelegido) {
  elementos = await conexionLista(filtroelegido);
  document.getElementById("la-lista").innerHTML = generarLista(elementos);
}
