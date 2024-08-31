const express = require('express');
const { checkForAdminPrivileges, checkForAccountingPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const PayrollsController = require('./payrolls.controller');

const payrollsRouter = express.Router();

/**
* @openapi
* '/api/payrolls/':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payrolls Controller
*     summary: User can submit an payroll for the day of work
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
*                  example: '/'
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
*                    startDate:
*                      type: date
*                      default: '2024-08-18 00:00:00'
*                    endDate:
*                      type: date
*                      default: '2024-08-19 23:59:59'
*                    employeeId:
*                      type: integer
*                      default: 3
*                    fullName:
*                      type: string
*                      default: 'John Doe'
*                    payPerHour:
*                      type: number
*                      default: 90.52
*                    totalWorkHours:
*                      type: number
*                      default: 5.6
*                    totalWorkPay:
*                      type: number
*                      default: 506.92
*                    totalBreakHours:
*                      type: number
*                      default: 1.4
*                    totalTrainingHours:
*                      type: number
*                      default: 1.0
*                    totalTrainingPay:
*                      type: number
*                      default: 90.52
*                    grossPay:
*                      type: number
*                      default: 597.44
*                    paymentStatus:
*                      type: integer
*                      default: 0
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
*                  example: '/'
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
*                  example: '/'
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
*      404:
*        description: Unauthorized
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 404
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/'
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
*                  example: '/'
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
payrollsRouter.post('/', PayrollsController.generatePayrollForDayAsync);

/**
* @openapi
* '/api/payrolls/':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payrolls Controller
*     summary: View all registered payrolls
*     parameters:
*       - in: query
*         name: paymentStatus
*         description: Status indicating if hours have been paid or not (0 = Pending, 1 = Paid, 2 = Rejected)
*         schema:
*           type: integer
*           enum: [0, 1, 2]
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
*                  example: '/'
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
*                      example: 100
*                    totalPages:
*                      type: integer
*                      description: Total numbers of pages that exist to be viewed
*                      example: 1000
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
*                            default: 1
*                          startDate:
*                            type: date
*                            default: '2024-08-18 00:00:00'
*                          endDate:
*                            type: date
*                            default: '2024-08-19 23:59:59'
*                          employeeId:
*                            type: integer
*                            default: 3
*                          payPerHour:
*                            type: number
*                            default: 90.52
*                          totalWorkHours:
*                            type: number
*                            default: 5.6
*                          totalWorkPay:
*                            type: number
*                            default: 506.92
*                          totalBreakHours:
*                            type: number
*                            default: 1.4
*                          totalTrainingHours:
*                            type: number
*                            default: 1.0
*                          totalTrainingPay:
*                            type: number
*                            default: 90.52
*                          grossPay:
*                            type: number
*                            default: 597.44
*                          paymentStatus:
*                            type: integer
*                            default: 0
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
*                  example: '/'
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
*                  example: '/'
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
*      404:
*        description: Unauthorized
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 404
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/'
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
*                  example: '/'
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
payrollsRouter.get('/', checkForAccountingPrivileges, PayrollsController.fetchPayrollsAsync);

/**
* @openapi
* '/api/payrolls/my-payrolls/today':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payrolls Controller
*     summary: User can fetch their payroll for today
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
*                  example: '/my-payrolls/today'
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
*                    startDate:
*                      type: date
*                      default: '2024-08-18 00:00:00'
*                    endDate:
*                      type: date
*                      default: '2024-08-19 23:59:59'
*                    employeeId:
*                      type: integer
*                      default: 3
*                    fullName:
*                      type: string
*                      default: 'John Doe'
*                    payPerHour:
*                      type: number
*                      default: 90.52
*                    totalWorkHours:
*                      type: number
*                      default: 5.6
*                    totalWorkPay:
*                      type: number
*                      default: 506.92
*                    totalBreakHours:
*                      type: number
*                      default: 1.4
*                    totalTrainingHours:
*                      type: number
*                      default: 1.0
*                    totalTrainingPay:
*                      type: number
*                      default: 90.52
*                    grossPay:
*                      type: number
*                      default: 597.44
*                    paymentStatus:
*                      type: integer
*                      default: 0
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
*                  example: '/my-payrolls/today'
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
*                  example: '/my-payrolls/today'
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
*      404:
*        description: Unauthorized
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 404
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/my-payrolls/today'
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
*                  example: '/my-payrolls/today'
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
payrollsRouter.get('/my-payrolls/today', PayrollsController.fetchEmployeePayrollsForTodayAsync);


module.exports = payrollsRouter;