const { CreateUserRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { UserType } = require("../../Core/Abstractions/Enums");

const UsersService = require("../../Services/Users/users.service");
const PrivilegesService = require("../../Services/Privileges/privileges.service");
const { isNullOrUndefined, isNotNullNorUndefined } = require("../../Core/Utils/null-checker.util");

const registerAdminUserAsync = async (request, response, next) => {
    try {
        let { type, privilegeLevel: privilege } = request.body;
        if (type < UserType.Accounting) {
            return response.status(400).send("Administrative users cannot be of type lower than 98.");
        }

        let existingPrivilege = await PrivilegesService.getPrivilegeAsync(privilege);
        if (!await isAdminPrivilege(existingPrivilege)) {
            return response.status(400).send("Administrative users cannot have privilege levels lower than 98.");
        }

        let createUserRequest = new CreateUserRequest(request.body);
        let newAdmin = await UsersService.registerNewUserAsync(createUserRequest);

        response.status(201).json(newAdmin);
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
        let { type, privilegeLevel: privilege } = request.body;
        if (type >= UserType.Accounting) {
            return response.status(400).send("Non administrative users cannot be of type 98 or higher.");
        }

        let existingPrivilege = await PrivilegesService.getPrivilegeAsync(privilege);
        if (await isAdminPrivilege(existingPrivilege)) {
            return response.status(400).send("Non administrative users cannot have privilege levels 98 or higher.");
        }

        let createUserRequest = new CreateUserRequest(request.body);
        let newUser = await UsersService.registerNewUserAsync(createUserRequest);

        response.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const getPrivilegesAsync = async (request, response, next) => {
    try {
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
        let privileges = await PrivilegesService.getPrivilegesAsync(page, pageSize);

        response.status(200).json(privileges);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerAdminUserAsync,
    registerUserAsync,
    getPrivilegesAsync
};