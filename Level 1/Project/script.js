let activePile = 0;
let activeNumber = 0;

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

function resetGame() {
  removeActiveNumber();
  removeActivePile();
  disableSelectors();
  disableTakeButton();

  for (let pileNum = 1; pileNum < 4; pileNum++) {
    const pileWrapper = document.getElementById(`pile-${pileNum}`);
    if (pileWrapper.classList.contains("disabled"))
      pileWrapper.classList.remove("disabled");
    const pile = pileWrapper.children[1];
    pile.innerHTML = `<div class="stone"></div>
    <div class="stone"></div>
    <div class="stone"></div>`;
  }
}

function takeStones() {
  const pileWrapper = document.getElementById(`pile-${activePile}`);
  const pile = pileWrapper.children[1];
  for (let i = 0; i < activeNumber; i++) {
    pile.removeChild(pile.children[0]);
  }

  if (pile.children.length === 0) {
    pileWrapper.classList.add("disabled");
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

  removeActiveNumber();
  removeActivePile();
  disableSelectors();
  disableTakeButton();
}

function setActivePile(id) {
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
    `<p><b>${sender}: </b>${msg}</p>` + dialogueBox.innerHTML;
}

function goblinTurn() {
  // choose which thing to do
  // remove the stones
  // send message from game
  // wait
  // send message from unK
}

function wait(seconds = 3) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, seconds * 1000);
  });
}

async function playGame() {
  await wait(1);
  sendMessage(
    "unK",
    "Welcome to our stoNe gaMe! Be sure you know how to play, me and glooB are the best in the business!"
  );
  await wait();
  sendMessage("unK", "We will go first.");
  await wait(1);

  while (false) {
    goblinTurn();
    //if first time, say "now its ur turn, select your pile and how many you wnat to take"
    //somehow await taking stones
    //send message from unK why bad move
    //wait
  }
  //send message from game saying who won
  //send message from unK why better
}
