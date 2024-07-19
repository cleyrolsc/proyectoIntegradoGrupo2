const formatResponse = require('../../Core/Utils/response-formatter.util');
const AuthService = require('../../Services/Auth/auth.service');

const loginAsync = async (request, response, next) => {
    try {
        let {username, password} = request.body;
        let payload = await AuthService.verifyUserAsync(username, password);

        let token = AuthService.generateToken(payload);

        response.status(200).json(formatResponse(200, request.url, {token}));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginAsync
};