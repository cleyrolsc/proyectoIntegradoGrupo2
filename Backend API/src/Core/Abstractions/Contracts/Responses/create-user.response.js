class CreateUserResponse {
    constructor(username, type, privilegeLevel, employeeId, firstName, lastName, 
        identificationNumber, commissionPerHour, department, supervisor, position) {
        this.username = username;
        this.type = type;
        this.privilegeLevel = privilegeLevel;
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.commissionPerHour = commissionPerHour;
        this.department = department;
        this.supervisor = supervisor;
        this.position = position
    }
};

module.exports = CreateUserResponse;