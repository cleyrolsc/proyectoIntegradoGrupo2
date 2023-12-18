const { FatalError, NotFoundError } = require("../../Core/Abstractions/Exceptions");
const {UpdateEmployeeInformationRequest} = require("../../Core/Abstractions/Contracts/Requests");

const UserServices = require("../../Services/Users/users.service");

const viewProfile = (request, response) => {
    // validate request.param.username
    var username = request.params.username;

    try{
        var profile = UserServices.getUserProfile(username);
        
        response.status(200).json(profile);
    } catch (error) {
        
        console.log(error);
        response.status(404).send("No profile was found!");
    }
};

const updateEmployeeInformation = (request, response) => {
    // validate request.body and params
    let username = request.params.username;
    
    try {
        var profile = UserServices.getUserProfile(username);

        let updateEmployeeInformationRequest = new UpdateEmployeeInformationRequest(request.body);
        let user = UserServices.updateEmployeeInformationByEmployeeId(profile.employeeId, updateEmployeeInformationRequest);
        
        response.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
};

const changePassword = (request, response) => {
    // validate request.body and params
    let username = request.params.username;
    let {oldPassword, newPassword} = request.body;

    if(oldPassword === newPassword) {
        response.status(400).send("New password cannot be the same as old password.");
    }

    try {
        UserServices.updateUserPassword(username, oldPassword, newPassword);
        
        response.status(200).send("Password successfully changed!");
    } catch (error) {
        console.log(error);
        response.status(401).send("Old password is incorrect.");
    }
};

module.exports = {
    viewProfile,
    updateEmployeeInformation,
    changePassword
};