
const { CreateUserRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { UserType } = require("../../Core/Abstractions/Enums");
const { BadRequestError, NotFoundError } = require("../../Core/Abstractions/Exceptions");

const UsersService = require("../../Services/Users/users.service");
const PrivilegesService = require("../../Services/Privileges/privileges.service");
const { isNullOrUndefined } = require("../../Core/Utils/null-checker.util");

const registerNonAdminUser = (request, response) => {
    let { type, privilegeLevel: privilege } = request.body;
    if (type >= UserType.Accounting) {
        return response.status(400).send("Non administrative users cannot be of type 98 or higher.");
    }

    let existingPrivilege = PrivilegesService.getPrivilege(privilege);
    let privileges = PrivilegesService.getPrivilegesByLevel(98);

    let adminPrivileges = [];
    privileges.forEach(privilege => {
        adminPrivileges.push(privilege.name);
    });
    if (adminPrivileges.includes(existingPrivilege.name)) {
        return response.status(400).send("Non administrative users cannot have privilege levels of 98 or higher.");
    }

    let createUserRequest = new CreateUserRequest(request.body);
    let newUser = UsersService.registerNewUser(createUserRequest);

    response.status(201).json(newUser);
};

module.exports = {
    registerNonAdminUser
};