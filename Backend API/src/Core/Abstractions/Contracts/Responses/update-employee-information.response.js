class UpdateEmployeeInformationResponse{
    constructor(employeeInfo, supervisorInfo, departmentInfo, positionInfo){
        this.employeeInfo = {
            employeeId: employeeInfo.id,
            firstName: employeeInfo.firstName,
            lastName: employeeInfo.lastName,
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