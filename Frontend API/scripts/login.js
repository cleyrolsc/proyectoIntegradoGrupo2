'use strict';
import { users } from '/data/users.js';

const btnSubmitLogin = document.getElementById('submit-btn');
const emailInput = document.querySelector('.email');
const passwordInput = document.getElementById('password');

let currentUser;

btnSubmitLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form submission

  currentUser = users.find((user) => user.email === emailInput.value);

  if (currentUser?.email !== emailInput.value) {
    console.log('Invalid email address');
  } else {
    if (currentUser?.password === passwordInput.value) {
      // Redirect to the index page only if the password is correct
      window.location.href = '/templates/index.html';
    } else {
      // Handle incorrect password (e.g., show an error message)
      console.log('Incorrect password');
    }
  }
});

export { currentUser };
