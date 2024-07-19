const { UnauthorizedError } = require('../Abstractions/Exceptions');
const { isNullUndefinedOrEmpty } = require('../Utils/null-checker.util');
const formatResponse = require('../Utils/response-formatter.util');

const AuthService = require('../../Services/Auth/auth.service');

const sessionAuthenticationFilter = async (request, response, next) => {
    try {
        let token = request.header("token");
        if (isNullUndefinedOrEmpty(token)) {
            throw new UnauthorizedError('No token was found');
        }

        await AuthService.validateTokenAsync(token);

        next();
    } catch (error) {
        let status = 500;

        switch (error.constructor.name) {
            case "UnauthorizedError":
            case "TokenExpiredError":
                status = 401;
                break;
            default:
                break;
        };

        response.status(status).json(formatResponse(status, request.url, error.message));
    }
};

module.exports = sessionAuthenticationFilter;