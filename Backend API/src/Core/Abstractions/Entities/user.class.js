const ICreatedModifiedOn = require("../Interfaces/i-created-modified-on.interface");

class User extends ICreatedModifiedOn {
    username; // PK
    employeeId; //FK Employee
    password;
    type; // UserType.Agent (enum)
    priviligeLevel; // FK Privilige
    suspendPrivilige = false;
    status; // UserStatus.Active (enum)
}

module.exports = User;