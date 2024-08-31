const { UnauthorizedError } = require('../Abstractions/Exceptions');
const { isNullUndefinedOrEmpty } = require('../Utils/null-checker.util');
const { unauthorized, internalServerError } = require('../Abstractions/Contracts/HttpResponses/http-responses');

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
        switch (error.constructor.name) {
            case "UnauthorizedError":
            case "TokenExpiredError":
                return unauthorized(response, request.originalUrl, error, true);
            default:
                break;
        };

        internalServerError(response, request.originalUrl, error);
    }
};

module.exports = sessionAuthenticationFilter;