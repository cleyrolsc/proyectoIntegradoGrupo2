const { isNotNullNorUndefined } = require("../../Core/Utils/null-checker.util");
const formatResponse = require("../../Core/Utils/response-formatter.util");

const { SystemService } = require("../../Services");

const registerNewDepartmentAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let department = await SystemService.registerDepartmentAsync(description);

        let { id } = department;
        response.status(201).json(formatResponse(201, request.url, { id, description }));
    } catch (error) {
        next(error);
    }
};

const fetchDepartmentsAsync = async (request, response, next) => {
    try {
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 100;

        let departments = await SystemService.getDepartmentsAsync(page, pageSize);

        response.status(200).json(formatResponse(200, request.url, departments));
    } catch (error) {
        next(error);
    }
};

const registerNewEventAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let event = await SystemService.registerEventAsync(description);

        let { id } = event;
        response.status(201).json(formatResponse(201, request.url, { id, description }));        
    } catch (error) {
        next(error);
    }
};

const fetchEventsAsync = async (request, response, next) => {
    try {
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;

        let events = await SystemService.getEventsAsync(page, pageSize);

        response.status(200).json(formatResponse(200, request.url, events));
    } catch (error) {
        next(error)
    }
};

const registerNewPositionAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let position = await SystemService.registerPositionAsync(description);

        let { id } = position;
        response.status(201).json(formatResponse(201, request.url, { id, description }));        
    } catch (error) {
        next(error);
    }
};

const fetchPositionsAsync = async (request, response, next) => {
    try {
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 100;

        let positions = await SystemService.getPositionsAsync(page, pageSize);

        response.status(200).json(formatResponse(200, request.url, positions));
    } catch (error) {
        next(error)
    }
};

module.exports = {
    registerNewDepartmentAsync,
    fetchDepartmentsAsync,
    registerNewEventAsync,
    fetchEventsAsync,
    registerNewPositionAsync,
    fetchPositionsAsync
};