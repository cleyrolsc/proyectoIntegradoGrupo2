class UpdateUserResponse{
    constructor({ type, privilegeLevel, suspendPrivilege, status }){
        this.type = type;
        this.privilegeLevel = privilegeLevel;
        this.suspendPrivilege = suspendPrivilege;
        this.status = status
    }
};

module.exports = UpdateUserResponse;