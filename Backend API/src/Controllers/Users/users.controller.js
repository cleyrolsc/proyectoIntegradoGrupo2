const { UpdateEmployeeInformationRequest } = require("../../Core/Abstractions/Contracts/Requests");

const UserServices = require("../../Services/Users/users.service");

const viewProfile = (request, response) => {
    // validate request.param.username
    let username = request.params.username;
    let profile = UserServices.getUserProfile(username);

    response.status(200).json(profile);
};

const updateEmployeeInformation = (request, response) => {
    // validate request.body and params
    let username = request.params.username;
    let profile = UserServices.getUserProfile(username);

    let updateEmployeeInformationRequest = new UpdateEmployeeInformationRequest(request.body);
    let user = UserServices.updateEmployeeInformationByEmployeeId(profile.employeeId, updateEmployeeInformationRequest);

    response.status(200).json(user);
};

const changePassword = (request, response) => {
    // validate request.body and params
    let username = request.params.username;
    let { oldPassword, newPassword } = request.body;

    if (oldPassword === newPassword) {
        return response.status(400).send("New password cannot be the same as old password.");
    }

    UserServices.updateUserPassword(username, oldPassword, newPassword);

    response.status(200).send("Password successfully changed!");
};

module.exports = {
    viewProfile,
    updateEmployeeInformation,
    changePassword
};