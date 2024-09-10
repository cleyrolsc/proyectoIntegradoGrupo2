const register = document.querySelector(".register");
register.addEventListener("click", registerUser);
const tableBodyEl = document.querySelector('.table-users');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageIndicator = document.getElementById('pageIndicator');


function registerUser() {
    // Collect form data
    const data = {
        employeeId: document.getElementById("identificationNumber").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        payPerHour: parseFloat(document.getElementById("payPerHour").value),
        supervisor: document.getElementById("supervisor").value,
        type: parseInt(document.getElementById("type").value),
        privilege: document.getElementById("privilege").value,
        department: parseInt(document.getElementById("department").value),
        position: parseInt(document.getElementById("position").value),
    };

    // console.log(JSON.stringify(data));



    // Send a POST request
    fetch('http://localhost:3000/api/admin/register-user', {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`,
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



// fetch('http://localhost:3000/api/system/employees?page=1&pageSize=12', {
//     method: 'GET',
//     headers: {
//         "authorization": `Bearer ${localStorage.getItem('token')}`,
//         'Content-Type': 'application/json',
//     },
//     // body: JSON.stringify(data)
// })
//     .then(response => {
//         if (response.ok) {
//             return response.json(); // Or handle a success message
//         }
//         throw new Error('Something went wrong');
//     })
//     .then(data => {console.log(data)
//         // let html = '';
//         // for (let i = 0; i < data.content.items.length; i++) {
//         //     html += ` <tr>
//         // <td class="text-center">${data.content.items[i].username}</td>
//         // <td class="text-center">${data.content.items[i].employeeId.toString().padStart(4, '0')}</td>
//         // <td class="text-center"><button>Edit</button></td>
//         // </tr>`;
//         // }
//         // // console.log(data.content.items)

//         // tableBodyEl.insertAdjacentHTML("beforebegin", html);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         console.log('Error registering user.');
//     });

// fetch('http://localhost:3000/api/system/employees?page=1&pageSize=5', {
//     method: 'GET',
//     headers: {
//         "authorization": `Bearer ${localStorage.getItem('token')}`,
//         'Content-Type': 'application/json',
//     },
//     // body: JSON.stringify(data)
// })
//     .then(response => {
//         if (response.ok) {
//             return response.json(); // Or handle a success message
//         }
//         throw new Error('Something went wrong');
//     })
//     .then(data => {
//         let html = '';
//         for (let i = 0; i < data.content.items.length; i++) {
//             html += ` <tr>
//         <td class="text-center">${data.content.items[i].firstName}</td>
//         <td class="text-center">${data.content.items[i].id.toString().padStart(4, '0')}</td>
//         </tr>`;
//         }
        
//         // console.log(data.content.items)



//         tableBodyEl.insertAdjacentHTML("beforebegin", html);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         console.log('Error registering user.');
//     });
let currentPage = 1;
const pageSize = 5; // Number of results per page

// Fetch users and populate the table
function fetchUsers(page) {
    fetch(`http://localhost:3000/api/system/employees?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })
    .then(data => {
        tableBodyEl.innerHTML = ''; // Clear the table before inserting new data
        let html = '';
        for (let i = 0; i < data.content.items.length; i++) {
            html += ` 
            <tr>
                <td class="text-center">${data.content.items[i].firstName}</td>
                <td class="text-center">${data.content.items[i].lastName}</td>
                <td class="text-center">${data.content.items[i].id.toString().padStart(4, '0')}</td>
            </tr>`;
        }
        tableBodyEl.insertAdjacentHTML("beforeend", html);

        // Update pagination state
        updatePagination(data.content.totalPages, page);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error fetching users.');
    });
}

// Update pagination buttons and page indicator
function updatePagination(totalPages, currentPage) {
    pageIndicator.textContent = `Page ${currentPage}`;

    // Disable or enable pagination buttons based on current page
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Event listeners for the buttons
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchUsers(currentPage);
    }
});

nextPageBtn.addEventListener('click', () => {
    currentPage++;
    fetchUsers(currentPage);
});

// Initial fetch
fetchUsers(currentPage);
