const { NotImplementedError, BadRequestError } = require("../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isNullUndefinedOrEmpty } = require("../Core/Utils/null-checker.util");

const Employee = require('./Entities/employee.class');

const createEmployeeAsync = ({firstName, lastName, identificationNumber, payPerHour, departmentId, supervisorId, positionId}) => {
    if (isNullOrUndefined(departmentId)){
        throw new BadRequestError('Department id cannot be null');
    }

    if (isNullOrUndefined(supervisorId)){
        throw new BadRequestError('Supervisor id cannot be null');
    }

    if (isNullOrUndefined(positionId)){
        throw new BadRequestError('Position id cannot be null');
    }

    return Employee.create({
        firstName,
        lastName,
        identificationNumber,
        payPerHour,
        departmentId,
        supervisorId,
        positionId
    });
};

const getEmployeeByIdAsync = async (id) => {
    let employee = await Employee.findByPk(id);
    if(isNullOrUndefined(employee)){
        return undefined;
    }

    return employee;
};

const getEmployeeByIdentificationNumberAsync = async (identificationNumber) => {
    let employee = await Employee.findOne({
        where: {
            identificationNumber
        }
    });
    if(isNullOrUndefined(employee)){
        return undefined;
    }

    return employee;
};

const getEmployeesAsync = (skip = 0, limit = 10, orderBy = 'DESC') => Employee.findAll({
        order: [['lastName', orderBy]],
        offset: skip,
        limit
    });

const getEmployeesByDepartmentIdAsync = (departmentId, skip = 0, limit = 10, orderBy = 'DESC') => Employee.findAll({
        where: {
            departmentId
        },
        order: [['lastName', orderBy]],
        offset: skip,
        limit
    });

const getEmployeesBySupervisorIdAsync = (supervisorId, skip = 0, limit = 10, orderBy = 'DESC') => Employee.findAll({
        where: {
            supervisorId
        },
        order: [['lastName', orderBy]],
        offset: skip,
        limit
    });

const getEmployeesByPositionIdAsync = (positionId, skip = 0, limit = 10, orderBy = 'DESC') => Employee.findAll({
        where: {
            positionId
        },
        order: [['lastName', orderBy]],
        offset: skip,
        limit
    });

const updateEmployeeAsync = async (employeeId, { firstName = undefined, lastName = undefined, identificationNumber = undefined, payPerHour = undefined, departmentId = undefined, supervisorId = undefined, positionId = undefined }) =>{
    let employee = getEmployeeByIdAsync(employeeId);
    if (isNullOrUndefined(employee)) {
        return undefined;
    }

    if (areAllParametersEmpty()){
        return employee;
    }

    employee.firstName = employee.firstName ?? firstName;
    employee.lastName = employee.lastName ?? lastName;
    employee.identificationNumber = employee.identificationNumber ?? identificationNumber;
    employee.payPerHour = employee.payPerHour ?? payPerHour;
    employee.departmentId = employee.departmentId ?? departmentId;
    employee.supervisorId = employee.supervisorId ?? supervisorId;
    employee.positionId = employee.positionId ?? positionId;

    await employee.save();

    return employee;

    function areAllParametersEmpty(){
        return isNullUndefinedOrEmpty(firstName) && isNullUndefinedOrEmpty(lastName) &&
        isNullUndefinedOrEmpty(identificationNumber) && isNullOrUndefined(payPerHour) &&
        isNullOrUndefined(departmentId) && isNullOrUndefined(supervisorId) &&
        isNullOrUndefined(positionId);
    }
}

const deleteEmployeeAsync = (id) => {
    throw new NotImplementedError();
};

module.exports = {
    createEmployeeAsync,
    getEmployeeByIdAsync,
    getEmployeeByIdentificationNumberAsync,
    getEmployeesAsync,
    getEmployeesByDepartmentIdAsync,
    getEmployeesBySupervisorIdAsync,
    getEmployeesByPositionIdAsync,
    updateEmployeeAsync,
    deleteEmployeeAsync
};