const { CreateUserRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { UserType } = require("../../Core/Abstractions/Enums");
const { ConflictError } = require("../../Core/Abstractions/Exceptions");
const { extractPaginationElements } = require("../../Core/Utils/request-element-extractor.util");
const { badRequest, created, ok } = require("../../Core/Abstractions/Contracts/HttpResponses/http-responses");

const UsersService = require("../../Services/Users/users.service");
const PrivilegesService = require("../../Services/Privileges/privileges.service");

const registerAdminUserAsync = async (request, response, next) => {
    try {
        let { username } = request.body;
        if (!await UsersService.isUsernameAvailableAsync(username)) {
            throw new ConflictError(`Username, ${username}, is not available`);
        }

        let { type, privilege } = request.body;
        if (type < UserType.Accounting) {
            return badRequest(response, request.originalUrl, "Administrative users cannot be of type lower than 98.");
        }

        let existingPrivilege = await PrivilegesService.getPrivilegeAsync(privilege);
        if (!await isAdminPrivilege(existingPrivilege)) {
            return badRequest(response, request.originalUrl, "Administrative users cannot have privilege levels lower than 98.");
        }

        let createUserRequest = new CreateUserRequest(request.body);
        let newAdmin = await UsersService.registerNewUserAsync(createUserRequest);

        created(response, request.originalUrl, newAdmin);
    } catch (error) {
        next(error);
    }
};

async function isAdminPrivilege(privilege) {
    let { items: privileges } = await PrivilegesService.getPrivilegesByLevelAsync(98);

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
            return badRequest(response, request.originalUrl, "Non administrative users cannot be of type 98 or higher.");
        }

        let existingPrivilege = await PrivilegesService.getPrivilegeAsync(privilege);
        if (await isAdminPrivilege(existingPrivilege)) {
            return badRequest(response, request.originalUrl, "Non administrative users cannot have privilege levels 98 or higher.");
        }

        let createUserRequest = new CreateUserRequest(request.body);
        let newUser = await UsersService.registerNewUserAsync(createUserRequest);

        created(response, request.originalUrl, newUser);
    } catch (error) {
        next(error);
    }
};

const getPrivilegesAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let privileges = await PrivilegesService.getPrivilegesAsync(page, pageSize);

        ok(response, request.originalUrl, privileges);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerAdminUserAsync,
    registerUserAsync,
    getPrivilegesAsync
};
