const ICreatedModifiedOn = require("../../Core/Abstractions/Interfaces/i-created-modified-on.interface");

class User extends ICreatedModifiedOn {
    username; // PK
    employeeId; //FK Employee
    password;
    type; // UserType.Agent (enum)
    privilegeLevel; // FK Privilege
    suspendPrivilege = false;
    status; // UserStatus.Active (enum)
}

module.exports = User;