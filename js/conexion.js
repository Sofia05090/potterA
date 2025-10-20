let elementos = []; // lista general de elementos

// --- Detectar si se ejecuta en WebView (APK Android) ---
function esWebView() {
  return /wv/.test(navigator.userAgent.toLowerCase());
}

// --- Conexión universal a PotterDB ---
async function conexionLista(filtrotipo) {
  let endpoint = "";

  if (filtrotipo === "All" || filtrotipo === "characters") {
    endpoint = "characters";
  } else if (filtrotipo === "spells") {
    endpoint = "spells";
  } else if (filtrotipo === "books") {
    endpoint = "books";
  }

  // 🧩 Parámetros para traer más resultados
  const limit = 150;
  const urlReal = `https://api.potterdb.com/v1/${endpoint}?page[size]=${limit}`;

  // 🚀 Si es WebView, usar proxy, pero sin codificar el endpoint
  const baseURL = esWebView()
    ? `https://api.allorigins.win/raw?url=${urlReal}`
    : urlReal;

  console.log("🌐 Solicitando datos desde:", baseURL);

  try {
    const res = await fetch(baseURL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      console.warn("⚠️ PotterDB devolvió sin datos");
      return [];
    }

    console.log("✅ Datos recibidos:", data.data.length);
    return data.data;
  } catch (error) {
    console.error("❌ Error al obtener datos:", error);
    return [];
  }
}

// --- Buscador universal ---
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

// --- Creador de campo de búsqueda ---
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

// --- Filtrar manual (cambio de pestaña) ---
async function FiltroConexion(filtroelegido) {
  elementos = await conexionLista(filtroelegido);
  document.getElementById("la-lista").innerHTML = generarLista(elementos);
}

