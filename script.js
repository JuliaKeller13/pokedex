let allPokemonData = [];
let currentOffset = 0;
const limit = 28;
function init() {
  fetchData();
}

async function fetchData() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`);
  const responseAsJson = await response.json();
  const pkmnsList = responseAsJson.results;

  for (let i = 0; i < pkmnsList.length; i++) {
    const detailResponse = await fetch(pkmnsList[i].url);
    const pkmnsDetailAsJson = await detailResponse.json();
    allPokemonData.push(pkmnsDetailAsJson);
  }

  currentOffset += limit;
  renderCards();
}

async function renderCards() {
  const cardsContainerRef = document.getElementById("cardsContainer");
  cardsContainerRef.innerHTML = "";

  for (let i = 0; i < allPokemonData.length; i++) {
    const pokemon = allPokemonData[i];
    console.log(pokemon);
    cardsContainerRef.innerHTML += getCardsHTML(pokemon);
  }
}

function getCardsHTML(pokemon) {
  const image = pokemon.sprites.other["official-artwork"].front_default;
  const type = pokemon.types[0].type.name;
  
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
                <p>Type: ${type}</p>
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

              <div class="border-row-botom">
                <div class="dot"></div>
                <div class="rectangle horizontal"></div>
                <div class="dot"></div>
              </div>
            </div>
          </div>
        </div>
            `;
}