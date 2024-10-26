const gameAreaEl = document.getElementById("game-area");
const scoreEl = document.getElementById("score");
const countdownEl = document.getElementById("countdown");
const gameOverEl = document.getElementById("game-over");
const startBtnEl = document.querySelector(".startBtn");
const holes = [...document.getElementsByClassName('hole')];

let gameDuration = 20; // seconds
let score = 0;
let miss = 0;
const maximumMissThreshold = 3;
const scoreToCompleteLevel = 5; // Score required to complete the level
let gameRunning = false;
let countdownInterval = null;
let missTimerInterval = null;

// function to initialize the game
function startGame() {
    initializeGameTimer();
    gameRunning = true;
    startBtnEl.style.display = "none";
    gameOverEl.style.display = "none";
    peekPeachInterval = setInterval(peekPeach, getPeekInterval());
}

// function to initialize the game timer
function initializeGameTimer() {
    countdownInterval = setInterval(() => {
        countdownEl.style.display = "block";
        countdownEl.textContent = `Your game will end in ${gameDuration} seconds or after three misses.`;
        gameDuration--;
        if (gameDuration == 0) {
            endGame();
            return;
        }
    }, 1000);
}

// function to get peek interval game logic
function getPeekInterval() {
    if (score >= 0 && score <= 10) {
        return 2000;
    } else if (score >= 11 && score <= 20) {
        return 1500;
    } else {
        return 1100;
    }
}

// function for showing peach at certain intervals
function peekPeach() {
    if (gameRunning) {
        if (miss === maximumMissThreshold) {
            endGame();
            return;
        }
        const randomIndex = Math.floor(Math.random() * holes.length);
        const hole = holes[randomIndex];
        hole.classList.add("peachEmoji");
        setTimeout(() => {
            hole.classList.remove("peachEmoji");
        }, 800);
        missTimerInterval = setTimeout(() => {
            miss++;
        }, 800);
    }
}

// function to clear the game variables and end
function endGame() {
    clearInterval(countdownInterval);
    clearInterval(peekPeachInterval);
    countdownEl.style.display = "none";
    gameOverEl.style.display = "block";

    // Display success message if the player achieved the required score
    if (score >= scoreToCompleteLevel) {
        gameOverEl.textContent = `Congratulations! You've scored ${score} points! Click below to proceed to Level 3!`;
        const nextLevelButton = document.createElement("button");
        nextLevelButton.textContent = "Go to Level 3";
        nextLevelButton.onclick = () => window.location.href = "rsp.html"; // Navigate to rsp.html
        gameOverEl.appendChild(nextLevelButton);
    } else {
        gameOverEl.textContent = `Game Over! Your score: ${score}.`;
    }

    // Reset game variables
    gameDuration = 20;
    score = 0;
    miss = 0;
    startBtnEl.style.display = "block";
}

// function for whack event
function whack(event) {
    if (gameRunning) {
        clearInterval(missTimerInterval);
        const holeEl = event.target;
        if (holeEl.classList.contains("peachEmoji")) {
            score++;
            scoreEl.textContent = `Score: ${score}`; // Update text to Score
        } else {
            miss++;
        }
    }
}
