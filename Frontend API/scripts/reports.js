const tableBodyEl = document.querySelector('.table-body');
let currentPage = 1;
const pageSize = 5; // Set the number of items per page

 
// Function to fetch payroll data
function fetchPayrollData(page) {
    fetch(`http://localhost:3000/api/payrolls`, {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (response.ok) {
            return response.json();
        }
        throw new Error('Something went wrong');
    })

    .then(data => {
        console.log('Data fetched:', data); // Check if data is being received
        renderTable(data.content.items);
        updatePagination(data.content.currentPage, data.content.totalPages);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error fetching payroll data.');
    });
}
function formatDate(dateString) {
    const date = new Date(dateString);

    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}


// Function to render the payroll data in the table
function renderTable(payrollItems) {
    tableBodyEl.innerHTML = ''; // Clear the previous rows

    if (payrollItems && payrollItems.length > 0) {
        payrollItems.forEach(item => {
            let paymentStatusText = '';
            switch (item.paymentStatus) {
                case 0: paymentStatusText = 'Pending'; break;
                case 1: paymentStatusText = 'Paid'; break;
                case 2: paymentStatusText = 'Rejected'; break;
                default: paymentStatusText = 'Unknown'; break;
            }
            console.log(item.payPerHour.toFixed(2))
            const row = `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.employeeId}</td>
                    <td>${item.fullName}</td>
                    <td>${formatDate(item.startDate)}</td> <!-- Format the startDate -->
                    <td>${formatDate(item.endDate)}</td>   <!-- Format the endDate -->
                    <td>${item.payPerHour.toFixed(2)}</td>
                    <td>${item.totalWorkHours}</td>
                    <td>${item.totalWorkPay.toFixed(2)}</td>
                    <td>${item.totalBreakHours}</td>
                    <td>${item.totalTrainingHours}</td>
                    <td>${item.totalTrainingPay.toFixed(2)}</td>
                    <td>${item.grossPay.toFixed(2)}</td>
                    <td>${paymentStatusText}</td>
                </tr>
            `;
            tableBodyEl.insertAdjacentHTML('beforeend', row);
        });
    } else {
        tableBodyEl.innerHTML = '<tr><td colspan="13">No data available</td></tr>';
    }
}


// Function to handle pagination
function updatePagination(currentPage, totalPages) {
    // Update pagination controls (Next/Previous buttons can be added here)
    console.log(`Page: ${currentPage} of ${totalPages}`);
}

// Initial fetch of payroll data for the first page
fetchPayrollData(currentPage);
