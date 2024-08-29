const AuthService = require("./Auth/auth.service");
const ComputedHoursService = require("./Incidents/computed-hours.service");
const IncidentsService = require("./Incidents/incidents.service");
const PrivilegesService = require("./Privileges/privileges.service");
const ScheduleService = require("./Schedules/schedules.service");
const SystemService = require("./System/system.service");
const UsersService = require("./Users/users.service");

module.exports = {
    AuthService,
    ComputedHoursService,
    IncidentsService,
    PrivilegesService,
    ScheduleService,
    SystemService,
    UsersService,
};