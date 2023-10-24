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

const updateNumbers = () => {
  ["computer", "my"].forEach((player) => {
    choices.forEach((weapon) => {
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
  document.getElementById("fight").disabled = false;
  selectedWeapon = weapon;

  document.getElementById(
    "my-slot"
  ).innerHTML = `<img src="./images/${weapon}.svg" alt="${weapon}" height="40px" />`;
};

const fight = () => {
  const computerChoice = Math.floor(Math.random() * 3);

  document
    .querySelectorAll(".my-weapon-button")
    .forEach((weapon) => (weapon.disabled = true));

  document.getElementById("computer-slot").innerHTML = `
  <div class="cube-wrap">
    <div class="cube spin-to-${choices[computerChoice]}">
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
