'use strict';
const btnStartShift = document.querySelector('.start');


// -------------------------------
const btnApprove = document.querySelector('.approve');

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
const employeeInfo = document.getElementById('employee-info');
const logoutConfirmation = document.querySelector('.logout-confirmation');

//Initial States
let intervalID;
let time = 0;
let workStatus;

// 

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

    localStorage.setItem('timerState', {
      isRunning: true,
      time: time,
      buttonState: 'running',
      timerVisibility: timerEl.classList.contains('hidden'),
      tableVisibility: tableSection.classList.contains('hidden')
    });


    // const events = {

    //   "eventIds": [
    //     1
    //   ]

    // };

    // fetch('http://localhost:3000/api/schedules/register-my-hours', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     'Content-Type': 'application/json',
    //   },

    //   body: JSON.stringify(events),
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log('Success:', data);

    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });



  } else if (btnStartShift.textContent === 'Pause') {
    btnBreaks.classList.remove('hidden');
    btnStartShift.classList.add('hidden');
    btnStartShift.classList.remove('btn-warning');
    localStorage.setItem('timerState', {
      isRunning: false,
      time: time,
      buttonState: 'paused',
      timerVisibility: timerEl.classList.contains('hidden'),
      tableVisibility: tableSection.classList.contains('hidden')
    });

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

function startWorkTimer() {
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

function stopWorkTimer(time) {
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

function stopTimer() {
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

function createTimeStampt(element) {
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



logoutEl.addEventListener('click', () => {
  if (logoutEl.textContent === 'Stop Working') {
    confirmationFormEl.classList.remove('hidden');
    btnStartShift.classList.add('hidden');
    btnBreaks.classList.add('hidden');
    clearInterval(intervalID);
    timerEl.classList.add('hidden');
  } else if (logoutEl.textContent === 'Logout') {
    localStorage.clear();
    loginFormEl.classList.remove('hidden');
  }
});

logoutConfirmation.addEventListener('click', function (e) {
  localStorage.clear();
  // window.location = 'login.html';
});

btnBreak.addEventListener('click', function () {
  clearInterval(intervalID);
  stopWork();
  createTimeStampt('Break');
  stopWorkTimer(900);

  const events = {

    "eventIds": [
      2, 3
    ]

  };


  fetch('http://localhost:3000/api/schedules/register-my-hours', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(events),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);

    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

btnLunch.addEventListener('click', function () {
  clearInterval(intervalID);
  stopWork();
  createTimeStampt('Lunch');
  stopWorkTimer(1800);

  const events = {

    "eventIds": [
      2, 3
    ]

  };


  fetch('http://localhost:3000/api/schedules/register-my-hours', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(events),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);

    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

btnCoachingTraining.addEventListener('click', function () {
  clearInterval(intervalID);
  stopWork();
  createTimeStampt('Coaching/Training');
  stopWorkTimer(1200);

  const events = {

    "eventIds": [
      2, 3
    ]

  };


  fetch('http://localhost:3000/api/schedules/register-my-hours', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(events),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);

    })
    .catch((error) => {
      console.error('Error:', error);
    });
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
    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    console.log(data);
    const userCapitalize = capitalizeFirstLetter(
      data.content.employeeInfo.firstName
    );
    const formattedId = formatId(data.content.employeeInfo.employeeId);
    renderEmployeeInfo(userCapitalize, formattedId);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// departments.addEventListener('click', function (event) {
//   fetch('http://localhost:3000/api/system/departments', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => {
//       console.log('pin');
//       if (!response.ok) {
//         throw new Error();
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// });
