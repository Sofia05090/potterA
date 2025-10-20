var esFavorito = false;
const proxy = "https://api.allorigins.win/raw?url=";

// --- Función para agregar o quitar favoritos ---
function toggleFavorito(paramid, paramname, paramtipo = "characters") {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  const existe = favoritos.some(f => f.name === paramname);

  if (existe) {
    favoritos = favoritos.filter(f => f.name !== paramname);
    esFavorito = false;
  } else {
    favoritos.push({ id: paramid, name: paramname, tipo: paramtipo });
    esFavorito = true;
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  const boton = document.querySelector(`#corazon-${paramid}`);
  if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

// --- Función para mostrar detalles ---
async function Detalle(id, tipo = "characters") {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando detalles...</p>";

  const tipoPlural = {
    character: "characters",
    spell: "spells",
    book: "books"
  }[tipo] || tipo;

  const url = `https://api.potterdb.com/v1/${tipoPlural}/${id}`;

  try {
    // ✅ IMPORTANTE: no uses encodeURIComponent con allorigins
    const res = await fetch(`${proxy}${url}`);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    const data = await res.json();

    // PotterDB envuelve los datos así:
    const info = data.data?.attributes || {};
    const nombre = info.name || info.title || "Sin nombre";

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    esFavorito = favoritos.some(f => f.name === nombre);

    const imagen = info.image || "https://upload.wikimedia.org/wikipedia/en/6/6f/Hogwartscrest.png";

    let detalleHTML = `
      <section class="c-detalle">
        <img src="${imagen}" alt="${nombre}" height="140" width="auto">
        <h2>${nombre}</h2>
    `;

    // --- Info según tipo ---
    if (tipoPlural === "characters") {
      detalleHTML += `
        <p><b>Casa:</b> ${info.house || "Desconocida"}</p>
        <p><b>Especie:</b> ${info.species || "Desconocida"}</p>
        <p><b>Género:</b> ${info.gender || "?"}</p>
        <p><b>Actor:</b> ${info.actor || "Desconocido"}</p>
        <p><b>Nacimiento:</b> ${info.born || "?"}</p>
      `;
    } else if (tipoPlural === "spells") {
      detalleHTML += `
        <p><b>Efecto:</b> ${info.effect || "No registrado"}</p>
        <p><b>Categoría:</b> ${info.category || "No especificada"}</p>
        <p><b>Luz:</b> ${info.light || "No especificada"}</p>
      `;
    } else if (tipoPlural === "books") {
      detalleHTML += `
        <p><b>Título:</b> ${info.title || "Sin título"}</p>
        <p><b>Autor:</b> ${info.author || "J.K. Rowling"}</p>
        <p><b>Publicación:</b> ${info.release_date || "?"}</p>
        <p><b>Páginas:</b> ${info.pages || "?"}</p>
        <p><b>Resumen:</b> ${info.summary || "Sin resumen"}</p>
      `;
    }

    detalleHTML += `
      <button class="btn-fav" onClick="toggleFavorito('${id}', '${nombre}', '${tipoPlural}')">
        <span id="corazon-${id}">${esFavorito ? "❤️" : "🤍"}</span> Favorito
      </button>
      <button class="btn-volver" onClick="Home()">🔙 Volver</button>
      </section>
    `;

    root.innerHTML = detalleHTML;
  } catch (error) {
    console.error("Error al cargar detalles:", error);
    root.innerHTML = `<p>Error al cargar los detalles.</p>
                      <p style="font-size:0.8em;color:#666;">(${error.message})</p>`;
  }
}

