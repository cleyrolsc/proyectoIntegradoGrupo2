const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const SystemController = require('./system.controller');

const systemRoute = express.Router();

systemRoute.use('/', checkForAdminPrivileges);

systemRoute.get('/departments', SystemController.fetchDepartmentsAsync);
systemRoute.post('/departments', SystemController.registerNewDepartmentAsync);

systemRoute.get('/events', SystemController.fetchEventsAsync);
systemRoute.post('/events', SystemController.registerNewEventAsync);

systemRoute.get('/positions', SystemController.fetchPositionsAsync);
systemRoute.post('/positions', SystemController.registerNewPositionAsync);

module.exports = systemRoute;