const Employee = require("./Entities/employee.class");
const Department = require("../Core/Abstractions/Enums/department.enum");
const { FatalError } = require("../Core/Abstractions/Exceptions");
const { isNotNullUndefinedOrEmpty, isNotNullOrUndefined } = require("../Core/Utils/null-checker.util");

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

const updateEmployee = (employeeId, {firstName = undefined, lastName = undefined, identificationNumber = undefined, commissionPerHour = undefined, department  = undefined}) => {
    let employee = getEmployeeById(employeeId);
    if (employee === undefined){
        return undefined;
    }

    let params = "";

    if (isNotNullUndefinedOrEmpty(firstName)) {
        params += `firstName = '${firstName}'`;
    }

    if (isNotNullUndefinedOrEmpty(lastName)) {
        params += params !== "" ? ", ": params;

        params += `lastName = '${lastName}'`;
    }

    if (isNotNullUndefinedOrEmpty(identificationNumber)) {
        params += params !== "" ? ", ": params;

        params += `identificationNumber = '${identificationNumber}'`;
    }

    if (isNotNullOrUndefined(commissionPerHour)) {
        params += params !== "" ? ", ": params;

        params += `commissionPerHour = ${commissionPerHour}`;
    }

    if (isNotNullOrUndefined(department)) {
        params += params !== "" ? ", ": params;

        params += `department = ${department}`;
    }

    params += params !== "" ? `, modifiedOn = '${Date.now().toString()}'`: `modifiedOn = '${Date.now().toString()}'`;

    let result = DatabaseManager.run(`UPDATE ${tableName} SET ${params} WHERE id = ${employeeId}`);
    if(result.changes === 0){
        throw new FatalError(`Unable to update employee with id '${employeeId}'`);
    }

    return getEmployeeById(employeeId);
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