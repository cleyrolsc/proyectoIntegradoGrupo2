class UserModel {
    constructor(username, employeeId, type, privilegeLevel, suspendPrivilege, status, registeredOn, modifiedOn) {
        this.username = username;
        this.employeeId = employeeId;
        this.type = type;
        this.privilegeLevel = privilegeLevel;
        this.suspendPrivilege = suspendPrivilege;
        this.status = status;
        this.registeredOn = registeredOn;
        this.modifiedOn = modifiedOn;
    }
};

module.exports = UserModel;