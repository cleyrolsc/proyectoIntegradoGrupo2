const { BadRequestError } = require('../../Core/Abstractions/Exceptions');
const { isNullUndefinedOrEmpty, isNullOrUndefined } = require('../../Core/Utils/null-checker.util');
const { fetchEmployeeIdWithAuthTokenAsync, extractPaginationElements } = require('../../Core/Utils/request-element-extractor.util');
const { formatResponse } = require('../../Core/Utils/response-formatter.util');

const IncidentsService = require('../../Services/Incidents/incidents.service');

const registerIncidentAsync = async (request, response, next) => {
    try {
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let { comment } = request.body;
        if(isNullUndefinedOrEmpty(comment)) {
            throw new BadRequestError('Comment cannot be empty');
        }

        let incident = await IncidentsService.registerIncidentAsync(employeeId, comment);
        
        response.status(201).json(formatResponse(201, request.originalUrl, incident));
    } catch (error) {
        next(error)
    }
};

const fetchIncidentsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let incidents = await IncidentsService.getIncidentsAsync(page, pageSize);

        response.status(200).json(formatResponse(200, request.originalUrl, incidents));
    } catch (error) {
        next(error)
    }
};

const fetchIncidentAsync = async (request, response, next) => {
    try {
        let incidentId = request.params.incidentId;
        if(isNullOrUndefined(incidentId)) {
            throw new BadRequestError('Incident id cannot be undefined');
        }

        let incident = await IncidentsService.getIncidentByIdAsync(incidentId);
        
        response.status(200).json(formatResponse(200, request.originalUrl, incident));
    } catch (error) {
        next(error)
    }
};

const fetchEmployeeIncidentsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let employeeId = request.params.employeeId;

        let incidents = await IncidentsService.getIncidentByEmployeeIdAsync(employeeId, page, pageSize);
        
        response.status(200).json(formatResponse(200, request.originalUrl, incidents));
        
    } catch (error) {
        next(error)
    }
};

module.exports = {
    registerIncidentAsync,
    fetchIncidentsAsync,
    fetchIncidentAsync,
    fetchEmployeeIncidentsAsync,
};