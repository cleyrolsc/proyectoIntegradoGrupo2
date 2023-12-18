class UserModel {
    constructor(username, employeeId, type, priviligeLevel, suspendPrivilige, status, registeredOn, modifiedOn){
        this.username = username;
        this.employeeId = employeeId;
        this.type = type;
        this.priviligeLevel = priviligeLevel;
        this.suspendPrivilige = suspendPrivilige;
        this.status = status;
        this.registeredOn = registeredOn;
        this.modifiedOn = modifiedOn;
    }
};

module.exports = UserModel;