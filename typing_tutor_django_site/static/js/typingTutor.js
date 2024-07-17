let startTime;
let timerInterval;
let timerStarted = false;
let shiftPressed = false;

function processText(text) {
    const sentences = text.split(/(?<=[.!?])\s+/);
    return sentences.join(' ') + (sentences[sentences.length - 1].endsWith('.') ? '' : '.');
}

function highlightText(userInput) {
    const originalText = document.getElementById('originalText').value;
    const words = originalText.split('');
    const userWords = userInput.split('');

    let highlightedText = '';
    let correctChars = 0;

    for (let i = 0; i < words.length; i++) {
        if (i < userWords.length) {
            if (words[i] === userWords[i]) {
                highlightedText += '<span class="highlight-correct">' + words[i] + '</span>';
                correctChars++;
            } else {
                highlightedText += '<span class="highlight-wrong">' + words[i] + '</span>';
            }
        } else {
            highlightedText += '<span class="highlight-incomplete">' + words[i] + '</span>';
        }
    }
    document.getElementById('text').innerHTML = highlightedText;

    const accuracy = userWords.length > 0 ? (correctChars / userWords.length) * 100 : 0;
    const elapsedTime = (new Date().getTime() - startTime) / 60000; // time in minutes
    const wpm = (userWords.length / 5) / elapsedTime;

    document.getElementById('accuracy').innerText = `Accuracy: ${accuracy.toFixed(2)}%`;
    document.getElementById('speed').innerText = `Speed: ${wpm.toFixed(2)} WPM`;
}

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = (new Date().getTime() - startTime) / 1000; // time in seconds
    document.getElementById('timer').innerText = `Timer: ${elapsedTime.toFixed(0)}s`;
}

