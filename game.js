const Game_Time = 10;
const Word_Speed = 2;
let score = 0;
let time = Game_Time;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];
let fallingWords = [];
const minDistance = 50;
const wordInput = document.querySelector(".word-input");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");
const restartButton = document.querySelector(".restart-button");
const gameContainer = document.querySelector(".game-container");

init();

function init() {
    getWords();
    wordInput.addEventListener("input", checkMatch);
    wordInput.addEventListener("input", restrictInputToEnglish);
    button.addEventListener("click", run);
    restartButton.addEventListener("click", restartGame);
}

async function getWords() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=1000');
        const data = await response.json();
        words = data;
        buttonChange("Game Start");
    } catch (error) {
        console.error('Error fetching words:', error);
    }
}

function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    time = Game_Time;
    wordInput.focus();
    wordInput.disabled = false;
    score = 0;
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("Playing");
    startFallingWords();
}

function restartGame() {
    isPlaying = false;
    restartButton.style.display = "none";
    clearInterval(checkInterval);
    clearInterval(timeInterval);
    fallingWords.forEach(word => word.element.remove());
    fallingWords = [];
    run();
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        buttonChange("Game Over");
        clearInterval(checkInterval);
        button.disabled = true;
        wordInput.disabled = true;
        restartButton.style.display = "inline-block";
    }
}

function checkMatch() {
    const matchedWordIndex = fallingWords.findIndex(word => word.text.toLowerCase() === wordInput.value.toLowerCase());
    if (matchedWordIndex !== -1) {
        wordInput.value = "";
        score++;
        scoreDisplay.innerText = score;
        fallingWords[matchedWordIndex].element.remove();
        fallingWords.splice(matchedWordIndex, 1);
    }
}

function restrictInputToEnglish(event) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^a-zA-Z]/g, '');
}

function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if (!isPlaying) {
        clearInterval(timeInterval);
        wordInput.disabled = true;
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

function startFallingWords() {
    setInterval(() => {
        if (isPlaying) {
            createFallingWord();
        }
    }, 3000);
}

function createFallingWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const wordText = words[randomIndex];
    const wordElement = document.createElement('div');
    wordElement.className = 'word-display';
    wordElement.innerText = wordText;
    wordElement.style.top = '0px';

    let leftPosition;
    let isOverlapping;

    do {
        leftPosition = Math.random() * (gameContainer.offsetWidth - 50);
        isOverlapping = false;

        for (const word of fallingWords) {
            if (Math.abs(leftPosition - parseFloat(word.element.style.left)) < minDistance) {
                isOverlapping = true;
                break;
            }
        }
    } while (isOverlapping);

    wordElement.style.left = `${leftPosition}px`;
    gameContainer.appendChild(wordElement);

    const word = { text: wordText, element: wordElement, top: 0 };
    fallingWords.push(word);
    fall(word);
}

function fall(word) {
    const fallInterval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(fallInterval);
            return;
        }
        word.top += Word_Speed;
        word.element.style.top = `${word.top}px`;

        if (word.top > gameContainer.offsetHeight) {
            word.element.remove();
            const wordIndex = fallingWords.indexOf(word);
            if (wordIndex > -1) {
                fallingWords.splice(wordIndex, 1);
            }
            clearInterval(fallInterval);
        }
    }, 50);
}
