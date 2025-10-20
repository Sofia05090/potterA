// --- Función universal para generar la lista de elementos ---
function generarLista(arrayelementos) {
  if (!arrayelementos || arrayelementos.length === 0) {
    console.warn("⚠️ generarLista recibió un array vacío o indefinido");
    return `<p style="text-align:center;">No hay elementos para mostrar.</p>`;
  }

  let listaHTML = "";

  for (let i = 0; i < arrayelementos.length; i++) {
    const el = arrayelementos[i];
    const id = el.id || `sin-id-${i}`;
    const tipo = el.type || el.tipo || "characters";

    // Campos que pueden variar según la fuente
    const nombre = el.attributes?.name || el.attributes?.title || el.name || "Sin nombre";
    const imagen =
      el.attributes?.image || el.image || "https://upload.wikimedia.org/wikipedia/en/6/6f/Hogwartscrest.png";

    listaHTML += `
      <div class="c-lista-objeto obj-${id}" onclick="Detalle('${id}', '${tipo}')">
        <img src="${imagen}" width="auto" height="60" loading="lazy" alt="${nombre}">
        <p>${nombre}</p>
      </div>`;
  }

  return listaHTML;
}

// --- Buscador Universal (usa lo definido en conexion.js) ---
function crearBuscadorUniversal() {
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "🔍 Buscar personajes, hechizos o libros...";
  buscador.addEventListener("input", () => buscadorUniversal(buscador.value, elementos));
  return buscador;
}

// --- Vista principal (Home) ---
async function Home() {
  const root = document.getElementById("root");
  root.innerHTML = "<p>Cargando datos...</p>";

  // ⚙️ Si no hay datos, los descargamos
  if (!elementos || elementos.length === 0) {
    console.log("📡 Cargando personajes desde la API...");
    elementos = await conexionLista("characters");
  }

  console.log("✅ Datos cargados:", elementos.length);

  // --- Campo de búsqueda global ---
  const buscador = crearBuscadorUniversal();

  // --- Botones de filtro (pestañas) ---
  const tipos = [
    { tipo: "characters", texto: "🧙‍♂️ Personajes" },
    { tipo: "spells", texto: "✨ Hechizos" },
    { tipo: "books", texto: "📚 Libros" },
    { tipo: "favoritos", texto: "❤️ Favoritos" }
  ];

  const contenedorFiltro = document.createElement("div");
  contenedorFiltro.classList.add("tipos-container");

  tipos.forEach(({ tipo, texto }) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.addEventListener("click", async () => {
      if (tipo === "favoritos") {
        Favoritos();
      } else {
        root.innerHTML = "<p>Cargando...</p>";
        elementos = await conexionLista(tipo);
        renderLista(root);
      }
    });
    contenedorFiltro.appendChild(btn);
  });

  // --- Contenedor de lista ---
  const contenedorLista = document.createElement("div");
  contenedorLista.classList.add("c-contenedor-lista");
  contenedorLista.id = "la-lista";
  contenedorLista.innerHTML = generarLista(elementos);

  // --- Ensamblar estructura ---
  root.innerHTML = "";
  root.appendChild(buscador);
  root.appendChild(contenedorFiltro);
  root.appendChild(contenedorLista);
}

// --- Render auxiliar ---
function renderLista(root) {
  const lista = document.createElement("div");
  lista.classList.add("c-contenedor-lista");
  lista.id = "la-lista";
  lista.innerHTML = generarLista(elementos);
  root.innerHTML = "";
  root.appendChild(crearBuscadorUniversal());
  root.appendChild(lista);
}



