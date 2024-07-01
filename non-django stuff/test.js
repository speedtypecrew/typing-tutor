const Test_Game_Time = 4;
let testScore = 0;
let testTime = Test_Game_Time;
let isTestPlaying = false;
let testTimeInterval;
let testCheckInterval;
let testWords = [];
let totalTypedEntries = 0;
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
    totalTypedEntries = 0;
    testTime = Test_Game_Time;
    testWordInput.focus();
    testScore = 0;
    updateTestScore();
    displayNextWord();
    testTimeInterval = setInterval(countTestDown, 1000);
    testCheckInterval = setInterval(checkTestStatus, 50);
    testButtonChange("Playing");
    testWordInput.disabled = false;
}

function restartTestGame() {
    clearInterval(testTimeInterval);
    clearInterval(testCheckInterval);
    isTestPlaying = false;
    testWordInput.value = "";
    testWordInput.disabled = false;
    testRestartButton.style.display = "none";
    runTest();
}

function checkTestStatus() {
    if (!isTestPlaying && testTime === 0) {
        testButtonChange("Game Over");
        clearInterval(testCheckInterval);
        testButton.disabled = true;
        testWordInput.disabled = true;
        testRestartButton.style.display = "inline-block";
        showResults();
    }
}

function getTestWords() {
    const nouns = ["Apple", "Banana", "Cherry"];
    const adjectives = ["Happy", "Sad", "Bright"];
    const verbs = ["Run", "Jump", "Eat"];
    const adverbs = ["Quickly", "Slowly", "Carefully"];
    testWords = [...nouns, ...adjectives, ...verbs, ...adverbs];
    testButtonChange("Game Start");
}

function checkTestMatch() {
    if (testWordInput.value.toLowerCase() === testWordDisplay.innerText.toLowerCase()) {
        testWordInput.value = "";
        testScore++;
        totalTypedEntries++;
        updateTestScore();
        displayNextWord();
    }
}

function countTestDown() {
    if (testTime > 0) {
        testTime--;
    } else {
        isTestPlaying = false;
        clearInterval(testTimeInterval);
        testWordInput.disabled = true;
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

function updateTestScore() {
    testScoreDisplay.innerText = testScore;
}

function displayNextWord() {
    const randomIndex = Math.floor(Math.random() * testWords.length);
    testWordDisplay.innerText = testWords[randomIndex];
}

function showResults() {
    const minutes = Test_Game_Time / 60;
    const wpm = totalTypedEntries / minutes;
    alert(`Time's up! Final Score: ${testScore} | Words Per Minute: ${wpm.toFixed(2)}`);
}
