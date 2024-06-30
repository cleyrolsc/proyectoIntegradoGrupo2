const { FatalError, NotImplementedError, BadRequestError } = require("../Core/Abstractions/Exceptions");
const { isNotNullUndefinedNorEmpty, isNotNullNorUndefined, isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");

const tableName = "employees";

const createEmployee = (firstName, lastName, identificationNumber, payPerHour, departmentId, supervisorId, positionId) => {
    // Validate data
    if (isNullOrUndefined(departmentId)){
        throw new BadRequestError('Department id cannot be null');
    }

    if (isNullOrUndefined(supervisorId)){
        throw new BadRequestError('Supervisor id cannot be null');
    }

    if (isNullOrUndefined(positionId)){
        throw new BadRequestError('Position id cannot be null');
    }

    let values = `'${firstName}', '${lastName}', '${identificationNumber}', ${+payPerHour}, ${+departmentId}, ${+supervisorId}, ${+positionId}`;

    return DatabaseManager.run(`INSERT INTO ${tableName} (firstName, lastName, identificationNumber, payPerHour, departmentId, supervisorId, positionId) VALUES (${values})`);
};

const getEmployeeById = (id) => {
    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE id = ${+id} LIMIT 1`);
    if (isListEmpty(employees)) {
        return undefined;
    }

    return employees[0];
};

const getEmployeeByIdentificationNumber = (identificationNumber) => {
    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE identificationNumber = '${identificationNumber}' LIMIT 1`);
    if (isListEmpty(employees)) {
        return undefined;
    }

    return employees[0];
};

const getEmployees = () => {
    let employees = DatabaseManager.query(`SELECT * FROM ${tableName}`);

    return employees;
};

const getEmployeesByDepartment = (departmentId) => {
    if (isNullOrUndefined(departmentId)){
        throw new BadRequestError('Department id cannot be null');
    }

    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE departmentId = ${+departmentId}`);

    return employees;
};

const getEmployeesBySupervisor = (supervisorId) => {
    if (isNullOrUndefined(supervisorId)){
        throw new BadRequestError('Supervisor id cannot be null');
    }

    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE supervisorId = ${+supervisorId}`);

    return employees;
};

const getEmployeesByPosition = (positionId) => {
    if (isNullOrUndefined(positionId)){
        throw new BadRequestError('Position id cannot be null');
    }

    let employees = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE positionId = ${+positionId}`);

    return employees;
};

const updateEmployee = (employeeId, { firstName = undefined, lastName = undefined, identificationNumber = undefined, payPerHour = undefined, departmentId = undefined, supervisorId = undefined, positionId = undefined }) => {
    let employee = getEmployeeById(employeeId);
    if (isNullOrUndefined(employee)) {
        return undefined;
    }

    let params = generateUpdateParameters();

    if (params === "") {
        return getEmployeeById(employeeId);
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET ${params} WHERE id = ${employeeId}`);
    if (result.changes === 0) {
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

        if (isNotNullNorUndefined(payPerHour)) {
            params += params !== "" ? ", " : params;

            params += `payPerHour = ${+payPerHour}`;
        }

        if (isNotNullNorUndefined(departmentId)) {
            params += params !== "" ? ", " : params;

            params += `departmentId = ${departmentId}`;
        }

        if (isNotNullNorUndefined(supervisorId)) {
            params += params !== "" ? ", " : params;

            params += `supervisorId = ${supervisorId}`;
        }

        if (isNotNullNorUndefined(positionId)) {
            params += params !== "" ? ", " : params;

            params += `positionId = ${positionId}`;
        }

        let today = new Date();
        params += params !== "" ? `, modifiedOn = '${today.toString()}'` : `modifiedOn = '${today.toString()}'`;
        
        return params;
    }
};

const deleteEmployee = (id) => {
    throw new NotImplementedError();
};

module.exports = {
    createEmployee,
    getEmployeeById,
    getEmployeeByIdentificationNumber,
    getEmployees,
    getEmployeesByDepartment,
    getEmployeesBySupervisor,
    getEmployeesByPosition,
    updateEmployee,
    deleteEmployee
};