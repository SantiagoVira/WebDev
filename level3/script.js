const weapons = {
  computer: {
    rocks: 2,
    paper: 4,
    scissors: 3,
  },
  my: {
    rocks: 1,
    paper: 2,
    scissors: 3,
  },
};

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
