const { CreateUserRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { UserType } = require("../../Core/Abstractions/Enums");

const UsersService = require("../../Services/Users/users.service");
const PrivilegesService = require("../../Services/Privileges/privileges.service");

const registerAdminUserAsync = async (request, response) => {
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
        if (error.constructor.name === "NotFoundError") {
            return response.status(404).json(error.message);
        }

        if (error.constructor.name === "BadRequestError") {
            return response.status(400).json(error.message);
        }
        
        response.status(500).json(error.message);
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

const registerUserAsync = async (request, response) => {
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
        if (error.constructor.name === "NotFoundError") {
            return response.status(404).json(error.message);
        }

        if (error.constructor.name === "BadRequestError") {
            return response.status(400).json(error.message);
        }
        
        response.status(500).json(error.message);
    }
};

module.exports = {
    registerAdminUserAsync,
    registerUserAsync,
};
