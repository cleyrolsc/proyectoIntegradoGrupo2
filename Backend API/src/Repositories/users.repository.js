const { UserType } = require("../Core/Abstractions/Enums");
const { isNotNullNorUndefined, isNullOrUndefined, isNullUndefinedOrEmpty } = require("../Core/Utils/null-checker.util");
const { NotImplementedError } = require("../Core/Abstractions/Exceptions");

const User = require('./Entities/user.class');

const createUserAsync = ({username, employeeId, password, privilegeId, type = UserType.Agent}) => {
    return User.create({
        username,
        employeeId,
        password,
        privilegeId,
        type
    });
};

const getUserByUsernameAsync = async (username) => {
    let user = await User.findByPk(username);
    if (isNullOrUndefined(user)) {
        return undefined;
    }

    return user;
};

const countUsersAsync = () => User.count();

const getUsersAsync = (skip = 0, limit = 10, orderBy = 'ASC') => User.findAndCountAll({
        attributes: ['username', 'type', 'privilegeSuspended', 'status', 'employeeId', 'privilegeId'],
        order: [['username', orderBy]],
        offset: skip,
        limit
    });

const getUsersByPrivilegeLevelAsync = (privilegeLevel, skip = 0, limit = 10, orderBy = 'ASC') => User.findAndCountAll({
        attributes: ['username', 'type', 'privilegeSuspended', 'status', 'employeeId', 'privilegeId']
    }, {
        where: {
            privilegeLevel
        },
        order: [['username', orderBy]],
        offset: skip,
        limit
    });

const getUserByEmployeeIdAsync = async (employeeId) => {
    let user = await User.findOne({
        where: {
            employeeId
        }
    });

    if (isNullOrUndefined(user)) {
        return undefined;
    }

    return user;
}

const updateUserAsync = async (username, { type = undefined, privilegeLevel = undefined, suspendPrivilege = undefined, status = undefined }) => {
    let user = await getUserByUsernameAsync(username);
    if (isNullOrUndefined(user)) {
        return undefined;
    }

    if (areAllParametersEmpty()){
        return user;
    }

    user.type = type ?? user.type;
    user.privilegeLevel = privilegeLevel ?? user.privilegeLevel;
    user.suspendPrivilege = suspendPrivilege ?? user.suspendPrivilege;
    user.status = status ?? user.status;

    await user.save();

    return user;

    function areAllParametersEmpty(){
        return isNullOrUndefined(type) && isNullUndefinedOrEmpty(privilegeLevel) && 
        isNullOrUndefined(suspendPrivilege) &&isNotNullNorUndefined(status);
    }
};

const updateUserPasswordAsync = async (username, newPassword) => {
    let user = await getUserByUsernameAsync(username);
    if (isNullOrUndefined(user)) {
        return undefined;
    }

    await user.update({
        password: newPassword
    });
    
    return user;
};

const deleteUserAsync = (username) => {
    throw new NotImplementedError();
};

module.exports = {
    createUserAsync,
    getUserByUsernameAsync,
    countUsersAsync,
    getUsersAsync,
    getUsersByPrivilegeLevelAsync,
    getUserByEmployeeIdAsync,
    getUserByEmployeeId,
    updateUserAsync,
    updateUserPasswordAsync,
    deleteUserAsync
};