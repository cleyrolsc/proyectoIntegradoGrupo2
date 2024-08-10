const { CreateUserResponse, PaginatedResponse, UserProfileResponse, UpdateEmployeeInformationResponse, UpdateUserResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { UserModel } = require("./Models");
const { BadRequestError, FatalError, NotFoundError, UnauthorizedError, ConflictError } = require("../../Core/Abstractions/Exceptions");
const { isListEmpty, isNullOrUndefined, isNotNullNorUndefined } = require("../../Core/Utils/null-checker.util");
const { formatPaginatedResponse } = require("../../Core/Utils/response-formatter.util");
const bcrypt = require("bcryptjs");

const { EmployeesRepository, UsersRepository, DepartmentRepository, 
    PositionsRepository, PrivilegesRepository } = require('../../Repositories/index');

const registerNewUserAsync = async (createUserRequest) =>{
    var newEmployee = await createEmployeeAsync();
    let newUser = await createUserAsync();

    return new CreateUserResponse(newUser.username, newUser.type, newUser.privilegeLevel, newEmployee.id, newEmployee.firstName, newEmployee.lastName, newEmployee.identificationNumber, newEmployee.payPerHour, newEmployee.departmentId, newEmployee.supervisorId, newEmployee.positionId);

    async function createEmployeeAsync() {
        let { firstName, lastName, identificationNumber } = createUserRequest;

        let existingEmployee = await EmployeesRepository.getEmployeeByIdentificationNumberAsync(identificationNumber);
        if (isNotNullNorUndefined(existingEmployee) && `${existingEmployee.firstName} ${existingEmployee.lastName}`.toLocaleLowerCase() !== `${firstName} ${lastName}`.toLocaleLowerCase()) {
            throw new ConflictError(`Identification number (${identificationNumber}) already belongs to ${existingEmployee.lastName} ${existingEmployee.firstName}`);
        }
        
        if (isNotNullNorUndefined(existingEmployee) && `${existingEmployee.firstName} ${existingEmployee.lastName}`.toLocaleLowerCase() === `${firstName} ${lastName}`.toLocaleLowerCase()) {
            return existingEmployee;
        }

        let { payPerHour, department, supervisor, position } = createUserRequest;
        var newEmployee = await EmployeesRepository.createEmployeeAsync({
            firstName,
            lastName,
            identificationNumber,
            payPerHour,
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
        await doesEmployeeAlreadyHaveAUserAccountAsync(newEmployee.id);
        await validateUsernameAsync();

        let { username, password, privilege, type } = createUserRequest;
        let hashPassword = encryptPassword(password);

        let newUser = await UsersRepository.createUserAsync({
            username,
            employeeId: newEmployee.id,
            password: hashPassword,
            privilegeId: privilege,
            type
        });

        if (isNullOrUndefined(newUser)) {
            throw new FatalError("User was not created");
        }

        return newUser;
    }

    async function doesEmployeeAlreadyHaveAUserAccountAsync(employeeId) {
        let existingUser = await UsersRepository.getUserByEmployeeId(employeeId);
        if (isNotNullNorUndefined(existingUser)) {
            throw new ConflictError(`Employee, ${newEmployee.firstName} ${newEmployee.lastName}, already has a username: ${existingUser.username}`);
        }
    }

    async function validateUsernameAsync() {
        let { username } = createUserRequest;
        if (!await isUsernameAvailableAsync(username)) {
            throw new ConflictError(`Username, ${username}, is not available`);
        }
    }
};

function encryptPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};

function encryptPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};

const getUserProfileAsync = async (username) => {
    let user = await UsersRepository.getUserByUsernameAsync(username);
    if (isNullOrUndefined(user)) {
        throw new NotFoundError(`User, ${username}, does not exist`);
    }

    let employee = await EmployeesRepository.getEmployeeByIdAsync(user.employeeId);
    if (isNullOrUndefined(employee)) {
        throw new FatalError(`Fatal error! Employee information for user, ${username}, and employee id, ${user.employeeId}, does not exist!`);
    }

    let supervisor = await EmployeesRepository.getEmployeeByIdAsync(employee.supervisorId);
    let department = await DepartmentRepository.getDepartmentByIdAsync(employee.departmentId);
    let position = await PositionsRepository.getPositionByIdAsync(employee.positionId);

    return new UserProfileResponse(user, employee, supervisor, department, position);
}

const getUsersAsync = async (currentPage = 1, itemsPerPage = 10, order = 'ASC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let {count, rows: users} = await UsersRepository.getUsersAsync(skip, itemsPerPage, order);
    if (isListEmpty(users)) {
        return new PaginatedResponse();
    }

    let userModels = formatUserModels(users);

    return formatPaginatedResponse(currentPage, itemsPerPage, userModels, count);
};

function formatUserModels(users) {
    let userModels = [];
    users.forEach((entity) => {
        let { username, employeeId, type, privilegeLevel, suspendPrivilege, status, createdAt: registeredOn, updatedAt: modifiedOn } = entity;
        userModels.push(new UserModel(username, employeeId, type, privilegeLevel, suspendPrivilege, status, registeredOn, modifiedOn));
    });

    return userModels;
}

const getUsersByPrivilegeAsync = async (privilegeName, currentPage = 1, itemsPerPage = 10, order = 'ASC') => {
    let privilege = await PrivilegesRepository.getPrivilegeByNameAsync(privilegeName);
    if (isNullOrUndefined(privilege)) {
        throw new NotFoundError(`Privilege '${privilegeName}' does not exist.`);
    }

    let skip = (currentPage - 1) * itemsPerPage;
    let {count, rows: users} = UsersRepository.getUsersByPrivilegeLevelAsync(privilege.name, skip, itemsPerPage, order);
    if (isListEmpty(users)) {
        return new PaginatedResponse();
    }

    let userModels = formatUserModels(users);
    
    return formatPaginatedResponse(currentPage, itemsPerPage, userModels, count);
};

const updateEmployeeInformationAsync = async (employeeId, updateEmployeeInformationRequest) => {
    let updatedEmployee = await EmployeesRepository.updateEmployeeAsync(employeeId, updateEmployeeInformationRequest);
    if (isNullOrUndefined(updatedEmployee)) {
        throw new NotFoundError(`Employee with id '${employeeId}' does not exist.`);
    }

    let supervisor = await EmployeesRepository.getEmployeeByIdAsync(updatedEmployee.supervisorId);
    let department = await DepartmentRepository.getDepartmentByIdAsync(updatedEmployee.departmentId);
    let position = await PositionsRepository.getPositionByIdAsync(updatedEmployee.positionId);

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
    
    let passwordMatch = bcrypt.compareSync(oldPassword, user.password);
    if (!passwordMatch) {
        throw new UnauthorizedError("The old password is incorrect.");
    }

    if (oldPassword === newPassword) {
        throw new BadRequestError("New password cannot be the same as old password.");
    }

    let hashPassword = encryptPassword(newPassword);
    await UsersRepository.updateUserPasswordAsync(username, hashPassword);
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

const isUsernameAvailableAsync = async (username) => {
    let existingUser = await UsersRepository.getUserByUsernameAsync(username);
    
    return isNullOrUndefined(existingUser);
}

module.exports = {
    registerNewUserAsync,
    getUserProfileAsync,
    getUsersAsync,
    getUsersByPrivilegeAsync,
    updateEmployeeInformationAsync,
    updateUserAsync,
    updateUserPasswordAsync,
    updateUserPrivilegeLevelAsync,
    isUsernameAvailableAsync
};