const {
    badRequest,
    conflict,
    serviceUnavailable,
    unauthorized,
    forbidden,
    notFound,
    internalServerError
} = require("../Abstractions/Contracts/HttpResponses/http-responses");

const globalErrorHandlingFilter = (error, request, response, next) => {
    console.log(`${error.constructor.name} -- ${error.message}`);

    switch (error.constructor.name) {
        case "BadRequestError":
            return badRequest(response, request.originalUrl, error, true);
        case "UnauthorizedError":
            return unauthorized(response, request.originalUrl, error, true);
        case "ForbiddenError":
            return forbidden(response, request.originalUrl, error, true);
        case "NotFoundError":
            return notFound(response, request.originalUrl, error, true);
        case "ConflictError":
            return conflict(response, request.originalUrl, error, true);
        case "FatalError":
            return serviceUnavailable(response, request.originalUrl, error, true);
        default:
            break;
    };

    internalServerError(response, request.originalUrl, error, true);
};

module.exports = globalErrorHandlingFilter;