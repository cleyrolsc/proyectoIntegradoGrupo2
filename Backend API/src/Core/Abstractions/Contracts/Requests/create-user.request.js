class CreateUserRequest {
    constructor({ username, password, type, privilegeLevel, firstName, lastName, identificationNumber, department, supervisor, position, commissionPerHour = 0.0 } = {}) {
        this.username = username;
        this.password = password;
        this.type = type; // UserType.Agent
        this.privilegeLevel = privilegeLevel; // FK Privilege
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.commissionPerHour = commissionPerHour;
        this.department = department; // FK Department
        this.supervisor = supervisor; // FK Supervisor
        this.position = position; // FK Supervisor
    }
};

module.exports = CreateUserRequest;