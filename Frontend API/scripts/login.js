'use strict';
import { users } from '/data/users.js';

const btnSubmitLogin = document.getElementById('submit-btn');

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
      console.log('pin');
      if (!response.ok) {
        throw new Error('Login failed');
      }
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      // Manejar la respuesta del servidor
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', data.content.token);
      // document.getElementById('loginMessage').textContent = 'Login successful!';
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
      console.log(data);
      if (data.content.employeeInfo.position === 'Manager') {
        window.location = 'admin.html';
      } else {
        window.location = 'index.html';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

// localStorage.clear();
