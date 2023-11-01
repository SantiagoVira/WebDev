/*
TODO
- on win
- responsiveness
*/

const weapons = {
  computer: {
    rocks: 5,
    paper: 5,
    scissors: 5,
  },
  user: {
    rocks: 0,
    paper: 5,
    scissors: 5,
  },
};
const choices = ["rocks", "paper", "scissors"];
let selectedWeapon = "";

let log = [];

const repeatedThreeTimes = (userChoice, computerChoice) => {
  if (log.length < 3) return { user: false, computer: false };
  const obj = {
    user:
      userChoice === log.slice(-1)[0].userChoice &&
      log.slice(-1)[0].userChoice === log.slice(-2)[0].userChoice &&
      log.slice(-2)[0].userChoice === log.slice(-3)[0].userChoice,
    computer:
      computerChoice === log.slice(-1)[0].computerChoice &&
      log.slice(-1)[0].computerChoice === log.slice(-2)[0].computerChoice &&
      log.slice(-2)[0].computerChoice === log.slice(-3)[0].computerChoice,
  };
  console.log(obj, userChoice, log.slice(-1), log.slice(-2));
  return obj;
};

const updateLog = (userChoice, computerChoice, winner) => {
  // Winner stored as:
  // 0: User wins
  // 1: Computer wins
  // 2: Tie
  log.push({
    userChoice,
    computerChoice,
    winner,
  });
  document.getElementById("right-area").innerHTML =
    `
  <div class="log-entry">
          <div>
            <img src="./images/user.svg" alt="User" height="20px" />
            <div class="dash"></div>
            <img src="./images/${userChoice}.svg" alt="${userChoice}" height="20px" />
          </div>
          <div>
            <img src="./images/computer.svg" alt="computer" height="20px" />
            <div class="dash"></div>
            <img
              src="./images/${computerChoice}.svg"
              alt="${computerChoice}"
              height="20px"
            />
          </div>
          <p>${winner}</p>
        </div>` + document.getElementById("right-area").innerHTML;
};

const updateNumbers = () => {
  ["computer", "user"].forEach((player) => {
    choices.forEach((weapon) => {
      document.getElementById(`${player}-${weapon}`).innerHTML =
        weapons[player][weapon];
    });
  });
};

const getWinner = (computerChoice) =>
  (choices.indexOf(computerChoice) + 1) % 3 === choices.indexOf(selectedWeapon)
    ? 0
    : computerChoice === selectedWeapon
    ? 2
    : 1;

const getWinnerText = (computerChoice) => {
  let resultText = "";

  switch (getWinner(computerChoice)) {
    case 0:
      resultText = "You Win!!";
      break;
    case 1:
      resultText = "Computer wins :(";
      break;
    case 2:
      resultText = "Tie!!";
      break;
    default:
      resultText = "";
  }
  return resultText;
};

const startGame = () => {
  updateNumbers();
};

const resetGame = () => {
  weapons.user = {
    rocks: 5,
    paper: 5,
    scissors: 5,
  };
  weapons.computer = {
    rocks: 5,
    paper: 5,
    scissors: 5,
  };
  log = [];
  document.getElementById("right-area").innerHTML = "";
  updateNumbers();
  nextRound();

  const highestId = window.setTimeout(() => {
    for (let i = highestId; i >= 0; i--) {
      window.clearInterval(i);
    }
  }, 0);

  document.getElementById("game-result").innerHTML = "";
};

const playerChooseWeapon = (weapon) => {
  if (document.getElementById(`user-${weapon}`).innerHTML === "0") return;
  document.getElementById(`user-${weapon}-button`).classList.add("selected");
  if (selectedWeapon !== "") {
    document
      .getElementById(`user-${selectedWeapon}-button`)
      .classList.remove("selected");
  }
  document.getElementById("fight").disabled = false;
  selectedWeapon = weapon;

  document.getElementById(
    "user-slot"
  ).innerHTML = `<img src="./images/${weapon}.svg" alt="${weapon}" height="40px" />`;
};

const nextRound = () => {
  document.querySelectorAll(".user-weapon-button").forEach((weapon) => {
    weapon.disabled = false;
    weapon.classList.remove("selected");
  });
  const fightButton = document.getElementById("fight");
  fightButton.innerHTML = "Fight!";
  fightButton.onclick = fight;
  fightButton.disabled = true;

  document.getElementById("computer-slot").innerHTML = "?";
  document.getElementById("user-slot").innerHTML = "";
};

const changeWeapons = (computerChoice, userChoice) => {
  const winnerIdx = getWinner(computerChoice);
  if (winnerIdx === 2) return;

  const winner = winnerIdx === 0 ? "user" : "computer";
  const loser = winnerIdx === 0 ? "computer" : "user";
  const lostWeapon = winnerIdx === 0 ? computerChoice : userChoice;
  if (weapons[loser][lostWeapon] === 0) return;

  weapons[winner][lostWeapon] += 1;
  weapons[loser][lostWeapon] -= 1;

  updateNumbers();
};

const fight = () => {
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document
    .querySelectorAll(".user-weapon-button")
    .forEach((weapon) => (weapon.disabled = true));
  document.getElementById("game-result").innerHTML = "3";
  setTimeout(() => {
    document.getElementById("game-result").innerHTML = "2";
    setTimeout(() => {
      document.getElementById("game-result").innerHTML = "1";
      setTimeout(() => {
        document.getElementById("game-result").innerHTML =
          getWinnerText(computerChoice);

        const didRepeat = repeatedThreeTimes(selectedWeapon, computerChoice);
        if (didRepeat.user) {
          weapons.user[selectedWeapon] -= 1;
        }
        if (didRepeat.computer) {
          weapons.computer[computerChoice] -= 1;
        }
        updateNumbers();

        updateLog(
          selectedWeapon,
          computerChoice,
          getWinnerText(computerChoice)
        );

        changeWeapons(computerChoice, selectedWeapon);

        if (checkWin() === 0) {
          const fightButton = document.getElementById("fight");
          fightButton.innerHTML = "Continue";
          fightButton.disabled = false;
          fightButton.onclick = nextRound;
        }
      }, 1000);
    }, 1000);
  }, 1000);

  document.getElementById("computer-slot").innerHTML = `
  <div class="cube-wrap">
    <div class="cube spin-to-${computerChoice}">
      <div class="side top">
        <img src="./images/rocks.svg" alt="rock" height="40px" />
      </div>
      <div class="side front">
        <img src="./images/paper.svg" alt="paper" height="40px" />
      </div>
      <div class="side bottom">
        <img src="./images/scissors.svg" alt="scissors" height="40px" />
      </div>
    </div>
  </div>`;
  document.getElementById("fight").disabled = true;
};

const checkWin = () => {
  // Winner returned as:
  // 0: no winner
  // 1: User wins
  // 2: Computer wins
  if (
    weapons.user.paper === 0 &&
    weapons.user.rocks === 0 &&
    weapons.user.scissors === 0
  ) {
    alert("Computer won");
    return 2;
  } else if (
    weapons.computer.paper === 0 &&
    weapons.computer.rocks === 0 &&
    weapons.computer.scissors === 0
  ) {
    alert("user won");
    return 1;
  }
  return 0;
};
