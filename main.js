let scoreComputer = 0;
let scoreUser = 0;
let userChoiceButtons = document.querySelectorAll(".userChoiceButton");
let computerChoiceButtons = document.querySelectorAll(".computerChoiceButton");

let computerChoiceToBeMadeText = document.querySelector("#computerChoiceToBeMadeText");
let computerChoiceBeingMadeText = document.querySelector("#computerChoiceBeingMadeText");
let computerChoiceMadeText = document.querySelector("#computerChoiceMadeText");
let userChoiceToBeMadeText = document.querySelector("#userChoiceToBeMadeText");
let userChoiceMadeText = document.querySelector("#userChoiceMadeText");

let restartButton = document.querySelector("#restartButton");
let restartSection = document.querySelector("#restartSection");

let userWinsText = document.querySelector("#userWinsText");
let userLosesText = document.querySelector("#userLosesText");

async function play() {
  while (scoreComputer !== 2 && scoreUser !== 2) {
    await playOneRound();
  }
  showResult(scoreComputer - scoreUser);
  makeRestartPossible();
}

async function playOneRound() {
  let userChoice = await getUserChoice();
  reactionToChoice(2, 2);
  reactionToChoice(1, 1);
  let computerChoice = await getComputerChoice();
  reactionToChoice(1, 2)
  await wait(1000);
  let result = compareChoices(computerChoice, userChoice);
  changeScoresAndReact(result);
  resetButtons();
  reactionToChoice(1, 0);
  reactionToChoice(2, 0);
  alert("One round has finished");
}

async function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3); // 0, 1 or 2
  let choice;
  switch (randomNumber) {
    case 0:
      choice = "rock";
      break;
    case 1:
      choice = "paper";
      break;
    case 2:
      choice = "scissors";
      break;
    default:
      throw new Error("Invalid randomNumber for computerChoice");
  }

  await letComputerChoose(choice);

  return choice;
}

async function letComputerChoose(choice) {
  await wait(2000);
  choose(1, choice);
}

async function wait(timeInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
}

function getUserChoice() {
  return new Promise((resolve) => {
    userChoiceButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
    });

    // 1. hide the userChoiceButtons that weren't clicked on
    // 2. remove all EventListeners
    // 3. resolve the promise with the innerHTML of the button which was clicked on

    function handleClick() {
      choose(2, this.innerHTML);
      userChoiceButtons.forEach((button_) => {
        // "this" inherited -> is still the button which was clicked on
        // every button which differs from the button which was clicked on is hidden

        button_.removeEventListener("click", handleClick);
      });
      resolve(this.innerHTML);
    }
  });
}

function choose(number, innerHTML) {
  let relevantButtons = number == 1 ? computerChoiceButtons : userChoiceButtons;
  relevantButtons.forEach((button) => {
    if (innerHTML !== button.innerHTML) {
      button.style.visibility = "hidden";
    }
  });
}

// meaning of VALUE
  // 0: default
  // 1: being made (only for computer)
  // 2: made
function reactionToChoice(player, value) {
    if (player === 2) {
        if (value === 0) {
            userChoiceToBeMadeText.style.display = "block";
            userChoiceMadeText.style.display = "none";
        } else if (value === 2) {
            userChoiceToBeMadeText.style.display = "none";
            userChoiceMadeText.style.display = "block";
        } else {
            throw new Error("The reactionToChoice() function was invoked with a invalid argument. (1, invalid)");
        }
    } else if (player === 1) {
        if (value === 0) {
            computerChoiceToBeMadeText.style.display = "block";
            computerChoiceMadeText.style.display = "none";
        } else if (value === 1) {
            computerChoiceBeingMadeText.style.display = "block";
            computerChoiceToBeMadeText.style.display = "none";
        } else if (value === 2) {
            computerChoiceBeingMadeText.style.display = "none";
            computerChoiceMadeText.style.display = "block";
        } else {
            throw new Error("The reactionToChoice() function was invoked with a invalid argument. (2, invalid)");
        }
    } else {
        throw new Error("The reactionToChoice() function was invoked with a invalid argument. (invalid, ...)");
    }
    

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
  throw new Error("The win() function was invoked with an invalid argument.");
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

function resetButtons() {
  userChoiceButtons.forEach((button) => {
    button.style.visibility = "visible";
  });
  computerChoiceButtons.forEach((button) => {
    button.style.visibility = "visible";
  });
}

function showResult(result) {
    userChoiceToBeMadeText.style.display = "none";
    if (result > 0) {
        userLosesText.style.display = "block";
    } else {
        userWinsText.style.display = "block";
    }
}

function makeRestartPossible() {
    restartSection.style.display = "block";
    restartButton.addEventListener('click', restart);
}

function restart() {
    restartSection.style.display = "none";
    scoreUser = 0;
    scoreComputer = 0;
    userLosesText.style.display = "none";
    userWinsText.style.display = "none";
    userChoiceToBeMadeText.style.display = "block";
    play();
}

play();
