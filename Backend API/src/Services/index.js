const AuthService = require("./Auth/auth.service");
const IncidentsService = require("./Incidents/incidents.service");
const PrivilegesService = require("./Privileges/privileges.service");
const SystemService = require("./System/system.service");
const UsersService = require("./Users/users.service");
const ScheduleService = require("./Schedules/schedules.service");

module.exports = {
    AuthService,
    IncidentsService,
    PrivilegesService,
    SystemService,
    UsersService,
    ScheduleService
};