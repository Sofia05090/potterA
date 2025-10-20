function Informacion() {
  const root = document.getElementById("root");
  root.innerHTML = ""; // limpiar la pantalla

  // Sección principal
  const section = document.createElement("section");
  section.classList.add("c-info");

  // Título principal
  const titulo = document.createElement("h1");
  titulo.textContent = "Enciclopedia Mágica PotterDB";
  section.appendChild(titulo);

  // Descripción principal
  const descripcion = document.createElement("p");
  descripcion.innerHTML = `
    Esta aplicación permite hacer consultas sobre la base de datos de Harry Potter, se puede usar para 
    revisar la infromacion sobre los personajes, hechizos y libros.
  `;
  section.appendChild(descripcion);


  // Insertar todo en root
  root.appendChild(section);
}
