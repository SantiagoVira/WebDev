const createCard = (catNum) => {
  const card = document.createElement("div");
  card.classList.add("image-card-main");
  card.innerHTML = `
<div class="image-card-inner">
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
    createCard((i % 8) + 1);
  }
};
