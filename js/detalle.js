async function Detalle(id) {
  const root = document.getElementById("root");
  const res = await fetch(`https://api.potterdb.com/v1/characters/${id}`);
  const data = await res.json();
  const char = data.data.attributes;

  root.innerHTML = `
    <section class="c-detalle">
      <h2>${char.name}</h2>
      <p><b>Casa:</b> ${char.house || "Desconocida"}</p>
      <p><b>Especie:</b> ${char.species || "Desconocida"}</p>
      <p><b>Genero:</b> ${char.gender || "Desconocido"}</p>
      <p><b>Nacimiento:</b> ${char.born || "?"}</p>
      <button onclick="toggleFavorito('${id}', '${char.name}')">
        <span id="corazon-${id}">🤍</span> Favorito
      </button>
    </section>`;
}
