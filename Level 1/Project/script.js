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

function takeStones() {
  const pileWrapper = document.getElementById(`pile-${activePile}`);
  const pile = pileWrapper.children[1];
  for (let i = 0; i < activeNumber; i++) {
    pile.removeChild(pile.children[0]);
  }

  if (pile.children.length === 0) {
    pileWrapper.classList.add("disabled");
  }

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
