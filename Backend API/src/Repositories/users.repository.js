const User = require("./Entities/user.class");
const {UserStatus, UserType} = require("../Core/Abstractions/Enums");

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
    if (users.length === 0){
        return undefined;
    }

    return users[0];
};

const getUsers = () => {
    let users = DatabaseManager.query(`SELECT * FROM ${tableName}`);

    return users;
};

const updateUser = (username, type, priviligeLevel, suspendPrivilige, status) => {

    // Fetch User from DB
    let user = new User();

    user.type = type;
    user.priviligeLevel = priviligeLevel;
    user.suspendPrivilige = suspendPrivilige;
    user.status = status;
    user.modifiedOn = Date.now();

    // Update DB
};

const updateUserPassword = (username, password) => {

    // Fetch User from DB
    let user = new User();

    // encrypt password
    user.password = password;
    user.modifiedOn = Date.now();

    // Update DB
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