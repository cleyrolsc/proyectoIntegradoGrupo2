const { created, ok } = require('../../Core/Abstractions/Contracts/HttpResponses/http-responses');
const { IncidentStatus } = require('../../Core/Abstractions/Enums');
const { BadRequestError, ForbiddenError } = require('../../Core/Abstractions/Exceptions');
const { isNullUndefinedOrEmpty, isNullOrUndefined, isNotNullNorUndefined } = require('../../Core/Utils/null-checker.util');
const { fetchEmployeeIdWithAuthTokenAsync, extractPaginationElements, extractDateRange } = require('../../Core/Utils/request-element-extractor.util');

const { ComputedHoursService, IncidentsService } = require('../../Services');

const registerIncidentAsync = async (request, response, next) => {
    try {
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let { comment } = request.body;
        if(isNullUndefinedOrEmpty(comment)) {
            throw new BadRequestError('Comment cannot be empty');
        }

        let incident = await IncidentsService.registerIncidentAsync(employeeId, comment);
        
        created(response, request.originalUrl, incident);
    } catch (error) {
        next(error)
    }
};

const fetchIncidentsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let incidents = await IncidentsService.getIncidentsAsync(page, pageSize);

        ok(response, request.originalUrl, incidents);
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
        
        ok(response, request.originalUrl, incident);
    } catch (error) {
        next(error)
    }
};

const fetchMyIncidentsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);

        let incidents = await IncidentsService.getIncidentsByEmployeeIdAsync(employeeId, page, pageSize);
        
        ok(response, request.originalUrl, incidents);
    } catch (error) {
        next(error)
    }
};

const fetchEmployeeIncidentsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let employeeId = request.params.employeeId;

        let incidents = await IncidentsService.getIncidentsByEmployeeIdAsync(employeeId, page, pageSize);
        
        ok(response, request.originalUrl, incidents);
    } catch (error) {
        next(error)
    }
};

const fetchIncidentsAssignedToSupervisorAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let supervisorId = await fetchEmployeeIdWithAuthTokenAsync(request);

        let incidents = await IncidentsService.getIncidentsBySupervisorIdAsync(supervisorId, page, pageSize);
        
        ok(response, request.originalUrl, incidents);
    } catch (error) {
        next(error)
    }
};

const markIncidentAsResolvedAsync = async (request, response, next) => {
    try {
        let incidentId = request.params.incidentId;
        if(isNullOrUndefined(incidentId)) {
            throw new BadRequestError('Incident id cannot be undefined');
        }

        let incident = await IncidentsService.getIncidentByIdAsync(incidentId);
        if(incident.status === IncidentStatus.Resolved) {
            return ok(response, request.originalUrl, incident);
        }

        if(incident.status === IncidentStatus.Rejected) {
            throw new ForbiddenError("You cannot resolve an incident that has been rejected");
        }

        incident = await IncidentsService.updateIncidentStatusAsync(incidentId, IncidentStatus.Resolved);
    
        ok(response, request.originalUrl, incident);
    } catch (error) {
        next(error)
    }
};

const markIncidentAsRejectedAsync = async (request, response, next) => {
    try {
        let incidentId = request.params.incidentId;
        if(isNullOrUndefined(incidentId)) {
            throw new BadRequestError('Incident id cannot be undefined');
        }

        let incident = await IncidentsService.getIncidentByIdAsync(incidentId);
        if(incident.status === IncidentStatus.Rejected) {
            return ok(response, request.originalUrl, incident);
        }

        if(incident.status === IncidentStatus.Resolved) {
            throw new ForbiddenError("You cannot reject an incident that has been resolved");
        }

        incident = await IncidentsService.updateIncidentStatusAsync(incidentId, IncidentStatus.Rejected);
    
        ok(response, request.originalUrl, incident);
    } catch (error) {
        next(error)
    }
};

const generateComputedHoursForDayAsync = async (request, response, next) => {
    try {
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let computedHours = await ComputedHoursService.registerComputedHourForTodayAsync(employeeId);
        
        created(response, request.originalUrl, computedHours);
    } catch (error) {
        next(error);
    }
};

const fetchEmployeeComputedHoursForTodayAsync = async (request, response, next) => {
    try {
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let computedHours = await ComputedHoursService.getTodaysComputedHourByEmployeeIdAsync(employeeId);
        
        ok(response, request.originalUrl, computedHours);
    } catch (error) {
        next(error);
    }
};

const fetchEmployeeComputedHoursAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let paymentStatus = isNotNullNorUndefined(request.query.paymentStatus) ? +request.query.paymentStatus : undefined;

        let computedHours = await ComputedHoursService.getComputedHoursByEmployeeIdAsync(employeeId, paymentStatus, page, pageSize);
        
        ok(response, request.originalUrl, computedHours);
    } catch (error) {
        next(error);
    }
};

const fetchComputedHoursAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let { startDate, endDate } = extractDateRange(request);
        let paymentStatus = isNotNullNorUndefined(request.query.paymentStatus) ? +request.query.paymentStatus : undefined;

        let computedHours = await ComputedHoursService.getComputedHoursAsync(paymentStatus, startDate, endDate, page, pageSize);
        
        ok(response, request.originalUrl, computedHours);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerIncidentAsync,
    fetchIncidentsAsync,
    fetchIncidentAsync,
    fetchMyIncidentsAsync,
    fetchEmployeeIncidentsAsync,
    fetchIncidentsAssignedToSupervisorAsync,
    markIncidentAsResolvedAsync,
    markIncidentAsRejectedAsync,

    // Computed Hours Endpoints
    generateComputedHoursForDayAsync,
    fetchEmployeeComputedHoursForTodayAsync,
    fetchEmployeeComputedHoursAsync,
    fetchComputedHoursAsync
};