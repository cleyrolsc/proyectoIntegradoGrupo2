const { isNullUndefinedOrEmpty, isNullOrUndefined } = require('../../Core/Utils/null-checker.util');
const { BadRequestError } = require('../../Core/Abstractions/Exceptions');

const IncidentsRepository = require('../../Repositories/incidents.repository');
const EmployeesRepository = require('../../Repositories/employees.repository');

const registerIncidentAsync = async (employeeId, comment) => {
    let employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if (isNullOrUndefined(employee)) {
        throw new BadRequestError('Employee id cannot be undefined');
    }
    
    if(isNullUndefinedOrEmpty(comment)) {
        throw new BadRequestError('Comment cannot be empty');
    }

    return IncidentsRepository.createIncidentAsync(employee.id, employee.supervisorId, comment);
};

module.exports = {
    registerIncidentAsync
};