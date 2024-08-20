const { PaginatedResponse, UpdatePrivilegeResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { BadRequestError, NotFoundError, FatalError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isListEmpty } = require("../../Core/Utils/null-checker.util");
const { formatPaginatedResponse } = require("../../Core/Utils/response-formatter.util");
const PrivilegeModel = require("./Models/privilege.model");

const PrivilegesRepository = require("../../Repositories/privileges.repository");

const registerNewPrivilegeAsync = async (name, level) => {
    if (level < 0 || level > 98) {
        throw new BadRequestError("New privilege level must be between 0 and 98.");
    }

    let privilege = await PrivilegesRepository.createPrivilegeAsync(name, level);
    if (isNullOrUndefined(privilege)) {
        throw new FatalError("Privilege was not able to be created");
    }
};

const getPrivilegeAsync = async (name) => {
    let privilege = await PrivilegesRepository.getPrivilegeByNameAsync(name);
    if (isNullOrUndefined(privilege)) {
        throw new NotFoundError(`Privilege '${name}' does not exist.`);
    }

    return new PrivilegeModel(privilege.name, privilege.level, privilege.status, privilege.createdOn, privilege.modifiedOn)
};

const getPrivilegesAsync = async (currentPage = 1, itemsPerPage = 10, order = "ASC") => {
    let skip = (currentPage - 1) * itemsPerPage;
    let {count, rows: privileges} = await PrivilegesRepository.getPrivilegesAsync(skip, itemsPerPage, order);
    if (isListEmpty(privileges)) {
        return new PaginatedResponse();
    }

    let privilegeModels = formatPrivilegeModels(privileges);

    return formatPaginatedResponse(currentPage, itemsPerPage, privilegeModels, count);
};

function formatPrivilegeModels(privileges) {
    let privilegeModels = [];
    privileges.forEach((entity) => {
        let { name, level, status, createdAt: registeredOn, updatedAt: modifiedOn } = entity;
        privilegeModels.push(new PrivilegeModel(name, level, status, registeredOn, modifiedOn));
    });
    return privilegeModels;
}

const getPrivilegesByLevelAsync = async (minLevel = 1, maxLevel = 100, currentPage = 1, itemsPerPage = 10, order = "ASC") => {
    let skip = (currentPage - 1) * itemsPerPage;
    let {count, rows: privileges} = await PrivilegesRepository.getPrivilegesByLevelAsync(minLevel, maxLevel, skip, itemsPerPage, order);
    if (isListEmpty(privileges)) {
        return new PaginatedResponse();
    }

    let privilegeModels = formatPrivilegeModels(privileges);

    return formatPaginatedResponse(currentPage, itemsPerPage, privilegeModels, count);
};

const updatePrivilegeAsync = async (name, updatePrivilegeRequest) => {

    let privilege = await PrivilegesRepository.updatePrivilegeAsync(name, updatePrivilegeRequest);

    return new UpdatePrivilegeResponse({
        name: privilege.name,
        level: privilege.level,
        status: privilege.status,
        registeredOn: privilege.createdAt,
        modifiedOn: privilege.updatedAt
    });

    return response;
};

module.exports = {
    registerNewPrivilegeAsync,
    getPrivilegeAsync,
    getPrivilegesAsync,
    getPrivilegesByLevelAsync,
    updatePrivilegeAsync
};
