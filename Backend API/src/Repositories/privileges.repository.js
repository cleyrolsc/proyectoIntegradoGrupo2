const { isNullOrUndefined, isNullUndefinedOrEmpty } = require("../Core/Utils/null-checker.util");
const { NotImplementedError, BadRequestError, NotFoundError } = require("../Core/Abstractions/Exceptions");
const { Op } = require('sequelize');

const Privilege = require('./Entities/privilege.class');

const createPrivilegeAsync = (name, level) => Privilege.create({
        name,
        level
    });

const getPrivilegeByNameAsync = async (name) => {
    try {
        if(isNullUndefinedOrEmpty(name)) {
            throw new BadRequestError('Privilege name cannot be undefined');
        }
    
        let privilege = await Privilege.findByPk(name);
        if(isNullOrUndefined(privilege)) {
            return undefined;
        }
    
        return privilege;
    } catch (error) {
        console.log(error);
        throw NotFoundError('Fatal Error!');
    }
};

const countPrivilegesAsync = () => Privilege.count();

const getPrivilegesAsync = (skip = 0, limit = 10, orderBy = "ASC") => Privilege.findAll({
    order: [['name', orderBy]],
    offset: skip,
    limit
});

const getPrivilegesByLevelAsync = (minLevel = 1, maxLevel = 100) => Privilege.findAll({
    where: {
        level: {[Op.between]: [minLevel, maxLevel]}
    }
});

const updatePrivilegeAsync = async (name, { level = undefined, status = undefined }) => {
    let privilege = await getPrivilegeByNameAsync(name);
    if (isNullOrUndefined(privilege)) {
        return undefined;
    }

    if (areAllParametersEmpty()){
        return privilege;
    }

    privilege.level = level ?? privilege.level;
    privilege.status = status ?? privilege.status;

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
    countPrivilegesAsync,
    getPrivilegesAsync,
    getPrivilegesByLevelAsync,
    updatePrivilegeAsync,
    deletePrivilegeAsync
};