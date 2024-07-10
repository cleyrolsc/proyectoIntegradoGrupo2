'use strict';

const btnApprove = document.querySelector('.approve');
const btnStartShift = document.querySelector('.start');
const disputeModal = document.querySelector('.dispute-modal');
const btnBreaks = document.querySelector('.non-working-buttons');
const logoutEl = document.querySelector('.logout');
const confirmationFormEl = document.querySelector('.confirmation-form');
const btnBreak = document.querySelector('.break');
const btnLunch = document.querySelector('.lunch');
const btnCoachingTraining = document.querySelector('.coaching-training');
const btnStopWorking = document.querySelector('.stop-working');
const btnEscalate = document.querySelector('.escalate');
const btnDispute = document.querySelector('.dispute');
const modalEl = document.getElementById('exampleModal');

btnApprove.addEventListener('click', () => {
  btnStartShift.classList.remove('hidden');
  disputeModal.classList.add('hidden');
});

btnEscalate.addEventListener('click', function (e) {
  e.preventDefault();
  disputeModal.classList.add('hidden');
  btnStartShift.classList.remove('hidden');
  modalEl.dispose();
});

btnStartShift.addEventListener('click', () => {
  if (btnStartShift.textContent === 'Start') {
    btnStartShift.textContent = 'Pause';
    btnStartShift.classList.add('btn-warning');
    btnStartShift.classList.remove('btn-success');
    logoutEl.textContent = 'Stop Working';
  } else {
    btnBreaks.classList.remove('hidden');
    btnStartShift.classList.add('hidden');
    btnStartShift.classList.remove('btn-warning');
  }
});

function stopWork() {
  //Use for break/lunch/coaching or training
  btnBreaks.classList.add('hidden');
  btnStartShift.classList.remove('hidden');
  btnStartShift.classList.add('btn-success');
  btnStartShift.textContent = 'Continue working';
}

logoutEl.addEventListener('click', () => {
  if (logoutEl.textContent === 'Stop Working') {
    confirmationFormEl.classList.remove('hidden');
    btnStartShift.classList.add('hidden');
    btnBreaks.classList.add('hidden');
  }
});
btnBreak.addEventListener('click', function () {
  stopWork();
});

btnLunch.addEventListener('click', function () {
  stopWork();
});

btnCoachingTraining.addEventListener('click', function () {
  stopWork();
});

btnStopWorking.addEventListener('click', () => {
  confirmationFormEl.classList.add('hidden');
  btnStartShift.textContent = 'Start';
  btnStartShift.classList.add('btn-success');
  btnStartShift.classList.remove('hidden');
  logoutEl.textContent = 'Logout';
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

// });
