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
    // validate request.body
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

module.exports = {
    viewProfile,
    updateEmployeeInformation
};