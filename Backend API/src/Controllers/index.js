const adminRouter = require("./Admin/admin.route");
const authRouter = require("./Auth/auth.route");
const systemRouter = require("./System/system.route");
const usersRouter = require("./Users/users.route");

module.exports = {
    adminRouter,
    authRouter,
    systemRouter,
    usersRouter
};