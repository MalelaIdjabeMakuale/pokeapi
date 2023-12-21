// 1. HACER EL ARRAY DE POKEMON
// Array vacío y lo voy llenando con los pokemons que extraigo con el fetch. Añado i al hacer fetch porque así va haciendo vueltas.
// La función es asíncrona para que no mande una petición hasta que esté resuelta la anterior.
//Try y Catch devuelven el resultado o un error al hacer la función y return devuelve el Array de pokemons lleno en forma de objeto (json)
const getPokemon = async (id) => {
  const pokemonArray = []; //Existe en todo el código

  for (let i = 1; i <= 150; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      console.log(response);
      const results = await response.json();
      console.log(results);
      pokemonArray.push(results);
    } catch (error) {
      console.log(error);
    }
  }

  return pokemonArray;
};

// 2. CREAR INNER HTML Y ESTRUCTURA
//Creo con INNNER HTML el contenedero de los pokemon un div en el que un BUCLE FOR hace que se repita la estructura para todo el Array de pokemons.
const drawPokemon = (pokemon) => {
  const div$$ = document.querySelector(".pokemon");
  div$$.innerHTML = "";

  for (const poke of pokemon) {
    const div = document.createElement("div");
    div.classList.add("pokemon-card");
    const h4 = document.createElement("h4");
    const img = document.createElement("img");
    const pHeight = document.createElement("p");
    const pWeight = document.createElement("p");
    const typeBtn = document.createElement("button");

  
//3. ASIGNAR UN COLOR A CADA TIPO DE POKEMON
//Agrego un color a cada tipo de pokemon con la constante typeColors. Y añado los atributos de las imágenes de los Pokemon.
const typeColors = {
  normal: "#A8A877",
  fighting: "#c52020",
  flying: "#b02890",
  poison: "#97269f",
  ground: "#E0C068",
  rock: "#757538",
  bug: "#507f54",
  ghost: "#af96c1",
  steel: "#a6a68",
  fire: "#db661e",
  water: "#2880d3",
  grass: "#178e66",
  electric: "#a9b11b",
  psychic: "#e888dd",
  ice: "#82e0ee",
  dragon: "#8508d2",
  dark: "#705848",
  fairy: "#ce92c2",
};

img.setAttribute("src", poke.sprites.back_shiny);
img.setAttribute("alt", poke.name);


// 4. EVENT LISTENER
// El escuchador de eventos hace que las tarjetas interaccionen y cambién de foto y de opacidad con el mouseover/mouseout.
img.addEventListener("mouseover", () => {
  img.src = poke.sprites.front_default;
  img.style.backgroundColor = typeColors[type];
  div.style.borderColor = typeColors[type];
  div.style.borderWidth = "6px";
  typeBtn.style.filter = "grayscale(0%)";
  pHeight.style.color = "black";
  pWeight.style.color = "black";
});

img.addEventListener("mouseout", () => {
  img.src = poke.sprites.back_shiny;
  img.style.backgroundColor = "#ffffff";

  div.style.borderColor = "gray";
  div.style.border = "2px solid";
  pHeight.style.color = "gray";
  pWeight.style.color = "gray";

  typeBtn.style.filter = "grayscale(60%)";
});

//5. CONTENIDO Y ESTILO DE LOS BOTONES Y LOS PÁRRAFOS.
// Extraigo el tipo de cada Pokemon y lo pongo en el el botón. También extraigo la altura, peso y nombre para rellenar los párrafos y el h4. Además con la constante de los colores que he hecho antes asigno un color a cada botón. También pongo más estilos al botón, a los párrafos y al div. Por último añado todo al HTML.

// Contenido y estilo de los botones. 
    for (const type of poke.types) {
      const typeButton = document.createElement("button");
      typeButton.textContent = type.type.name;
      typeButton.style.backgroundColor = typeColors[type.type.name];
      typeButton.style.borderColor = typeColors[type.type.name];
      typeButton.style.borderWidth = "0px";
      typeBtn.style.filter = "grayscale(90%)";
      typeBtn.appendChild(typeButton);
    }

  // Contenido y estilos de los párrafos.
    pHeight.textContent = `Height: ${poke.height / 10} m`;
    pHeight.style.color = "gray";
    pWeight.textContent = `Weight: ${poke.weight / 10} kg`;
    pWeight.style.color = "gray";
    h4.textContent = poke.name;
   
     const type = poke.types[0].type.name;

 // Estilo del div.
    div.style.borderRadius = "5vh";
    div.style.border = "2px solid";

   // Añadiendo todos estos elementos al HTML.
    div.appendChild(h4);
    div.appendChild(img);
    div.appendChild(pHeight);
    div.appendChild(pWeight);
    div.appendChild(typeBtn);
    div.appendChild(h4);
    div.appendChild(img);
    div.appendChild(pHeight);
    div.appendChild(pWeight);
    div.appendChild(typeBtn);

    div$$.appendChild(div);
  }
};

