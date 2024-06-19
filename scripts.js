/* scripts.js */
let startTime, updatedTime, difference, tInterval;
let running = false;
let savedTime = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const resetLapsBtn = document.getElementById('resetLapsBtn');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
resetLapsBtn.addEventListener('click', resetLaps);

function start() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    savedTime = 0;
}

function resetLaps() {
    laps.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.innerHTML;
        laps.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    display.innerHTML = hours + ':' + minutes + ':' + seconds;
}
