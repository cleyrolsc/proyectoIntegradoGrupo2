'use strict';

// -------------------------------

const startBtn = document.querySelector('.start');
const timerEl = document.querySelector('.timer');
const breakCoachingSection = document.querySelector('.break-coaching-buttons');
const coachingTraining = document.querySelector('.coaching-training');
const breakTime = document.querySelector('.break');
const lunchTime = document.querySelector('.lunch');
const timeStampTable = document.querySelector('.time-stamp-container');
const tableStamp = document.querySelector('.table-body-stamp');
const logout = document.querySelector('.logout');
const employeeInfo = document.querySelector('.employee-info');

let timerInterval;
let elapsedTime = 0; // For countup timer
let remainingTime = 0; // For countdown timer

// Restore the state on page load, including UI state
window.addEventListener('load', () => {
    localStorage.getItem('isLoggedIn');
    localStorage.getItem('token');
    const storedState = localStorage.getItem('timerState');
    if (storedState) {
        const { mode, time, buttonState, breakCoachingSectionVisible, timerVisible, timestampRecords, logoutText } = JSON.parse(storedState);

        if (timestampRecords) {
            tableStamp.innerHTML = timestampRecords; // Restore the entire table body content
            timeStampTable.classList.remove('hidden'); // Make sure the table is visible
        }

        // Restore button state
        startBtn.textContent = buttonState.textContent;
        startBtn.className = ''; // Reset classes
        buttonState.classList.forEach(cls => startBtn.classList.add(cls)); // Restore saved classes

        // Restore visibility of sections
        if (breakCoachingSectionVisible) {
            breakCoachingSection.classList.remove('hidden');
        } else {
            breakCoachingSection.classList.add('hidden');
        }
        if (timerVisible) {
            timerEl.classList.remove('hidden');
        } else {
            timerEl.classList.add('hidden');
        }

        // Restore logout button text
        logout.textContent = logoutText;

        // Restore timer functionality based on mode
        if (mode === 'countup') {
            startCountupTimer(time); // Resume countup
        } else if (mode === 'countdown') {
            startCountdownTimer(time / 60); // Resume countdown
        }
    }
});

// Save the current state in localStorage, including UI state
function saveState(mode, time) {
    localStorage.setItem('timerState', JSON.stringify({
        mode,
        time,
        buttonState: {
            textContent: startBtn.textContent,
            classList: [...startBtn.classList]
        },
        breakCoachingSectionVisible: !breakCoachingSection.classList.contains('hidden'),
        timerVisible: !timerEl.classList.contains('hidden'),
        timestampRecords: tableStamp.innerHTML, // Save the entire table body content as HTML
        logoutText: logout.textContent
    }));
}

const eventIds = [];

// Event listeners
startBtn.addEventListener('click', () => {
    if (startBtn.textContent === 'Start') {
        eventIds[0] = 1;
        timerEl.classList.remove('hidden');
        startCountupTimer();
        timeStampTable.classList.remove('hidden');
        startBtn.classList.remove('btn-success');
        startBtn.classList.add('btn-warning');
        startBtn.textContent = "Pause";
        logout.textContent = "Stop Working";
        createTimeStamp("Started");


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

    } else if (startBtn.textContent === "Pause") {
        startBtn.classList.add('hidden');
        breakCoachingSection.classList.remove('hidden');
    } else {
        startCountupTimer();
        startBtn.textContent = "Pause";
        startBtn.classList.remove('btn-success');
        startBtn.classList.add('btn-warning');
        createTimeStamp("Continue Working");
    }
    saveState('countup', elapsedTime); // Save countup state
});

breakTime.addEventListener('click', () => {
    startCountdownTimer(15);
    startBtn.classList.remove('hidden');
    startBtn.classList.add('btn-success');
    startBtn.classList.remove('btn-warning');
    startBtn.textContent = "Continue Working";
    breakCoachingSection.classList.add('hidden');
    createTimeStamp("Break");
    saveState('countdown', remainingTime); // Save countdown state
});

lunchTime.addEventListener('click', () => {
    startCountdownTimer(30);
    startBtn.classList.remove('hidden');
    startBtn.classList.add('btn-success');
    startBtn.classList.remove('btn-warning');
    startBtn.textContent = "Continue Working";
    breakCoachingSection.classList.add('hidden');
    createTimeStamp("Lunch");
    saveState('countdown', remainingTime); // Save countdown state
});

coachingTraining.addEventListener('click', () => {
    startCountdownTimer(20);
    startBtn.classList.remove('hidden');
    startBtn.classList.add('btn-success');
    startBtn.classList.remove('btn-warning');
    startBtn.textContent = "Continue Working";
    breakCoachingSection.classList.add('hidden');
    createTimeStamp("Coaching / Training");
    saveState('countdown', remainingTime); // Save countdown state
});

// Timer function

// Function to start the countup timer
function startCountupTimer(savedTime = 0) {
    elapsedTime = savedTime;
    clearInterval(timerInterval); // Clear any existing timer

    timerInterval = setInterval(() => {
        elapsedTime += 1;
        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;
        updateTimerDisplay(hours, minutes, seconds);
        saveState('countup', elapsedTime); // Continuously save state
    }, 1000);
}

// Function to start the countdown timer
function startCountdownTimer(breakDuration) {
    remainingTime = breakDuration * 60; // Convert minutes to seconds
    clearInterval(timerInterval); // Clear any existing timer

    timerInterval = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            alert("Break time is over!");
            return;
        }

        remainingTime -= 1;
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        updateTimerDisplay(hours, minutes, seconds);
        saveState('countdown', remainingTime); // Continuously save state
    }, 1000);
}

// Update the timer display (same element for both countup and countdown)
function updateTimerDisplay(hours, minutes, seconds) {
    const hoursDisplay = hours < 10 ? `0${hours}` : hours;
    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    timerEl.textContent = `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
}

// Create a timestamp
function createTimeStamp(element) {
    let date = new Date();
    let formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    const html = `<tr><td class="text-center">${formattedDate}</td> <td class="text-center" scope="row">${element}</td></tr>`;

    tableStamp.insertAdjacentHTML('afterbegin', html);
    saveState('countup', elapsedTime); // Save state after adding timestamp
}


//Helper functions

//Capitalize

function capitalizeFirstLetter(word) {
    if (!word) return ''; // Check for empty string
    return `${word.charAt(0).toUpperCase() + word.slice(1)} `;
}

//Format ID

function formatId(number) {
    return `NTG${number.toString().padStart(4, '0')}`;
}

//Render employee
const renderEmployeeInfo = function (userCapitalize, formattedId) {
    employeeInfo.textContent = `${userCapitalize} - ${formattedId}`;
};
//Fetch

fetch('http://localhost:3000/api/users/my-profile', {
    method: 'GET',
    headers: {
        "authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
})
    .then((response) => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    })
    .then((data) => {
        // console.log(data);
        const userCapitalize = capitalizeFirstLetter(
            data.content.employeeInfo.firstName
        );
        const formattedId = formatId(data.content.employeeInfo.employeeId);
        renderEmployeeInfo(userCapitalize, formattedId);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

//If not logged in, send user to login page

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    if (!localStorage.getItem('isLoggedIn')) {
        // window.location = 'login.html';
    }
});