// 6. FILTRAR POKEMON POR NOMBRE
//  Creo el filtro para buscar pokemon por nombre y el event listener para que el filtro reaccione al input.
const filterPokemon = (pokemon) => {
  let input$$ = document.querySelector("input");
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(input$$.value.toLowerCase())
  );
  drawPokemon(filteredPokemon);
};

const paintFilter = (pokemon) => {
  let input$$ = document.createElement("input");
  input$$.setAttribute("type", "text");
  input$$.setAttribute("placeholder", "Search by name");
  input$$.addEventListener("input", () => filterPokemon(pokemon));
  document.body.appendChild(input$$);
};
// Filtra y da un nuevo array solo con los pokemons filtrados por nombre. 
const filterPokemonByType = (type, pokemon) => {
  const filteredPokemon = pokemon.filter(
    (poke) => poke.types[0].type.name === type
  );
  return filteredPokemon;
};

//7. FILTRAR POKEMON POR TIPO
// El event listener hace que cuando se haga click en el botón filtre por el tipo de Pokemon correspondiente. Solo filtra por el tipo primario de cada Pokemon.  BUSCAR SOLUCIÓN!! Tiene que filtrar ambos tipos y encontrar la manera de no hacer 18 filtros. bucle for¿? if/else¿?
const paintFilterAll = (pokemon) => {
  const allButton = document.querySelector("#all");

  allButton.addEventListener("click", () => {
    const filteredPokemon = pokemon; 
    drawPokemon(filteredPokemon);
  });
};

const paintFilterNormal = (pokemon) => {
  const normalButton = document.querySelector("#normal");

  normalButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("normal", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterFire = (pokemon) => {
  const fireButton = document.querySelector("#fire");

  fireButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("fire", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterWater = (pokemon) => {
  const waterButton = document.querySelector("#water");

  waterButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("water", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterElectric = (pokemon) => {
  const electricButton = document.querySelector("#electric");

  electricButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("electric", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterGrass = (pokemon) => {
  const grassButton = document.querySelector("#grass");

  grassButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("grass", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterIce = (pokemon) => {
  const iceButton = document.querySelector("#ice");

  iceButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("ice", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterFighting = (pokemon) => {
  const fightingButton = document.querySelector("#fighting");

  fightingButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("fighting", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterPoison = (pokemon) => {
  const poisonButton = document.querySelector("#poison");

  poisonButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("poison", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterGround = (pokemon) => {
  const groundButton = document.querySelector("#ground");

  groundButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("ground", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterFlying = (pokemon) => {
  const flyingButton = document.querySelector("#flying");

  flyingButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("flying", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterPsychic = (pokemon) => {
  const psychicButton = document.querySelector("#psychic");

  psychicButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("psychic", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterBug = (pokemon) => {
  const bugButton = document.querySelector("#bug");

  bugButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("bug", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterRock = (pokemon) => {
  const rockButton = document.querySelector("#rock");

  rockButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("rock", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterGhost = (pokemon) => {
  const ghostButton = document.querySelector("#ghost");

  ghostButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("ghost", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterDragon = (pokemon) => {
  const dragonButton = document.querySelector("#dragon");

  dragonButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("dragon", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterSteel = (pokemon) => {
  const steelButton = document.querySelector("#steel");

  steelButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("steel", pokemon);
    drawPokemon(filteredPokemon);
  });
};

const paintFilterFairy = (pokemon) => {
  const fairyButton = document.querySelector("#fairy");

  fairyButton.addEventListener("click", () => {
    const filteredPokemon = filterPokemonByType("fairy", pokemon);
    drawPokemon(filteredPokemon);
  });
};

// 8. FUNCION INIT

const init = async () => {

  const pokemon = await getPokemon();
  console.log(pokemon);

  paintFilter(pokemon);
  paintFilterAll(pokemon);
  console.log(pokemon);
  paintFilterNormal(pokemon);
  paintFilterFire(pokemon);
  paintFilterWater(pokemon);
  paintFilterElectric(pokemon);
  paintFilterGrass(pokemon);
  paintFilterIce(pokemon);
  paintFilterFighting(pokemon);
  paintFilterPoison(pokemon);
  paintFilterGround(pokemon);
  paintFilterFlying(pokemon);
  paintFilterPsychic(pokemon);
  paintFilterBug(pokemon);
  paintFilterRock(pokemon);
  paintFilterGhost(pokemon);
  paintFilterDragon(pokemon);
  paintFilterSteel(pokemon);
  paintFilterFairy(pokemon);
  const div$$ = document.createElement("div");
  div$$.classList.add("pokemon");
  document.body.appendChild(div$$);
  drawPokemon(pokemon);
};

// Llama a la función Init para empezar todo
init();





















