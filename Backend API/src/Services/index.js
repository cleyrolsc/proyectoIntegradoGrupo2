const AuthService = require("./Auth/auth.service");
const PrivilegesService = require("./Privileges/privileges.service");
const SystemService = require("./System/system.service");
const UsersService = require("./Users/users.service");
const ScheduleService = require("./Schedules/schedules.service");

module.exports = {
    AuthService,
    PrivilegesService,
    SystemService,
    UsersService,
    ScheduleService
};