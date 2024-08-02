class CreateUserRequest {
    constructor({ username, password, type, privilege, firstName, lastName, identificationNumber, department, supervisor, position, payPerHour = 0.0 } = {}) {
        this.username = username;
        this.password = password;
        this.type = type; // UserType.Agent
        this.privilege = privilege; // FK Privilege
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.payPerHour = payPerHour;
        this.department = department; // FK Department
        this.supervisor = supervisor; // FK User
        this.position = position; // FK Position
    }
};

module.exports = CreateUserRequest;