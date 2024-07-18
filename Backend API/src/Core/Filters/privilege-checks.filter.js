const AuthService = require('../../Services/Auth/auth.service');
const { isNullUndefinedOrEmpty } = require("../Utils/null-checker.util");

const ADMIN = 'admin-super';
const ACCOUNTANT = 'user-accountant';
const AGENT = 'user-agent';
const MANAGER = 'admin-manager';

const privilegeCheck = async (request, response, next, privileges = []) => {
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

        let { privilege } = await AuthService.validateTokenAsync(token);
        if (!privileges.includes(privilege)){
            return response.status(403).json({
                statusCode: 403,
                message: 'User does not have the proper privilege level to access this path',
                timestamp: new Date().toISOString(),
                path: request.url
            });
        }

        next();
    } catch (error) {
        response.status(500).json({
            statusCode: 500,
            message: error.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};

const checkForAdminPrivileges = (res, req, next) => privilegeCheck(res, req, next, [ADMIN, MANAGER])

module.exports = {
    checkForAdminPrivileges
};