function generarLista(array) {
  let listaHTML = "";
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    const id = el.id;
    const name = el.attributes.name || "Sin nombre";

    listaHTML += `
      <div class="c-lista-item" onclick="Detalle('${id}')">
        <p>${name}</p>
      </div>`;
  }
  return listaHTML;
}

function Home() {
  const root = document.getElementById("root");

  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.placeholder = "Buscar personaje...";
  buscador.addEventListener("input", () => {
    buscadorfuncion(buscador.value);
  });

  const listaHTML = generarLista(elementos);
  const contenedor = document.createElement("div");
  contenedor.id = "la-lista";
  contenedor.innerHTML = listaHTML;

  root.innerHTML = "";
  root.appendChild(buscador);
  root.appendChild(contenedor);
}

function buscadorfuncion(valor) {
  const filtrados = elementos.filter(e =>
    e.attributes.name.toLowerCase().includes(valor.toLowerCase())
  );
  document.getElementById("la-lista").innerHTML = generarLista(filtrados);
}


function generarLista(arraypokemones) {
    let listaHTML = "";
    for (let i = 0; i < arraypokemones.length; i++) {
        let id = arraypokemones[i].url.split("/")[6];
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="Detalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${arraypokemones[i].name}">
            <p>${arraypokemones[i].name}</p>
        </div>`;
    }

    return listaHTML;
}

function Home(filtro){

    var root = document.getElementById("root");
    root.innerHTML = ""
    //buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", () => {
            buscadorfuncion(buscador.value);
    });

    //contenedor filtro
    const tipos = [
        "normal", "fighting", "flying", "poison", "ground", "rock", "bug",
        "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice",
        "dragon", "dark", "fairy", "stellar", "unknown"
    ];

    const contenedorFiltro = document.createElement("div");
    contenedorFiltro.classList.add("tipos-container"); 

    for (let i = 0; i < tipos.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = tipos[i];
        
        // Agregar el evento click para filtrar por tipo
        btn.addEventListener("click", () => {
            FiltroConexion(tipos[i]); 
        });

        // Agregar el botón al contenedor
        contenedorFiltro.appendChild(btn);
    }


    //add contenedor lista
    const listaHTML = generarLista(pokemones);
    var contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista"); 
    contenedorLista.id = "la-lista"; 
    contenedorLista.innerHTML = listaHTML;

    //agregar contenedores
    root.appendChild(buscador);
    root.appendChild(contenedorFiltro);
    root.appendChild(contenedorLista);
}