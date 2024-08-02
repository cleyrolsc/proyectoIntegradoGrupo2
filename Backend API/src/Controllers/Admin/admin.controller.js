const { CreateUserRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { UserType } = require("../../Core/Abstractions/Enums");
const { isNotNullNorUndefined } = require("../../Core/Utils/null-checker.util");
const formatResponse = require("../../Core/Utils/response-formatter.util");
const { ConflictError } = require("../../Core/Abstractions/Exceptions");

const UsersService = require("../../Services/Users/users.service");
const PrivilegesService = require("../../Services/Privileges/privileges.service");

const registerAdminUserAsync = async (request, response, next) => {
    try {
        let { username } = request.body;
        if (!await UsersService.isUsernameAvailable(username)) {
            throw new ConflictError(`Username, ${username}, is not available`);
        }

        let { type, privilege } = request.body;
        if (type < UserType.Accounting) {
            return response.status(400).json(formatResponse(400, request.url, "Administrative users cannot be of type lower than 98."));
        }

        let existingPrivilege = await PrivilegesService.getPrivilegeAsync(privilege);
        if (!await isAdminPrivilege(existingPrivilege)) {
            return response.status(400).json(formatResponse(201, request.url, "Administrative users cannot have privilege levels lower than 98."));
        }

        let createUserRequest = new CreateUserRequest(request.body);
        let newAdmin = await UsersService.registerNewUserAsync(createUserRequest);

        response.status(201).json(formatResponse(201, request.url, newAdmin));
    } catch (error) {
        next(error);
    }
};

async function isAdminPrivilege(privilege) {
    let privileges = await PrivilegesService.getPrivilegesByLevelAsync(98);

    let adminPrivileges = [];
    privileges.forEach(privilege => {
        adminPrivileges.push(privilege.name);
    });
    
    return adminPrivileges.includes(privilege.name);
};

const registerUserAsync = async (request, response, next) => {
    try {
        let { username } = request.body;
        if (!await UsersService.isUsernameAvailableAsync(username)) {
            throw new ConflictError(`Username, ${username}, is not available`);
        }

        let { type, privilege } = request.body;
        if (type >= UserType.Accounting) {
            return response.status(400).json(formatResponse(400, request.url, "Non administrative users cannot be of type 98 or higher."));
        }

        let existingPrivilege = await PrivilegesService.getPrivilegeAsync(privilege);
        if (await isAdminPrivilege(existingPrivilege)) {
            return response.status(400).json(formatResponse(400, request.url, "Non administrative users cannot have privilege levels 98 or higher."));
        }

        let createUserRequest = new CreateUserRequest(request.body);
        let newUser = await UsersService.registerNewUserAsync(createUserRequest);

        response.status(201).json(formatResponse(201, request.url, newUser));
    } catch (error) {
        next(error);
    }
};

const getPrivilegesAsync = async (request, response, next) => {
    try {
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
        let privileges = await PrivilegesService.getPrivilegesAsync(page, pageSize);

        response.status(200).json(formatResponse(200, request.url, privileges));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerAdminUserAsync,
    registerUserAsync,
    getPrivilegesAsync
};
