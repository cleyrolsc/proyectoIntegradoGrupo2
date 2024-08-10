const { PaginatedResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { BadRequestError } = require("../../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isListEmpty } = require("../../Core/Utils/null-checker.util");
const { formatPaginatedResponse } = require("../../Core/Utils/response-formatter.util");

const { EventsRepository, PositionsRepository, DepartmentRepository, EmployeesRepository } = require("../../Repositories");

const registerDepartmentAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return DepartmentRepository.createDepartmentAsync(description);
};

const getDepartmentsAsync = async (currentPage = 1, itemsPerPage = 100, orderBy = 'ASC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let {count, rows: departments} =  await DepartmentRepository.getDepartmentsAsync(skip, itemsPerPage, orderBy);
    if (isListEmpty(departments)) {
        return new PaginatedResponse();
    }
    
    let departmentModels = [];
    departments.forEach((entity) => {
        let { id, description } = entity;
        departmentModels.push({
            id, 
            description
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, departmentModels, count);
};

const registerEventAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return EventsRepository.createEventAsync(description);
};

const getEventsAsync = async (currentPage = 1, itemsPerPage = 10, orderBy = 'ASC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let {count, rows: events} =  await EventsRepository.getEventsAsync(skip, itemsPerPage, orderBy);
    if (isListEmpty(events)) {
        return new PaginatedResponse();
    }
    
    let eventModels =[];
    events.forEach((entity) => {
        let { id, description } = entity;
        eventModels.push({
            id, 
            description
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, eventModels, count);
};

const registerPositionAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return PositionsRepository.createPositionAsync(description);
}

const getPositionsAsync = async (currentPage = 1, itemsPerPage = 100, orderBy = 'ASC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let {count, rows: positions} =  await PositionsRepository.getPositionsAsync(skip, itemsPerPage, orderBy);
    if (isListEmpty(positions)) {
        return new PaginatedResponse();
    }
    
    let positionModels = [];
    positions.forEach((entity) => {
        let { id, description } = entity;
        positionModels.push({
            id, 
            description
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, positionModels, count);
};

const getEmployeesAsync = async (currentPage = 1, itemsPerPage = 100, orderBy = 'ASC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let {count, rows: employees} = await EmployeesRepository.getEmployeesAsync(skip, itemsPerPage, orderBy);
    if (isListEmpty(employees)) {
        return new PaginatedResponse();
    }

    return formatPaginatedResponse(currentPage, itemsPerPage, employees, count);
};

module.exports = {
    registerDepartmentAsync,
    getDepartmentsAsync,
    registerEventAsync,
    getEventsAsync,
    registerPositionAsync,
    getPositionsAsync,
    getEmployeesAsync
};
