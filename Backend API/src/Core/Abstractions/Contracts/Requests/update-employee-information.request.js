class UpdateEmployeeInformationRequest {
    constructor({ firstName, lastName, payPerHour, departmentId, supervisorId, positionId } = {}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.payPerHour = payPerHour;
        this.departmentId = departmentId;
        this.supervisorId = supervisorId;
        this.positionId = positionId;
    }
};

module.exports = UpdateEmployeeInformationRequest;