const express = require('express');

const UsersController = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/profile/:username', UsersController.viewProfile);

usersRouter.put('/:username', UsersController.updateEmployeeInformation);

usersRouter.patch('/:username', UsersController.changePassword)

module.exports = usersRouter;