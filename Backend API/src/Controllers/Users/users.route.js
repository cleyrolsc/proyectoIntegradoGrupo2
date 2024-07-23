const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const UsersController = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/', checkForAdminPrivileges, UsersController.fetchAllUsersAsync);

usersRouter.get('/:username/profile', UsersController.viewProfileAsync);

usersRouter.put('/:username', UsersController.updateEmployeeInformationAsync);

usersRouter.patch('/:username/change-password', UsersController.changePasswordAsync);

module.exports = usersRouter;