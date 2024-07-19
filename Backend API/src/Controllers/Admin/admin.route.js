const express = require('express');

const AdminController = require('./admin.controller');

const adminRouter = express.Router();

adminRouter.post('/register-admin', AdminController.registerAdminUserAsync);
adminRouter.post('/register-user', AdminController.registerUserAsync);

module.exports = adminRouter;