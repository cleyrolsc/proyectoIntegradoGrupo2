const express = require('express');

const authController = require('./auth.controller');

const authRouter = express.Router();

authRouter.post('/login', authController.loginAsync);
authRouter.post('/logout', authController.logoutAsync);

module.exports = authRouter;