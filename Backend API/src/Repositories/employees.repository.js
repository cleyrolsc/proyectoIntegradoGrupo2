const Employee = require("./Entities/employee.class");
const Department = require("../Core/Abstractions/Enums/department.enum");

const DatabaseManager = require("../Database/database");

const tableName = "employees";

const createEmployee = (firstName, lastName, identificationNumber, commissionPerHour, department = Department.Sales) => {
    // Validate data

    let values = `'${firstName}', '${lastName}', '${identificationNumber}', ${+commissionPerHour}, ${+department}, '${Date.now().toString()}'`;
    
    return DatabaseManager.run(`INSERT INTO ${tableName} (firstName, lastName, identificationNumber, commissionPerHour, department, createdOn) VALUES (${values})`);
};

const getEmployeeById = (id) => {
    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE id = ${+id} LIMIT 1`);
    if (employees.length === 0){
        return undefined;
    }

    return employees[0];
};

const getEmployeeByIdentificationNumber = (identificationNumber) => {
    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE identificationNumber = '${identificationNumber}' LIMIT 1`);
    if (employees.length === 0){
        return undefined;
    }

    return employees[0];
};

const getEmployees = () => {
    let employees = DatabaseManager.query(`SELECT * FROM ${tableName}`);

    return employees;
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
    getEmployeeByIdentificationNumber,
    getEmployees,
    updateEmployee,
    deleteEmployee
};