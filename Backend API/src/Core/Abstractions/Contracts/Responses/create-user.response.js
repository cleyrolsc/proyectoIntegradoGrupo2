class CreateUserResponse {
    constructor(username, type, priviligeLevel, employeeId, firstName,
        lastName, identificationNumber, commissionPerHour, department) {
        this.username = username;
        this.type = type;
        this.priviligeLevel = priviligeLevel;
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.commissionPerHour = commissionPerHour;
        this.department = department;
    }
};

module.exports = CreateUserResponse;