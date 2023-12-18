const User = require("./Entities/user.class");
const {UserStatus, UserType} = require("../Core/Abstractions/Enums");
const { isNotNullNorUndefined, isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");
const EncryptionManager = require("../Core/Utils/encryption-manager.util");

const tableName = "users";

const createUser = (username, employeeId, password, priviligeLevel, type = UserType.Agent) => {
        // Validate data

    let encryptedPassword = EncryptionManager.encrypt(password);
    let values = `'${username}', ${+employeeId}, '${encryptedPassword}', ${+type}, '${priviligeLevel}', ${UserStatus.Active}, ${false}, '${Date.now().toString()}'`;
    
    return DatabaseManager.run(`INSERT INTO ${tableName} (username, employeeId, password, type, priviligeLevel, status, suspendPrivilige, createdOn) VALUES (${values})`);
};

const getUserByUsername = (username) => {
    let users = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE username = '${username}' LIMIT 1`);
    if (isListEmpty(users)){
        return undefined;
    }

    return users[0];
};

const getUsers = (skip = 0, limit = 10, order = 'DESC') => {
    let users = DatabaseManager.query(`SELECT * FROM ${tableName} ORDERBY username ${order} OFFSET ${+(skip * limit)} LIMIT ${+limit}`);

    return users;
};

const updateUser = (username, {type = undefined, priviligeLevel = undefined, suspendPrivilige = undefined, status = undefined}) => {
    let user = getUserByUsername(username);
    if (isNullOrUndefined(user)){
        return undefined;
    }

    let params = generateUpdateParameters();
    
    if (params === "") {
        return getUserByUsername(username);
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET ${params} WHERE username = ${username}`);
    if(result.changes === 0){
        throw new FatalError(`Unable to update user '${username}'`);
    }

    return getUserByUsername(username);
    
    function generateUpdateParameters() {
        let params = "";

        if (isNotNullNorUndefined(type)) {
            params += `type = ${+type}`;
        }

        if (isNotNullUndefinedNorEmpty(priviligeLevel)) {
            params += params !== "" ? ", " : params;

            params += `priviligeLevel = '${priviligeLevel}'`;
        }

        if (isNotNullNorUndefined(suspendPrivilige)) {
            params += params !== "" ? ", " : params;

            params += `suspendPrivilige = ${suspendPrivilige}`;
        }

        if (isNotNullNorUndefined(status)) {
            params += params !== "" ? ", " : params;

            params += `status = ${+status}`;
        }

        params += params !== "" ? `, modifiedOn = '${Date.now().toString()}'` : `modifiedOn = '${Date.now().toString()}'`;
        return params;
    }
};

const updateUserPassword = (username, password) => {
    let user = getUserByUsername(username);
    if (isNullOrUndefined(user)){
        return undefined;
    }

    let encryptedPassword = EncryptionManager.encrypt(password);

    let result = DatabaseManager.run(`UPDATE ${tableName} SET password = '${encryptedPassword}', modifiedOn = '${Date.now().toString()}' WHERE username = ${username}`);
    if(result.changes === 0){
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
    updateUser,
    updateUserPassword,
    deleteUser
};