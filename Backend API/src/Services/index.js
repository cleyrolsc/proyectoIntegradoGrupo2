const AuthService = require("./Auth/auth.service");
const ComputedHoursService = require("./Payrolls/computed-hours.service");
const IncidentsService = require("./Payrolls/incidents.service");
const PayrollsService = require("./Payrolls/payrolls.service");
const PrivilegesService = require("./Privileges/privileges.service");
const ScheduleService = require("./Schedules/schedules.service");
const SystemService = require("./System/system.service");
const UsersService = require("./Users/users.service");

module.exports = {
    AuthService,
    ComputedHoursService,
    IncidentsService,
    PayrollsService,
    PrivilegesService,
    ScheduleService,
    SystemService,
    UsersService,
};