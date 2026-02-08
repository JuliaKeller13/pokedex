function getCardsHTML(pokemon, i) {
  const image = pokemon.sprites.other["official-artwork"].front_default;
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types[1]?.type.name;

  return `<div class="card" id="card" tabindex="0" onclick="openDialog(${i})" onkeydown="handleKey(event, function () { openDialog(${i}); })">
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

function getStatsHTML(stats) {
  let statsBoxHTML = '';

  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    const statName = stat.stat.name.toUpperCase();
    const baseValue = stat.base_stat;

    statsBoxHTML += `
      <div class="stat-row">
        <label for="${statName}">${statName}: ${baseValue}</label>
        <progress id="${statName}" max="200" value="${baseValue}">${baseValue}</progress>
      </div>
    `;
  }

  return statsBoxHTML;
}

function getDialogInnerHTML(pokemon) {
  const image = pokemon.sprites.other["official-artwork"].front_default;
  const type = pokemon.types[0].type.name;
  const type2 = pokemon.types[1]?.type.name;
  const statsHTML = getStatsHTML(pokemon.stats);

  return `
    <div class="dialog-mode-inner card-content">
      <header class="header-dialog">
        <h2 class="dialog-headline">#${pokemon.id} ${pokemon.name}</h2>
        <img class="close-btn" id="closeDialog" src="./assets/close.png" alt="close" onclick="closeDialog()" onkeydown="handleKey(event, closeDialog)" tabindex="0">
      </header>
      <section class="dialog-content">
        <div class="img-container-dialog">
            <img class="img-dialog" src="${image}" alt="${pokemon.name}">
        </div>
        <div class="info-box">
            <div class="stats-container">
                <p><strong>Type:</strong> ${type} ${type2 ? ", " + type2 : ""}</p>
                <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
            </div>
            <div class="stats-container">
                ${statsHTML}
            </div>
        </div>
      </section>
      <footer class="footer-dialog">
        <div class="footer-dialog-inner">
          <img class="arrow-btn" src="./assets/left.png" alt="previous" onclick="previousCard()">
          <img class="arrow-btn" src="./assets/rigth.png" alt="next" onclick="nextCard()">
        </div>
      </footer>
    </div>`;
}