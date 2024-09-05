const { NotImplementedError, BadRequestError } = require("../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isNullUndefinedOrEmpty } = require("../Core/Utils/null-checker.util");
const { Op } = require('sequelize');

const Employee = require('./Entities/employee.class');

const createEmployeeAsync = ({id, firstName, lastName, payPerHour, departmentId, supervisorId, positionId}) => {
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
        id,
        firstName,
        lastName,
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

const getEmployeesAsync = (skip = 0, limit = 10, orderBy = 'ASC') => Employee.findAndCountAll({
    order: [['lastName', orderBy]],
    offset: skip,
    limit
});

const getEmployeesByIdArrayAsync = (ids = [], skip = 0, limit = 10, orderBy = 'ASC') =>Employee.findAndCountAll({
    where: {
        id: {
            [Op.in]: ids
        } 
    },
    order: [['id', orderBy]],
    offset: skip,
    limit
});

const getEmployeesByDepartmentIdAsync = (departmentId, skip = 0, limit = 10, orderBy = 'ASC') => Employee.findAll({
    where: {
        departmentId
    },
    order: [['lastName', orderBy]],
    offset: skip,
    limit
});

const getEmployeesBySupervisorIdAsync = (supervisorId, skip = 0, limit = 10, orderBy = 'ASC') => Employee.findAll({
    where: {
        supervisorId
    },
    order: [['lastName', orderBy]],
    offset: skip,
    limit
});

const getEmployeesByPositionIdAsync = (positionId, skip = 0, limit = 10, orderBy = 'ASC') => Employee.findAll({
    where: {
        positionId
    },
    order: [['lastName', orderBy]],
    offset: skip,
    limit
});

const updateEmployeeAsync = async (employeeId, { firstName = undefined, lastName = undefined, payPerHour = undefined, departmentId = undefined, supervisorId = undefined, positionId = undefined }) =>{
    let employee = await getEmployeeByIdAsync(employeeId);
    if (isNullOrUndefined(employee)) {
        return undefined;
    }

    if (areAllParametersEmpty()){
        return employee;
    }

    employee.firstName = firstName ?? employee.firstName;
    employee.lastName = lastName ??  employee.lastName;
    employee.payPerHour = payPerHour ??  employee.payPerHour;
    employee.departmentId = departmentId ??  employee.departmentId;
    employee.supervisorId = supervisorId ??  employee.supervisorId;
    employee.positionId = positionId ??  employee.positionId;

    await employee.save();

    return employee;

    function areAllParametersEmpty(){
        return isNullUndefinedOrEmpty(firstName) && isNullUndefinedOrEmpty(lastName) &&
        isNullOrUndefined(payPerHour) && isNullOrUndefined(departmentId) &&
        isNullOrUndefined(supervisorId) && isNullOrUndefined(positionId);
    }
};

const deleteEmployeeAsync = (id) => {
    throw new NotImplementedError();
};

module.exports = {
    createEmployeeAsync,
    getEmployeeByIdAsync,
    getEmployeesAsync,
    getEmployeesByIdArrayAsync,
    getEmployeesByDepartmentIdAsync,
    getEmployeesBySupervisorIdAsync,
    getEmployeesByPositionIdAsync,
    updateEmployeeAsync,
    deleteEmployeeAsync
};