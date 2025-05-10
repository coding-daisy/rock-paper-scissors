let scoreComputer = 0;
let scoreUser = 0;
let buttons = document.querySelectorAll("button");

async function play() {
  while ((scoreComputer !== 3) && (scoreUser !== 3)) {
    await playOneRound();
  }
}

async function playOneRound() {
  let computerChoice = getComputerChoice();
  let userChoice = await getUserChoice();
  console.log("computerChoice: "+ computerChoice + " userChoice: "  + userChoice);
  let result = compareChoices(computerChoice, userChoice);
  changeScoresAndReact(result);
  console.log("scoreComputer: " + scoreComputer + " scoreUser: " + scoreUser);
  resetButtons();
  alert("One round has finished");
}

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3); // 0, 1 or 2
  switch (randomNumber) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      throw new Error("Invalid randomNumber for computerChoice");
  }
}

function getUserChoice() {
  return new Promise((resolve) => {
    buttons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    // this function should:
    // 1. hide the buttons that weren't clicked on
    // 2. store the id of the button clicked on
    // 3. remove all EventListeners
    // 4. resolve the promise with the id of the button which was clicked on
    function handleClick() {
      buttons.forEach((button_) => {
        if (button_ !== this) {
          button_.style.visibility = "hidden";
        }
        // "this" inherited -> is still the button which was clicked on
        // every button which differs from the button which was clicked on is hidden

        button_.removeEventListener("click", handleClick);
      });
      resolve(this.id);
    }
  });
}

function compareChoices(choice1, choice2) {
  if (choice1 === "rock") {
    if (choice2 === "rock") {
      return 0;
    }
    if (choice2 === "scissors") {
      return 1;
    }
    return 2;
  }
  if (choice1 === "paper") {
    if (choice2 === "paper") {
      return 0;
    }
    if (choice2 === "rock") {
      return 1;
    }
    return 2;
  }
  if (choice1 === "scissors") {
    if (choice2 === "scissors") {
      return 0;
    }
    if (choice2 === "paper") {
      return 1;
    }
    return 2;
  }
}

function tie() {
  alert("It's a tie!");
}

function win(number) {
  if (number == 1) {
    alert("The computer wins!");
    scoreComputer++;
    return;
  }
  if (number === 2) {
    alert("You win!");
    scoreUser++;
    return;
  }
  throw new Error("The win() function was invoked with a invalid argument.");
}

function changeScoresAndReact(result) {
  switch (result) {
    case 0:
      tie();
      break;
    case 1:
      win(1);
      break;
    case 2:
      win(2);
      break;
    default:
      throw new Error("The comparison of the two values went wrong.");
  }
}

function resetButtons(){

}

play();
