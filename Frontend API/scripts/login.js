'use strict';
// import { btnStartShift } from "./app.js";
const btnStartShift = document.querySelector('.start');
const btnSubmitLogin = document.getElementById('submit-btn');
const message = document.querySelector('.message');
const loginContainer = document.querySelector('.login-container');
const navEl = document.querySelector("nav");
const footerEl = document.querySelector("footer");
let currentUser;

btnSubmitLogin.addEventListener('click', function (event) {
  event.preventDefault();

  const username = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const loginData = {
    username: username,
    password: password,
  };

  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer {token}',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        message.textContent = "Invalid credentials. Please try again!";
        message.classList.remove('hidden');
        throw new Error('Login failed');
      }
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      // Manejar la respuesta del servidor
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', data.content.token);
      // Redirigir al usuario a la página de inicio
      return fetch('http://localhost:3000/api/users/my-profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      if (data.content.employeeInfo.position === 'Manager') {
        window.location = 'admin.html';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

