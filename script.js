const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;
let timeouts = [];
let isPlayingSequence = false;

const startButton = document.getElementById('start');
const statusDisplay = document.getElementById('status');
const colorButtons = document.querySelectorAll('.color-button');

startButton.addEventListener('click', startGame);

colorButtons.forEach(button => {
    button.addEventListener('click', event => {
        if (!isPlayingSequence) {
            const color = event.target.id;
            playerSequence.push(color);
            flashButton(color);
            checkPlayerSequence();
        }
    });
});

function startGame() {
    clearTimeouts();
    sequence = [];
    playerSequence = [];
    level = 0;
    statusDisplay.textContent = 'Game Started!';
    startButton.textContent = 'Restart';
    nextLevel();
}

function nextLevel() {
    level++;
    playerSequence = [];
    statusDisplay.textContent = `Level ${level}`;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    playSequence();
}

function playSequence() {
    isPlayingSequence = true;
    let delay = 0;
    sequence.forEach((color, index) => {
        const timeout = setTimeout(() => {
            flashButton(color);
            if (index === sequence.length - 1) {
                isPlayingSequence = false;
            }
        }, delay);
        timeouts.push(timeout);
        delay += 1000;
    });
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

function checkPlayerSequence() {
    const currentLevel = playerSequence.length;
    if (playerSequence[currentLevel - 1] !== sequence[currentLevel - 1]) {
        statusDisplay.textContent = 'Game Over! Try Again!';
        startButton.textContent = 'Start';
        return;
    }
    if (playerSequence.length === sequence.length) {
        setTimeout(nextLevel, 1000);
    }
}

function clearTimeouts() {
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];
}

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});