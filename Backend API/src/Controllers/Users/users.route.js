const express = require('express');

const UsersController = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/profile/:username', UsersController.viewProfile);

usersRouter.put('/:username', UsersController.updateEmployeeInformation);

module.exports = usersRouter;