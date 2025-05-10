
function getComputerChoice() {
    let randomNumber = Math.floor((Math.random()*3)); // 0, 1 or 2
    switch (randomNumber) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            throw new Error('Invalid randomNumber for computerChoice');
    }
}

function getUserChoice(text) {
    let userChoice = prompt(text);
    while ((userChoice !== "rock") && (userChoice !== 'paper') && (userChoice !== 'scissors')) {
        userChoice = prompt("Your choice was invalid. Please enter 'rock', 'paper' or 'scissors'.");
    }
    return userChoice;
}

function playOneRound(score1, score2) {
    let computerChoice = getComputerChoice();
    let userChoice = getUserChoice("What is your choice? \n(Please enter 'rock', 'paper' or 'scissors'.");
    let result = compareChoices(computerChoice, userChoice);
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
    alert("hello");
}

function compareChoices(choice1, choice2) {
    if (choice1 === "rock") {
        if (choice2 === "rock") {
            return 0;
        }
        if (choice2 === "scissor") {
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
        return;
    }
    if (number === 2) {
        alert("You win!");
        return;
    }
    throw new Error("The win() function was invoked with a invalid argument.");
}

playOneRound();