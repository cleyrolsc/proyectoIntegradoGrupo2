const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { UserStatus } = require('../../Core/Abstractions/Enums');
const { UnauthorizedError } = require('../../Core/Abstractions/Exceptions');
const { isNullOrUndefined } = require('../../Core/Utils/null-checker.util');
const { UsersRepository } = require('../../Repositories/index');

const verifyUserAsync = async (username, password) => {
    let user = await UsersRepository.getUserByUsernameAsync(username);
    if (isNullOrUndefined(user)) {
        throw new UnauthorizedError(`Username, ${username}, does not exist`);
    }

    /*if (user.privilegeSuspended) {
        throw new UnauthorizedError("User's privileges have been suspended");
    }*/

    if (user.status !== UserStatus.Active) {
        throw new UnauthorizedError("User is not longer active");
    }

    let passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        throw new UnauthorizedError('Incorrect password');
    }

    return { 
        user: user.username, 
        privilege: user.privilegeId
    };
};

const generateToken = ({user, privilege}) => {
    let privateKey = '786bd550-7a97-4f50-9fca-40cbb4bbcc06';
    return jwt.sign({user, privilege}, privateKey, {
        expiresIn: '9h',
        algorithm: 'HS256'
    });
};

const validateToken = () => {

};

module.exports = {
    verifyUserAsync,
    generateToken,
    validateToken
};