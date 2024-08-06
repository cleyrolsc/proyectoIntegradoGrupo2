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

module.exports = {
    formatResponse,
    formatErrorResponse
};