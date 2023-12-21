// USAR INNER HTML
// ¿?Poner pantalla de carga para esperar ¿?
// La función init es el guion de las funciones .Pone el orden por el cual se ejecutan las funciones

// TO DO:
// // cambiar fuente
// girar y hacer que se vean las stats (event listenerclik), crear otro innerHTML para que repetir la misma estructura en todos?
//hacer que los botones del nav sirvan como busqueda (filter, map?)
//

// Array vacío y lo voy llenando con los pokemons que extraigo del bucle for. Añado i al hacer fetch porque así .
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

// PONER ORDEN A ESTA PARTE
//PINTAR LOS POKEMON, DIV Y ESTRUCTURA GENERAL
//DRAW POKEMON define una función con un argumento llamado pokemon y añade los elementos al HTML para cada pokemon (h4, p, botón y lo que surja)
// INNER HTML crea un HTML desde Javascript
// El BUCLE FOR (poke of pokemon va completando todo en cada vuelta hasta 150) sirve para crear la misma estructura en todos los pokemons de la lista.
//APPENDCHILD sirve para colocarlo en el lugar que quieras, en el bucle for añado un EVENT LISTENER para que cambie la foto con el mouse over, mouse out. También añado un EVENT LISTENER
//Creo la constante typeColors para que a cada ID le corresponda un color. En el mouseover le meto el color de fondo cuando está encima el ratón. y en el botón del tipo también se lo meto.

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

    img.addEventListener("mouseover", () => {
      img.src = poke.sprites.front_default;
      // img.style.backgroundColor = typeColors[type];
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

    for (const type of poke.types) {
      const typeButton = document.createElement("button");
      typeButton.textContent = type.type.name;
      typeButton.style.backgroundColor = typeColors[type.type.name];
      typeButton.style.borderColor = typeColors[type.type.name];
      typeButton.style.borderWidth = "2px";
      typeBtn.appendChild(typeButton);
    }

    const type = poke.types[0].type.name;

    // Make the borders of the div be the color of the first type
    div.style.borderRadius = "5vh";
    div.style.border = "2px solid";

    pHeight.textContent = `Height: ${poke.height / 10} m`;
    pHeight.style.color = "gray";
    pWeight.textContent = `Weight: ${poke.Weight / 10} kg`;
    h4.textContent = poke.name;
    typeBtn.style.filter = "grayscale(60%)";

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

// HERRAMIENTAS PARA FILTRAR LOS POKEMONS
//  FILTER sirve para hacer que se pueda buscar por nombre.
// PAINT FILTER es la función que crea el input que permitirá buscar.
// los botones filtran por ID(tipo de pokemon)
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

const filterPokemonByType = (type, pokemon) => {
  const filteredPokemon = pokemon.filter(
    (poke) => poke.types[0].type.name === type
  );
  return filteredPokemon;
};


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

// const FirePokemon = (pokemon) => {
//   const filteredPokemonFire = pokemon.filter((poke) => poke.types[0].type.name.includes(`fire`));
//   return filteredPokemonFire;
// };
// console.log(FirePokemon)

// const type = poke.types[0].type.name;

//  1. Init sirve de hoja de ruta. Se van poniendo las funciones que van a ser llamadas para que se ejecuten.
//  2. Init llama a la función Init y arranca todo.(?) Intentar poner la
const init = async () => {
  // const loadingDiv = document.createElement('div');
  // loadingDiv.classList.add('loading');
  // loadingDiv.innerHTML = `<img src="./utils/img/loading_gif.gif" />`;
  // document.body.appendChild(loadingDiv);

  // const timer = setTimeout(() => {
  //   loadingDiv.remove();

  //   }, 18000);

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

init();





















