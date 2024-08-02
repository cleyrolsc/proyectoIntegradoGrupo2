const { isNullUndefinedOrEmpty } = require("../Utils/null-checker.util");
const formatResponse = require('../Utils/response-formatter.util');

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
            return response.status(401)
                .json(formatResponse(401, request.url, 'No token was found'));
        }

        let { privilege } = await AuthService.validateTokenAsync(token);
        if (!privileges.includes(privilege)){
            return response.status(403)
                .json(formatResponse(403, request.url, 'User does not have the proper privilege level to access this path'));
        }

        next();
    } catch (error) {
        response.status(500).json(formatResponse(500, request.url, error.message));
    }
};

const checkForAdminPrivileges = (res, req, next) => privilegeCheck(res, req, next, [ADMIN, MANAGER])

module.exports = {
    checkForAdminPrivileges
};