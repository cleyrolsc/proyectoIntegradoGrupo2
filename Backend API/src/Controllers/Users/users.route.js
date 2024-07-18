const express = require('express');

const UsersController = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/', UsersController.fetchAllUsersAsync);

usersRouter.get('/:username/profile', UsersController.viewProfileAsync);

usersRouter.put('/:username', UsersController.updateEmployeeInformationAsync);

usersRouter.patch('/:username/change-password', UsersController.changePasswordAsync);

module.exports = usersRouter;