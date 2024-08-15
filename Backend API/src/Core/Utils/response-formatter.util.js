const { PaginatedResponse } = require("../Abstractions/Contracts/Responses");

const formatResponse = (statusCode = 200, path, content) => {
    return {
        statusCode,
        path,
        timestamp: new Date().toISOString(),
        content,
    };
};

const formatErrorResponse = (statusCode = 200, path, error) => {
    return {
        statusCode,
        path,
        timestamp: new Date().toISOString(),
        content: {
            errorType: error.constructor.name,
            message: error.message,
            //stack: error.stack
        }
    };
};

const formatPaginatedResponse = (currentPage, itemsPerPage, items, count) => {
    let response = new PaginatedResponse();
    response.currentPage = currentPage;
    response.itemsPerPage = itemsPerPage;
    response.paginate(items, count);

    return response;
}

module.exports = {
    formatResponse,
    formatErrorResponse,
    formatPaginatedResponse
};