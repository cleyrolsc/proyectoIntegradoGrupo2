const DepartmentRepository = require("./departments.repository");
const EmployeesRepository = require("./employees.repository");
const EventsRepository = require("./events.repository");
const PayrollDisputesRepository = require("./payroll-disputes.repository");
const PayrollsRepository = require("./payrolls.repository");
const PositionsRepository = require("./positions.repository");
const PrivilegesRepository = require("./privileges.repository");
const UsersRepository = require("./users.repository");
const SchedulesRepository = require("./schedules.repository");

module.exports = {
    DepartmentRepository,
    EmployeesRepository,
    EventsRepository,
    PayrollDisputesRepository,
    PayrollsRepository,
    PositionsRepository,
    PrivilegesRepository,
    UsersRepository,
    SchedulesRepository
};