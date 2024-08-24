const { formatResponse, formatErrorResponse } = require("../../../Utils/response-formatter.util");

const ok =  (response, path, content) => sendResponse(200, response, path, content);

const sendResponse = (status, response, path, content) => {
    response.status(status).json(formatResponse(status, path, content));
}

const created =  (response, path, content) => sendResponse(201, response, path, content);

const badRequest =  (response, path, content, isError = false) => {
    if (isError) {
        sendErrorResponse(400, response, path, content);
    } else {
        sendResponse(400, response, path, content);
    }
};

const sendErrorResponse = (status, response, path, content) => {
    response.status(status).json(formatErrorResponse(status, path, content));
};

const unauthorized =  (response, path, content, isError = false) => {
    if (isError) {
        sendErrorResponse(401, response, path, content);
    } else {
        sendResponse(401, response, path, content);
    }
};

const forbidden =  (response, path, content, isError = false) => {
    if (isError) {
        sendErrorResponse(403, response, path, content);
    } else {
        sendResponse(403, response, path, content);
    }
};

const notFound =  (response, path, content, isError = false) => {
    if (isError) {
        sendErrorResponse(404, response, path, content);
    } else {
        sendResponse(404, response, path, content);
    }
};

const conflict =  (response, path, content) => sendErrorResponse(409, response, path, content);

const internalServerError =  (response, path, content) => sendErrorResponse(500, response, path, content);

const serviceUnavailable =  (response, path, content) => sendErrorResponse(503, response, path, content);

module.exports = {
    ok,
    created,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    internalServerError,
    serviceUnavailable
};