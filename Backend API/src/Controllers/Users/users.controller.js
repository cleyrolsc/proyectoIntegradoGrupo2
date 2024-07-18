const { UpdateEmployeeInformationRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { isNullOrUndefined } = require("../../Core/Utils/null-checker.util");
const { BadRequestError, NotFoundError } = require("../../Core/Abstractions/Exceptions");

const UserServices = require("../../Services/Users/users.service");

const fetchAllUsersAsync = async (request, response, next) => {
    try {
        let users = await UserServices.getUsersAsync();
        response.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const viewProfileAsync = async (request, response, next) => {
    try {
        let username = request.params.username;
        if(isNullOrUndefined(username)) {
            throw new BadRequestError('Username is undefined');
        }

        let profile = await UserServices.getUserProfileAsync(username);
        response.status(200).json(profile);
    } catch (error) {
        next(error);
    }
};

const updateEmployeeInformationAsync = async (request, response, next) => {
    try {
        let username = request.params.username;
        if(isNullOrUndefined(username)) {
            throw new BadRequestError('Username is undefined');
        }

        let { employeeInfo } = await UserServices.getUserProfileAsync(username);
        let updatedInfo = await UserServices.updateEmployeeInformationAsync(employeeInfo.employeeId, new UpdateEmployeeInformationRequest(request.body));

        response.status(200).json(updatedInfo);
    } catch (error) {
        next(error);
    }
};

const changePasswordAsync = async (request, response, next) => {
    try {
        let username = request.params.username;
        if(isNullOrUndefined(username)) {
            throw new BadRequestError('Username is undefined');
        }

        let { oldPassword, newPassword } = request.body;

        if (oldPassword === newPassword) {
            return response.status(400).send("New password cannot be the same as old password.");
        }

        await UserServices.updateUserPasswordAsync(username, oldPassword, newPassword);

        response.status(200).send("Password successfully changed!");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllUsersAsync,
    viewProfileAsync,
    updateEmployeeInformationAsync,
    changePasswordAsync
};