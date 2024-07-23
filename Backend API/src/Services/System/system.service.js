const { PaginatedResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { BadRequestError } = require("../../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isListEmpty } = require("../../Core/Utils/null-checker.util");

const { EventsRepository, PositionsRepository, DepartmentRepository } = require("../../Repositories");

const registerDepartmentAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return DepartmentRepository.createDepartmentAsync(description);
};

const getDepartmentsAsync = async (currentPage = 1, itemsPerPage = 100, orderBy = 'DESC') => {
    let departments =  await DepartmentRepository.getDepartmentsAsync(currentPage - 1, itemsPerPage, orderBy);
    if (isListEmpty(departments)) {
        return new PaginatedResponse();
    }

    let response = new PaginatedResponse();
    response.currentPage = currentPage;
    response.itemsPerPage = itemsPerPage;

    let departmentCount = await DepartmentRepository.countDepartmentsAsync();
    response.totalPages = Math.ceil(departmentCount / itemsPerPage);
    response.hasNext = response.currentPage < response.totalPages;
    
    response.items = [];
    departments.forEach((entity) => {
        let { id, description } = entity;
        response.items.push({
            id, 
            description
        });
    });

    return response;
};

const registerEventAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return EventsRepository.createEventAsync(description);
};

const getEventsAsync = async (currentPage = 1, itemsPerPage = 10, orderBy = 'DESC') => {
    let events =  await EventsRepository.getEventsAsync(currentPage - 1, itemsPerPage, orderBy);
    if (isListEmpty(events)) {
        return new PaginatedResponse();
    }

    let response = new PaginatedResponse();
    response.currentPage = currentPage;
    response.itemsPerPage = itemsPerPage;

    let eventCount = await EventsRepository.countEventsAsync();
    response.totalPages = Math.ceil(eventCount / itemsPerPage);
    response.hasNext = response.currentPage < response.totalPages;
    
    response.items = [];
    events.forEach((entity) => {
        let { id, description } = entity;
        response.items.push({
            id, 
            description
        });
    });

    return response;
};

const registerPositionAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return PositionsRepository.createPositionAsync(description);
}

const getPositionsAsync = async (currentPage = 1, itemsPerPage = 100, orderBy = 'DESC') => {
    let positions =  await PositionsRepository.getPositionsAsync(currentPage - 1, itemsPerPage, orderBy);
    if (isListEmpty(positions)) {
        return new PaginatedResponse();
    }

    let response = new PaginatedResponse();
    response.currentPage = currentPage;
    response.itemsPerPage = itemsPerPage;

    let positionCount = await PositionsRepository.countPositionsAsync();
    response.totalPages = Math.ceil(positionCount / itemsPerPage);
    response.hasNext = response.currentPage < response.totalPages;
    
    response.items = [];
    positions.forEach((entity) => {
        let { id, description } = entity;
        response.items.push({
            id, 
            description
        });
    });

    return response;
};

module.exports = {
    registerDepartmentAsync,
    getDepartmentsAsync,
    registerEventAsync,
    getEventsAsync,
    registerPositionAsync,
    getPositionsAsync
};