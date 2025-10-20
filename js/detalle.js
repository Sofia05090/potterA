var esFavorito = false;

// --- Función para agregar o quitar un personaje, libro o hechizo de favoritos ---
function toggleFavorito(paramid, paramname, paramtipo = "characters") {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let existe = favoritos.some(f => f.name === paramname);

  if (existe) {
    favoritos = favoritos.filter(f => f.name !== paramname);
    esFavorito = false;
  } else {
    favoritos.push({
      id: paramid,
      name: paramname,
      tipo: paramtipo
    });
    esFavorito = true;
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  const boton = document.querySelector(`#corazon-${paramid}`);
  if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

// --- Función para mostrar los detalles del personaje ---
async function Detalle(h, tipo = "characters") {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando detalles...</p>";

  // Normalizar tipo
  const tipoPlural = {
    character: "characters",
    spell: "spells",
    book: "books"
  }[tipo] || tipo;

  // Detectar entorno: Web o APK (Android WebView)
  const isWebView = /wv/.test(navigator.userAgent.toLowerCase());
  const baseURL = isWebView
    ? "https://api.allorigins.win/raw?url=" // proxy universal para WebView
    : ""; // conexión directa si es navegador normal

  const url = `${baseURL}https://api.potterdb.com/v1/${tipoPlural}/${h}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    const data = await res.json();
    const info = data.data.attributes;

    const nombre = info.name || info.title || "Sin nombre";
    const imagen = info.image || "https://upload.wikimedia.org/wikipedia/en/6/6f/Hogwartscrest.png";

    // Revisar si ya está en favoritos
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    esFavorito = favoritos.some(item => item.name === nombre);

    // Generar contenido
    let detalleHTML = `
      <section class="c-detalle">
        <img src="${imagen}" alt="${nombre}" height="150" width="auto">
        <h2>${nombre}</h2>
    `;

    // Campos según tipo
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

    // Botones
    detalleHTML += `
      <button class="btn-fav" onClick="toggleFavorito('${h}', '${nombre}', '${tipoPlural}')">
        <span id="corazon-${h}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
      </button>
      <button class="btn-volver" onClick="Home()">↩ Volver</button>
    </section>
    `;

    root.innerHTML = detalleHTML;

  } catch (error) {
    console.error("❌ Error al cargar detalles:", error);
    root.innerHTML = `
      <p style="color:red;">Error al cargar los detalles.</p>
      <p style="font-size:0.9em;color:#666;">${error.message}</p>
      <button class="btn-volver" onClick="Home()">↩ Volver</button>
    `;
  }
}


