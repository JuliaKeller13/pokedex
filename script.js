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

//TODO
//Dialog mit More data
// Bild im Großformat, Name und Nummer vom Bild anzeigen
function openWindow(index) {
  currentCardIndex = index;
  // document.getElementById("dialogTitle").innerText += `Hallo`;
  dialogRef.classList.remove("d-none");
  dialogRef.showModal();
}

function closeWindow() {
  dialogRef.classList.add("d-none");
  dialogRef.close();
}

// // vorheriges/nächstes Bild im Dialog
// function previousImg() {
//   currentCardIndex = (currentCardIndex - 1 + imgs.length) % imgs.length;
//   openWindow(currentCardIndex);
// }

// function nextImg() {
//   currentCardIndex = (currentCardIndex + 1) % imgs.length;
//   openWindow(currentCardIndex);
// }

// Dialog schließen, wenn man auf backdrop clickt
function handleDialogClick(event) {
  if (!event.target.closest(".dialog-mode-inner")) { //closest sucht nach außen Element mit dieser ID, gibt true zurück (mit ! wird die Aussage auf false gesetzt). Event.targen hat Wert eines clicks (z.B. auf img ist <img>)
    closeWindow();
  }
}

dialogRef.addEventListener("click", handleDialogClick); //Wenn irgendwo im Dialog geklickt wird, wird die Funktion handleDialogClick aufgerufen

//Keyboard fuction global
function handleKey(event, action) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

//Dialog schließen
document.getElementById("closeDialog")
  .addEventListener("keydown", function (e) {
    handleKey(e, closeWindow);
  });

// // Pfeiltastensteuerung
// document.addEventListener("keydown", function (event) {

//   if (!dialogRef.open) return;//weiter nur, wenn Dialog geöffnet ist

//   if (event.key === "ArrowLeft") {
//     event.preventDefault();
//     previousImg();
//   }

//   if (event.key === "ArrowRight") {
//     event.preventDefault();
//     nextImg();
//   }
// });