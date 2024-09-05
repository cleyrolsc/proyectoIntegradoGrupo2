const { UpdateEmployeeInformationRequest, UpdateUserRequest } = require("../../Core/Abstractions/Contracts/Requests");
const { isNullOrUndefined, isNullUndefinedOrEmpty, isNotNullUndefinedNorEmpty, isArrayNullUndefinedOrEmpty } = require("../../Core/Utils/null-checker.util");
const { BadRequestError } = require("../../Core/Abstractions/Exceptions");
const { extractPaginationElements } = require("../../Core/Utils/request-element-extractor.util");
const { UserStatus } = require("../../Core/Abstractions/Enums");
const { ok } = require("../../Core/Abstractions/Contracts/HttpResponses/http-responses");

const UserServices = require("../../Services/Users/users.service");
const AuthService = require('../../Services/Auth/auth.service');
const { SystemService } = require("../../Services");

const fetchAllUsersAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let users = await UserServices.getUsersAsync(page, pageSize);
        
        ok(response, request.originalUrl, users);
    } catch (error) {
        next(error);
    }
};

const fetchAllAdminsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request, 100);
        let admins = await UserServices.getUsersByPrivilegeAsync('admin-manager', page, pageSize);
        if (isArrayNullUndefinedOrEmpty(admins.items)) {
            return ok(response, request.originalUrl, admins);
        }

        let employeeIds = [];
        admins.items.forEach(admin => {
            employeeIds.push(admin.employeeId);
        });

        let { items: employeeInfo} = await SystemService.getEmployeesByIdArrayAsync(employeeIds, 1, admins.items.length);
        let employeeIdentificationNumbers = Object.assign({}, ...employeeInfo.map((info) => ({[info.id]: {identificationNumber: info.identificationNumber, name: `${info.firstName} ${info.lastName}`}})));
        let users = [];
        admins.items.forEach(admin => {
            users.push({
                identificationNumber: employeeIdentificationNumbers[admin.employeeId].identificationNumber,
                name: employeeIdentificationNumbers[admin.employeeId].name,
                ...admin
            });
        });
        admins.items = users;

        ok(response, request.originalUrl, admins);
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

        ok(response, request.originalUrl, users);
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
    
    ok(response, request.originalUrl, profile);
};

const updateEmployeeInformationAsync = async (request, response, next) => {
    try {
        let username = request.params.username;
        if(isNullOrUndefined(username)) {
            throw new BadRequestError('Username is undefined');
        }

        let { employeeInfo } = await UserServices.getUserProfileAsync(username);
        let updatedInfo = await UserServices.updateEmployeeInformationAsync(employeeInfo.employeeId, new UpdateEmployeeInformationRequest(request.body));

        ok(response, request.originalUrl, updatedInfo);
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

        ok(response, request.originalUrl, "Password successfully changed!");
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
        return ok(response, request.originalUrl, `User, ${username}, has already been suspended`);
    }

    let updateUserRequest = new UpdateUserRequest({ status: UserStatus.Suspended});
    await UserServices.updateUserAsync(username, updateUserRequest)

    ok(response, request.originalUrl, `User, ${username}, has been suspended`);
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
        return ok(response, request.originalUrl, `User, ${username}, is already active`);
    }

    let updateUserRequest = new UpdateUserRequest({ status: UserStatus.Active});
    await UserServices.updateUserAsync(username, updateUserRequest)

    ok(response, request.originalUrl, `User, ${username}, has been restored`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    fetchAllUsersAsync,
    fetchAllAdminsAsync,
    fetchUsersByPrivilegeLevelAsync,
    viewMyProfileAsync,
    viewProfileAsync,
    updateEmployeeInformationAsync,
    changePasswordAsync,
    suspendUserAsync,
    restoreUserAsync
};