const ICreatedModifiedOn = require("../../Core/Abstractions/Interfaces/i-created-modified-on.interface");

class Employee extends ICreatedModifiedOn {
    id; // PK
    firstName;
    lastName;
    identificationNumber;
    payPerHour = 0.0;
    departmentId; //FK Departments
    supervisorId; // FK Employees 
    positionId; // FK Positions
};

module.exports = Employee;