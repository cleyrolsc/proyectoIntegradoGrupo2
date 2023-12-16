const User = require("./Entities/user.class");
const {UserStatus, UserType} = require("../Core/Abstractions/Enums");
const { query } = require("../Database/database");

const EncryptionManager = require("../Core/Utils/encryption-manager.util");

const tableName = "users";

const createUser = (username, employeeId, password, priviligeLevel, type = UserType.Agent) => {
    let encryptedPassword = EncryptionManager.encrypt(password);

    var values = `${username}, ${employeeId}, ${encryptedPassword}, ${+type}, ${priviligeLevel}, ${UserStatus.Active}, ${Date.now().toString()}`;

    query(`INSERT INTO users (username, employeeId, password, type, priviligeLevel, status, createdOn) VALUES (${values})`);
};

const getUserByUsername = (username) => {
    var users = query(`SELECT * FROM ${tableName} WHERE username = '${username}' LIMIT 1`);
    if (users.length === 0){
        return undefined;
    }

    return users[0];
};

const getUsers = () => {
    var users = query(`SELECT * FROM ${tableName}`);

    return users;
};

const updateUser = (username, type, priviligeLevel, suspendPrivilige, status) => {

    // Fetch User from DB
    var user = new User();

    user.type = type;
    user.priviligeLevel = priviligeLevel;
    user.suspendPrivilige = suspendPrivilige;
    user.status = status;
    user.modifiedOn = Date.now();

    // Update DB
};

const updateUserPassword = (username, password) => {

    // Fetch User from DB
    var user = new User();

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