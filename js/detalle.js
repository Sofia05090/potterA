var esFavorito = false;

// --- Función para agregar o quitar un personaje, libro o hechizo de favoritos ---
function toggleFavorito(paramid, paramname, paramtipo = "characters") {
  // Leer favoritos actuales desde localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let existe = false;

  // Verificar si ya está guardado
  for (let i = 0; i < favoritos.length; i++) {
    if (favoritos[i].name === paramname) {
      existe = true;
      break;
    }
  }

  // Agregar o quitar según el caso
  if (existe == true) {
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

  // Guardar lista actualizada
  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  // Actualizar el icono en pantalla
  const boton = document.querySelector(`#corazon-${paramid}`);
  if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

// --- Función para mostrar los detalles del personaje ---
async function Detalle(h, tipo = "characters") {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando detalles...</p>";

  // Normalizar el tipo (la API usa plurales)
  const tipoPlural = {
    character: "characters",
    spell: "spells",
    book: "books"
  }[tipo] || tipo;

  // URL a consultar
  const url = `https://api.potterdb.com/v1/${tipoPlural}/${h}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    const data = await res.json();
    const info = data.data.attributes;


    // Determinar el nombre segun el tipo
    const nombre = info.name || info.title || "Sin nombre";

    // Revisar si ya está en favoritos
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    esFavorito = favoritos.some(item => item.name === nombre);

    // Imagen por defecto
    const imagen = info.image || "https://upload.wikimedia.org/wikipedia/en/6/6f/Hogwartscrest.png";

    // Generar contenido 
    let detalleHTML = `
      <section class="c-detalle">
        <img src="${imagen}" alt="${nombre}" height="120" width="auto">
        <p><b>${nombre}</b></p>
    `;

    // --- Campos específicos según el tipo ---
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
        <p><b>Categoria:</b> ${info.category || "No especificada"}</p>
        <p><b>Luz:</b> ${info.light || "No especificada"}</p>
        
      `;
    } else if (tipoPlural === "books") {
      detalleHTML += `
        
        <p><b>Autor:</b> ${info.author || "J.K. Rowling"}</p>
        <p><b>Publicación:</b> ${info.release_date || "?"}</p>
        <p><b>Paginas:</b> ${info.pages || "?"}</p>
        <p><b>Resumen:</b> ${info.summary || "?"}</p>
      `;
    }

    // --- Botón de favoritos ---
    detalleHTML += `
      <button onClick="toggleFavorito('${h}', '${nombre}', '${tipoPlural}')">
        <span id="corazon-${h}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
      </button>
      <br><br>
      <button onClick="Home()">🔙 Volver</button>
    </section>
    `;

    // Mostrar el detalle
    root.innerHTML = detalleHTML;

  } catch (error) {
    console.error("Error al cargar detalles:", error);
    root.innerHTML = `<p>Error al cargar los detalles del personaje.</p>
                      <p style="font-size:0.8em;color:#666;">(${error.message})</p>`;
  }
}
