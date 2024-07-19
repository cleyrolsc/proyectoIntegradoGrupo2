class UpdateEmployeeInformationRequest {
    constructor({ firstName, lastName, identificationNumber, payPerHour, departmentId, supervisorId, positionId } = {}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.payPerHour = payPerHour;
        this.departmentId = departmentId;
        this.supervisorId = supervisorId;
        this.positionId = positionId;
    }
};

module.exports = UpdateEmployeeInformationRequest;