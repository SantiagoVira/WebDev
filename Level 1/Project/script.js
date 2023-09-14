let activePile = 0;
let activeNumber = 0;

function setActivePile(id) {
  if (activePile) {
    const oldPileWrapper = document.getElementById(`pile-${activePile}`);
    oldPileWrapper.classList.remove("active-pile");
  }

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
  if (activeNumber) {
    const oldSelector = document.getElementById(`number-${activeNumber}`);
    oldSelector.classList.remove("active-number-selector");
  }

  const selector = document.getElementById(`number-${num}`);
  selector.classList.add("active-number-selector");
  activeNumber = num;

  const takeButton = document.getElementById("take");
  takeButton.disabled = false;
}
