const { isNullUndefinedOrEmpty, isNullOrUndefined } = require('../../Core/Utils/null-checker.util');
const { BadRequestError, NotFoundError } = require('../../Core/Abstractions/Exceptions');
const { PaginatedResponse } = require('../../Core/Abstractions/Contracts/Responses');
const { formatPaginatedResponse } = require('../../Core/Utils/response-formatter.util');

const IncidentsRepository = require('../../Repositories/incidents.repository');
const EmployeesRepository = require('../../Repositories/employees.repository');

const registerIncidentAsync = async (employeeId, comment) => {
    let employee = await checkIfEmployeeExistAsync(employeeId);
    
    if(isNullUndefinedOrEmpty(comment)) {
        throw new BadRequestError('Comment cannot be empty');
    }

    return IncidentsRepository.createIncidentAsync(employee.id, employee.supervisorId, comment);
};

async function checkIfEmployeeExistAsync(employeeId) {
    let employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if (isNullOrUndefined(employee)) {
        throw new NotFoundError(`Employee with id, ${employeeId}, cannot be found`);
    }
    return employee;
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
};

const getIncidentsByEmployeeIdAsync = async (employeeId, currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let employee = await checkIfEmployeeExistAsync(employeeId);

    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows:incidents } = await IncidentsRepository.getIncidentsByEmployeeIdAsync(employeeId, skip, itemsPerPage, order);
    if (count === 0) {
        return new PaginatedResponse();
    }

    let supervisor = await EmployeesRepository.getEmployeeByIdAsync(employee.supervisorId);
    
    let incidentModels = [];
    incidents.forEach(entity => {
        let { id, supervisorId, comment, status, createdAt } = entity;
        incidentModels.push({
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
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, incidentModels, count);
};

const getIncidentsBySupervisorIdAsync = async (supervisorId, currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    await checkIfEmployeeExistAsync(supervisorId);

    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows:incidents } = await IncidentsRepository.getIncidentsBySupervisorIdAsync(supervisorId, skip, itemsPerPage, order);
    if (count === 0) {
        return new PaginatedResponse();
    }
    
    let incidentModels = [];
    incidents.forEach(entity => {
        let { id, employeeId, comment, status, createdAt } = entity;
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
};

module.exports = {
    registerIncidentAsync,
    getIncidentByIdAsync,
    getIncidentsAsync,
    getIncidentsByEmployeeIdAsync,
    getIncidentsBySupervisorIdAsync
};