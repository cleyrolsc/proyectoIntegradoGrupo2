const register = document.querySelector(".register")
register.addEventListener("click", registerUser)



function registerUser() {
    // Collect form data
    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        identificationNumber: document.getElementById("identificationNumber").value,
        payPerHour: parseFloat(document.getElementById("payPerHour").value),
        supervisor: parseInt(document.getElementById("supervisor").value),
        type: parseInt(document.getElementById("type").value),
        privilege: document.getElementById("privilege").value,
        department: parseInt(document.getElementById("department").value),
        position: parseInt(document.getElementById("position").value)
    };
console.log(JSON.stringify(data))
    // Send a POST request
    fetch('http://localhost:3000/api/admin/register-user', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Or handle a success message
        }
        throw new Error('Something went wrong');
    })
    .then(data => {
        console.log('Success:', data);
        console.log('User registered successfully!');
        // console.log(data.content.items)
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error registering user.');
    });
}
