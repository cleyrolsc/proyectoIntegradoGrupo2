const AuthService = require('../../Services/Auth/auth.service');
const { isNullUndefinedOrEmpty } = require('../Utils/null-checker.util');

const sessionAuthenticationFilter = async (request, response, next) => {
    try {
        let token = request.header("token");
        if (isNullUndefinedOrEmpty(token)) {
            return response.status(403).json({
                statusCode: 403,
                message: 'No token was found',
                timestamp: new Date().toISOString(),
                path: request.url
            });
        }

        await AuthService.validateTokenAsync(token);

        next();
    } catch (error) {
        let status = 500;

        switch (error.constructor.name) {
            case "UnauthorizedError":
                status = 401;
                break;
            case "TokenExpiredError":
                status = 403;
                break;
            default:
                break;
        };

        response.status(status).json({
            statusCode: status,
            message: error.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};

module.exports = sessionAuthenticationFilter;