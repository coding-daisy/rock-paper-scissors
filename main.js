let scoreComputer = 0;
let scoreUser = 0;
let userChoiceButtons = document.querySelectorAll(".userChoiceButton");
let computerChoiceButtons = document.querySelectorAll(".computerChoiceButton");

let options = ["rock", "paper", "scissors"];

let userChoiceDescription = document.querySelector("#userChoiceDescription");
let computerChoiceDescription = document.querySelector(
  "#computerChoiceDescription"
);
let gameDescription = document.querySelector("#gameDescription");

let restartButton = document.querySelector("#restartButton");
let restartSection = document.querySelector("#restartSection");
let nextRoundButton = document.querySelector("#nextRoundButton");

async function play() {
  while (scoreComputer !== 2 && scoreUser !== 2) {
    await playOneRound();
    await nextRound();
    reset();
  }
  showResult(scoreComputer - scoreUser);
  makeRestartPossible();
}

async function playOneRound() {
  let userChoice = await getUserChoice();

  reactionToChoice(2, 2);
  reactionToChoice(1, 1);

  let computerChoice = await getComputerChoice();

  reactionToChoice(1, 2);
  await wait(1000);

  let result = determineWinner(computerChoice, userChoice);
  changeScoresAndReact(result);
}

async function nextRound() {
  nextRoundButton.style.visibility = "visible";
  return new Promise((resolve) => {
    nextRoundButton.addEventListener('click', () => {
      nextRoundButton.style.visibility = "hidden";
      resolve();
    })
  })
}

async function getComputerChoice() {
  let randomIndex = Math.floor(Math.random() * 3); // 0, 1 or 2
  let choice = options[randomIndex];

  await wait(2000);
  choose(1, choice);
  return choice;
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
    // 3. resolve the promise with the textContent of the button which was clicked on

    function handleClick() {
      choose(2, this.textContent);
      userChoiceButtons.forEach((button_) => {
        // "this" inherited -> is still the button which was clicked on
        // every button which differs from the button which was clicked on is hidden

        button_.removeEventListener("click", handleClick);
      });
      resolve(this.textContent);
    }
  });
}

function choose(number, textContent) {
  let relevantButtons = number == 1 ? computerChoiceButtons : userChoiceButtons;
  relevantButtons.forEach((button) => {
    if (textContent !== button.textContent) {
      button.style.visibility = "hidden";
    }
  });
}

// meaning of VALUE
// 0: default
// 1: being made (only for computer)
// 2: made
function reactionToChoice(player, value) {
  if (player === 1) {
    if (value === 0) {
      computerChoiceDescription.textContent = "These are the computer's options:";
    } else if (value == 1) {
      computerChoiceDescription.textContent =
        "The computer is making up its mind ...";
    } else if (value === 2) {
      gameDescription.textContent = "It's time for the computer to make a choice!";
      computerChoiceDescription.textContent = "The computer has made a choice!";
    } else {
      throw new Error(
        "The reactionToChoice() function was invoked with an invalid argument. (1, invalid)"
      );
    }
  } else if (player === 2) {
    if (value === 0) {
      gameDescription.textContent = "It's time for you to make a choice!";
      userChoiceDescription.textContent = "What option will you choose?";
    } else if (value === 2) {
      userChoiceDescription.textContent = "great choice!";
    } else {
      throw new Error(
        "The reactionToChoice() function was invoked with an invalid argument. (2, invalid)"
      );
    }
  } else {
    throw new Error(
      "The reactionToChoice() function was invoked with an invalid argument. (invalid, ...)"
    );
  }
}

function determineWinner(choice1, choice2) {
  let value;
  if (choice1 == choice2) {
    value = 0;
  } else if (
    (choice1 === "rock" && choice2 === "scissors") ||
    (choice1 === "scissors" && choice2 === "paper") ||
    (choice1 === "paper" && choice2 === "rock")
  ) {
    value = 1;
  } else {
    value = 2;
  }
  return value;
}


function changeScoresAndReact(result) {
  switch (result) {
    case 0:
      gameDescription.textContent = "It's a tie!";
      break;
    case 1:
      gameDescription.textContent = "The computer won this round!";
      break;
    case 2:
      gameDescription.textContent = "You won this round!";
      break;
    default:
      throw new Error("The comparison of the two values went wrong.");
  }
}

function reset() {
  resetButtons();
  reactionToChoice(1, 0);
  reactionToChoice(2, 0);
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
  if (result > 0) {
    gameDescription.textContent = "Congratulations! You have won!";
  } else {
    gameDescription.textContent = "Oh no ... seems like you've lost.";
  }
}

function makeRestartPossible() {
  restartSection.style.display = "block";
  restartButton.addEventListener("click", restart);
}

function restart() {
  restartSection.style.display = "none";
  scoreUser = scoreComputer = 0;
  reactionToChoice(1, 0);
  reactionToChoice(2, 0);
  play();
}

play();
