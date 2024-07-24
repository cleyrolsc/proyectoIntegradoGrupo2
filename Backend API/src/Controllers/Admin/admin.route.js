const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const AdminController = require('./admin.controller');

const adminRouter = express.Router();

/** GET Methods */
    /**
     * @openapi
     * '/api/admin/privileges':
     *  get:
     *     tags:
     *     - Admin Controller
     *     summary: Get list of privileges
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Server Error
     */
adminRouter.get('/privileges', checkForAdminPrivileges, AdminController.getPrivilegesAsync);

adminRouter.post('/register-admin', checkForAdminPrivileges, AdminController.registerAdminUserAsync);

adminRouter.post('/register-user', checkForAdminPrivileges, AdminController.registerUserAsync);

module.exports = adminRouter;