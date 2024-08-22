const { UpdateEmployeeInformationRequest, UpdateUserRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { isNullOrUndefined, isNotNullNorUndefined, isNullUndefinedOrEmpty, isNotNullUndefinedNorEmpty } = require("../../Core/Utils/null-checker.util");
const { BadRequestError } = require("../../Core/Abstractions/Exceptions");
const { formatResponse } = require("../../Core/Utils/response-formatter.util");
const { extractPaginationElements } = require("../../Core/Utils/request-element-extractor.util");
const { UserStatus } = require("../../Core/Abstractions/Enums");

const UserServices = require("../../Services/Users/users.service");
const AuthService = require('../../Services/Auth/auth.service');

const fetchAllUsersAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let users = await UserServices.getUsersAsync(page, pageSize);
        
        response.status(200).json(formatResponse(200, request.originalUrl, users));
    } catch (error) {
        next(error);
    }
};

const fetchUsersByPrivilegeLevelAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        
        let privilege = '';
        if (isNotNullUndefinedNorEmpty(request.query.privilegeLevel)) {
            privilege = request.query.privilegeLevel
        }
        else {
            throw new BadRequestError('Please specify privilege level');
        }

        let users = await UserServices.getUsersByPrivilegeAsync(privilege, page, pageSize);

        response.status(200).json(formatResponse(200, request.originalUrl, users));
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
        await getUserProfileAsync(username, response, request);
    } catch (error) {
        next(error);
    }
};

const viewProfileAsync = async (request, response, next) => {
    try {
        await getUserProfileAsync(request.params.username, response, request);
    } catch (error) {
        next(error);
    }
};

async function getUserProfileAsync(username, response, request) {
    if (isNullOrUndefined(username)) {
        throw new BadRequestError('Username is undefined');
    }
  
    let profile = await UserServices.getUserProfileAsync(username);
    response.status(200).json(formatResponse(200, request.originalUrl, profile));
};

const updateEmployeeInformationAsync = async (request, response, next) => {
    try {
        let username = request.params.username;
        if(isNullOrUndefined(username)) {
            throw new BadRequestError('Username is undefined');
        }

        let { employeeInfo } = await UserServices.getUserProfileAsync(username);
        let updatedInfo = await UserServices.updateEmployeeInformationAsync(employeeInfo.employeeId, new UpdateEmployeeInformationRequest(request.body));

        response.status(200).json(formatResponse(200, request.originalUrl, updatedInfo));
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

        response.status(200).send(formatResponse(200, request.originalUrl, "Password successfully changed!"));
    } catch (error) {
        next(error);
    }
};

const suspendUserAsync = async(request, response, next) => {
  try {
    let username = request.params.username;
    if(isNullOrUndefined(username)) {
        throw new BadRequestError('Username is undefined');
    }

    let { userInfo } = await UserServices.getUserProfileAsync(username);
    if (userInfo.status === UserStatus.Suspended) {
        return response.status(200).send(formatResponse(200, request.originalUrl, `User, ${username}, has already been suspended`));
    }

    let updateUserRequest = new UpdateUserRequest({ status: UserStatus.Suspended});
    await UserServices.updateUserAsync(username, updateUserRequest)

    response.status(200).send(formatResponse(200, request.originalUrl, `User, ${username}, has been suspended`));
  } catch (error) {
    next(error);
  }
};

const restoreUserAsync = async(request, response, next) => {
  try {
    let username = request.params.username;
    if(isNullOrUndefined(username)) {
        throw new BadRequestError('Username is undefined');
    }

    let { userInfo } = await UserServices.getUserProfileAsync(username);
    if (userInfo.status === UserStatus.Active) {
        return response.status(200).send(formatResponse(200, request.originalUrl, `User, ${username}, is already active`));
    }

    let updateUserRequest = new UpdateUserRequest({ status: UserStatus.Active});
    await UserServices.updateUserAsync(username, updateUserRequest)

    response.status(200).send(formatResponse(200, request.originalUrl, `User, ${username}, has been restored`));
  } catch (error) {
    next(error);
  }
};

module.exports = {
    fetchAllUsersAsync,
    fetchUsersByPrivilegeLevelAsync,
    viewMyProfileAsync,
    viewProfileAsync,
    updateEmployeeInformationAsync,
    changePasswordAsync,
    suspendUserAsync,
    restoreUserAsync
};