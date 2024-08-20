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

/**
* @openapi
* '/api/schedules/hours/employee/{employeeId}':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Schedules Controller
*     summary: Get registered hour for specific employee.
*     parameters:
*       - in: path
*         name: employeeId
*         description: Id on the employee that registered the hours
*         schema:
*           type: integer
*           example: '1'
*       - in: query
*         name: startDate
*         description: Start date to filter registered hours
*         schema:
*           type: date
*           example: '2024-08-18 00:00:00'
*       - in: query
*         name: endDate
*         description: End date to filter registered hours
*         schema:
*           type: date
*           example: '2024-08-19 23:59:59'
*       - in: query
*         name: page
*         description: Current page the user wishes to view from 1 to N
*         schema:
*           type: integer
*           example: 1
*       - in: query
*         name: pageSize
*         description: Number of items each page should have
*         schema:
*           type: integer
*           example: 10
*     responses:
*      200:
*        description: Ok
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 200
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/hours/employee/:employeeId'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                    currentPage:
*                      type: integer
*                      description: Current page that is being viewed
*                      example: 1
*                    itemsPerPage:
*                      type: integer
*                      description: Number of items included inside each page
*                      example: 10
*                    totalPages:
*                      type: integer
*                      description: Total numbers of pages that exist to be viewed
*                      example: 100
*                    hasNext:
*                      type: boolean
*                      description: Indicate if there are more pages left to be viewed (currentPage > totalPages)
*                      example: true
*                    items:
*                      type: array
*                      description: all items displayed on the page
*                      items:
*                        type: object
*                        properties:
*                          id:
*                            type: integer
*                            description: Id of registered hour
*                            example: 1
*                          eventDate:
*                            type: date
*                            description: Timestamp of registered hour
*                            example: '2024-07-19T02:25:38.000Z'
*                          eventId:
*                            type: integer
*                            description: Id of event type
*                            example: 1
*                          event:
*                            type: string
*                            description: type of event that was registered
*                            example: 'Working Starts'
*                          employeeId:
*                            type: integer
*                            description: Id of employee that registered the hour
*                            example: 1
*                          employee:
*                            type: string
*                            description: Name of employee that registered the hour
*                            example: 'Doe John'
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
*                  example: '/hours/employee/:employeeId'
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
*                  example: '/hours/employee/:employeeId'
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
*      403:
*        description: Forbidden
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 403
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/hours/employee/:employeeId'
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
*                  example: '/hours/employee/:employeeId'
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
schedulesRouter.get('/hours/employee/:employeeId', checkForAdminPrivileges, SchedulesController.fetchEmployeeHourHistoryByDateRangeAsync);

//schedulesRouter.get('/api/schedules/hours-by-event-type', SchedulesController.fetchRegisteredHoursByEventTypeAsync);
schedulesRouter.get('/hours/event-type', checkForAdminPrivileges, SchedulesController.fetchRegisteredHoursByEventTypeByDateRangeAsync);
schedulesRouter.get('/hours', checkForAdminPrivileges, SchedulesController.fetchAllRegisteredHoursByDateRangeAsync);

module.exports = schedulesRouter;