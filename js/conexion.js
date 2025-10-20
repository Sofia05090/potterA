let elementos = []; // lista general de elementos

// --- Proxy universal para evitar errores CORS ---
const proxy = "https://api.allorigins.win/raw?url=";

// --- Conexión con la API PotterDB según tipo ---
async function conexionLista(filtrotipo) {
  let url = "";

  if (filtrotipo == "All" || filtrotipo == "characters") {
    url = "https://api.potterdb.com/v1/characters";
  } else if (filtrotipo == "spells") {
    url = "https://api.potterdb.com/v1/spells";
  } else if (filtrotipo == "books") {
    url = "https://api.potterdb.com/v1/books";
  }

  try {
    const res = await fetch(`${proxy}${url}`);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error al conectar con PotterDB:", error);
    return [];
  }
}

// --- 🔍 Buscador universal (para todas las pestañas) ---
function buscadorUniversal(texto, lista) {
  const sza = texto.trim().toLowerCase();
  const contenedor = document.getElementById("la-lista");

  if (!sza || sza.length < 2) {
    contenedor.innerHTML = generarLista(lista);
    return;
  }

  const filtrados = lista.filter(el => {
    const nombre = (el.attributes?.name || el.attributes?.title || el.name || "").toLowerCase();
    return nombre.includes(sza);
  });

  contenedor.innerHTML =
    filtrados.length > 0
      ? generarLista(filtrados)
      : `<p style="text-align:center;margin-top:20px;">🪄 No se encontraron resultados.</p>`;
}

// --- Creador de campo de búsqueda (input dinámico) ---
function crearBuscador(lista) {
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "🔍 Buscar...";
  buscador.addEventListener("input", () => buscadorUniversal(buscador.value, lista));
  return buscador;
}

// --- Cargar al iniciar ---
async function General() {
  if (elementos.length === 0) {
    elementos = await conexionLista("characters");
  }
  Home();
}

// --- Cambiar entre personajes / hechizos / libros ---
async function FiltroConexion(filtroelegido) {
  elementos = await conexionLista(filtroelegido);
  document.getElementById("la-lista").innerHTML = generarLista(elementos);
}
