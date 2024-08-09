const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const SchedulesController = require('./schedules.controller');

const schedulesRouter = express.Router();

schedulesRouter.put('/api/schedules/create-event', SchedulesController.fetchCreateSchedule);
schedulesRouter.get('/api/schedules/employee-schedules', SchedulesController.fetchGetAllEmployeeASchedules);
schedulesRouter.get('/api/schedules/employee-schedules-range', SchedulesController.fetchGetAllEmployeeScheduleByDateRange);
schedulesRouter.get('/api/schedules/event-schedules', SchedulesController.fetchGetAllEventSchedules);
schedulesRouter.get('/api/schedules/event-schedules-range', SchedulesController.fetchGetAllEventSchedulesByDateRange);
schedulesRouter.get('/api/schedules/all-schedules-range', SchedulesController.fetchGetAllSchedulesByDateRange);

module.exports = schedulesRouter;