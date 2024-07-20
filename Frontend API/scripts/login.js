'use strict';
import { users } from '/data/users.js';

const btnSubmitLogin = document.getElementById('submit-btn');

let currentUser;

btnSubmitLogin.addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('email');
  const password = document.getElementById('password');

  const loginData = {
    username: username,
    password: password,
  };

  fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      console.log('pin');
      if (!response.ok) {
        throw new Error('Login failed');
      }
      console.log(response);
      return response.json();
    })
    .then((data) => {
      // Manejar la respuesta del servidor
      console.log(data);
      document.getElementById('loginMessage').textContent = 'Login successful!';

      // Redirigir al usuario a la página de inicio
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById('loginMessage').textContent =
        'Login failed. Please try again.';
    });
});
