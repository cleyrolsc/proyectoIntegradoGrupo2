const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const SchedulesController = require('./schedules.controller');

const schedulesRouter = express.Router();

/**
* @openapi
* '/api/schedules/register-hour':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Schedules Controller
*     summary: Register hours for specific activities.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - eventId
*              - employeeId
*            properties:
*              eventId:
*                type: integer
*                default: 11
*              employeeId:
*                type: integer
*                default: 23
*     responses:
*      201:
*        description: Created
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 201
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/register-hour'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                    id:
*                      type: integer
*                      default: 1
*                    eventId:
*                      type: integer
*                      default: 1
*                    event:
*                      type: string
*                      default: 'Working Starts'
*                    employeeId:
*                      type: integer
*                      default: 1
*                    employee:
*                      type: string
*                      default: 'Doe John'
*      400:
*        description: Bad Request
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 400
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/register-hour'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: error message
*                  properties:
*                    errorType:
*                      type: string
*                      example: 'Error'
*                    message:
*                      type: string
*                      example: 'this is an example error message'
*      401:
*        description: Unauthorized
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 401
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/register-hour'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: error message
*                  properties:
*                    errorType:
*                      type: string
*                      example: 'Error'
*                    message:
*                      type: string
*                      example: 'this is an example error message'
*      500:
*        description: Server Error
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 500
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/register-hour'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: error message
*                  properties:
*                    errorType:
*                      type: string
*                      example: 'Error'
*                    message:
*                      type: string
*                      example: 'this is an example error message'
*/
schedulesRouter.post('/register-hour', SchedulesController.registerEmployeeHourAsync);

//schedulesRouter.get('/api/schedules/employee-hours', SchedulesController.fetchEmployeeHourHistoryAsync);
schedulesRouter.get('/hours/employee', checkForAdminPrivileges, SchedulesController.fetchEmployeeHourHistoryByDateRangeAsync);
//schedulesRouter.get('/api/schedules/hours-by-event-type', SchedulesController.fetchRegisteredHoursByEventTypeAsync);
schedulesRouter.get('/hours/event-type', checkForAdminPrivileges, SchedulesController.fetchRegisteredHoursByEventTypeByDateRangeAsync);
schedulesRouter.get('/hours', checkForAdminPrivileges, SchedulesController.fetchAllRegisteredHoursByDateRangeAsync);

module.exports = schedulesRouter;