let allPokemonData = [];
let allPkmnsNamesList = [];
let currentSearchData = [];
let isSearching = false;
let currentOffset = 0;
let currentCardIndex = 0;
const limit = 30;
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
    const pkmnsList = responseAsJson.results;
    for (let i = 0; i < pkmnsList.length; i++) {
        const detailResponse = await fetch(pkmnsList[i].url);
        const pkmnsDetailAsJson = await detailResponse.json();
        allPokemonData.push(pkmnsDetailAsJson);
    }
    currentOffset += limit;
    renderCards();
}

function renderCards() {
    isSearching = false;
    const cardCOntainerRef = document.getElementById("cardsContainer");
    cardCOntainerRef.innerHTML = "";

    for (let i = 0; i < allPokemonData.length; i++) {
        const pokemon = allPokemonData[i];
        cardCOntainerRef.innerHTML += getCardsHTML(pokemon, i);
    }
    disableLoadingSpinner();
}

function renderDialogCard(index) {
    const dataSource =isSearching ? currentSearchData : allPokemonData;
    const pokemon = dataSource[index];
    dialogRef.innerHTML = getDialogInnerHTML(pokemon);
}

//searching
async function fetchSearchingData(filteredResults){
    let searchHTML = "";
    for (let i = 0; i < filteredResults.length; i++) {
        const response = await fetch(filteredResults[i].url);
        const data = await response.json();
        currentSearchData.push(data);
        searchHTML += getCardsHTML(data,i);
    }
    return searchHTML;
}

async function searchPkmn() {
    const search = document.getElementById("inputSearchPkmn").value.toLowerCase();
    const cardsContainerRef = document.getElementById("cardsContainer");
    if (search.length >= 3) {
        const filteredResults = allPkmnsNamesList.filter((pokemon) => pokemon.name.includes(search));
        if (filteredResults.length !== 0){
            showLoadingSpinner();
            isSearching = true;
            currentSearchData = [];
            const searchHTML = await fetchSearchingData(filteredResults);
            cardsContainerRef.innerHTML = searchHTML;
            disableLoadingSpinner();
        } else {
            cardsContainerRef.innerHTML = `<p class="message">Oops! We didn't find anything that matches <span>${search}</span>...Try to find another Pokemon.</p>`;
            return;
        }
    } return;
}

function showLoadingSpinner() {
    document.getElementById("spinner").classList.remove("d-none");
    document.getElementById("body").classList.add("of-hidden");
}

function disableLoadingSpinner() {
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById("body").classList.remove("of-hidden");
}

function openDialog(index) {
    currentCardIndex = index;
    dialogRef.classList.remove("d-none");
    dialogRef.showModal();
    renderDialogCard(currentCardIndex);
}

function closeDialog() {
    dialogRef.close();
    dialogRef.classList.add("d-none");
}

dialogRef.addEventListener("click", (event) => {
    if (event.target === dialogRef) closeDialog();
});

dialogRef.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog();
});

function handleKey(event, action) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
}

document.getElementById("inputSearchPkmn").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchPkmn();
  }
});

document.addEventListener("keydown", function (event) {
    if (!dialogRef.open) {
        return;
    } 

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousCard();
    } 

    if (event.key === "ArrowRight") {
        event.preventDefault();
        nextCard();
    }
})

function previousCard() {
    const dataRef = isSearching ? currentSearchData : allPokemonData;
    currentCardIndex = (currentCardIndex -1 + dataRef.length) % dataRef.length;
    renderDialogCard(currentCardIndex);
}

function nextCard() {
    const dataRef = isSearching ? currentSearchData : allPokemonData;
    currentCardIndex = (currentCardIndex + 1) % dataRef.length;
    renderDialogCard(currentCardIndex);
}