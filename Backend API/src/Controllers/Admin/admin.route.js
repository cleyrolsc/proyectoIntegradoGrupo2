const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const AdminController = require('./admin.controller');

const adminRouter = express.Router();

/**
* @openapi
* '/api/admin/privileges':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Admin Controller
*     summary: Get list of privileges.
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
*                  example: '/privileges'
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
*                          name:
*                            type: string
*                            description: Name and id of privilege
*                            example: 'privilege1'
*                          level:
*                            type: integer
*                            description: Numeric value of privilege
*                            example: 50
*                          status:
*                            type: integer
*                            description: Status of privilege
*                            example: 2
*                          registeredOn:
*                            type: string
*                            description: Date privilege was created
*                            example: '2024-07-19T02:25:38.000Z'
*                          modifiedOn:
*                            type: string
*                            description: Date privilege was modified
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
*                  example: '/privileges'
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
*                  example: '/privileges'
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
*                  example: '/privileges'
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
*                  example: '/privileges'
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
adminRouter.get('/privileges', checkForAdminPrivileges, AdminController.getPrivilegesAsync);

/**
* @openapi
* '/api/admin/register-admin':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Admin Controller
*     summary: Create new administrative user.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - employeeId
*              - username
*              - password
*              - type
*              - privilege
*              - firstName
*              - lastName
*              - payPerHour
*              - department
*              - supervisor
*              - position
*            properties:
*              employeeId:
*                type: string
*                default: 'E-0003'
*              username:
*                type: string
*                default: 'johndoe'
*              password:
*                type: string
*                default: 'johndoe20!@'
*              firstName:
*                type: string
*                default: 'John'
*              lastName:
*                type: string
*                default: 'Doe'
*              payPerHour:
*                type: number
*                default: 102.35
*              supervisor:
*                type: string
*                default: 'E-0002'
*              type:
*                type: integer
*                default: 1
*              privilege:
*                type: string
*                default: 'user-accountant'
*              department:
*                type: integer
*                default: 1
*              position:
*                type: integer
*                default: 1
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
*                  example: '/register-admin'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                    employeeId:
*                      type: string
*                      default: 'E-0003'
*                    username:
*                      type: string
*                      default: 'johndoe'
*                    firstName:
*                      type: string
*                      default: 'John'
*                    lastName:
*                      type: string
*                      default: 'Doe'
*                    payPerHour:
*                      type: number
*                      default: 102.35
*                    supervisor:
*                      type: string
*                      default: 'E-0002'
*                    type:
*                      type: integer
*                      default: 98
*                    privilegeLevel:
*                      type: integer
*                      default: 1
*                    department:
*                      type: integer
*                      default: 1
*                    position:
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
*                  example: '/register-admin'
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
*                  example: '/register-admin'
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
*                  example: '/register-admin'
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
*      409:
*        description: Conflict
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 409
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/register-admin'
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
*                  example: '/register-admin'
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
adminRouter.post('/register-admin', checkForAdminPrivileges, AdminController.registerAdminUserAsync);

/**
* @openapi
* '/api/admin/register-user':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Admin Controller
*     summary: Create new non administrative user.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - employeeId
*              - username
*              - password
*              - type
*              - privilege
*              - firstName
*              - lastName
*              - payPerHour
*              - department
*              - supervisor
*              - position
*            properties:
*              employeeId:
*                type: string
*                default: 'E-0003'
*              username:
*                type: string
*                default: 'johndoe'
*              password:
*                type: string
*                default: 'johndoe20!@'
*              firstName:
*                type: string
*                default: 'John'
*              lastName:
*                type: string
*                default: 'Doe'
*              payPerHour:
*                type: number
*                default: 102.35
*              supervisor:
*                type: string
*                default: 'E-0002'
*              type:
*                type: integer
*                default: 1
*              privilege:
*                type: string
*                default: 'user-agent'
*              department:
*                type: integer
*                default: 1
*              position:
*                type: integer
*                default: 1
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
*                  example: '/register-user'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                    employeeId:
*                      type: string
*                      default: 'E-0003'
*                    username:
*                      type: string
*                      default: 'johndoe'
*                    firstName:
*                      type: string
*                      default: 'John'
*                    lastName:
*                      type: string
*                      default: 'Doe'
*                    payPerHour:
*                      type: number
*                      default: 102.35
*                    supervisor:
*                      type: string
*                      default: 'E-0002'
*                    type:
*                      type: integer
*                      default: 1
*                    privilegeLevel:
*                      type: integer
*                      default: 1
*                    department:
*                      type: integer
*                      default: 1
*                    position:
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
*                  example: '/register-user'
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
*                  example: '/register-user'
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
*                  example: '/register-user'
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
*      409:
*        description: Conflict
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                statusCode:
*                  type: integer
*                  example: 409
*                path:
*                  type: string
*                  description: Url path of request
*                  example: '/register-admin'
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
*                  example: '/register-user'
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
adminRouter.post('/register-user', checkForAdminPrivileges, AdminController.registerUserAsync);

module.exports = adminRouter;