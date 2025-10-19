let elementos = [];

async function conexionLista(tipo) {
  let url = "";

  if (tipo === "characters") {
    url = "https://api.potterdb.com/v1/characters";
  } else if (tipo === "spells") {
    url = "https://api.potterdb.com/v1/spells";
  } else if (tipo === "books") {
    url = "https://api.potterdb.com/v1/books";
  }

  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}

async function General() {
  if (elementos.length === 0) {
    elementos = await conexionLista("characters");
  }
  Home();
}
