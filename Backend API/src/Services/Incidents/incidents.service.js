const { isNullUndefinedOrEmpty, isNullOrUndefined } = require('../../Core/Utils/null-checker.util');
const { BadRequestError } = require('../../Core/Abstractions/Exceptions');

const IncidentsRepository = require('../../Repositories/incidents.repository');
const EmployeesRepository = require('../../Repositories/employees.repository');
const { PaginatedResponse } = require('../../Core/Abstractions/Contracts/Responses');
const { formatPaginatedResponse } = require('../../Core/Utils/response-formatter.util');

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

const getIncidentByIdAsync = async (id) => {
    if (isNullOrUndefined(id)) {
        throw new BadRequestError('Incident id cannot be undefined');
    }

    let {employeeId, supervisorId, comment, status, createdAt } = await IncidentsRepository.getIncidentByIdAsync(id);

    let employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    let supervisor = await EmployeesRepository.getEmployeeByIdAsync(supervisorId);

    return {
        id,
        submittedBy: {
            id: employeeId,
            firstName: employee.firstName,
            lastName: employee.lastName
        },
        comment,
        submittedTo: {
            id: supervisorId,
            firstName: supervisor.firstName,
            lastName: supervisor.lastName
        },
        submittedOn: createdAt,
        status: status
    };
};

const getIncidentsAsync = async (currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows:incidents } = await IncidentsRepository.getIncidentsAsync(skip, itemsPerPage, order);
    if (count === 0) {
        return new PaginatedResponse();
    }

    let incidentModels = [];
    incidents.forEach(entity => {
        let { id, employeeId, supervisorId, comment, status, createdAt } = entity;
        incidentModels.push({
            id,
            employeeId,
            comment,
            supervisorId,
            submittedOn: createdAt,
            status
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, incidentModels, count);
}

module.exports = {
    registerIncidentAsync,
    getIncidentByIdAsync,
    getIncidentsAsync
};