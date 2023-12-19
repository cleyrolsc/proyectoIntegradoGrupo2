const express = require('express');

const UsersController = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/:username/profile', UsersController.viewProfile);

usersRouter.put('/:username', UsersController.updateEmployeeInformation);

usersRouter.patch('/:username/change-password', UsersController.changePassword)

module.exports = usersRouter;