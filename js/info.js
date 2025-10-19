function Info() {
  const root = document.getElementById("root");
  root.innerHTML = ""; // limpiar contenido previo

  // --- Crear sección principal ---
  const section = document.createElement("section");
  section.classList.add("c-info");

  // --- Título principal ---
  const titulo = document.createElement("h1");
  titulo.textContent = "🪄 Enciclopedia Mágica PotterDB";
  section.appendChild(titulo);

  // --- Imagen ilustrativa ---
  const img = document.createElement("img");
  img.src = "https://upload.wikimedia.org/wikipedia/en/6/6b/HP1cover.jpg";
  img.alt = "Harry Potter Book";
  img.classList.add("info-img");
  section.appendChild(img);

  // --- Descripción principal ---
  const descripcion = document.createElement("p");
  descripcion.innerHTML = `Esta aplicación fue desarrollada como un proyecto educativo interactivo 
  basado en el universo de <b>Harry Potter</b>. Utiliza la 
  <a href="https://potterdb.com/" target="_blank">API pública PotterDB</a> 
  para obtener información actualizada sobre <b>personajes, hechizos y libros</b>.`;
  section.appendChild(descripcion);

  // --- Subtítulo Funcionalidades ---
  const subtituloFunc = document.createElement("h2");
  subtituloFunc.textContent = "📚 Funcionalidades";
  section.appendChild(subtituloFunc);

  // --- Lista de funcionalidades ---
  const listaFunc = document.createElement("ul");
  const funciones = [
    "🔍 Búsqueda de personajes, libros y hechizos.",
    "⚙️ Filtros dinámicos por tipo.",
    "📖 Vista detallada con información específica de cada elemento.",
    "❤️ Sistema de favoritos con almacenamiento local.",
    "📤 Opción de compartir elementos (en desarrollo)."
  ];
  funciones.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    listaFunc.appendChild(li);
  });
  section.appendChild(listaFunc);

  // --- Créditos ---
  const subtituloCreditos = document.createElement("h2");
  subtituloCreditos.textContent = "👩‍💻 Créditos";
  section.appendChild(subtituloCreditos);

  const creditos = document.createElement("p");
  creditos.innerHTML = `Desarrollado por <b>[Tu nombre o grupo]</b> como práctica de desarrollo web.<br>
  Basado en la estructura de una PokeApp original, adaptada al mundo mágico de Hogwarts.`;
  section.appendChild(creditos);

  // --- Recursos ---
  const subtituloRecursos = document.createElement("h2");
  subtituloRecursos.textContent = "🔗 Recursos";
  section.appendChild(subtituloRecursos);

  const listaRecursos = document.createElement("ul");
  const recursos = [
    { texto: "PotterDB API", url: "https://potterdb.com" },
    { texto: "GitHub Codespaces", url: "https://github.com" }
  ];
  recursos.forEach(r => {
    const li = document.createElement("li");
    const enlace = document.createElement("a");
    enlace.href = r.url;
    enlace.target = "_blank";
    enlace.textContent = r.texto;
    li.appendChild(enlace);
    listaRecursos.appendChild(li);
  });
  section.appendChild(listaRecursos);

  // --- Botón para volver ---
  const botonVolver = document.createElement("button");
  botonVolver.textContent = "🏠 Volver al inicio";
  botonVolver.addEventListener("click", () => Home());
  section.appendChild(botonVolver);

  // --- Insertar todo en el root ---
  root.appendChild(section);
}
