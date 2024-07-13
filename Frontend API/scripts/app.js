'use strict';

import { users } from '/data/users.js';
import { currentUser } from './login';

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
