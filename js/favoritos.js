function toggleFavorito(id, name) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const existe = favoritos.some(f => f.name === name);

  if (existe) {
    favoritos = favoritos.filter(f => f.name !== name);
  } else {
    favoritos.push({ id, name });
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function Favoritos() {
  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  if (favoritos.length === 0) {
    document.getElementById("root").innerHTML = "No hay favoritos.";
    return;
  }
  document.getElementById("root").innerHTML = generarLista(favoritos);
}
