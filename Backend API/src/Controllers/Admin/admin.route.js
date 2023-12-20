const express = require('express');

const AdminController = require('./admin.controller');

const adminRouter = express.Router();

adminRouter.post('/register-admin', AdminController.registerAdminUser);
adminRouter.post('/register-employee', AdminController.registerNonAdminUser);

module.exports = adminRouter;