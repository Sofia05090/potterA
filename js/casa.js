function Casa() {
  const root = document.getElementById("root");
  root.innerHTML = ""; // limpiar la pantalla

  const section = document.createElement("section");
  section.classList.add("c-casa");

  // --- Título principal ---
  const titulo = document.createElement("h1");
  titulo.textContent = " Descubre tu casa de Hogwarts";
  section.appendChild(titulo);

  // --- Introducción ---
  const intro = document.createElement("p");
  intro.textContent = "Responde las siguientes preguntas y descubre a cuál casa perteneces según tus elecciones mágicas.";
  section.appendChild(intro);

  // --- Preguntas del test ---
  const preguntas = [
    {
      texto: "¿Qué valoras más?",
      opciones: {
        Gryffindor: "Coraje y valentía",
        Ravenclaw: "Inteligencia y sabiduría",
        Hufflepuff: "Lealtad y trabajo duro",
        Slytherin: "Ambición y astucia"
      }
    },
    {
      texto: "¿Qué criatura te atrae más?",
      opciones: {
        Gryffindor: "Un fénix brillante",
        Ravenclaw: "Un águila majestuosa",
        Hufflepuff: "Un tejón amistoso",
        Slytherin: "Una serpiente poderosa"
      }
    },
    {
      texto: "¿Qué cualidad te describe mejor?",
      opciones: {
        Gryffindor: "Valiente",
        Ravenclaw: "Curioso",
        Hufflepuff: "Amable",
        Slytherin: "Determinado"
      }
    }
  ];

  const respuestas = [];

  preguntas.forEach((pregunta, index) => {
    const div = document.createElement("div");
    div.classList.add("c-pregunta");

    const p = document.createElement("p");
    p.textContent = pregunta.texto;
    div.appendChild(p);

    const opcionesDiv = document.createElement("div");
    opcionesDiv.classList.add("c-opciones");

    for (const casa in pregunta.opciones) {
      const btn = document.createElement("button");
      btn.textContent = pregunta.opciones[casa];
      btn.addEventListener("click", () => {
        respuestas[index] = casa;
        // marcar la opción elegida
        opcionesDiv.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
        btn.classList.add("activo");
      });
      opcionesDiv.appendChild(btn);
    }

    div.appendChild(opcionesDiv);
    section.appendChild(div);
  });

  // --- Botón para obtener resultado ---
  const btnResultado = document.createElement("button");
  btnResultado.textContent = " Descubrir mi casa";
  btnResultado.classList.add("btn-descubrir");
  btnResultado.addEventListener("click", () => mostrarResultado(respuestas));
  section.appendChild(btnResultado);

  root.appendChild(section);
}

// --- Función para calcular resultado ---
function mostrarResultado(respuestas) {
  const root = document.getElementById("root");

  if (respuestas.length < 3 || respuestas.includes(undefined)) {
    alert("🪄 Por favor, responde todas las preguntas antes de continuar.");
    return;
  }

  // Contar frecuencia
  const conteo = {};
  respuestas.forEach(casa => conteo[casa] = (conteo[casa] || 0) + 1);

  // Determinar la casa final
  const casaFinal = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);

  // Limpiar pantalla
  root.innerHTML = "";

  const section = document.createElement("section");
  section.classList.add("c-resultado");

  const titulo = document.createElement("h1");
  titulo.textContent = ` ¡Tu casa es ${casaFinal}!`;
  section.appendChild(titulo);

  // --- Texto decorativo mágico ---
  const textoDecorativo = document.createElement("div");
  textoDecorativo.classList.add("texto-casa");
  textoDecorativo.textContent = obtenerTituloCasa(casaFinal);
  section.appendChild(textoDecorativo);

  const texto = document.createElement("p");
  texto.textContent = obtenerDescripcionCasa(casaFinal);
  section.appendChild(texto);

  const volver = document.createElement("button");
  volver.textContent = " Volver al inicio";
  volver.addEventListener("click", General);
  section.appendChild(volver);

  root.appendChild(section);
}

// --- Texto decorativo por casa ---
function obtenerTituloCasa(casa) {
  const titulos = {
    Gryffindor: " Gryffindor — Coraje y determinación",
    Slytherin: " Slytherin — Ambición y poder",
    Ravenclaw: " Ravenclaw — Sabiduría e ingenio",
    Hufflepuff: " Hufflepuff — Lealtad y amistad"
  };
  return titulos[casa] || "Hogwarts — Un verdadero mago";
}


// --- Escudos y descripciones ---
function obtenerEscudoCasa(casa) {
  const escudos = {
    Gryffindor: "https://i.imgur.com/HZP7Hqp.png",
    Slytherin: "https://i.imgur.com/bVJkKLB.png",
    Ravenclaw: "https://i.imgur.com/nP7gWmV.png",
    Hufflepuff: "https://i.imgur.com/Hz3Vv0v.png"
  };
  return escudos[casa] || "https://upload.wikimedia.org/wikipedia/en/6/6f/Hogwartscrest.png";
}

function obtenerDescripcionCasa(casa) {
  const descripciones = {
    Gryffindor: "Eres valiente, audaz y decidido. No temes enfrentarte a los desafíos. ",
    Slytherin: "Eres ambicioso, ingenioso y decidido a alcanzar tus metas. ",
    Ravenclaw: "Eres sabio, creativo y amante del conocimiento. ",
    Hufflepuff: "Eres leal, paciente y siempre estás dispuesto a ayudar. "
  };
  return descripciones[casa] || "";
}
