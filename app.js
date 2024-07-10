'use strict';

const btnApprove = document.querySelector('.approve');
const btnStartShift = document.querySelector('.start');
const disputeModal = document.querySelector('.dispute-modal');
const btnBreaks = document.querySelector('.non-working-buttons');
const logoutEl = document.querySelector('.logout');
const confirmationFormEl = document.querySelector('.confirmation-form');
// const btnStartShift = document.querySelector('.start-button');
// const timerEl = document.getElementById('timer');
// const btnBreak = document.querySelector('.break');
// const btnLunch = document.querySelector('.lunch');
// const btnCoachingTraining = document.querySelector('.coaching-training');

// const navList = document.querySelector('.nav-list');

btnApprove.addEventListener('click', () => {
  btnStartShift.classList.remove('hidden');
  disputeModal.classList.add('hidden');
});

btnStartShift.addEventListener('click', () => {
  if (btnStartShift.textContent === 'Start') {
    btnStartShift.textContent = 'Pause';
    btnStartShift.style.backgroundColor = '#e3dc19';
    logoutEl.textContent = 'Stop Working';
  } else {
    btnBreaks.classList.remove('hidden');
    btnStartShift.classList.add('hidden');
  }
});

logoutEl.addEventListener('click', () => {
  confirmationFormEl.classList.remove('hidden');
});
// let timerId;
// let seconds = 0;
// let minutes = 0;
// let hours = 0;
// const btnstart = document.getElementById("mainbtn");
// const paused = document.getElementById("paused");
// const timer = document.getElementById("timer");

// function pad(number) {
//   return number < 10 ? "0" + number : number;
// }

// function updateTimer() {
//   seconds++;
//   if (seconds >= 60) {
//     seconds = 0;
//     minutes++;
//     if (minutes >= 60) {
//       minutes = 0;
//       hours++;
//     }
//   }
//   timer.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
// }

// btnstart.addEventListener("click", () => {
//   if (btnstart.textContent == "Start") {
//     btnstart.style.backgroundColor = "rgb(255, 193, 7)";
//     btnstart.textContent = "Pause";
//     timer.style.display = "block";
//     timerId = setInterval(updateTimer, 1000);
//   } else if (btnstart.textContent == "Pause") {
//     paused.style.display = "block";
//     btnstart.style.display = "none";
//     clearInterval(timerId);
//   }
// });

// const btnStartShift = document.querySelector('.start-button');
// const timerEl = document.getElementById('timer');
// const btnBreaks = document.querySelector('.non-working-buttons');
// const btnBreak = document.querySelector('.break');
// const btnLunch = document.querySelector('.lunch');
// const btnCoachingTraining = document.querySelector('.coaching-training');
// const logoutEl = document.querySelector('.logout');
// const navList = document.querySelector('.nav-list');
// const confirmationFormEl = document.querySelector('.confirmation-form');

// logoutEl.addEventListener('click', function (event) {
//   event.preventDefault();
//   // disputeModalEl.style.display = 'none';
//   confirmationFormEl.style.display = 'flex';
//   document.querySelector('body').classList.add('overlay');
//   btnStartShift.classList.add('hidden');
//   navList.classList.add('hidden');
//   btnBreaks.classList.add('hidden');

//   // disputeFormEl.classList.remove('hidden');
// });

// btnStartShift.addEventListener('click', function () {
//   if (btnStartShift.textContent === 'Pause') {
//     btnBreaks.classList.remove('hidden');
//     btnStartShift.classList.add('hidden');
//   }
//   logoutEl.textContent = 'Stop working';
//   btnStartShift.style.backgroundColor = '#ffc107';
//   btnStartShift.textContent = 'Pause';
// });

// btnBreak.addEventListener('click', function () {
//   btnBreaks.classList.add('hidden');
//   btnStartShift.classList.remove('hidden');
//   btnStartShift.textContent = 'Continue working';
//   btnStartShift.style.backgroundColor = '#198754';
// });

// btnLunch.addEventListener('click', function () {
//   btnBreaks.classList.add('hidden');
//   btnStartShift.classList.remove('hidden');
//   btnStartShift.textContent = 'Continue working';
//   btnStartShift.style.backgroundColor = '#198754';
// });

// btnCoachingTraining.addEventListener('click', function () {
//   btnBreaks.classList.add('hidden');
//   btnStartShift.classList.remove('hidden');
//   btnStartShift.textContent = 'Continue working';
//   btnStartShift.style.backgroundColor = '#198754';
// });
