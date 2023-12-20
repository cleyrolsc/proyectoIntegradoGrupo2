const { CreateUserResponse, PaginatedResponse, UserProfileResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { EmployeeModel, UserModel } = require("./Models");
const { BadRequestError, FatalError, NotFoundError, UnauthorizedError } = require("../../Core/Abstractions/Exceptions");
const { isListEmpty, isNullOrUndefined } = require("../../Core/Utils/null-checker.util");

const EmployeesRepository = require('../../Repositories/employees.repository');
const UsersRepository = require('../../Repositories/users.repository');
const EncryptionManager = require("../../Core/Utils/encryption-manager.util");

const registerNewUser = (createUserRequest) => {
    // Validate request

    let { firstName, lastName, identificationNumber, commissionPerHour, department } = createUserRequest;
    let result = EmployeesRepository.createEmployee(firstName, lastName, identificationNumber, commissionPerHour, department);
    if (result.changes === 0) {
        throw new FatalError("Employee was not able to be created");
    }

    let newEmployee = EmployeesRepository.getEmployeeById(result.lastInsertRowid);

    let { username, employeeId, password, privilegeLevel, type } = createUserRequest;
    result = UsersRepository.createUser(username, employeeId, password, privilegeLevel, type);
    if (result.changes === 0) {
        throw new FatalError("User was not able to be created");
    }

    let newUser = UsersRepository.getUserByUsername(username);

    return new CreateUserResponse(newUser.username, newUser.type, newUser.privilegeLevel, newEmployee.id, newEmployee.firstName, newEmployee.lastName, newEmployee.identificationNumber, newEmployee.commissionPerHour, newEmployee.department);
};

const getUserProfile = (username) => {
    let user = UsersRepository.getUserByUsername(username);
    if (isNullOrUndefined(user)) {
        throw new NotFoundError(`User, ${username}, does not exist`);
    }

    let employeeInfo = EmployeesRepository.getEmployeeById(user.employeeId);
    if (isNullOrUndefined(employeeInfo)) {
        throw new FatalError(`Fatal error! Employee information for user, ${username}, and employee id, ${user.employeeId}, does not exist!`);
    }

    return new UserProfileResponse(user.username, user.type, user.privilegeLevel, employeeInfo.id, employeeInfo.firstName, employeeInfo.lastName, employeeInfo.identificationNumber, employeeInfo.commissionPerHour, employeeInfo.department);
};

const getUsers = (currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let users = UsersRepository.getUsers(currentPage - 1, itemsPerPage, order);
    if (isListEmpty(users)) {
        return new PaginatedResponse();
    }

    let response = new PaginatedResponse();
    response.currentPage = currentPage;
    response.itemsPerPage = itemsPerPage;
    response.totalPages = Math.ceil(users.length / itemsPerPage);
    response.hasNext = response.currentPage < response.totalPages;
    response.content = users.forEach((entity) => {
        let { username, employeeId, type, privilegeLevel, suspendPrivilege, status, createdOn: registeredOn, modifiedOn } = entity;
        return new UserModel(username, employeeId, type, privilegeLevel, suspendPrivilege, status, registeredOn, modifiedOn);
    });

    return response;
};

const updateEmployeeInformationByEmployeeId = (employeeId, updateEmployeeInformationRequest) => {
    let updatedEmployee = EmployeesRepository.updateEmployee(employeeId, { ...updateEmployeeInformationRequest });
    if (isNullOrUndefined(updatedEmployee)) {
        throw new NotFoundError(`Employee information with id '${employeeId}' does not exist.`);
    }

    let { id, firstName, lastName, identificationNumber, commissionPerHour, department, createdOn: registeredOn, modifiedOn } = updatedEmployee;
    return new EmployeeModel(id, firstName, lastName, identificationNumber, commissionPerHour, department, registeredOn, modifiedOn);
}

const updateUser = (username, updateUserRequest) => {
    let updatedUser = UsersRepository.updateUser(username, updateUserRequest);
    if (isNullOrUndefined(updatedUser)) {
        throw new NotFoundError(`User, ${username}, does not exist.`);
    }

    return new UserModel(username, user.employeeId, user.type, user.privilegeLevel, user.suspendPrivilege, user.status, user.createdOn);
};

const updateUserPassword = (username, oldPassword, newPassword) => {
    let user = UsersRepository.getUserByUsername(username);
    if (isNullOrUndefined(user)) {
        throw new NotFoundError(`User, ${username}, does not exist`);
    }

    let encryptedPassword = EncryptionManager.encrypt(oldPassword);
    if (user.password !== encryptedPassword) {
        throw new UnauthorizedError("The old password is incorrect.");
    }

    if (oldPassword === newPassword) {
        throw new BadRequestError("New password cannot be the same as old password.");
    }

    UsersRepository.updateUserPassword(username, newPassword);
};

module.exports = {
    registerNewUser,
    getUserProfile,
    getUsers,
    updateEmployeeInformationByEmployeeId,
    updateUser,
    updateUserPassword
};