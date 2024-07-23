const { isNotNullNorUndefined } = require("../../Core/Utils/null-checker.util");
const formatResponse = require("../../Core/Utils/response-formatter.util");

const { SystemService } = require("../../Services");

const registerNewDepartmentAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let department = await SystemService.registerDepartmentAsync(description);

        response.status(201).json(formatResponse(201, department));
    } catch (error) {
        next(error);
    }
};

const fetchDepartmentsAsync = async (request, response, next) => {
    try {
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 100;

        let departments = await SystemService.getDepartmentsAsync(page, pageSize);

        response.status(200).json(formatResponse(200, departments));
    } catch (error) {
        next(error);
    }
};

const registerNewEventAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let event = await SystemService.registerEventAsync(description);

        response.status(201).json(formatResponse(201, event));        
    } catch (error) {
        next(error);
    }
};

const fetchEventsAsync = async (request, response, next) => {
    try {
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;

        let events = await SystemService.getEventsAsync(page, pageSize);

        response.status(200).json(formatResponse(200, events));
    } catch (error) {
        next(error)
    }
};

const registerNewPositionAsync = async (request, response, next) => {
    try {
        let { description } = request.body;
        let position = await SystemService.registerPositionAsync(description);

        response.status(201).json(formatResponse(201, position));        
    } catch (error) {
        next(error);
    }
};

const fetchPositionsAsync = async (request, response, next) => {
    try {
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 100;

        let positions = await SystemService.getPositionsAsync(page, pageSize);

        response.status(200).json(formatResponse(200, positions));
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