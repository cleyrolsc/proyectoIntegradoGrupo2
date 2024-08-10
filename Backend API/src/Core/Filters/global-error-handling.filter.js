const { formatErrorResponse } = require("../Utils/response-formatter.util");

const globalErrorHandlingFilter = (error, request, response, next) => {
    console.log(`${error.constructor.name} -- ${error.message}`);

    let status = 500;

    switch (error.constructor.name) {
        case "BadRequestError":
            status = 400;
            break;
        case "ConflictError":
            status = 409;
            break;
        case "FatalError":
            status = 503;
            break;
        case "UnauthorizedError":
            status = 401;
            break;
        case "NotFoundError":
            status = 404;
            break;
        default:
            break;
    };

    response.status(status).json(formatErrorResponse(status, request.originalUrl, error));
};

module.exports = globalErrorHandlingFilter;