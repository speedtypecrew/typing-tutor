const Game_Time = 4;
let score = 0;
let time = Game_Time;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
const wordInput = document.querySelector(".word-input")
const wordDisplay = document.querySelector(".word-display")
const scoreDisplay = document.querySelector(".score")
const timeDisplay = document.querySelector(".time")
const button = document.querySelector(".button")
const restartButton = document.querySelector(".restart-button");

init();

function init() {
    getWords();
    wordInput.addEventListener("input", checkMatch);
    button.addEventListener("click", run);
    restartButton.addEventListener("click", restartGame);
}

function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    time = Game_Time;
    wordInput.focus();
    score = 0;
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("Playing");
}

function restartGame() {
    isPlaying = false;
    restartButton.style.display = "none";
    run();
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        buttonChange("Game Over");
        clearInterval(checkInterval);
        button.disabled = true; 
        restartButton.style.display = "inline-block";

    }
}

function getWords() {
    words = ["Hello", "Apple", "Banana"];
    buttonChange("Game Start");
}

function checkMatch() {
    if (wordInput.value === wordDisplay.innerText) {
        wordInput.value = "";
        score++;
        scoreDisplay.innerText = score;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if (!isPlaying) {
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    if (text === "Game Start") {
        button.classList.remove('loading');
        button.disabled = false;
    } else {
        button.classList.add('loading');
    }
}

