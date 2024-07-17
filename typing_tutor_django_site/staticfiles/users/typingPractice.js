document.addEventListener('DOMContentLoaded', function() {
    const originalText = document.getElementById('originalText').innerText.trim();
    document.getElementById('highlightedText').innerHTML = originalText.split('').map(char => `<span>${char}</span>`).join('');
});

function highlightText() {
    const originalText = document.getElementById('originalTextHidden').value.trim();
    const userInput = document.getElementById('userInput').value.trim();
    const originalChars = originalText.split('');
    const userChars = userInput.split('');
    let correctChars = 0;

    const highlightedText = originalChars.map((char, index) => {
        if (index < userChars.length) {
            if (char === userChars[index]) {
                correctChars++;
                return `<span class="highlight-correct">${char}</span>`;
            } else {
                return `<span class="highlight-wrong">${char}</span>`;
            }
        } else {
            return `<span>${char}</span>`;
        }
    }).join('');

    document.getElementById('highlightedText').innerHTML = highlightedText;

    const wpm = Math.round((userChars.length / 5) / (document.getElementById('userInput').value.length / 60));
    const accuracy = Math.round((correctChars / userChars.length) * 100);

    document.getElementById('speed').innerText = `Speed: ${wpm} WPM`;
    document.getElementById('accuracy').innerText = `Accuracy: ${accuracy}%`;
}
