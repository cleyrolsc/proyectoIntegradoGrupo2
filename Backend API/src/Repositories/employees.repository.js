const Employee = require("./Entities/employee.class");
const Department = require("../Core/Abstractions/Enums/department.enum");

const createEmployee = (firstName, lastName, identificationNumber, commissionPerHour, department = Department.Sales) => {
    // Validate data

    let newEmployee = new Employee();
    newEmployee.firstName = firstName;
    newEmployee.lastName = lastName;
    newEmployee.identificationNumber = identificationNumber;
    newEmployee.commissionPerHour = commissionPerHour;
    newEmployee.department = department;
    newEmployee.createdOn = Date.now();
    newEmployee.modifiedOn = undefined;

    // Save to Database
};

const getEmployeeById = (id) => {

    // Fetch from DB
};

const getEmployees = () => {

    // Fetch from DB
};

const updateEmployee = (employeeId, firstName, lastName, identificationNumber, commissionPerHour, department = Department.Sales) => {

    // Fetch employee from DB
    let newEmployee = new Employee();

    newEmployee.firstName = firstName;
    newEmployee.lastName = lastName;
    newEmployee.identificationNumber = identificationNumber;
    newEmployee.commissionPerHour = commissionPerHour;
    newEmployee.department = department;
    newEmployee.modifiedOn = Date.now();

    // Save to Database
};

const deleteEmployee = (id) => {
    throw new Error("Not Implemented");
};

module.exports = {
    createEmployee,
    getEmployeeById,
    getEmployees,
    updateEmployee,
    deleteEmployee
};