'use strict';

import { users } from '/data/users.js';

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
const tableBodyEl = document.querySelector('.table-body');
const tableSection = document.querySelector('.table-section');
const timerEl = document.querySelector('.timer');
const departments = document.querySelector('.departments');

//Initial States
let intervalID;
let time = 0;

const startWorkTimer = function () {
  intervalID = setInterval(function () {
    const hours = String(Math.trunc(time / 3600)).padStart(2, '0');
    const minutes = String(Math.trunc((time % 3600) / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');

    if (time >= 3600) {
      timerEl.textContent = `${hours}:${minutes}:${sec}`;
    } else {
      timerEl.textContent = `${minutes}:${sec}`;
    }

    time++;
  }, 1000);
};

const stopWorkTimer = function (time) {
  intervalID = setInterval(function () {
    let displayTime = time;
    if (time < 0) {
      displayTime = Math.abs(time);
      timerEl.style.backgroundColor = 'red';
      timerEl.style.color = 'white';
    }

    const minutes = String(Math.trunc(displayTime / 60)).padStart(2, '0');
    const sec = String(displayTime % 60).padStart(2, '0');
    timerEl.textContent = `${minutes}:${sec}`;

    time--;
  }, 1000);
};

const stopTimer = function () {
  clearInterval(intervalID);
  timerEl.classList.add('hidden');
};

function stopWork() {
  //Use for break/lunch/coaching or training
  btnBreaks.classList.add('hidden');
  btnStartShift.classList.remove('hidden');
  btnStartShift.classList.add('btn-success');
  btnStartShift.textContent = 'Continue working';
}

const createTimeStampt = function (element) {
  let date = new Date();
  let formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const html = `<tr>
  <td class="text-center">${formattedDate}</td>
    <td class="text-center scope="row">${element}</td>
    </tr>`;

  tableBodyEl.insertAdjacentHTML('afterbegin', html);
};

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
    timerEl.classList.remove('hidden');
    tableSection.classList.remove('hidden');
    createTimeStampt('Started');
    btnStartShift.textContent = 'Pause';
    btnStartShift.classList.add('btn-warning');
    btnStartShift.classList.remove('btn-success');
    logoutEl.textContent = 'Stop Working';
    startWorkTimer();
  } else if (btnStartShift.textContent === 'Pause') {
    btnBreaks.classList.remove('hidden');
    btnStartShift.classList.add('hidden');
    btnStartShift.classList.remove('btn-warning');
  } else {
    stopTimer();
    startWorkTimer();
    createTimeStampt('Continue Working');
    btnBreaks.classList.remove('hidden');
    btnStartShift.classList.add('hidden');
    btnStartShift.classList.remove('btn-warning');
    timerEl.classList.remove('hidden');
  }
});

logoutEl.addEventListener('click', () => {
  if (logoutEl.textContent === 'Stop Working') {
    confirmationFormEl.classList.remove('hidden');
    btnStartShift.classList.add('hidden');
    btnBreaks.classList.add('hidden');
    clearInterval(intervalID);
    timerEl.classList.add('hidden');
  }
});
btnBreak.addEventListener('click', function () {
  clearInterval(intervalID);
  stopWork();
  createTimeStampt('Break');
  stopWorkTimer(900);
});

btnLunch.addEventListener('click', function () {
  clearInterval(intervalID);
  stopWork();
  createTimeStampt('Lunch');
  stopWorkTimer(1800);
});

btnCoachingTraining.addEventListener('click', function () {
  clearInterval(intervalID);
  stopWork();
  createTimeStampt('Coaching/Training');
  stopWorkTimer(1200);
});

btnStopWorking.addEventListener('click', () => {
  tableSection.classList.add('hidden');

  confirmationFormEl.classList.add('hidden');
  btnStartShift.textContent = 'Start';
  btnStartShift.classList.add('btn-success');
  btnStartShift.classList.remove('hidden');
  logoutEl.textContent = 'Logout';
  tableBodyEl.innerHTML = '';
});

departments.addEventListener('click', function (event) {
  fetch('http://localhost:3000/api/system/departments', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log('pin');
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});