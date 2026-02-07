function getCardsHTML(pokemon, i) {
  const image = pokemon.sprites.other["official-artwork"].front_default;
  // const image = pokemon.sprites.other["showdown"].front_default; es gibt gifs, bei dialog verwenden?
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types[1]?.type.name;

  return `<div class="card" id="card" tabindex="0" onclick="openWindow(${i})" onkeydown="handleKey(event, function () { openWindow(${i}); })">
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
                            <div class="dot">
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}