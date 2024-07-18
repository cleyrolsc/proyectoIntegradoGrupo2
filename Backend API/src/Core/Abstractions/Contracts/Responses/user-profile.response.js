class UserProfileResponse {
    constructor(userInfo, employeeInfo, supervisorInfo, departmentInfo, positionInfo) {
        this.userInfo = {
            username: userInfo.username,
            type: userInfo.type,
            privilegeLevel: userInfo.privilegeLevel,
            status: userInfo.status
        };

        this.employeeInfo = {
            employeeId: employeeInfo.id,
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
            id: supervisorInfo.id,
            firstName: supervisorInfo.firstName,
            lastName: supervisorInfo.lastName
        };
    }
};

module.exports = UserProfileResponse;