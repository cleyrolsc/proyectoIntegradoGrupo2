const ICreatedModifiedOn = require("../../Core/Abstractions/Interfaces/i-created-modified-on.interface");

class Privilige extends ICreatedModifiedOn {
    name; // PK;
    Level; // 1 ... 100
    status; // PriviligeStatus.Inactive (enum)
};

module.exports = Privilige;