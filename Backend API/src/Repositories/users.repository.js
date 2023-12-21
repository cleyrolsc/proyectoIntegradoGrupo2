const { UserStatus, UserType } = require("../Core/Abstractions/Enums");
const { isNotNullNorUndefined, isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");
const EncryptionManager = require("../Core/Utils/encryption-manager.util");

const tableName = "users";

const createUser = (username, employeeId, password, privilegeLevel, type = UserType.Agent) => {
    // Validate data

    let encryptedPassword = EncryptionManager.encrypt(password);
    let today = new Date();
    let values = `'${username}', ${+employeeId}, '${encryptedPassword}', ${+type}, '${privilegeLevel}', ${+UserStatus.Active}, ${false}, '${today.toString()}'`;

    return DatabaseManager.run(`INSERT INTO ${tableName} (username, employeeId, password, type, privilegeLevel, status, suspendPrivilege, createdOn) VALUES (${values})`);
};

const getUserByUsername = (username) => {
    let users = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE username = '${username}' LIMIT 1`);
    if (isListEmpty(users)) {
        return undefined;
    }

    return users[0];
};

const getUsers = (skip = 0, limit = 10, order = 'DESC') => {
    let users = DatabaseManager.query(`SELECT * FROM ${tableName} ORDER BY username ${order} OFFSET ${+(skip * limit)} LIMIT ${+limit}`);

    return users;
};

const getUsersByPrivilegeLevel = (privilegeLevel) => {
    let users = DatabaseManager.query(`SELECT * FROM ${tableName} ORDER BY username ASC WHERE privilegeLevel = '${privilegeLevel}'`);

    return users;
};

const updateUser = (username, { type = undefined, privilegeLevel = undefined, suspendPrivilege = undefined, status = undefined }) => {
    let user = getUserByUsername(username);
    if (isNullOrUndefined(user)) {
        return undefined;
    }

    let params = generateUpdateParameters();

    if (params === "") {
        return getUserByUsername(username);
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET ${params} WHERE username = ${username}`);
    if (result.changes === 0) {
        throw new FatalError(`Unable to update user '${username}'`);
    }

    return getUserByUsername(username);

    function generateUpdateParameters() {
        let params = "";

        if (isNotNullNorUndefined(type)) {
            params += `type = ${+type}`;
        }

        if (isNotNullUndefinedNorEmpty(privilegeLevel)) {
            params += params !== "" ? ", " : params;

            params += `privilegeLevel = '${privilegeLevel}'`;
        }

        if (isNotNullNorUndefined(suspendPrivilege)) {
            params += params !== "" ? ", " : params;

            params += `suspendPrivilege = ${suspendPrivilege}`;
        }

        if (isNotNullNorUndefined(status)) {
            params += params !== "" ? ", " : params;

            params += `status = ${+status}`;
        }

        let today = new Date();
        params += params !== "" ? `, modifiedOn = '${today.toString()}'` : `modifiedOn = '${today.toString()}'`;
        return params;
    }
};

const updateUserPassword = (username, password) => {
    let user = getUserByUsername(username);
    if (isNullOrUndefined(user)) {
        return undefined;
    }

    let encryptedPassword = EncryptionManager.encrypt(password);
    let today = new Date();
    let result = DatabaseManager.run(`UPDATE ${tableName} SET password = '${encryptedPassword}', modifiedOn = '${today.toString()}' WHERE username = '${username}'`);
    if (result.changes === 0) {
        throw new FatalError(`Unable to update user '${username}'`);
    }

    return getUserByUsername(username);
};

const deleteUser = (username) => {
    throw new Error("Not Implemented");
}

module.exports = {
    createUser,
    getUserByUsername,
    getUsers,
    getUsersByPrivilegeLevel,
    updateUser,
    updateUserPassword,
    deleteUser
};