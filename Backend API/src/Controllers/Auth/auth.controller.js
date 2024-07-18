const AuthService = require('../../Services/Auth/auth.service');

const loginAsync = async (request, response, next) => {
    try {
        let {username, password} = request.body;
        let payload = await AuthService.verifyUserAsync(username, password);

        let token = AuthService.generateToken(payload);

        response.status(200).json({token});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginAsync
};