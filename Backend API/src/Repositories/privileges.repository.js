const { isNullOrUndefined, isNullUndefinedOrEmpty } = require("../Core/Utils/null-checker.util");
const { NotImplementedError, BadRequestError } = require("../Core/Abstractions/Exceptions");

const Privilege = require('./Entities/privilege.class');

const createPrivilegeAsync = (name, level) => Privilege.create({
        name,
        level
    });

const getPrivilegeByNameAsync = async (name) => {
    if(isNullUndefinedOrEmpty(name)) {
        throw new BadRequestError('Privilege name cannot be undefined');
    }

    let privilege = await Privilege.findByPk(name);
    if(isNullOrUndefined(privilege)) {
        return undefined;
    }

    return privilege;
};

const getPrivilegesAsync = (skip = 0, limit = 10, orderBy = "DESC") => Privilege.findAll({
    order: [['name', orderBy]],
    offset: skip,
    limit
});

const updatePrivilegeAsync = async (name, { level = undefined, status = undefined }) => {
    let privilege = await getPrivilegeByNameAsync(name);
    if (isNullOrUndefined(privilege)) {
        return undefined;
    }

    if (areAllParametersEmpty()){
        return privilege;
    }

    privilege.level ??= level;
    privilege.status ??= status;

    await privilege.save();

    return privilege;

    function areAllParametersEmpty(){
        return isNullOrUndefined(level) && isNullOrUndefined(status);
    }
};

const deletePrivilegeAsync = (name) => {
    throw new NotImplementedError();
}

module.exports = {
    createPrivilegeAsync,
    getPrivilegeByNameAsync,
    getPrivilegesAsync,
    updatePrivilegeAsync,
    deletePrivilegeAsync
};