async function fetchData(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/pikachu');
    const responseAsJson = await response.json(); 
    console.log(responseAsJson);
    
    renderCards(responseAsJson);
}

function renderCards(responseAsJson){
    const cardsContainerRef = document.getElementById('cardsContainer');
    cardsContainerRef.innerHTML = '';
    responseAsJson.forEach((arrayElement) => {
            cardsContainerRef.innerHTML += getCardsHTML(arrayElement);
        })
}

function getCardsHTML(arrayElement) {
    return `<div class="card" id="card">
          <div class="card-inner" id="cardInner">
            <div class="card-content">
              <div class="headline">
                <h2>Pikachu</h2>
              </div>
              <div class="img-container">
                <img
                  class="card-img"
                  src="./assets/pikachu.png"
                  alt="Pokemonname"
                />
              </div>
              <div class="card-info">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <div class="card-border">
              <div class="border-row top">
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

              <div class="border-row bottom">
                <div class="dot"></div>
                <div class="rectangle horizontal"></div>
                <div class="dot"></div>
              </div>
            </div>
          </div>
        </div>
            `;
}