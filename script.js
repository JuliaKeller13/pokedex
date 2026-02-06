let allPokemonData = [];
// let allNamesList = [];
let currentOffset = 0;
const limit = 20;

function init() {
  // fetchAllPkmnNames();
  fetchData();
}

async function fetchData() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`);
  const responseAsJson = await response.json();
  const pkmnsList = responseAsJson.results; //only name and url

  for (let i = 0; i < pkmnsList.length; i++) {
    const detailResponse = await fetch(pkmnsList[i].url);
    const pkmnsDetailAsJson = await detailResponse.json();
    allPokemonData.push(pkmnsDetailAsJson); //data from personal url for every pkmn
  }

  currentOffset += limit;
  renderCards();
}

async function renderCards() {
  const cardsContainerRef = document.getElementById("cardsContainer");
  cardsContainerRef.innerHTML = "";

  for (let i = 0; i < allPokemonData.length; i++) {
    const pokemon = allPokemonData[i];
    // console.log(pokemon);
    cardsContainerRef.innerHTML += getCardsHTML(pokemon);
  }
}

function getCardsHTML(pokemon) {
  const image = pokemon.sprites.other["official-artwork"].front_default;
  // const image = pokemon.sprites.other["showdown"].front_default; es gibt gifs, bei dialog verwenden?
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types[1]?.type.name;

  return `<div class="card" id="card">
          <div class="card-inner" id="cardInner">
            <div class="card-content">
              <div class="headline type-${type}">
                <h2>#${pokemon.id} ${pokemon.name}</h2>
              </div>
              <div class="img-container">
                <img class="card-img" src="${image}" alt="${pokemon.name}"/>
              </div>
              <div class="card-info type-${type}">
                <p>Type: ${type} ${type2 ? ", " + type2 : ""}</p>
              </div>
            </div>
            <div class="card-border">
              <div class="border-row-top">
                <div class="dot"></div>
                <div class="rectangle horizontal"></div>
                <div class="dot"></div>
              </div>

              <div class="side-bar left">
                <div class="rectangle vertical"></div>
              </div>
              <div class="side-bar right">
                <div class="rectangle vertical"></div>
              </div>

              <div class="border-row-bottom">
                <div class="dot"></div>
                <div class="rectangle horizontal"></div>
                <div class="dot"></div>
              </div>
            </div>
          </div>
        </div>
            `;
}

// async function fetchAllPkmnNames() {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
//   const responseAsJson = await response.json();
//   const allPkmns = responseAsJson.results;

//   const search = document.getElementById("inputSearchPkmn").value.toLowerCase();
//   const filteredPkmns = allPkmns.filter((pokemon) =>
//     pokemon.name.toLowerCase().includes(search),
//   );
//   console.log(filteredPkmns);
  
// }
