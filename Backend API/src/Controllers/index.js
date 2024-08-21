const adminRouter = require("./Admin/admin.route");
const authRouter = require("./Auth/auth.route");
const incidentsRouter = require("./Incidents/incidents.route");
const systemRouter = require("./System/system.route");
const usersRouter = require("./Users/users.route");
const schedulesRouter = require('./Schedules/schedules.route');

module.exports = {
    adminRouter,
    authRouter,
    incidentsRouter,
    systemRouter,
    usersRouter,
    schedulesRouter
};