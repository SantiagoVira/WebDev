let flippedCard = null;

const createCard = (catNum, idx) => {
  const card = document.createElement("div");
  card.classList.add("image-card-main");
  card.id = `card-${idx}`;
  card.key = catNum;
  card.innerHTML = `
<div class="image-card-inner" onclick="flip('card-${idx}')">
  <div class="image-card-front">
    ?
  </div>
  <div class="image-card-back">
    <img
    src="./images/cat${catNum}.jpeg"
    alt="Cat"
  />
  </div>
</div>`;

  const mainGrid = document.getElementById("main-grid");
  mainGrid.appendChild(card);
  console.log(card);
};

const onStart = () => {
  for (let i = 0; i < 16; i++) {
    createCard((i % 8) + 1, i);
  }
};

const flip = (id) => {
  if (flippedCard) {
    const newCard = document.getElementById(id);

    const oldNum = flippedCard.key;
    const newNum = newCard.key;

    if (oldNum === newNum) {
      // Found match

      flippedCard = null;
      newCard.classList.add("active");
      return;
    } else {
      flippedCard.classList.remove("active");
    }
  }

  flippedCard = document.getElementById(id);
  flippedCard.classList.add("active");
};
