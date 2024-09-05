'use strict';

const homeEl = document.querySelector('.home');
const reportsEl = document.querySelector('.reports');
// const disputesEl = document.querySelector('.disputes');
const userEl = document.querySelector('.user');
const logoutEl = document.querySelector('.logout');
const logoutConfirmation = document.querySelector('.logout-confirmation');
const confirmationFormEl = document.querySelector('.confirmation-form');
const nonWorkingBtn = document.querySelector('.non-working-buttons');
const btnStartShift = document.querySelector('.start');
const btnBreaks = document.querySelector('.non-working-buttons');


// Containers
const reportContainer = document.querySelector('.reports-container');
const loginContainer = document.querySelector('.login-container');
const homeContainer = document.querySelector('.home-container');
const userContainer = document.querySelector('.user-container');
const userModal = document.querySelector('.user-modal');

homeEl.addEventListener('click', () => {
    // nonWorkingBtn.classList.remove('hidden');
    homeContainer.classList.remove('hidden');
    userContainer.classList.add('hidden');
    userContainer.classList.remove('d-flex');
    userModal.classList.add('hidden');
    reportContainer.classList.add('hidden');
});

reportsEl.addEventListener('click', () => {
    reportContainer.classList.remove('hidden');
    userContainer.classList.add('hidden');
    userContainer.classList.remove('d-flex');
    userModal.classList.add('hidden');
    homeContainer.classList.add('hidden');
    homeContainer.classList.remove('d-flex');
});

userEl.addEventListener('click', () => {
    userContainer.classList.remove('hidden');
    userContainer.classList.add('d-flex');
    userModal.classList.remove('hidden');
    reportContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');
    homeContainer.classList.remove('d-flex');
});

