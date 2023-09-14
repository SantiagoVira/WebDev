let activePile = 0;
let activeNumber = 0;

function setActivePile(id) {
  if (activePile) {
    const oldPile = document.getElementById(`pile-${activePile}`);
    oldPile.classList.remove("active-pile");
  }

  const pile = document.getElementById(`pile-${id}`);
  pile.classList.add("active-pile");
  activePile = id;
}

function setActiveNumber(num) {
  if (activeNumber) {
    const oldSelector = document.getElementById(`number-${activeNumber}`);
    oldSelector.classList.remove("active-number-selector");
  }

  const selector = document.getElementById(`number-${num}`);
  selector.classList.add("active-number-selector");
  activeNumber = num;
}
