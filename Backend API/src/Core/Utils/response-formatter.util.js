const formatResponse = (statusCode = 200, path, content) => {
    return {
        statusCode,
        path,
        timestamp: new Date().toISOString(),
        content,
    };
};

module.exports = formatResponse;