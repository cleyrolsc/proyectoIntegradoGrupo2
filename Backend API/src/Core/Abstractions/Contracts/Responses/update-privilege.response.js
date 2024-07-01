class UpdatePrivilegeResponse{
    constructor({name, level, status, registeredOn, modifiedOn}){
        this.name = name;
        this.level = level;
        this.status = status;
        this.registeredOn = registeredOn;
        this.modifiedOn = modifiedOn;
    }
};

module.exports = UpdatePrivilegeResponse;