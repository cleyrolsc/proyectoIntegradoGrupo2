"use strict";
let timerId;
let seconds = 0;
let minutes = 0;
let hours = 0;
const btnstart = document.getElementById("mainbtn");
const paused = document.getElementById("paused");
const timer = document.getElementById("timer");

function pad(number) {
  return number < 10 ? "0" + number : number;
}

function updateTimer() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  timer.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

btnstart.addEventListener("click", () => {
  if (btnstart.textContent == "Start") {
    btnstart.style.backgroundColor = "rgb(255, 193, 7)";
    btnstart.textContent = "Pause";
    timer.style.display = "block";
    timerId = setInterval(updateTimer, 1000);
  } else if (btnstart.textContent == "Pause") {
    paused.style.display = "block";
    btnstart.style.display = "none";
    clearInterval(timerId);
  }
});
