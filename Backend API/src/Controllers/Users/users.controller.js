const { UpdateEmployeeInformationRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { isNullOrUndefined, isNotNullNorUndefined, isNullUndefinedOrEmpty } = require("../../Core/Utils/null-checker.util");
const { BadRequestError } = require("../../Core/Abstractions/Exceptions");
const formatResponse = require("../../Core/Utils/response-formatter.util");

const UserServices = require("../../Services/Users/users.service");
const AuthService = require('../../Services/Auth/auth.service')

const fetchAllUsersAsync = async (request, response, next) => {
    try {        
        let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
        let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
        let users = await UserServices.getUsersAsync(page, pageSize);
        
        response.status(200).json(formatResponse(200, request.url, users));
    } catch (error) {
        next(error);
    }
};

const viewMyProfileAsync = async (request, response, next) => {
    try {
        const bearerHeader = request.header('authorization');
        if (isNullUndefinedOrEmpty(bearerHeader)) {
            throw new UnauthorizedError('No bearer authorization token was found');
        }

        let token = bearerHeader.split(' ')[1];
        if (isNullUndefinedOrEmpty(token)) {
            throw new UnauthorizedError('No token was found');
        }

        let { username } = await AuthService.validateTokenAsync(token);
        await getUseProfileAsync(username, response, request);
    } catch (error) {
        next(error);
    }
};

const viewProfileAsync = async (request, response, next) => {
    try {
        await getUseProfileAsync(request.params.username, response, request);
    } catch (error) {
        next(error);
    }
};

async function getUseProfileAsync(username, response, request) {
    if (isNullOrUndefined(username)) {
        throw new BadRequestError('Username is undefined');
    }

    let profile = await UserServices.getUserProfileAsync(username);
    response.status(200).json(formatResponse(200, request.url, profile));
};

const updateEmployeeInformationAsync = async (request, response, next) => {
    try {
        let username = request.params.username;
        if(isNullOrUndefined(username)) {
            throw new BadRequestError('Username is undefined');
        }

        let { employeeInfo } = await UserServices.getUserProfileAsync(username);
        let updatedInfo = await UserServices.updateEmployeeInformationAsync(employeeInfo.employeeId, new UpdateEmployeeInformationRequest(request.body));

        response.status(200).json(formatResponse(200, request.url, updatedInfo));
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
            throw new BadRequestError("New password cannot be the same as old password.");
        }

        await UserServices.updateUserPasswordAsync(username, oldPassword, newPassword);

        response.status(200).send(formatResponse(200, request.url, "Password successfully changed!"));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllUsersAsync,
    viewMyProfileAsync,
    viewProfileAsync,
    updateEmployeeInformationAsync,
    changePasswordAsync
};