const ICreatedModifiedOn = require("../../Core/Abstractions/Interfaces/i-created-modified-on.interface");

class Privilege extends ICreatedModifiedOn {
    name; // PK;
    level; // 1 ... 100
    status; // PrivilegeStatus.Inactive (enum)
};

module.exports = Privilege;