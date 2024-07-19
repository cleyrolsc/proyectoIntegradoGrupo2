class UserProfileResponse {
    constructor(username, type, privilegeLevel, employeeId, firstName,
        lastName, identificationNumber, commissionPerHour, department) {
        this.username = username;
        this.type = type;
        this.privilegeLevel = privilegeLevel;
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.commissionPerHour = commissionPerHour;
        this.department = department;
    }
};

module.exports = UserProfileResponse;