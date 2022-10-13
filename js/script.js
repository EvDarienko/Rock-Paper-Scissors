let combinations = document.querySelector('.player1');
let startButton = document.querySelector('.start');
let resetButton = document.querySelector('.reset');
let info = document.querySelector('.info');
let scoreUser = document.querySelector('.score-player1 span');
let scoreComputer = document.querySelector('.score-player2 span');

function randomNumber(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function getWeapon(e) {
    if (e.target != e.currentTarget) {
        combinations.querySelectorAll('div').forEach((item) => {
            item.classList.remove('active');
        })
        if (e.target.tagName == 'IMG') {
            e.target.parentElement.classList.add('active');
        } else {
            e.target.classList.add('active');
        }
    } 
}

function startGame() {
    let userChoice = document.querySelector('.player1 .active');
    let computerChoice = document.querySelector(`.player2 div[data-id="${randomNumber(1, 3)}"]`);
    let counter = 0;
    
    if (userChoice == null) {
        info.textContent = 'Choose your weapon firstly!';
        return
    }

    let animation = setInterval(() => {
        if (counter > 2) {
            counter = 0;
        }
        document.querySelectorAll('.player2 div').forEach((item) => {item.classList.remove('active')})
        document.querySelectorAll('.player2 div')[counter].classList.add('active');
        counter++;
    }, 300)

    setTimeout(() => {
        clearInterval(animation);
        document.querySelectorAll('.player2 div').forEach((item) => {item.classList.remove('active')})
        computerChoice.classList.add('active');
        compareResult(userChoice, computerChoice)
    }, 3000)
}

function compareResult(user, computer) {
    if ((user.dataset.id == '1' && computer.dataset.id == '2') || (user.dataset.id == '2' && computer.dataset.id == '3') || (user.dataset.id == '3' && computer.dataset.id == '1')) {
        info.textContent = 'Congratulations! You won!';
        scoreUser.textContent = parseInt(scoreUser.textContent) + 1;
    } else if (user.dataset.id == computer.dataset.id) {
        info.textContent = 'It is a draw! Try once more!';
    } else {
        info.textContent = 'You lost! Try again!';
        scoreComputer.textContent = parseInt(scoreComputer.textContent) + 1;
    }
}

function resetGame() {
    combinations.querySelectorAll('div').forEach((item) => {item.classList.remove('active')})
    document.querySelectorAll('.player2 div').forEach((item) => {item.classList.remove('active')})
    info.textContent = "Let's check your luck! First of all, choose your weapon!";
    (scoreUser.textContent = '0') && (scoreComputer.textContent = '0');
}
  
combinations.addEventListener('click', getWeapon)

startButton.addEventListener('click', startGame)

resetButton.addEventListener('click', resetGame)



