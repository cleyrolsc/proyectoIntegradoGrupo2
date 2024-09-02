const express = require('express');
const { checkForAdminPrivileges, checkForAccountingPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const PayrollsController = require('./payrolls.controller');

const payrollsRouter = express.Router();

//#region Payrolls
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
*         description: Status indicating if hours have been paid or not (0 = Pending, 1 = Paid, 2 = Rejected) (0 = Pending, 1 = Paid, 2 = Rejected)
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
* '/api/payrolls/{employeeId}':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payrolls Controller
*     summary: View payrolls for specific employee
*     parameters:
*       - in: path
*         name: employeeId
*         description: Id of employee we wish to fetch payrolls for
*         schema:
*           type: string
*           example: 'E-0002'
*       - in: query
*         name: paymentStatus
*         description: Status indicating if hours have been paid or not (0 = Pending, 1 = Paid, 2 = Rejected) ()
*         schema:
*           type: integer
*           enum: [0, 1, 2]
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
*                  example: '{employeeId}'
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
*                          fullName:
*                            type: string
*                            default: 'John Doe'
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
*                  example: '/{employeeId}'
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
*                  example: '/{employeeId}'
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
*                  example: '/{employeeId}'
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
*                  example: '/{employeeId}'
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
payrollsRouter.get('/:employeeId', PayrollsController.fetchPayrollsByEmployeeIdAsync);

/**
* @openapi
* '/api/payrolls/my/payrolls':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payrolls Controller
*     summary: View payrolls for currently logged in employee
*     parameters:
*       - in: query
*         name: paymentStatus
*         description: Status indicating if hours have been paid or not (0 = Pending, 1 = Paid, 2 = Rejected)
*         schema:
*           type: integer
*           enum: [0, 1, 2]
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
*        description: Created
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
*                  example: '/my/payrolls'
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
*                          fullName:
*                            type: string
*                            default: 'John Doe'
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
*                  example: '/my/payrolls'
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
*                  example: '/my/payrolls'
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
*                  example: '/my/payrolls'
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
*                  example: '/my/payrolls'
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
payrollsRouter.get('/my/payrolls', PayrollsController.fetchMyPayrollsAsync);

/**
* @openapi
* '/api/payrolls/my/payrolls/today':
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
*                  example: '/my/payrolls/today'
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
*                  example: '/my/payrolls/today'
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
*                  example: '/my/payrolls/today'
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
*        description: Not Found
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
*                  example: '/my/payrolls/today'
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
*                  example: '/my/payrolls/today'
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
payrollsRouter.get('/my/payrolls/today', PayrollsController.fetchMyPayrollForTodayAsync);

/**
* @openapi
* '/api/payrolls/{payrollId}/paid':
*  patch:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payrolls Controller
*     summary: Mark payroll as paid
*     parameters:
*       - in: path
*         name: payrollId
*         description: Id for payroll to be paid
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/{payrollId}/paid'
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
*                      default: 1
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
*                  example: '/{payrollId}/paid'
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
*                  example: '/{payrollId}/paid'
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
*        description: Not Found
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
*                  example: '/{payrollId}/paid'
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
*                  example: '/{payrollId}/paid'
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
payrollsRouter.patch('/:payrollId/paid', checkForAccountingPrivileges, PayrollsController.markPayrollAsPaidAsync);

/**
* @openapi
* '/api/payrolls/{payrollId}/reject':
*  patch:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payrolls Controller
*     summary: Mark payroll as rejected for payment
*     parameters:
*       - in: path
*         name: payrollId
*         description: Id for payroll to be rejected
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/{payrollId}/reject'
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
*                      default: 1
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
*                  example: '/{payrollId}/reject'
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
*                  example: '/{payrollId}/reject'
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
*        description: Not Found
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
*                  example: '/{payrollId}/reject'
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
*                  example: '/{payrollId}/reject'
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
payrollsRouter.patch('/:payrollId/reject', checkForAccountingPrivileges, PayrollsController.markPayrollAsRejectedAsync);

//#endregion

//#region Payroll Disputes
/**
* @openapi
* '/api/payrolls/disputes':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: User can submit an a payroll dispute to a supervisor approving or contesting the payroll results
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - payrollId
*              - comment
*              - employeeApproval
*            properties:
*              payrollId:
*                type: integer
*                default: 1
*              comment:
*                type: string
*                default: 'I have a complaint to make'
*              employeeApproval:
*                type: boolean
*                default: true
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
*                  example: '/dispute'
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
*                    submittedBy:
*                      type: object
*                      description: Employee that submitted the PayrollDispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0003'
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    payrollInfo:
*                      type: object
*                      description: Payroll being disputed
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        startDate:
*                          type: date
*                          default: '2024-08-18 00:00:00'
*                        endDate:
*                          type: date
*                          default: '2024-08-19 23:59:59'
*                        payPerHour:
*                          type: number
*                          example: 150.23
*                        totalWorkingHours:
*                          type: number
*                          example: 5.23
*                        payForWorkingHours:
*                          type: number
*                          example: 785.70
*                        totalTrainingHours:
*                          type: number
*                          example: 1.00
*                        payForTrainingHours:
*                          type: number
*                          example: 150.23
*                        totalBreakHours:
*                          type: number
*                          example: 1.77
*                        totalPayableHours:
*                          type: number
*                          example: 6.23
*                        totalPay:
*                          type: number
*                          example: 935.93
*                        paymentStatus:
*                          type: integer
*                          example: 0
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    employeeApproval:
*                      type: boolean
*                      default: true
*                    supervisor:
*                      type: object
*                      description: Supervisor responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0002'
*                        firstName:
*                          type: string
*                          example: 'Jane'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    supervisorApproval:
*                      type: boolean
*                      default: null
*                    manager:
*                      type: object
*                      description: Manager responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0001'
*                        firstName:
*                          type: string
*                          example: 'Josh'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    managerApproval:
*                      type: boolean
*                      default: null
*                    status:
*                      type: integer
*                      default: 1
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    lastModified:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/dispute'
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
*                  example: '/dispute'
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
*                  example: '/disputes'
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
payrollsRouter.post('/disputes', PayrollsController.registerPayrollDisputeAsync);

/**
* @openapi
* '/api/payrolls/disputes':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Get all submitted disputes.
*     parameters:
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
*                  example: '/disputes'
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
*                            example: 1
*                          employeeId:
*                            type: string 
*                            example: 'E-0003'
*                          comment:
*                            type: string
*                            example: 'This is my complaint'
*                          employeeApproval:
*                            type: boolean
*                            default: true
*                          supervisorId:
*                            type: string 
*                            example: 'E-0002'
*                          supervisorApproval:
*                            type: boolean
*                            default: true
*                          managerId:
*                            type: string 
*                            example: 'E-0001'
*                          managerApproval:
*                            type: boolean
*                            default: null
*                          submittedOn:
*                            type: date
*                            example: '2024-07-25T23:05:50.161Z'
*                          lastModified:
*                            type: date
*                            example: null
*                          status:
*                            type: integer
*                            example: 1
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
*                  example: '/disputes'
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
*                  example: '/disputes'
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
*                  example: '/disputes'
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
*        description: Not Found
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
*                  example: '/disputes'
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
*                  example: '/disputes'
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
payrollsRouter.get('/disputes', checkForAdminPrivileges, PayrollsController.fetchPayrollDisputesAsync);

/**
* @openapi
* '/api/payrolls/disputes/management':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Get list of payroll disputes assigned to the supervisor or manager currently logged in.
*     parameters:
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
*                  example: '/disputes/management'
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
*                            example: 1
*                          employeeId:
*                            type: integer
*                            example: 1
*                          comment:
*                            type: string
*                            example: 'This is my complaint'
*                          employeeApproval:
*                            type: boolean
*                            default: true
*                          supervisorId:
*                            type: string 
*                            example: 'E-0002'
*                          supervisorApproval:
*                            type: boolean
*                            default: true
*                          managerId:
*                            type: string 
*                            example: 'E-0001'
*                          managerApproval:
*                            type: boolean
*                            default: null
*                          status:
*                            type: integer
*                            example: 1
*                          submittedOn:
*                            type: date
*                            example: '2024-07-25T23:05:50.161Z'
*                          lastModified:
*                            type: date
*                            example: null
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
*                  example: '/disputes/management'
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
*                  example: '/disputes/management'
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
*                  example: '/disputes/management'
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
*        description: Not Found
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
*                  example: '/disputes/management'
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
*                  example: '/disputes/management'
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
payrollsRouter.get('/disputes/management', checkForAdminPrivileges, PayrollsController.fetchPayrollDisputeAssignedToSupervisorOrManagerAsync);

/**
* @openapi
* '/api/payrolls/disputes/{disputeId}':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Get specific payroll dispute.
*     parameters:
*       - in: path
*         name: disputeId
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/disputes/{disputeId}'
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
*                    submittedBy:
*                      type: object
*                      description: Employee that submitted the PayrollDispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0003'
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    payrollInfo:
*                      type: object
*                      description: Payroll being disputed
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        startDate:
*                          type: date
*                          default: '2024-08-18 00:00:00'
*                        endDate:
*                          type: date
*                          default: '2024-08-19 23:59:59'
*                        payPerHour:
*                          type: number
*                          example: 150.23
*                        totalWorkingHours:
*                          type: number
*                          example: 5.23
*                        payForWorkingHours:
*                          type: number
*                          example: 785.70
*                        totalTrainingHours:
*                          type: number
*                          example: 1.00
*                        payForTrainingHours:
*                          type: number
*                          example: 150.23
*                        totalBreakHours:
*                          type: number
*                          example: 1.77
*                        totalPayableHours:
*                          type: number
*                          example: 6.23
*                        totalPay:
*                          type: number
*                          example: 935.93
*                        paymentStatus:
*                          type: integer
*                          example: 0
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    employeeApproval:
*                      type: boolean
*                      default: true
*                    supervisor:
*                      type: object
*                      description: Supervisor responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0002'
*                        firstName:
*                          type: string
*                          example: 'Jane'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    supervisorApproval:
*                      type: boolean
*                      default: null
*                    manager:
*                      type: object
*                      description: Manager responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0001'
*                        firstName:
*                          type: string
*                          example: 'Josh'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    managerApproval:
*                      type: boolean
*                      default: null
*                    status:
*                      type: integer
*                      default: 1
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    lastModified:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/{disputeId}'
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
*                  example: '/disputes/{disputeId}'
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
*        description: Not Found
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
*                  example: '/disputes/{disputeId}'
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
*                  example: '/disputes/{disputeId}'
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
payrollsRouter.get('/disputes/:disputeId', PayrollsController.fetchPayrollDisputeByIdAsync);

/**
* @openapi
* '/api/payrolls/disputes/employees/my-disputes':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Get list of disputes submitted by employee currently logged in.
*     parameters:
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
*                  example: '/disputes/employees/my-disputes'
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
*                            example: 1
*                          submittedBy:
*                            type: object
*                            description: Employee that submitted the PayrollDispute
*                            properties:
*                              id:
*                                type: integer
*                                example: 1
*                              firstName:
*                                type: string
*                                example: 'John'
*                              lastName:
*                                type: string
*                                example: 'Doe'
*                          payrollInfo:
*                            type: object
*                            description: Payroll being disputed
*                            properties:
*                              id:
*                                type: integer
*                                example: 1
*                              startDate:
*                                type: date
*                                default: '2024-08-18 00:00:00'
*                              endDate:
*                                type: date
*                                default: '2024-08-19 23:59:59'
*                              payPerHour:
*                                type: number
*                                example: 150.23
*                              totalWorkingHours:
*                                type: number
*                                example: 5.23
*                              payForWorkingHours:
*                                type: number
*                                example: 785.70
*                              totalTrainingHours:
*                                type: number
*                                example: 1.00
*                              payForTrainingHours:
*                                type: number
*                                example: 150.23
*                              totalBreakHours:
*                                type: number
*                                example: 1.77
*                              totalPayableHours:
*                                type: number
*                                example: 6.23
*                              totalPay:
*                                type: number
*                                example: 935.93
*                              paymentStatus:
*                                type: integer
*                                example: 0
*                          comment:
*                            type: string
*                            default: 'I want to complain about something'
*                          employeeApproval:
*                            type: boolean
*                            default: true
*                          supervisor:
*                            type: object
*                            description: Supervisor responsible to resolve the dispute
*                            properties:
*                              id:
*                                type: string
*                                example: 'E-0002'
*                              firstName:
*                                type: string
*                                example: 'Jane'
*                              lastName:
*                                type: string
*                                example: 'Doe'
*                          supervisorApproval:
*                            type: boolean
*                            default: null
*                          manager:
*                            type: object
*                            description: Manager responsible to resolve the dispute
*                            properties:
*                              id:
*                                type: string
*                                example: 'E-0001'
*                              firstName:
*                                type: string
*                                example: 'Josh'
*                              lastName:
*                                type: string
*                                example: 'Doe'
*                          managerApproval:
*                            type: boolean
*                            default: null
*                          status:
*                            type: integer
*                            default: 1
*                          submittedOn:
*                            type: date
*                            default: '2024-07-25T23:05:50.161Z'
*                          lastModified:
*                            type: date
*                            default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/employees/my-disputes'
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
*                  example: '/disputes/employees/my-disputes'
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
*                  example: '/disputes/employees/my-disputes'
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
*        description: Not Found
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
*                  example: '/disputes/employees/my-disputes'
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
*                  example: '/disputes/employees/my-disputes'
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
payrollsRouter.get('/disputes/employees/my-disputes', PayrollsController.fetchMyPayrollDisputesAsync);

/**
* @openapi
* '/api/payrolls/disputes/employees/{employeeId}':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Get list of disputes submitted by a specific employee.
*     parameters:
*       - in: path
*         name: employeeId
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/disputes/employees/{employeeId}'
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
*                            example: 1
*                          submittedBy:
*                            type: object
*                            description: Employee that submitted the PayrollDispute
*                            properties:
*                              id:
*                                type: integer
*                                example: 1
*                              firstName:
*                                type: string
*                                example: 'John'
*                              lastName:
*                                type: string
*                                example: 'Doe'
*                          payrollInfo:
*                            type: object
*                            description: Payroll being disputed
*                            properties:
*                              id:
*                                type: integer
*                                example: 1
*                              startDate:
*                                type: date
*                                default: '2024-08-18 00:00:00'
*                              endDate:
*                                type: date
*                                default: '2024-08-19 23:59:59'
*                              payPerHour:
*                                type: number
*                                example: 150.23
*                              totalWorkingHours:
*                                type: number
*                                example: 5.23
*                              payForWorkingHours:
*                                type: number
*                                example: 785.70
*                              totalTrainingHours:
*                                type: number
*                                example: 1.00
*                              payForTrainingHours:
*                                type: number
*                                example: 150.23
*                              totalBreakHours:
*                                type: number
*                                example: 1.77
*                              totalPayableHours:
*                                type: number
*                                example: 6.23
*                              totalPay:
*                                type: number
*                                example: 935.93
*                              paymentStatus:
*                                type: integer
*                                example: 0
*                          comment:
*                            type: string
*                            default: 'I want to complain about something'
*                          employeeApproval:
*                            type: boolean
*                            default: true
*                          supervisor:
*                            type: object
*                            description: Supervisor responsible to resolve the dispute
*                            properties:
*                              id:
*                                type: string
*                                example: 'E-0002'
*                              firstName:
*                                type: string
*                                example: 'Jane'
*                              lastName:
*                                type: string
*                                example: 'Doe'
*                          supervisorApproval:
*                            type: boolean
*                            default: null
*                          manager:
*                            type: object
*                            description: Manager responsible to resolve the dispute
*                            properties:
*                              id:
*                                type: string
*                                example: 'E-0001'
*                              firstName:
*                                type: string
*                                example: 'Josh'
*                              lastName:
*                                type: string
*                                example: 'Doe'
*                          managerApproval:
*                            type: boolean
*                            default: null
*                          status:
*                            type: integer
*                            default: 1
*                          submittedOn:
*                            type: date
*                            default: '2024-07-25T23:05:50.161Z'
*                          lastModified:
*                            type: date
*                            default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/employees/{employeeId}'
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
*                  example: '/disputes/employees/{employeeId}'
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
*                  example: '/disputes/employees/{employeeId}'
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
*        description: Not Found
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
*                  example: '/disputes/employees/{employeeId}'
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
*                  example: '/disputes/employees/{employeeId}'
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
payrollsRouter.get('/disputes/employees/:employeeId', checkForAdminPrivileges, PayrollsController.fetchPayrollDisputesByEmployeeIdAsync);

/**
* @openapi
* '/api/payrolls/disputes/{disputeId}/approve':
*  patch:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Approve payroll dispute by currently logged in employee.
*     parameters:
*       - in: path
*         name: disputeId
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/disputes/{disputeId}/approve'
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
*                    submittedBy:
*                      type: object
*                      description: Employee that submitted the PayrollDispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0003'
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    payrollInfo:
*                      type: object
*                      description: Payroll being disputed
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        startDate:
*                          type: date
*                          default: '2024-08-18 00:00:00'
*                        endDate:
*                          type: date
*                          default: '2024-08-19 23:59:59'
*                        payPerHour:
*                          type: number
*                          example: 150.23
*                        totalWorkingHours:
*                          type: number
*                          example: 5.23
*                        payForWorkingHours:
*                          type: number
*                          example: 785.70
*                        totalTrainingHours:
*                          type: number
*                          example: 1.00
*                        payForTrainingHours:
*                          type: number
*                          example: 150.23
*                        totalBreakHours:
*                          type: number
*                          example: 1.77
*                        totalPayableHours:
*                          type: number
*                          example: 6.23
*                        totalPay:
*                          type: number
*                          example: 935.93
*                        paymentStatus:
*                          type: integer
*                          example: 0
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    employeeApproval:
*                      type: boolean
*                      default: true
*                    supervisor:
*                      type: object
*                      description: Supervisor responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0002'
*                        firstName:
*                          type: string
*                          example: 'Jane'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    supervisorApproval:
*                      type: boolean
*                      default: null
*                    manager:
*                      type: object
*                      description: Manager responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0001'
*                        firstName:
*                          type: string
*                          example: 'Josh'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    managerApproval:
*                      type: boolean
*                      default: null
*                    status:
*                      type: integer
*                      default: 1
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    lastModified:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/{disputeId}/approve'
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
*                  example: '/disputes/{disputeId}/approve'
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
*        description: Not Found
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
*                  example: '/disputes/{disputeId}/approve'
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
*                  example: '/disputes/{disputeId}/approve'
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
payrollsRouter.patch('/disputes/:disputeId/approve', PayrollsController.approvePayrollDisputeAsync);

/**
* @openapi
* '/api/payrolls/disputes/{disputeId}/reject':
*  patch:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Reject payroll dispute by currently logged in employee.
*     parameters:
*       - in: path
*         name: disputeId
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/disputes/{disputeId}/reject'
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
*                    submittedBy:
*                      type: object
*                      description: Employee that submitted the PayrollDispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0003'
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    payrollInfo:
*                      type: object
*                      description: Payroll being disputed
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        startDate:
*                          type: date
*                          default: '2024-08-18 00:00:00'
*                        endDate:
*                          type: date
*                          default: '2024-08-19 23:59:59'
*                        payPerHour:
*                          type: number
*                          example: 150.23
*                        totalWorkingHours:
*                          type: number
*                          example: 5.23
*                        payForWorkingHours:
*                          type: number
*                          example: 785.70
*                        totalTrainingHours:
*                          type: number
*                          example: 1.00
*                        payForTrainingHours:
*                          type: number
*                          example: 150.23
*                        totalBreakHours:
*                          type: number
*                          example: 1.77
*                        totalPayableHours:
*                          type: number
*                          example: 6.23
*                        totalPay:
*                          type: number
*                          example: 935.93
*                        paymentStatus:
*                          type: integer
*                          example: 0
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    employeeApproval:
*                      type: boolean
*                      default: true
*                    supervisor:
*                      type: object
*                      description: Supervisor responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0002'
*                        firstName:
*                          type: string
*                          example: 'Jane'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    supervisorApproval:
*                      type: boolean
*                      default: null
*                    manager:
*                      type: object
*                      description: Manager responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0001'
*                        firstName:
*                          type: string
*                          example: 'Josh'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    managerApproval:
*                      type: boolean
*                      default: null
*                    status:
*                      type: integer
*                      default: 1
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    lastModified:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/{disputeId}/reject'
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
*                  example: '/disputes/{disputeId}/reject'
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
*        description: Not Found
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
*                  example: '/disputes/{disputeId}/reject'
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
*                  example: '/disputes/{disputeId}/reject'
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
payrollsRouter.patch('/disputes/:disputeId/reject', PayrollsController.rejectPayrollDisputeAsync);

/**
* @openapi
* '/api/payrolls/disputes/{disputeId}/management/approve':
*  patch:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Approve payroll dispute by currently logged in supervisor or manager.
*     parameters:
*       - in: path
*         name: disputeId
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/disputes/{disputeId}/management/approve'
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
*                    submittedBy:
*                      type: object
*                      description: Employee that submitted the PayrollDispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0003'
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    payrollInfo:
*                      type: object
*                      description: Payroll being disputed
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        startDate:
*                          type: date
*                          default: '2024-08-18 00:00:00'
*                        endDate:
*                          type: date
*                          default: '2024-08-19 23:59:59'
*                        payPerHour:
*                          type: number
*                          example: 150.23
*                        totalWorkingHours:
*                          type: number
*                          example: 5.23
*                        payForWorkingHours:
*                          type: number
*                          example: 785.70
*                        totalTrainingHours:
*                          type: number
*                          example: 1.00
*                        payForTrainingHours:
*                          type: number
*                          example: 150.23
*                        totalBreakHours:
*                          type: number
*                          example: 1.77
*                        totalPayableHours:
*                          type: number
*                          example: 6.23
*                        totalPay:
*                          type: number
*                          example: 935.93
*                        paymentStatus:
*                          type: integer
*                          example: 0
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    employeeApproval:
*                      type: boolean
*                      default: true
*                    supervisor:
*                      type: object
*                      description: Supervisor responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0002'
*                        firstName:
*                          type: string
*                          example: 'Jane'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    supervisorApproval:
*                      type: boolean
*                      default: null
*                    manager:
*                      type: object
*                      description: Manager responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0001'
*                        firstName:
*                          type: string
*                          example: 'Josh'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    managerApproval:
*                      type: boolean
*                      default: null
*                    status:
*                      type: integer
*                      default: 1
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    lastModified:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/{disputeId}/management/approve'
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
*                  example: '/disputes/{disputeId}/management/approve'
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
*        description: Not Found
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
*                  example: '/disputes/{disputeId}/management/approve'
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
*                  example: '/disputes/{disputeId}/management/approve'
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
payrollsRouter.patch('/disputes/:disputeId/management/approve', checkForAdminPrivileges, PayrollsController.approvePayrollDisputeAsync);

/**
* @openapi
* '/api/payrolls/disputes/{disputeId}/management/reject':
*  patch:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Reject payroll dispute by currently logged in supervisor and management.
*     parameters:
*       - in: path
*         name: disputeId
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/disputes/{disputeId}/management/reject'
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
*                    submittedBy:
*                      type: object
*                      description: Employee that submitted the PayrollDispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0003'
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    payrollInfo:
*                      type: object
*                      description: Payroll being disputed
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        startDate:
*                          type: date
*                          default: '2024-08-18 00:00:00'
*                        endDate:
*                          type: date
*                          default: '2024-08-19 23:59:59'
*                        payPerHour:
*                          type: number
*                          example: 150.23
*                        totalWorkingHours:
*                          type: number
*                          example: 5.23
*                        payForWorkingHours:
*                          type: number
*                          example: 785.70
*                        totalTrainingHours:
*                          type: number
*                          example: 1.00
*                        payForTrainingHours:
*                          type: number
*                          example: 150.23
*                        totalBreakHours:
*                          type: number
*                          example: 1.77
*                        totalPayableHours:
*                          type: number
*                          example: 6.23
*                        totalPay:
*                          type: number
*                          example: 935.93
*                        paymentStatus:
*                          type: integer
*                          example: 0
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    employeeApproval:
*                      type: boolean
*                      default: true
*                    supervisor:
*                      type: object
*                      description: Supervisor responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0002'
*                        firstName:
*                          type: string
*                          example: 'Jane'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    supervisorApproval:
*                      type: boolean
*                      default: null
*                    manager:
*                      type: object
*                      description: Manager responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0001'
*                        firstName:
*                          type: string
*                          example: 'Josh'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    managerApproval:
*                      type: boolean
*                      default: null
*                    status:
*                      type: integer
*                      default: 1
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    lastModified:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/{disputeId}/management/reject'
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
*                  example: '/disputes/{disputeId}/management/reject'
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
*        description: Not Found
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
*                  example: '/disputes/{disputeId}/management/reject'
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
*                  example: '/disputes/{disputeId}/management/reject'
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
payrollsRouter.patch('/disputes/:disputeId/management/reject', checkForAdminPrivileges, PayrollsController.rejectPayrollDisputeAsync);

/**
* @openapi
* '/api/payrolls/disputes/{disputeId}/management/ready-for-payment':
*  patch:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Approve a payroll dispute for payment.
*     parameters:
*       - in: path
*         name: PayrollDisputeId
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/disputes/{disputeId}/management/ready-for-payment'
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
*                    submittedBy:
*                      type: object
*                      description: Employee that submitted the PayrollDispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0003'
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    payrollInfo:
*                      type: object
*                      description: Payroll being disputed
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        startDate:
*                          type: date
*                          default: '2024-08-18 00:00:00'
*                        endDate:
*                          type: date
*                          default: '2024-08-19 23:59:59'
*                        payPerHour:
*                          type: number
*                          example: 150.23
*                        totalWorkingHours:
*                          type: number
*                          example: 5.23
*                        payForWorkingHours:
*                          type: number
*                          example: 785.70
*                        totalTrainingHours:
*                          type: number
*                          example: 1.00
*                        payForTrainingHours:
*                          type: number
*                          example: 150.23
*                        totalBreakHours:
*                          type: number
*                          example: 1.77
*                        totalPayableHours:
*                          type: number
*                          example: 6.23
*                        totalPay:
*                          type: number
*                          example: 935.93
*                        paymentStatus:
*                          type: integer
*                          example: 0
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    employeeApproval:
*                      type: boolean
*                      default: true
*                    supervisor:
*                      type: object
*                      description: Supervisor responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0002'
*                        firstName:
*                          type: string
*                          example: 'Jane'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    supervisorApproval:
*                      type: boolean
*                      default: true
*                    manager:
*                      type: object
*                      description: Manager responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0001'
*                        firstName:
*                          type: string
*                          example: 'Josh'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    managerApproval:
*                      type: boolean
*                      default: null
*                    status:
*                      type: integer
*                      default: 2
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    lastModified:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/{disputeId}/management/ready-for-payment'
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
*                  example: '/disputes/{disputeId}/management/ready-for-payment'
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
*        description: Not Found
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
*                  example: '/disputes/{disputeId}/management/ready-for-payment'
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
*                  example: '/disputes/{disputeId}/management/ready-for-payment'
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
payrollsRouter.patch('/disputes/:disputeId/management/ready-for-payment', checkForAdminPrivileges, PayrollsController.markPayrollDisputeAsResolvedAsync);

/**
* @openapi
* '/api/payrolls/disputes/{disputeId}/management/rejected-for-payment':
*  patch:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Payroll Disputes Controller
*     summary: Reject a payroll dispute for payment.
*     parameters:
*       - in: path
*         name: PayrollDisputeId
*         schema:
*           type: integer
*           example: 1
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
*                  example: '/disputes/{disputeId}/management/rejected-for-payment'
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
*                    submittedBy:
*                      type: object
*                      description: Employee that submitted the PayrollDispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0003'
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    payrollInfo:
*                      type: object
*                      description: Payroll being disputed
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        startDate:
*                          type: date
*                          default: '2024-08-18 00:00:00'
*                        endDate:
*                          type: date
*                          default: '2024-08-19 23:59:59'
*                        payPerHour:
*                          type: number
*                          example: 150.23
*                        totalWorkingHours:
*                          type: number
*                          example: 5.23
*                        payForWorkingHours:
*                          type: number
*                          example: 785.70
*                        totalTrainingHours:
*                          type: number
*                          example: 1.00
*                        payForTrainingHours:
*                          type: number
*                          example: 150.23
*                        totalBreakHours:
*                          type: number
*                          example: 1.77
*                        totalPayableHours:
*                          type: number
*                          example: 6.23
*                        totalPay:
*                          type: number
*                          example: 935.93
*                        paymentStatus:
*                          type: integer
*                          example: 0
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    employeeApproval:
*                      type: boolean
*                      default: true
*                    supervisor:
*                      type: object
*                      description: Supervisor responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0002'
*                        firstName:
*                          type: string
*                          example: 'Jane'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    supervisorApproval:
*                      type: boolean
*                      default: false
*                    manager:
*                      type: object
*                      description: Manager responsible to resolve the dispute
*                      properties:
*                        id:
*                          type: string
*                          example: 'E-0001'
*                        firstName:
*                          type: string
*                          example: 'Josh'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    managerApproval:
*                      type: boolean
*                      default: null
*                    status:
*                      type: integer
*                      default: 3
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    lastModified:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
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
*                  example: '/disputes/{disputeId}/management/rejected-for-payment'
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
*                  example: '/disputes/{disputeId}/management/rejected-for-payment'
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
*        description: Not Found
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
*                  example: '/disputes/{disputeId}/management/rejected-for-payment'
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
*                  example: '/disputes/{disputeId}/management/rejected-for-payment'
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
payrollsRouter.patch('/disputes/:disputeId/management/rejected-for-payment', checkForAdminPrivileges, PayrollsController.markPayrollDisputeAsRejectedAsync);

//#endregion

module.exports = payrollsRouter;