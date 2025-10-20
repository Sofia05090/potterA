var esFavorito = false;

// --- Detectar si se ejecuta dentro de un APK (WebView Android) ---
function esWebView() {
  return /wv/.test(navigator.userAgent.toLowerCase());
}

// --- Función para agregar o quitar favoritos ---
function toggleFavorito(paramid, paramname, paramtipo = "characters") {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let existe = favoritos.some(f => f.name === paramname);

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

// --- Función para mostrar detalles del elemento (personaje, libro, hechizo) ---
async function Detalle(h, tipo = "characters") {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando detalles...</p>";

  // Normalizar tipo (API usa plurales)
  const tipoPlural = {
    character: "characters",
    spell: "spells",
    book: "books"
  }[tipo] || tipo;

  // 🔗 Construir URL
  const urlReal = `https://api.potterdb.com/v1/${tipoPlural}/${h}`;
  const baseURL = esWebView()
    ? `https://api.allorigins.win/raw?url=${urlReal}`
    : urlReal;

  console.log("📄 Solicitando detalle desde:", baseURL);

  try {
    const res = await fetch(baseURL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    if (!data.data || !data.data.attributes)
      throw new Error("Datos del detalle incompletos");

    const info = data.data.attributes;
    const nombre = info.name || info.title || "Sin nombre";
    const imagen = info.image || "https://upload.wikimedia.org/wikipedia/en/6/6f/Hogwartscrest.png";

    // Verificar si es favorito
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    esFavorito = favoritos.some(item => item.name === nombre);

    // --- Construcción dinámica del HTML ---
    let detalleHTML = `
      <section class="c-detalle">
        <img src="${imagen}" alt="${nombre}" height="150">
        <h2>${nombre}</h2>
    `;

    // --- Campos según tipo ---
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
        <p><b>Resumen:</b> ${info.summary || "Sin resumen disponible"}</p>
      `;
    }

    // --- Botones ---
    detalleHTML += `
      <button class="btn-fav" onClick="toggleFavorito('${h}', '${nombre}', '${tipoPlural}')">
        <span id="corazon-${h}">${esFavorito ? "❤️" : "🤍"}</span> Favorito
      </button>
      <button class="btn-volver" onClick="Home()">↩ Volver</button>
      </section>
    `;

    root.innerHTML = detalleHTML;
  } catch (error) {
    console.error("❌ Error al cargar detalles:", error);
    root.innerHTML = `
      <p style="color:red;">Error al cargar los detalles del elemento.</p>
      <p style="font-size:0.8em;color:#666;">${error.message}</p>
      <button class="btn-volver" onClick="Home()">↩ Volver</button>
    `;
  }
}

