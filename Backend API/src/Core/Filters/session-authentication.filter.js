const { UnauthorizedError } = require('../Abstractions/Exceptions');
const { isNullUndefinedOrEmpty } = require('../Utils/null-checker.util');
const { formatErrorResponse } = require('../Utils/response-formatter.util');

const AuthService = require('../../Services/Auth/auth.service');

const sessionAuthenticationFilter = async (request, response, next) => {
    try {
        const bearerHeader = request.header('authorization');
        if (isNullUndefinedOrEmpty(bearerHeader)) {
            throw new UnauthorizedError('No bearer authorization token was found');
        }

        let token = bearerHeader.split(' ')[1];
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

        response.status(status).json(formatErrorResponse(status, request.originalUrl, error));
    }
};

module.exports = sessionAuthenticationFilter;