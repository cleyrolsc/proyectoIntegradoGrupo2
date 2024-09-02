const AuthService = require("./Auth/auth.service");
const PayrollsService = require("./Payrolls/payrolls.service");
const PrivilegesService = require("./Privileges/privileges.service");
const ScheduleService = require("./Schedules/schedules.service");
const SystemService = require("./System/system.service");
const UsersService = require("./Users/users.service");

module.exports = {
    AuthService,
    PayrollsService,
    PrivilegesService,
    ScheduleService,
    SystemService,
    UsersService,
};