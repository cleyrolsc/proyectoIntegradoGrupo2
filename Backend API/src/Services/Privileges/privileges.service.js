const { PaginatedResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { BadRequestError, NotFoundError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isListEmpty } = require("../../Core/Utils/null-checker.util");
const PrivilegeModel = require("./Models/privilege.model");
const { UserModel } = require("../Users/Models");

const PrivilegesRepository = require("../../Repositories/privileges.repository");
const UsersRepository = require("../../Repositories/users.repository");

const registerNewPrivilege = (name, level) => {
    if (level < 0 || level > 98) {
        throw new BadRequestError("New privilege level must be between 0 and 98.");
    }

    let result = PrivilegesRepository.createPrivilege(name, level);
    if (result.changes === 0) {
        throw new FatalError("Privilege was not able to be created");
    }
};

const getPrivilege = (name) => {
    let privilege = PrivilegesRepository.getPrivilegeByName(name);
    if (isNullOrUndefined(privilege)) {
        throw new NotFoundError(`Privilege '${name}' does not exist.`);
    }

    return new PrivilegeModel(privilege.name, privilege.level, privilege.status, privilege.createdOn, privilege.modifiedOn)
};

const getPrivileges = (filterByName, currentPage = 1, itemsPerPage = 10, order = "DESC") => {
    let privileges = PrivilegesRepository.getPrivileges(filterByName, currentPage - 1, itemsPerPage, order);
    if (isListEmpty(privileges)) {
        return new PaginatedResponse();
    }

    let response = new PaginatedResponse();
    response.currentPage = currentPage;
    response.itemsPerPage = itemsPerPage;
    response.totalPages = Math.ceil(users.length / itemsPerPage);
    response.hasNext = response.currentPage < response.totalPages;
    response.content = privileges.forEach((entity) => {
        let { name, level, status, createdOn: registeredOn, modifiedOn } = entity;
        return new PrivilegeModel(name, level, status, registeredOn, modifiedOn);
    });

    return response;
};

const getUsersByPrivilege = (privilegeName) => {
    let privilege = PrivilegesRepository.getPrivilegeByName(privilegeName);
    if (isNullOrUndefined(privilege)) {
        throw new NotFoundError(`Privilege '${privilegeName}' does not exist.`);
    }

    let users = UsersRepository.getUsersByPrivilegeLevel(privilege.name);
    return users.forEach((entity) => {
        let { username, employeeId, type, privilegeLevel, suspendPrivilege, status, createdOn: registeredOn, modifiedOn } = entity;
        return new UserModel(username, employeeId, type, privilegeLevel, suspendPrivilege, status, registeredOn, modifiedOn);
    });
};

const updatePrivilege = (name, updatePrivilegeRequest) => {
    let { level, status, createdOn: registeredOn, modifiedOn } = PrivilegesRepository.updatePrivilege(name, updatePrivilegeRequest);

    return new PrivilegeModel(name, level, status, registeredOn, modifiedOn);
};

const updateUserPrivilegeLevel = (privilegeName, username) => {
    let privilege = PrivilegesRepository.getPrivilegeByName(privilegeName);
    if (isNullOrUndefined(privilege)) {
        throw new NotFoundError(`Privilege '${privilegeName}' does not exist.`);
    }

    let user = UsersRepository.getUserByUsername(username);
    if (isNullOrUndefined(user)) {
        throw new NotFoundError(`User '${username}' does not exist.`);
    }

    let result = UsersRepository.updateUser(user.username, { privilegeLevel: privilege.name });
    if (result.changes === 0) {
        throw new FatalError("User was unable to be modified.");
    }
};

module.exports = {
    registerNewPrivilege,
    getPrivilege,
    getPrivileges,
    getUsersByPrivilege,
    updatePrivilege,
    updateUserPrivilegeLevel
};