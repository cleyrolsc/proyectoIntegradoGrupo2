const adminRouter = require("./Admin/admin.route");
const authRouter = require("./Auth/auth.route");
const incidentsRouter = require("./Payrolls/incidents.route");
const payrollsRouter = require("./Payrolls/payrolls.controller");
const systemRouter = require("./System/system.route");
const usersRouter = require("./Users/users.route");
const schedulesRouter = require('./Schedules/schedules.route');

module.exports = {
    adminRouter,
    authRouter,
    incidentsRouter,
    payrollsRouter,
    systemRouter,
    usersRouter,
    schedulesRouter
};