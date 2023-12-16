const express = require('express');

const UsersController = require('./users.controller');

const usersRouter = express.Router();

usersRouter.get('/profile/:username', UsersController.viewProfile);

module.exports = usersRouter;