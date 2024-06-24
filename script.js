let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', reset);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
        display.classList.remove('blink');
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
        display.classList.add('blink');
        running = false;
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(ms) {
    let milliseconds = parseInt((ms % 1000) / 10),
        seconds = parseInt((ms / 1000) % 60),
        minutes = parseInt((ms / (1000 * 60)) % 60),
        hours = parseInt((ms / (1000 * 60 * 60)) % 24);

    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    hours = (hours < 10) ? "0" + hours : hours;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function recordLap() {
    if (running) {
        let lapTime = formatTime(difference);
        laps.push(lapTime);
        updateLaps();
    }
}

function updateLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        let lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapElement);
    });
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
}

function reset() {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
    display.classList.remove('blink');
    running = false;
    difference = 0;
    display.textContent = '00:00:00.000';
    laps = [];
    updateLaps();
}
