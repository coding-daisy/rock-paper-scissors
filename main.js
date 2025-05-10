let scoreComputer = 0;
let scoreUser = 0;
let userChoiceButtons = document.querySelectorAll(".userChoiceButton");
let computerChoiceButtons = document.querySelectorAll(".computerChoiceButton");
let computerChoiceText = document.querySelector("#computerChoiceText");


async function play() {
  while (scoreComputer !== 3 && scoreUser !== 3) {
    await playOneRound();
  }
}

async function playOneRound() {
  let userChoice = await getUserChoice();
  let computerChoice = await getComputerChoice();
  await wait(1000);
  let result = compareChoices(computerChoice, userChoice);
  changeScoresAndReact(result);
  resetButtons();
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
  computerChoiceText.style.visibility = "visible";
  await wait(2000);
  choose(1, choice);
  computerChoiceText.style.visibility = "hidden";
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

function resetButtons() {
  userChoiceButtons.forEach((button) => {
    button.style.visibility = "visible";
  });
  computerChoiceButtons.forEach((button) => {
    button.style.visibility = "visible";
  });
}

play();
