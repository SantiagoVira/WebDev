let activePile = 0;
let activeNumber = 0;
let firstRound = true;
let winner = 0; // 1 player won, 2 goblins won

function removeActivePile() {
  if (activePile) {
    const oldPileWrapper = document.getElementById(`pile-${activePile}`);
    oldPileWrapper.classList.remove("active-pile");
  }

  activePile = 0;
}

function removeActiveNumber() {
  if (activeNumber) {
    const oldSelector = document.getElementById(`number-${activeNumber}`);
    oldSelector.classList.remove("active-number-selector");
  }
  activeNumber = 0;
}

function disableSelectors() {
  const selectors = document.getElementById("number-selectors");
  for (const selNum in selectors.children) {
    const sel = selectors.children[selNum];
    sel.disabled = true;
  }
}

function disableTakeButton() {
  const takeButton = document.getElementById("take");
  takeButton.disabled = true;
}

function setPilesActive(active) {
  const piles = document.getElementById("piles");
  piles.childNodes.forEach((e) => {
    if (e.nodeName === "DIV") {
      if (e.children[1].children.length > 0) {
        if (e.classList.contains("disabled") && active)
          e.classList.remove("disabled");
        else if (!e.classList.contains("disabled") && !active)
          e.classList.add("disabled");
      }
    }
  });
}

function checkGameOver(potentialWinner) {
  let isOver = true;
  const piles = document.getElementById("piles");
  piles.childNodes.forEach((e) => {
    if (e.nodeName === "DIV") {
      console.log();
      if (e.children[1].children.length > 0) {
        isOver = false;
        return;
      }
    }
  });
  if (!isOver) return false;

  winner = potentialWinner;
  endGame();
  return true;
}

function resetGame() {
  removeActiveNumber();
  removeActivePile();
  disableSelectors();
  disableTakeButton();
  firstRound = true;

  document.getElementById("dialogue").innerHTML = "";

  for (let pileNum = 1; pileNum < 4; pileNum++) {
    const pileWrapper = document.getElementById(`pile-${pileNum}`);
    if (pileWrapper.classList.contains("disabled"))
      pileWrapper.classList.remove("disabled");
    const pile = pileWrapper.children[1];
    pile.innerHTML = `<div class="stone"></div>
    <div class="stone"></div>
    <div class="stone"></div>`;
  }

  startGame();
}

async function takeStones() {
  const pileWrapper = document.getElementById(`pile-${activePile}`);
  const pile = pileWrapper.children[1];
  for (let i = 0; i < activeNumber; i++) {
    pile.removeChild(pile.children[0]);
  }

  if (pile.children.length === 0) {
    pileWrapper.classList.add("disabled");
    if (checkGameOver(2)) return;
  }

  let remainingMessage;
  switch (pile.children.length) {
    case 0:
      remainingMessage = "There are no stones left in that pile.";
      break;
    case 1:
      remainingMessage = "There is 1 stone left in that pile.";
      break;
    case 2:
      remainingMessage = "There are 2 stones left in that pile.";
      break;
  }

  sendMessage(
    "Game",
    `You took ${activeNumber} stone${
      activeNumber > 1 ? "s" : ""
    } from Pile ${activePile}! ${remainingMessage}`
  );

  setPilesActive(false);

  removeActiveNumber();
  removeActivePile();
  disableSelectors();
  disableTakeButton();

  await wait();
  //send random message from unK why bad move
  sendMessage("unK", "Ha, you have made a critical error!");
  await wait();
  await goblinTurn();
}

function setActivePile(id) {
  if (document.getElementById(`pile-${id}`).classList.contains("disabled"))
    return;
  removeActivePile();
  disableSelectors();

  const pileWrapper = document.getElementById(`pile-${id}`);
  pileWrapper.classList.add("active-pile");
  activePile = id;

  const selectors = document.getElementById("number-selectors");
  for (const selNum in selectors.children) {
    const sel = selectors.children[selNum];
    if (pileWrapper.children[1].childElementCount >= parseInt(sel.innerHTML)) {
      sel.disabled = false;
    }
  }
}

function setActiveNumber(num) {
  removeActiveNumber();

  const selector = document.getElementById(`number-${num}`);
  selector.classList.add("active-number-selector");
  activeNumber = num;

  const takeButton = document.getElementById("take");
  takeButton.disabled = false;
}

function sendMessage(sender, msg) {
  const dialogueBox = document.getElementById("dialogue");
  dialogueBox.innerHTML =
    `<p><b>${sender}:</b> ${msg}</p>` + dialogueBox.innerHTML;
}

async function goblinTurn() {
  const piles = document.getElementById("piles");
  const order = [];
  piles.childNodes.forEach((e) => {
    if (e.nodeName === "DIV") {
      order.push([e.children[1].children.length, order.length + 1]);
    }
  });
  order.sort((valA, valB) => valA[0] - valB[0]); // smallest first, [amt stones, pile num]

  const choosesSmallest = Math.random() * 10 < 1;
  let choice = order[2][1];

  for (pair of order) {
    if ((choosesSmallest && pair[0] > 0) || pair[0] === 1) {
      choice = pair[1];
      break;
    }
  }

  const pileWrapper = document.getElementById(`pile-${choice}`);
  const pile = pileWrapper.children[1];
  pile.removeChild(pile.children[0]);

  if (pile.children.length === 0) {
    pileWrapper.classList.add("disabled");
    if (checkGameOver(1)) return;
  }

  let remainingMessage;
  switch (pile.children.length) {
    case 0:
      remainingMessage = "There are no stones left in that pile.";
      break;
    case 1:
      remainingMessage = "There is 1 stone left in that pile.";
      break;
    case 2:
      remainingMessage = "There are 2 stones left in that pile.";
      break;
  }

  sendMessage(
    "Game",
    `The goblins took 1 stone from Pile ${choice}! ${remainingMessage}`
  );
  await wait(1);

  //create random messages
  sendMessage(
    "unK",
    "glooB made this move because of the obvious tactical advantage of this stone"
  );
  await wait();
  if (firstRound) {
    sendMessage(
      "unK",
      "Now its your turn, select your pile and how many you want to take."
    );
    firstRound = false;
  }
  setPilesActive(true);
}

function wait(seconds = 3) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, seconds * 1000);
  });
}

async function startGame() {
  await wait(1);
  sendMessage(
    "unK",
    "Welcome to our stoNe gaMe! Be sure you know how to play, me and glooB are the best in the business!"
  );
  await wait();
  sendMessage("unK", "We will go first.");
  await wait(1);

  await goblinTurn();
}

async function endGame() {
  sendMessage(
    "Game",
    winner === 1
      ? "Congratulations! You are the winner of this round of stoNe gaMe!"
      : "unK and glooB are the winners of this round!"
  );
  await wait();
  sendMessage(
    "unK",
    winner === 1
      ? "Psh... that was a warmup round, we are obviously still the reigning champs"
      : "Ha! Winners again, but better luck next time... not!!"
  );
}
