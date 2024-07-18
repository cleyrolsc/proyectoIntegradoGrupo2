const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { UserStatus } = require('../../Core/Abstractions/Enums');
const { UnauthorizedError } = require('../../Core/Abstractions/Exceptions');
const { isNullOrUndefined } = require('../../Core/Utils/null-checker.util');
const { UsersRepository } = require('../../Repositories/index');

// TODO: Move to environment variables
const privateKey = '786bd550-7a97-4f50-9fca-40cbb4bbcc06';

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
    let secret = process.env.PRIVATE_KEY;
    return jwt.sign({user, privilege}, secret, {
        expiresIn: '9h',
        algorithm: 'HS256'
    });
};

const validateTokenAsync = async (token) => {
    let secret = process.env.PRIVATE_KEY;
    let {user: username, privilege} = jwt.verify(token, secret);

    let user = await UsersRepository.getUserByUsernameAsync(username);
    if (isNullOrUndefined(user)) {
        throw new UnauthorizedError(`Username, ${username}, does not exist`);
    }

    return {username, privilege};
};

module.exports = {
    verifyUserAsync,
    generateToken,
    validateTokenAsync
};