class CreateUserRequest {
    constructor({ employeeId, username, password, type, privilege, firstName, lastName, department, supervisor, position, payPerHour = 0.0 } = {}) {
        this.employeeId = employeeId;
        this.username = username;
        this.password = password;
        this.type = type; // UserType.Agent
        this.privilege = privilege; // FK Privilege
        this.firstName = firstName;
        this.lastName = lastName;
        this.payPerHour = payPerHour;
        this.department = department; // FK Department
        this.supervisor = supervisor; // FK User
        this.position = position; // FK Position
    }
};

module.exports = CreateUserRequest;