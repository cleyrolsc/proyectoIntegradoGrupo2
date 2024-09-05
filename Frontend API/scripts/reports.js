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
const employeeInfo = document.getElementById('employee-info');
const logoutConfirmation = document.querySelector('.logout-confirmation');

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

//If not logged in, send user to login page

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault();
  if (!localStorage.getItem('isLoggedIn')) {
    // window.location = 'login.html';
  }
});
