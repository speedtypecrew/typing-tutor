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


init();
function init() {
    getWords()
    wordInput.addEventListener("input", checkMatch)
}

function run() {
    if (isPlaying){
        return;
    }
    isPlaying = true;
    time = Game_Time;
    wordInput.focus()
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkInterval, 50)
    buttonChange("playing")
}

function checkStatus() {
    if(!isPlaying && time === 0)
        buttonChange("Game Start")
        clearInterval(checkInterval)
}
function getWords(){
    words = ["Hello", "Apple", "Banana"];
    buttonChange("Game Start")
}




function checkMatch (){
    if (wordInput.value === wordDisplay.innerText){
        wordInput.value = "";
        score++;
        scoreDisplay.innerText = score;
        time = Game_Time;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex]
    }
}



function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    text === "Game Start" ?  button.classList.remove('loading') : button.classList.add('loading')
}