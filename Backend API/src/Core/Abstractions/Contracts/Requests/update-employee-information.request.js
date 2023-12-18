class UpdateEmployeeInformationRequest {
    constructor({firstName, lastName, identificationNumber, commissionPerHour, department} = {}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.commissionPerHour = commissionPerHour;
        this.department = department;
    }
};

module.exports = UpdateEmployeeInformationRequest;