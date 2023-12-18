const Employee = require("./Entities/employee.class");
const Department = require("../Core/Abstractions/Enums/department.enum");
const { FatalError } = require("../Core/Abstractions/Exceptions");
const { isNotNullUndefinedNorEmpty, isNotNullNorUndefined, isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");

const tableName = "employees";

const createEmployee = (firstName, lastName, identificationNumber, commissionPerHour, department = Department.Sales) => {
    // Validate data

    let today = new Date();
    let values = `'${firstName}', '${lastName}', '${identificationNumber}', ${+commissionPerHour}, ${+department}, '${today.toString()}'`;
    
    return DatabaseManager.run(`INSERT INTO ${tableName} (firstName, lastName, identificationNumber, commissionPerHour, department, createdOn) VALUES (${values})`);
};

const getEmployeeById = (id) => {
    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE id = ${+id} LIMIT 1`);
    if (isListEmpty(employees)){
        return undefined;
    }

    return employees[0];
};

const getEmployeeByIdentificationNumber = (identificationNumber) => {
    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE identificationNumber = '${identificationNumber}' LIMIT 1`);
    if (eisListEmpty(employees)){
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
    if (isNullOrUndefined(employee)){
        return undefined;
    }

    let params = generateUpdateParameters();

    if (params === "") {
        return getEmployeeById(employeeId);
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET ${params} WHERE id = ${employeeId}`);
    if(result.changes === 0){
        throw new FatalError(`Unable to update employee with id '${employeeId}'`);
    }

    return getEmployeeById(employeeId);

    function generateUpdateParameters() {
        let params = "";

        if (isNotNullUndefinedNorEmpty(firstName)) {
            params += `firstName = '${firstName}'`;
        }

        if (isNotNullUndefinedNorEmpty(lastName)) {
            params += params !== "" ? ", " : params;

            params += `lastName = '${lastName}'`;
        }

        if (isNotNullUndefinedNorEmpty(identificationNumber)) {
            params += params !== "" ? ", " : params;

            params += `identificationNumber = '${identificationNumber}'`;
        }

        if (isNotNullNorUndefined(commissionPerHour)) {
            params += params !== "" ? ", " : params;

            params += `commissionPerHour = ${+commissionPerHour}`;
        }

        if (isNotNullNorUndefined(department)) {
            params += params !== "" ? ", " : params;

            params += `department = ${department}`;
        }

        let today = new Date();
        params += params !== "" ? `, modifiedOn = '${today.toString()}'` : `modifiedOn = '${today.toString()}'`;
        return params;
    }
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