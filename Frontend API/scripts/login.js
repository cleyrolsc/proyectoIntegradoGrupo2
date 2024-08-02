'use strict';
import { users } from '/data/users.js';

const btnSubmitLogin = document.getElementById('submit-btn');

let currentUser;

btnSubmitLogin.addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const loginData = {
    email: email,
    password: password,
  };

  fetch('https://yourserver.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then((data) => {
      // Manejar la respuesta del servidor
      console.log(data);
      document.getElementById('loginMessage').textContent = 'Login successful!';

      // Redirigir al usuario a la página de inicio
      window.location.href = 'https://yourserver.com/home';
    })
    .catch((error) => {
      console.error('Error:', error);
      document.getElementById('loginMessage').textContent =
        'Login failed. Please try again.';
    });
});
