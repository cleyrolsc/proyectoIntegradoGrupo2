class UserModel {
    constructor(username, employeeId, type, priviligeLevel, suspendPrivilige, status, registeredOn){
        this.username = username;
        this.employeeId = employeeId;
        this.type = type;
        this.priviligeLevel = priviligeLevel;
        this.suspendPrivilige = suspendPrivilige;
        this.status = status;
        this.registeredOn = registeredOn;
    }
};

module.exports = UserModel;