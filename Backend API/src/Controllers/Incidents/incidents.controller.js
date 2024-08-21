const { isNullUndefinedOrEmpty } = require('../../Core/Utils/null-checker.util');
const { fetchEmployeeIdWithAuthTokenAsync } = require('../../Core/Utils/request-element-extractor.util');
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

module.exports = {
    registerIncidentAsync
};