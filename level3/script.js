const weapons = {
  computer: {
    rocks: 5,
    paper: 5,
    scissors: 5,
  },
  my: {
    rocks: 5,
    paper: 5,
    scissors: 5,
  },
};
let selectedWeapon = "";

const updateNumbers = () => {
  ["computer", "my"].forEach((player) => {
    ["rocks", "paper", "scissors"].forEach((weapon) => {
      document.getElementById(`${player}-${weapon}`).innerHTML =
        weapons[player][weapon];
    });
  });
};

const startGame = () => {
  updateNumbers();
};

const playerChooseWeapon = (weapon) => {
  document.getElementById(`my-${weapon}-button`).classList.add("selected");
  if (selectedWeapon !== "") {
    document
      .getElementById(`my-${selectedWeapon}-button`)
      .classList.remove("selected");
  }
  selectedWeapon = weapon;

  document.getElementById(
    "my-slot"
  ).innerHTML = `<img src="./images/${weapon}.svg" alt="${weapon}" height="35px" />`;
};
