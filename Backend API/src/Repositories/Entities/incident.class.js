class Incident{
    id;
    comment;
    employeeId; // FK Employees
    reportDate = new Date();
};

module.exports = Incident;