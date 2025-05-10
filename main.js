
function getComputerChoice() {
    let randomNumber = Math.floor((Math.random()*3)); // 0, 1 or 2
    switch (randomNumber) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissor";
        default:
            throw new Error('Invalid randomNumber for computerChoice');
    }
}

function getUserChoice() {
    let userChoice = prompt("What is your choice? \n (Enter 'rock', 'paper' or 'scissor'): ");
    if ((userChoice === "rock") || (userChoice === 'paper') || (userChoice === 'scissor')) {
        return userChoice;
    }
    return;
}

console.log(getComputerChoice());
console.log(getUserChoice());