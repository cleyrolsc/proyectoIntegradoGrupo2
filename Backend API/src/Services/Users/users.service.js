import {CreateUserResponse, PaginatedResponse, UserProfileResponse} from "../../Core/Abstractions/Contracts/Responses/index";
import {EmployeeModel, UserModel} from "./Models/index";
import NotFoundError from "../../Core/Abstractions/Exceptions/not-found.error";

const EmployeesRepository = require('../../Repositories/employees.repository');
const UsersRepository = require('../../Repositories/users.repository');

const registerNewUser = (createUserRequest) => {
    // Validate request

    let { firstName, lastName, identificationNumber, commissionPerHour, department } = createUserRequest;
    let newEmployee = EmployeesRepository.createEmployee(firstName, lastName, identificationNumber, commissionPerHour, department);

    let {username, password, priviligeLevel, type} = createUserRequest;
    let newUser = UsersRepository.createUser(username, newEmployee.id, password, priviligeLevel, type);

    return new CreateUserResponse(username, type, priviligeLevel, newEmployee.id, firstName, lastName, identificationNumber, commissionPerHour, department);
};

const getUserProfile = (username) => {
    let user = UsersRepository.getUserByUsername(username);
    if (user === undefined) {
        throw NotFoundError();
    }

    let employeeInfo = EmployeesRepository.getEmployeeById(user.employeeId);
    if (employeeInfo === undefined) {
        throw Error("Fatal error! Employe information for user, " + username + ", and employee id, " + user.employeeId + ", does not exist!");
    }

    return new UserProfileResponse(username, type, priviligeLevel,newEmployee.id, firstName, lastName, identificationNumber, commissionPerHour, department);
};

const getUsers = () => {
    let users = UsersRepository.getUsers();
    if (users.length === 0) {
        return new PaginatedResponse();
    }

    let response = new PaginatedResponse();
    response.itemsPerPage = users.length;
    response.content = users.forEach((entity) => {
        let {username, employeeId, type, priviligeLevel, suspendPrivilige, status, createdOn: registeredOn} = entity;
        new UserModel(username, employeeId, type, priviligeLevel, suspendPrivilige, status, registeredOn)
    });

    return response;
};

const updateEmployeeInformationById = (employeeId, firstName, lastName, identificationNumber, commissionPerHour, department) => {
    let updatedEmployee = EmployeesRepository.updateEmployee(employeeId, firstName, lastName, identificationNumber, commissionPerHour, department);

    return new EmployeeModel(updatedEmployee.id, updatedEmployee.firstName, updatedEmployee.lastName, newEmployee.identificationNumber, updatedEmployee.commissionPerHour, newEmployee.department, updatedEmployee.createdOn, updatedEmployee.modifiedOn);
}

const changeUserType = (username, type) => {

};

module.exports = {
    registerNewUser,
    getUserProfile,
    getUsers,
    updateEmployeeInformationById
};