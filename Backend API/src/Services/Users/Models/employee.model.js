class EmployeeModel {
    constructor(id, firstName, lastName, identificationNumber, commissionPerHour, department, registeredOn, modifiedOn){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.commissionPerHour = commissionPerHour;
        this.department = department;
    }
};

module.exports = EmployeeModel;