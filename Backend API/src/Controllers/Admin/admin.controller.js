const { CreateUserRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { UserType } = require("../../Core/Abstractions/Enums");
const { BadRequestError, NotFoundError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined } = require("../../Core/Utils/null-checker.util");

const UsersService = require("../../Services/Users/users.service");
const PrivilegesService = require("../../Services/Privileges/privileges.service");

const registerAdminUser = (request, response) => {
    let { type, privilegeLevel: privilege } = request.body;
    if (type < UserType.Accounting) {
        return response.status(400).send("Administrative users cannot be of type lower than 98.");
    }

    let existingPrivilege = PrivilegesService.getPrivilege(privilege);
    let adminPrivileges = getAdminPrivileges();
    if (!adminPrivileges.includes(existingPrivilege.name)) {
        return response.status(400).send("Administrative users cannot have privilege levels lower than 98.");
    }

    let createUserRequest = new CreateUserRequest(request.body);
    let newAdmin = UsersService.registerNewUser(createUserRequest);

    response.status(201).json(newAdmin);
};

function getAdminPrivileges() {
    let privileges = PrivilegesService.getPrivilegesByLevel(98);

    let adminPrivileges = [];
    privileges.forEach(privilege => {
        adminPrivileges.push(privilege.name);
    });

    return adminPrivileges;
}

const registerNonAdminUser = (request, response) => {
    let { type, privilegeLevel: privilege } = request.body;
    if (type >= UserType.Accounting) {
        return response.status(400).send("Non administrative users cannot be of type 98 or higher.");
    }

    let existingPrivilege = PrivilegesService.getPrivilege(privilege);
    let adminPrivileges = getAdminPrivileges();
    if (adminPrivileges.includes(existingPrivilege.name)) {
        return response.status(400).send("Non administrative users cannot have privilege levels of 98 or higher.");
    }

    let createUserRequest = new CreateUserRequest(request.body);
    let newUser = UsersService.registerNewUser(createUserRequest);

    response.status(201).json(newUser);
};

module.exports = {
    registerAdminUser,
    registerNonAdminUser,
};
