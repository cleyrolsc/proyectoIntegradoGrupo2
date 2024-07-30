const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const UsersController = require('./users.controller');

const usersRouter = express.Router();

/**
* @openapi
* '/api/users':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Users Controller
*     summary: Get list of users.
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
*                          username:
*                            type: string
*                            example: 'johndoe'
*                          employeeId:
*                            type: integer
*                            description: Identifier that links the employee with their username
*                            example: 50
*                          type:
*                            type: integer
*                            description: Type of the user
*                            example: 2
*                          status:
*                            type: integer
*                            description: Status of the user
*                            example: 2
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
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
usersRouter.get('/', checkForAdminPrivileges, UsersController.fetchAllUsersAsync);

/**
* @openapi
* '/api/users/{username}/profile':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Users Controller
*     summary: Get user profile.
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*           example: 'johndoe'
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
*                  example: '/{username}/profile'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                    userInfo:
*                      type: object
*                      description: User information
*                      properties:
*                        username:
*                          type: string
*                          example: 'johndoe'
*                        type:
*                          type: integer
*                          example: 1
*                        status:
*                          type: integer
*                          example: 1
*                    employeeInfo:
*                      type: object
*                      description: Employee information for the user
*                      properties:
*                        employeeId:
*                          type: integer
*                          example: 1
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                        identificationNumber:
*                          type: string
*                          example: 'ABC-123'
*                        position:
*                          type: string
*                          example: 'Senior Accountant'
*                        commissionPerHour:
*                          type: number
*                          example: 165.89
*                        department:
*                          type: object
*                          description: Department information
*                          properties:
*                            departmentName:
*                              type: string
*                              example: 'Accounting'
*                    supervisorInfo:
*                      type: object
*                      description: Employee information for the user
*                      properties:
*                        id:
*                          type: integer
*                          example: 41
*                        firstName:
*                          type: string
*                          example: 'Maria'
*                        lastName:
*                          type: string
*                          example: 'Fernandez'
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
*                  example: '/{username}/profile'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/{username}/profile'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/{username}/profile'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/{username}/profile'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
usersRouter.get('/:username/profile', UsersController.viewProfileAsync);

/**
* @openapi
* '/api/users/{username}':
*  put:
*     tags:
*     - Users Controller
*     summary: Update user's employee information
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*           example: 'johndoe'
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            properties:
*              firstName:
*                type: string
*                default: 'John'
*              lastName:
*                type: string
*                default: 'Doe'
*              identificationNumber:
*                type: string
*                default: 'ABC-123'
*              payPerHour:
*                type: number
*                default: 189.02
*              departmentId:
*                type: integer
*                default: 1
*              supervisorId:
*                type: integer
*                default: 1
*              positionId:
*                type: integer
*                default: 1
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
*                  example: '/{username}'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                    employeeInfo:
*                      type: object
*                      description: Employee information for the user
*                      properties:
*                        employeeId:
*                          type: integer
*                          example: 1
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                        identificationNumber:
*                          type: string
*                          example: 'ABC-123'
*                        position:
*                          type: string
*                          example: 'Senior Accountant'
*                        commissionPerHour:
*                          type: number
*                          example: 165.89
*                        department:
*                          type: object
*                          description: Department information
*                          properties:
*                            departmentName:
*                              type: string
*                              example: 'Accounting'
*                    supervisorInfo:
*                      type: object
*                      description: Employee information for the user
*                      properties:
*                        id:
*                          type: integer
*                          example: 41
*                        firstName:
*                          type: string
*                          example: 'Maria'
*                        lastName:
*                          type: string
*                          example: 'Fernandez'
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
*                  example: '/{username}'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/{username}'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/{username}'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
usersRouter.put('/:username', UsersController.updateEmployeeInformationAsync);

/**
* @openapi
* '/api/users/{username}/change-password':
*  patch:
*     tags:
*     - Users Controller
*     summary: Update user's password
*     parameters:
*       - in: path
*         name: username
*         schema:
*           type: string
*           example: 'johndoe'
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            properties:
*              oldPassword:
*                type: string
*                default: '1234gberb!'
*              newPassword:
*                type: string
*                default: 'niubi24232?'
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
*                  example: '/{username}/change-password'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: result of the request
*                  example: 'Password successfully changed!'
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
*                  example: '/{username}/change-password'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/{username}/change-password'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
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
*                  example: '/{username}/change-password'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
usersRouter.patch('/:username/change-password', UsersController.changePasswordAsync);

module.exports = usersRouter;