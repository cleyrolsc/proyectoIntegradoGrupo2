import ICreatedModifiedOn from "../../Core/Abstractions/Interfaces/i-created-modified-on.interface";

class Employee extends ICreatedModifiedOn {
    id; // PK
    firstName;
    lastName;
    identificationNumber;
    commissionPerHour = 0.0;
    department; // Department.Sales (enum)
};

module.exports = Employee;