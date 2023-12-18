class UpdateUserRequest{
    constructor({type, priviligeLevel, suspendPrivilige, status} = {}){
        this.type = type;
        this.priviligeLevel = priviligeLevel;
        this.suspendPrivilige = suspendPrivilige;
        this.status = status
    }
};

module.exports = UpdateUserRequest;