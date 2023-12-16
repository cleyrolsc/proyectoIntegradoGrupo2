const { NotFoundError } = require("../../Core/Abstractions/Exceptions");
const UserServices = require("../../Services/Users/users.service");

const viewProfile = (request, response) => {
    // validate request.param.username
    try{
        
        var profile = UserServices.getUserProfile();
        
        response.status(200).json(profile);
    } catch (NotFoundError) {
        
        response.status(404).send("No profile was found!");
    }
};

module.exports = {
    viewProfile,
};