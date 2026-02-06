let allPokemonData = [];
let allPkmnsNamesList = [];
let currentOffset = 0;
const limit = 20;

function init() {
  fetchAllPkmnNames();
  fetchData();
}

async function fetchAllPkmnNames() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
  const responseAsJson = await response.json();
  allPkmnsNamesList = responseAsJson.results; 
}

async function fetchData() {
  showLoadingSpinner();
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`);
  const responseAsJson = await response.json();
  const pkmnsList = responseAsJson.results; //name and url

  for (let i = 0; i < pkmnsList.length; i++) {
    const detailResponse = await fetch(pkmnsList[i].url);
    const pkmnsDetailAsJson = await detailResponse.json();
    allPokemonData.push(pkmnsDetailAsJson); //data from personal url
  }
  disableLoadingSpinner();
  currentOffset += limit;
  renderCards();
}

function renderCards() {
  const cardsContainerRef = document.getElementById("cardsContainer");
  cardsContainerRef.innerHTML = "";

  for (let i = 0; i < allPokemonData.length; i++) {
    const pokemon = allPokemonData[i];
    // console.log(pokemon);
    cardsContainerRef.innerHTML += getCardsHTML(pokemon);
  }
}

//search
document.getElementById("inputSearchPkmn").addEventListener("input", searchPkmn);

async  function searchPkmn() {
  const search = document.getElementById("inputSearchPkmn").value.toLowerCase();
  const cardsContainerRef = document.getElementById("cardsContainer");
  cardsContainerRef.innerHTML = "";

  if (search.length < 3) {
    renderCards();
    return;
  }

  const filteredPkmns = allPkmnsNamesList.filter(pokemon =>
    pokemon.name.includes(search));

  for (let i = 0; i < filteredPkmns.length; i++) {
  const pokemon = filteredPkmns[i];

  const response = await fetch(pokemon.url);
  const filteredPkmnsData = await response.json();
  cardsContainerRef.innerHTML += getCardsHTML(filteredPkmnsData);
  }
}

function showLoadingSpinner(){
  document.getElementById("spinner").classList.remove("d-none");
}

function disableLoadingSpinner(){
  document.getElementById("spinner").classList.add("d-none");
}

//navigation
