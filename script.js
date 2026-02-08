let allPokemonData = [];
let allPkmnsNamesList = [];
let currentOffset = 0;
let currentCardIndex = 0;
const limit = 40;
const dialogRef = document.getElementById("dialogMode");

function init() {
  fetchAllPkmnNames();
  fetchData();
}

async function fetchAllPkmnNames() {
  showLoadingSpinner();
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
  
  currentOffset += limit;
  renderCards();
}

function renderCards() {
  const cardsContainerRef = document.getElementById("cardsContainer");
  cardsContainerRef.innerHTML = "";
  
  for (let i = 0; i < allPokemonData.length; i++) {
    const pokemon = allPokemonData[i];
    console.log(pokemon);
    cardsContainerRef.innerHTML += getCardsHTML(pokemon, i);//wird alles neu gerendet, nicht portionsweise, verbessern
  }
  disableLoadingSpinner();
}

//search
document.getElementById("inputSearchPkmn").addEventListener("input", searchPkmn);

async  function searchPkmn() {
  const search = document.getElementById("inputSearchPkmn").value.toLowerCase();
  const cardsContainerRef = document.getElementById("cardsContainer");
  cardsContainerRef.innerHTML = "";
  if (search.length < 4) {
    renderCards();
    return;
  }
  const filteredPkmns = allPkmnsNamesList.filter(pokemon =>
    pokemon.name.includes(search));

  if (filteredPkmns === "") {
    cardsContainerRef.innerHTML = `<p class="message">Oops! We didn't find anything that matches <span>${search}</span>. Try to find another Pokemon.</p>`;
  }

  for (let i = 0; i < filteredPkmns.length; i++) {
  const pokemon = filteredPkmns[i];
  const response = await fetch(pokemon.url);
  const filteredPkmnsData = await response.json();
  cardsContainerRef.innerHTML += getCardsHTML(filteredPkmnsData);
  }
}

//overlay screen
function showLoadingSpinner(){
  document.getElementById("spinner").classList.remove("d-none");;
  document.getElementById("body").classList.add("of-hidden");
}

function disableLoadingSpinner(){
  document.getElementById("spinner").classList.add("d-none");
  document.getElementById("body").classList.remove("of-hidden");
}

function openDialog(index) {
  currentCardIndex = index;
  dialogRef.classList.remove("d-none");
  dialogRef.showModal();
}

function closeDialog() {
  dialogRef.classList.add("d-none");
  dialogRef.close();
}

function handleDialogClick(event) {
  if (!event.target.closest(".dialog-mode-inner")) {
    closeDialog();
  }
}

dialogRef.addEventListener("click", handleDialogClick);

//Keyboard fuction global
function handleKey(event, action) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

document.getElementById("closeDialog").addEventListener("keydown", function (e) {
  handleKey(e, closeDialog);
  dialogRef.classList.add("d-none");
});

// Pfeiltastensteuerung
document.addEventListener("keydown", function (event) {

  if (!dialogRef.open) return;//weiter nur, wenn Dialog geöffnet ist

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    previousCard();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    nextCard();
  }
});

// vorheriges/nächstes Bild im Dialog
function previousCard() {
  currentCardIndex = (currentCardIndex - 1 + allPokemonData.length) % allPokemonData.length;
  openDialog(currentCardIndex);
}

function nextCard() {
  currentCardIndex = (currentCardIndex + 1) % allPokemonData.length;
  openDialog(currentCardIndex);
}

//TODO
//Dialog mit More data