const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const AdminController = require('./admin.controller');

const adminRouter = express.Router();

adminRouter.get('/privileges', checkForAdminPrivileges, AdminController.getPrivilegesAsync);

adminRouter.post('/register-admin', checkForAdminPrivileges, AdminController.registerAdminUserAsync);

adminRouter.post('/register-user', checkForAdminPrivileges, AdminController.registerUserAsync);

module.exports = adminRouter;