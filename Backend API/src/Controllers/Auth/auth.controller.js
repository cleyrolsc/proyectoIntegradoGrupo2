const { ok } = require('../../Core/Abstractions/Contracts/HttpResponses/http-responses');

const AuthService = require('../../Services/Auth/auth.service');

const loginAsync = async (request, response, next) => {
    try {
        let {username, password} = request.body;
        let payload = await AuthService.verifyUserAsync(username, password);

        let token = AuthService.generateToken(payload);

        ok(response, request.originalUrl, {token});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginAsync
};