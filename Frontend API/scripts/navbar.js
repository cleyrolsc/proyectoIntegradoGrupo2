'use strict';

const reportBtn = document.querySelector('.report');
const homeBtn = document.querySelector('.home');
const userBtn = document.querySelector('.user');


//Section Containers
const homeContainer = document.querySelector('.home-container');
const userContainer = document.querySelector('.user-container');
const reportsContainer = document.querySelector('.reports-container');
const userModal = document.querySelector('.user-modal');

const logout = document.querySelector('.logout');
const confirmationFormEl = document.querySelector('.confirmation-form');
const startBtn = document.querySelector('.start');
const breakCoachingSection = document.querySelector('.break-coaching-buttons');
const timerEl = document.querySelector('.timer');
const tableStamp = document.querySelector('.table-body-stamp');
const timeStampTable = document.querySelector('.time-stamp-container');
const logoutConfirm = document.querySelector('.logout-confirmation');
const stopWorking = document.querySelector('.stop-working');

reportBtn.addEventListener('click', () => {
    homeContainer.classList.add('hidden');
    homeContainer.classList.remove('d-flex');
    reportsContainer.classList.add('d-flex');
    reportsContainer.classList.remove('hidden');
    userContainer.classList.add('hidden');
    userContainer.classList.remove('d-flex');
    userModal.classList.add('hidden');

});

homeBtn.addEventListener('click', () => {
    homeContainer.classList.remove('hidden');
    homeContainer.classList.add('d-flex');
    reportsContainer.classList.remove('d-flex');
    reportsContainer.classList.add('hidden');
    userContainer.classList.add('hidden');
    userContainer.classList.remove('d-flex');
    userModal.classList.add('hidden');
});

userBtn.addEventListener('click', () => {
    userContainer.classList.remove('hidden');
    userContainer.classList.add('d-flex');
    reportsContainer.classList.remove('d-flex');
    reportsContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');
    homeContainer.classList.remove('d-flex');
    userModal.classList.remove('hidden');
});

logout.addEventListener('click', () => {
    if (logout.textContent === 'Stop Working') {
        confirmationFormEl.classList.remove('hidden');
        startBtn.classList.add('hidden');
        breakCoachingSection.classList.add('hidden');
        timerEl.classList.add('hidden');
        timeStampTable.classList.add('hidden');

    } else if (logout.textContent === 'Logout') {
        localStorage.clear();
        window.location = "login.html";
    }
});

stopWorking.addEventListener('click', () => {
    timeStampTable.classList.add('hidden');
    confirmationFormEl.classList.add('hidden');
    startBtn.textContent = 'Start';
    startBtn.classList.add('btn-success');
    startBtn.classList.remove('btn-warning');
    startBtn.classList.remove('hidden');
    logout.textContent = 'Logout';
    tableStamp.innerHTML = '';
    localStorage.removeItem("timerState");

    const eventIds = [];
    eventIds[0] = 2;
    eventIds[1] = 1;
    fetch('http://localhost:3000/api/schedules/register-my-hours', {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            eventIds: eventIds
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

logoutConfirm.addEventListener('click', () => {
    localStorage.clear();
    window.location = 'login.html';
});