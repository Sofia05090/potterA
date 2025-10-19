// --- Función de búsqueda flexible ---
function buscadorfuncion(texto) {
  const sza = texto.trim().toLowerCase();
  const contenedor = document.getElementById("la-lista");

  if (!sza || sza.length < 3) {
    contenedor.innerHTML = generarLista(elementos);
    return;
  }

  // Filtrar elementos según coincidencia parcial en nombre o título
  const filtrados = elementos.filter(el => {
    const nombre = (el.attributes?.name || el.attributes?.title || el.name || "").toLowerCase();
    return nombre.includes(sza);
  });

  contenedor.innerHTML = generarLista(filtrados);
}

// --- Función universal para generar la lista de elementos ---
function generarLista(arrayelementos) {
  if (!arrayelementos || arrayelementos.length === 0) {
    return `<p style="text-align:center;">No hay elementos para mostrar.</p>`;
  }

  let listaHTML = "";

  for (let i = 0; i < arrayelementos.length; i++) {
    const el = arrayelementos[i];

    // Soporte para datos desde API o desde localStorage
    const id = el.id || `sin-id-${i}`;
    const tipo = el.type || el.tipo || "characters";

    // Campos que pueden variar según la fuente
    const nombre = el.attributes?.name || el.attributes?.title || el.name || "Sin nombre";
    const imagen = el.attributes?.image || el.image || "https://upload.wikimedia.org/wikipedia/en/6/6f/Hogwartscrest.png";

    listaHTML += `
      <div class="c-lista-objeto obj-${id}" onclick="Detalle('${id}', '${tipo}')">
        <img src="${imagen}" width="auto" height="60" loading="lazy" alt="${nombre}">
        <p>${nombre}</p>
      </div>`;
  }

  return listaHTML;
}

// --- Vista principal (Home) ---
function Home() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // --- Campo de búsqueda ---
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar personajes, hechizos o libros...";
  buscador.addEventListener("input", () => buscadorfuncion(buscador.value));

  // --- Botones de filtro (pestañas) ---
  const tipos = [
    { tipo: "characters", texto: "Personajes" },
    { tipo: "spells", texto: "Hechizos" },
    { tipo: "books", texto: "Libros" }
  ];

  const contenedorFiltro = document.createElement("div");
  contenedorFiltro.classList.add("tipos-container");

  tipos.forEach(({ tipo, texto }) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.addEventListener("click", () => FiltroConexion(tipo));
    contenedorFiltro.appendChild(btn);
  });

  // --- Contenedor de lista ---
  const contenedorLista = document.createElement("div");
  contenedorLista.classList.add("c-contenedor-lista");
  contenedorLista.id = "la-lista";
  contenedorLista.innerHTML = generarLista(elementos);

  // --- Ensamblar estructura ---
  root.appendChild(buscador);
  root.appendChild(contenedorFiltro);
  root.appendChild(contenedorLista);
}

