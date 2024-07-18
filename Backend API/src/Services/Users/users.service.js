const { CreateUserResponse, PaginatedResponse, UserProfileResponse, UpdateEmployeeInformationResponse, UpdateUserResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { UserModel } = require("./Models");
const { BadRequestError, FatalError, NotFoundError, UnauthorizedError } = require("../../Core/Abstractions/Exceptions");
const { isListEmpty, isNullOrUndefined } = require("../../Core/Utils/null-checker.util");
const bcrypt = require("bcryptjs")

const { EmployeesRepository, UsersRepository, DepartmentRepository, PositionsRepository, PrivilegesRepository } = require('../../Repositories/index');
const EncryptionManager = require("../../Core/Utils/encryption-manager.util");

const registerNewUserAsync = async (createUserRequest) =>{
    var newEmployee = await createEmployeeAsync();
    let newUser = await createUserAsync();

    return new CreateUserResponse(newUser.username, newUser.type, newUser.privilegeLevel, newEmployee.id, newEmployee.firstName, newEmployee.lastName, newEmployee.identificationNumber, newEmployee.payPerHour, newEmployee.departmentId, newEmployee.supervisorId, newEmployee.positionId);

    async function createEmployeeAsync() {
        let { firstName, lastName, identificationNumber, commissionPerHour, department, supervisor, position } = createUserRequest;

        var newEmployee = await EmployeesRepository.createEmployeeAsync({
            firstName,
            lastName,
            identificationNumber,
            payPerHour: commissionPerHour,
            departmentId: department,
            supervisorId: supervisor,
            positionId: position
        });

        if (isNullOrUndefined(newEmployee)) {
            throw new FatalError("Employee was not created");
        }

        return newEmployee;
    }

    async function createUserAsync() {
        let { username, password, privilegeLevel, type } = createUserRequest;
        
        var salt = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, salt);

        let newUser = await UsersRepository.createUserAsync({
            username,
            employeeId: newEmployee.id,
            password: hashPassword,
            privilegeId: privilegeLevel,
            type
        });

        if (isNullOrUndefined(newUser)) {
            throw new FatalError("User was not created");
        }

        return newUser;
    }
};

const getUserProfileAsync = async (username) => {
    let user = UsersRepository.getUserByUsernameAsync(username);
    if (isNullOrUndefined(user)) {
        throw new NotFoundError(`User, ${username}, does not exist`);
    }

    let employee = EmployeesRepository.getEmployeeById(user.employeeId);
    if (isNullOrUndefined(employee)) {
        throw new FatalError(`Fatal error! Employee information for user, ${username}, and employee id, ${user.employeeId}, does not exist!`);
    }

    let supervisor = EmployeesRepository.getEmployeeByIdAsync(employee.supervisorId);
    let department = DepartmentRepository.getDepartmentByIdAsync(employee.departmentId);
    let position = PositionsRepository.getPositionByIdAsync(employee.positionId);

    return new UserProfileResponse(user, employee, supervisor, department, position);
}

const getUsersAsync = async (currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let users = await UsersRepository.getUsersAsync(currentPage - 1, itemsPerPage, order);
    if (isListEmpty(users)) {
        return new PaginatedResponse();
    }

    let response = new PaginatedResponse();
    response.currentPage = currentPage;
    response.itemsPerPage = itemsPerPage;
    response.totalPages = Math.ceil(users.length / itemsPerPage);
    response.hasNext = response.currentPage < response.totalPages;
    response.content = users.forEach((entity) => {
        let { username, employeeId, type, privilegeLevel, suspendPrivilege, status, createdAt: registeredOn, updatedAt: modifiedOn } = entity;
        return new UserModel(username, employeeId, type, privilegeLevel, suspendPrivilege, status, registeredOn, modifiedOn);
    });

    return response;
};

const getUsersByPrivilegeAsync = async (privilegeName) => {
    let privilege = await PrivilegesRepository.getPrivilegeByNameAsync(privilegeName);
    if (isNullOrUndefined(privilege)) {
        throw new NotFoundError(`Privilege '${privilegeName}' does not exist.`);
    }

    let users = UsersRepository.getUsersByPrivilegeLevelAsync(privilege.name);
    return users.forEach((entity) => {
        let { username, employeeId, type, privilegeLevel, suspendPrivilege, status, createdOn: registeredOn, modifiedOn } = entity;
        return new UserModel(username, employeeId, type, privilegeLevel, suspendPrivilege, status, registeredOn, modifiedOn);
    });

};

const updateEmployeeInformationAsync = async (employeeId, updateEmployeeInformationRequest) => {
    let updatedEmployee = await EmployeesRepository.updateEmployeeAsync(employeeId, updateEmployeeInformationRequest);
    if (isNullOrUndefined(updatedEmployee)) {
        throw new NotFoundError(`Employee with id '${employeeId}' does not exist.`);
    }

    let supervisor = EmployeesRepository.getEmployeeByIdAsync(updatedEmployee.supervisorId);
    let department = DepartmentRepository.getDepartmentByIdAsync(updatedEmployee.departmentId);
    let position = PositionsRepository.getPositionByIdAsync(updatedEmployee.positionId);

    return new UpdateEmployeeInformationResponse(updatedEmployee, supervisor, department, position);
};

const updateUserAsync = async (username, updateUserRequest) => {
    let updatedUser = await UsersRepository.updateUserAsync(username, updateUserRequest);
    if (isNullOrUndefined(updatedUser)) {
        throw new NotFoundError(`User, ${username}, does not exist.`);
    }

    return new UpdateUserResponse(updatedUser);
};

const updateUserPasswordAsync = async (username, oldPassword, newPassword) => {
    let user = await UsersRepository.getUserByUsernameAsync(username);
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

    await UsersRepository.updateUserPasswordAsync(username, newPassword);
};

const updateUserPrivilegeLevelAsync = async (privilegeName, username) => {
    let privilege = await PrivilegesRepository.getPrivilegeByNameAsync(privilegeName);
    if (isNullOrUndefined(privilege)) {
        throw new NotFoundError(`Privilege '${privilegeName}' does not exist.`);
    }

    let user = await UsersRepository.getUserByUsernameAsync(username);
    if (isNullOrUndefined(user)) {
        throw new NotFoundError(`User '${username}' does not exist.`);
    }

    await UsersRepository.updateUserAsync(user.username, { privilegeLevel: privilege.name });
};

module.exports = {
    registerNewUserAsync,
    getUserProfileAsync,
    getUsersAsync,
    getUsersByPrivilegeAsync,
    updateEmployeeInformationAsync,
    updateUserAsync,
    updateUserPasswordAsync,
    updateUserPrivilegeLevelAsync
};