function highlightKey(key) {
    const keyHighlight = document.getElementById('key-highlight');
    const keyCoordinates = {
        '`': { x: 82, y: 160, width: 90, height: 90 },
        '1': { x: 195, y: 160, width: 90, height: 90 },
        '2': { x: 308, y: 160, width: 90, height: 90 },
        '3': { x: 420, y: 160, width: 90, height: 90 },
        '4': { x: 534, y: 160, width: 90, height: 90 },
        '5': { x: 648, y: 160, width: 90, height: 90 },
        '6': { x: 762, y: 160, width: 90, height: 90 },
        '7': { x: 875, y: 160, width: 90, height: 90 },
        '8': { x: 989, y: 160, width: 90, height: 90 },
        '9': { x: 1102, y: 160, width: 90, height: 90 },
        '0': { x: 1215, y: 160, width: 90, height: 90 },
        '-': { x: 1328, y: 160, width: 90, height: 90 },
        '=': { x: 1442, y: 160, width: 90, height: 90 },
        'p': { x: 1285, y: 270, width: 90, height: 90 },
        'q': { x: 260, y: 270, width: 90, height: 90 },
        'w': { x: 375, y: 270, width: 90, height: 90 },
        'e': { x: 490, y: 270, width: 90, height: 90 },
        'r': { x: 603, y: 270, width: 90, height: 90 },
        't': { x: 715, y: 270, width: 90, height: 90 },
        'y': { x: 830, y: 270, width: 90, height: 90 },
        'u': { x: 943, y: 270, width: 90, height: 90 },
        'i': { x: 1057, y: 270, width: 90, height: 90 },
        'o': { x: 1170, y: 270, width: 90, height: 90 },
        'p': { x: 1285, y: 270, width: 90, height: 90 },
        '[': { x: 1398, y: 270, width: 90, height: 90 },
        ']': { x: 1512, y: 270, width: 90, height: 90 },
        '\\': { x: 1625, y: 270, width: 90, height: 90 },
        'a': { x: 310, y: 380, width: 90, height: 90 },
        's': { x: 423, y: 380, width: 90, height: 90 },
        'd': { x: 536, y: 380, width: 90, height: 90 },
        'f': { x: 650, y: 380, width: 90, height: 90 },
        'g': { x: 765, y: 380, width: 90, height: 90 },
        'h': { x: 880, y: 380, width: 90, height: 90 },
        'j': { x: 995, y: 380, width: 90, height: 90 },
        'k': { x: 1110, y: 380, width: 90, height: 90 },
        'l': { x: 1223, y: 380, width: 90, height: 90 },
        ';': { x: 1338, y: 380, width: 90, height: 90 },
        'z': { x: 343, y: 487, width: 90, height: 90 },
        'x': { x: 455, y: 487, width: 90, height: 90 },
        'c': { x: 569, y: 487, width: 90, height: 90 },
        'v': { x: 683, y: 487, width: 90, height: 90 },
        'b': { x: 797, y: 487, width: 90, height: 90 },
        'n': { x: 910, y: 487, width: 90, height: 90 },
        'm': { x: 1024, y: 487, width: 90, height: 90 },
        ',': { x: 1139, y: 487, width: 90, height: 90 },
        '.': { x: 1254, y: 487, width: 90, height: 90 },
        '/': { x: 1367, y: 487, width: 90, height: 90 },
        ' ': { x: 534, y: 595, width: 832, height: 90 },
        'backspace': { x: 1554, y: 160, width: 166, height: 90 },
        'enter': { x: 1554, y: 380, width: 166, height: 90 },
        'shift': { x: 82, y: 487, width: 237, height: 90 },
        'shiftright': { x: 1480, y: 487, width: 237, height: 90 },
        'capslock': { x: 82, y: 380, width: 207, height: 90 },
        'Q': { x: 260, y: 270, width: 90, height: 90 },
        'W': { x: 375, y: 270, width: 90, height: 90 },
        'E': { x: 490, y: 270, width: 90, height: 90 },
        'R': { x: 603, y: 270, width: 90, height: 90 },
        'T': { x: 715, y: 270, width: 90, height: 90 },
        'Y': { x: 830, y: 270, width: 90, height: 90 },
        'U': { x: 943, y: 270, width: 90, height: 90 },
        'I': { x: 1057, y: 270, width: 90, height: 90 },
        'O': { x: 1170, y: 270, width: 90, height: 90 },
        'P': { x: 1285, y: 270, width: 90, height: 90 },
        '{': { x: 1398, y: 270, width: 90, height: 90 },
        '}': { x: 1512, y: 270, width: 90, height: 90 },
        '|': { x: 1625, y: 270, width: 140, height: 90 },
        'A': { x: 310, y: 380, width: 90, height: 90 },
        'S': { x: 423, y: 380, width: 90, height: 90 },
        'D': { x: 536, y: 380, width: 90, height: 90 },
        'F': { x: 650, y: 380, width: 90, height: 90 },
        'G': { x: 765, y: 380, width: 90, height: 90 },
        'H': { x: 880, y: 380, width: 90, height: 90 },
        'J': { x: 995, y: 380, width: 90, height: 90 },
        'K': { x: 1110, y: 380, width: 90, height: 90 },
        'L': { x: 1223, y: 380, width: 90, height: 90 },
        ':': { x: 1338, y: 380, width: 90, height: 90 },
        'Z': { x: 343, y: 487, width: 90, height: 90 },
        'X': { x: 455, y: 487, width: 90, height: 90 },
        'C': { x: 569, y: 487, width: 90, height: 90 },
        'V': { x: 683, y: 487, width: 90, height: 90 },
        'B': { x: 797, y: 487, width: 90, height: 90 },
        'N': { x: 910, y: 487, width: 90, height: 90 },
        'M': { x: 1024, y: 487, width: 90, height: 90 },
        '<': { x: 1139, y: 487, width: 90, height: 90 },
        '>': { x: 1254, y: 487, width: 90, height: 90 },
        '?': { x: 1367, y: 487, width: 90, height: 90 }
    };
    if (keyCoordinates[key.toLowerCase()]) {
        const coords = keyCoordinates[key.toLowerCase()];
        keyHighlight.style.left = coords.x/1.89 + 'px';
        keyHighlight.style.top = coords.y/1.9 + 'px';
        keyHighlight.style.width = coords.width/1.8 + 'px';
        keyHighlight.style.height = coords.height/1.8 + 'px';
        keyHighlight.style.display = 'block';
    } else {
        keyHighlight.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const originalText = document.getElementById('text').innerText;
    const processedText = processText(originalText);
    document.getElementById('text').innerText = processedText;
    document.getElementById('originalText').value = processedText;

    document.addEventListener('keydown', function (event) {
        const userInputElement = document.getElementById('userInput');
        if (!timerStarted && event.key.length === 1) {
            timerStarted = true;
            startTimer();
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            clearInterval(timerInterval);
            document.querySelector('form').submit();
        } else if (event.key === 'Backspace') {
            userInputElement.value = userInputElement.value.slice(0, -1);
        } else if (event.key === 'Shift') {
            shiftPressed = true;
        } else if (event.key.length === 1) {
            userInputElement.value += shiftPressed ? event.key.toUpperCase() : event.key;
        }
        highlightText(userInputElement.value);
        highlightKey(event.key === 'Shift' ? (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT ? 'shiftright' : 'shift') : event.key);
    });

    document.addEventListener('keyup', function (event) {
        const keyHighlight = document.getElementById('key-highlight');
        keyHighlight.style.display = 'none';

        if (event.key === 'Shift') {
            shiftPressed = false;
        }
    });
});
