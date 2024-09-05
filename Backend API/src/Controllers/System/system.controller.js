const { created, ok } = require("../../Core/Abstractions/Contracts/HttpResponses/http-responses");
const { extractPaginationElements } = require("../../Core/Utils/request-element-extractor.util");

const { SystemService } = require("../../Services");

const registerNewDepartmentAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let department = await SystemService.registerDepartmentAsync(description);

        let { id } = department;
        created(response, request.originalUrl, { id, description });
    } catch (error) {
        next(error);
    }
};

const fetchDepartmentsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request, 100);
        let departments = await SystemService.getDepartmentsAsync(page, pageSize);

        ok(response, request.originalUrl, departments);
    } catch (error) {
        next(error);
    }
};

const registerNewEventAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let event = await SystemService.registerEventAsync(description);

        let { id } = event;
        created(response, request.originalUrl, { id, description });
    } catch (error) {
        next(error);
    }
};

const fetchEventsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let events = await SystemService.getEventsAsync(page, pageSize);

        ok(response, request.originalUrl, events);
    } catch (error) {
        next(error)
    }
};

const registerNewPositionAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let position = await SystemService.registerPositionAsync(description);

        let { id } = position;
        created(response, request.originalUrl, { id, description });      
    } catch (error) {
        next(error);
    }
};

const fetchPositionsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request, 100);
        let positions = await SystemService.getPositionsAsync(page, pageSize);

        ok(response, request.originalUrl, positions);
    } catch (error) {
        next(error)
    }
};

const fetchEmployeesAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request, 100);
        let employees = await SystemService.getEmployeesAsync(page, pageSize);

        ok(response, request.originalUrl, employees);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerNewDepartmentAsync,
    fetchDepartmentsAsync,
    registerNewEventAsync,
    fetchEventsAsync,
    registerNewPositionAsync,
    fetchPositionsAsync,
    fetchEmployeesAsync
};