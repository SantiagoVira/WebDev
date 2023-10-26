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
const choices = ["rocks", "paper", "scissors"];
let selectedWeapon = "";

const log = [];

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
  document.getElementById("right-area").innerHTML += `
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
        </div>`;
};

const updateNumbers = () => {
  ["computer", "my"].forEach((player) => {
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

const playerChooseWeapon = (weapon) => {
  document.getElementById(`my-${weapon}-button`).classList.add("selected");
  if (selectedWeapon !== "") {
    document
      .getElementById(`my-${selectedWeapon}-button`)
      .classList.remove("selected");
  }
  document.getElementById("fight").disabled = false;
  selectedWeapon = weapon;

  document.getElementById(
    "my-slot"
  ).innerHTML = `<img src="./images/${weapon}.svg" alt="${weapon}" height="40px" />`;
};

const fight = () => {
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document
    .querySelectorAll(".my-weapon-button")
    .forEach((weapon) => (weapon.disabled = true));
  document.getElementById("game-result").innerHTML = "3";
  setTimeout(() => {
    document.getElementById("game-result").innerHTML = "2";
    setTimeout(() => {
      document.getElementById("game-result").innerHTML = "1";
      setTimeout(() => {
        document.getElementById("game-result").innerHTML =
          getWinnerText(computerChoice);

        updateLog(
          selectedWeapon,
          computerChoice,
          getWinnerText(computerChoice)
        );
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

/* Computer spinning */
window.addEventListener(
  "scroll",
  () => {
    document.body.style.setProperty(
      "--scroll",
      (window.pageYOffset * 100) /
        (document.body.offsetHeight - window.innerHeight)
    );
    console.log(document.body.style.getPropertyValue("--scroll"));
  },
  false
);
