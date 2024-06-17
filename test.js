const Test_Game_Time = 4;
let testScore = 0;
let testTime = Test_Game_Time;
let isTestPlaying = false;
let testTimeInterval;
let testCheckInterval;
let testWords = [];
const testWordInput = document.querySelector(".test-word-input");
const testWordDisplay = document.querySelector(".test-word-display");
const testScoreDisplay = document.querySelector(".test-score");
const testTimeDisplay = document.querySelector(".test-time");
const testButton = document.querySelector(".test-button");
const testRestartButton = document.querySelector(".test-restart-button");

initTest();

function initTest() {
    getTestWords();
    testWordInput.addEventListener("input", checkTestMatch);
    testButton.addEventListener("click", runTest);
    testRestartButton.addEventListener("click", restartTestGame);
}

function runTest() {
    if (isTestPlaying) {
        return;
    }
    isTestPlaying = true;
    testTime = Test_Game_Time;
    testWordInput.focus();
    testScore = 0;
    testScoreDisplay.innerText = testScore;
    testTimeInterval = setInterval(countTestDown, 1000);
    testCheckInterval = setInterval(checkTestStatus, 50);
    testButtonChange("Playing");
}

function restartTestGame() {
    isTestPlaying = false;
    testRestartButton.style.display = "none";
    runTest();
}

function checkTestStatus() {
    if (!isTestPlaying && testTime === 0) {
        testButtonChange("Game Over");
        clearInterval(testCheckInterval);
        testButton.disabled = true;
        testRestartButton.style.display = "inline-block";
    }
}

function getTestWords() {
    testWords = ["Hello", "Apple", "Banana"];
    testButtonChange("Game Start");
}

function checkTestMatch() {
    if (testWordInput.value.toLowerCase() === testWordDisplay.innerText.toLowerCase()) {
        testWordInput.value = "";
        testScore++;
        testScoreDisplay.innerText = testScore;
        const randomIndex = Math.floor(Math.random() * testWords.length);
        testWordDisplay.innerText = testWords[randomIndex];
    }
}

function countTestDown() {
    testTime > 0 ? testTime-- : isTestPlaying = false;
    if (!isTestPlaying) {
        clearInterval(testTimeInterval);
    }
    testTimeDisplay.innerText = testTime;
}

function testButtonChange(text) {
    testButton.innerText = text;
    if (text === "Game Start") {
        testButton.classList.remove('loading');
        testButton.disabled = false;
    } else {
        testButton.classList.add('loading');
    }
}
