const User = require("../Core/Abstractions/Entities/user.class");
import {UserStatus, UserType} from "../Core/Abstractions/Enums/index";

const createUser = (username, employeeId, password, priviligeLevel, type = UserType.Agent) => {
    // validate entries

    let newUser = new User();
    newUser.username = username;
    newUser.employeeId = employeeId;
    // encrypt password
    newUser.password = password;
    newUser.type = type;
    newUser.priviligeLevel = priviligeLevel;
    newUser.status = UserStatus.Active;
    newUser.createdOn = Date.now();
    newUser.modifiedOn = undefined;

    // Save to Database
};

const getUserByUsername = (username) => {

    // Fetch from DB
};

const getUsers = () => {

    // Fetch from DB
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