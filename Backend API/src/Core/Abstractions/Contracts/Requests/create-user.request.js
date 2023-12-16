class CreateUserRequest {
    username;
    password;
    type; // UserType.Agent
    priviligeLevel; // FK Privilige
    firstName;
    lastName;
    identificationNumber;
    commissionPerHour = 0.0;
    department; // Department.Sales
};

module.exports = CreateUserRequest;