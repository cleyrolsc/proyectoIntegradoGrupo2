class UpdateEmployeeInformationResponse{
    constructor(employeeInfo, supervisorInfo, departmentInfo, positionInfo){
        this.employeeInfo = {
            employeeId: employeeInfo.employeeId,
            firstName: employeeInfo.firstName,
            lastName: employeeInfo.lastName,
            identificationNumber: employeeInfo.identificationNumber,
            position: positionInfo.description,
            commissionPerHour: employeeInfo.payPerHour,
            department: {
                id: departmentInfo.departmentId,
                departmentName: departmentInfo.description
            }
        };
        
        this.supervisorInfo = {
            id: supervisorInfo.employeeId,
            firstName: supervisorInfo.firstName,
            lastName: supervisorInfo.lastName
        };
    }
};

module.exports = UpdateEmployeeInformationResponse;