class CreateUserRequest {
    constructor(username, password, type, priviligeLevel, firstName, lastName, identificationNumber, department, commissionPerHour = 0.0){
        this.username = username;
        this.password = password;
        this.type = type; // UserType.Agent
        this.priviligeLevel = priviligeLevel; // FK Privilige
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.commissionPerHour = commissionPerHour;
        this.department = department; // Department.Sales
    }
};

module.exports = CreateUserRequest;