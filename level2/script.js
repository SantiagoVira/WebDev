let flippedCard = null;
let isWaiting = false;
let score = 0;
let matches = 0;

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
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const displayScore = () => {
  const text = document.getElementById("score");
  text.innerHTML = `Score: ${score}`;
};

const onStart = () => {
  let indices = Array(16)
    .fill(0)
    .map((_, i) => i);
  shuffle(indices);

  for (let i = 0; i < 16; i++) {
    const idx = indices[i];
    createCard((idx % 8) + 1, idx);
  }
};

const reset = () => {
  const main = document.getElementById("main-grid");
  main.innerHTML = "";
  document.getElementById("modal").classList.add("modal-hidden");
  onStart();
  score = 0;
  matches = 0;
  displayScore();
};

const flip = (id) => {
  if (isWaiting) return;

  if (document.getElementById(id).classList.contains("active")) return;
  score++;
  displayScore();

  if (flippedCard) {
    const newCard = document.getElementById(id);

    const oldNum = flippedCard.key;
    const newNum = newCard.key;

    newCard.classList.add("active");

    if (oldNum === newNum) {
      // Found match
      matches++;
      if (matches === 8) {
        onWin();
      }
    } else {
      isWaiting = true;
      const flippedId = flippedCard.id;
      const newId = id;

      newCard.classList.add("two-active");

      setTimeout(() => {
        document.getElementById(flippedId).classList.remove("active");
        document.getElementById(newId).classList.remove("active", "two-active");
        isWaiting = false;
      }, 2500);
    }

    flippedCard = null;
  } else {
    flippedCard = document.getElementById(id);
    flippedCard.classList.add("active");
  }
};

const onWin = () => {
  const messages = [
    [
      "Congratulations, you did amazing!",
      "You're not a failure!",
      "You're a W",
    ],
    ["You're mid", "That was a good try!", "Not so bad"],
    ["You might be a failure", "That was pretty bad...", "You can do better!"],
  ];
  document.getElementById("modal").classList.remove("modal-hidden");
  document.getElementById("modal-text").innerHTML = `
    Score: ${score}<br>
    ${
      messages[score > 60 ? 2 : Math.floor((score - 1) / 20)][
        Math.floor(Math.random() * 3)
      ]
    }
  `;
};
