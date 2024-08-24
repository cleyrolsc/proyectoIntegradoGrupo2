const { isNullUndefinedOrEmpty } = require("../Utils/null-checker.util");
const { UnauthorizedError } = require("../Abstractions/Exceptions");
const { unauthorized, forbidden, internalServerError } = require("../Abstractions/Contracts/HttpResponses/http-responses");

const AuthService = require('../../Services/Auth/auth.service');

const ADMIN = 'admin-super';
const ACCOUNTANT = 'user-accountant';
const AGENT = 'user-agent';
const MANAGER = 'admin-manager';

const privilegeCheck = async (request, response, next, privileges = []) => {
    try {
        const bearerHeader = request.headers['authorization'];
        if (isNullUndefinedOrEmpty(bearerHeader)) {
            throw new UnauthorizedError('No bearer authorization token was found');
        }

        let token = bearerHeader.split(' ')[1];
        if (isNullUndefinedOrEmpty(token)) {
            return unauthorized(response, request.originalUrl, 'No token was found');
        }

        let { privilege } = await AuthService.validateTokenAsync(token);
        if (!privileges.includes(privilege)){
            return forbidden(response, request.originalUrl, 'User does not have the proper privilege level to access this path');
        }

        next();
    } catch (error) {
        internalServerError(response, request.originalUrl, error)
    }
};

const checkForAdminPrivileges = (res, req, next) => privilegeCheck(res, req, next, [ADMIN, MANAGER])

module.exports = {
    checkForAdminPrivileges
};