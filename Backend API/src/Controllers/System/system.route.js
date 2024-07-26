const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const SystemController = require('./system.controller');

const systemRoute = express.Router();

systemRoute.use('/', checkForAdminPrivileges);

/**
* @openapi
* '/api/system/departments':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - System Controller
*     summary: Get list of departments.
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
*                  example: '/departments'
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
*                            description: Department id
*                            example: 2
*                          description:
*                            type: string
*                            description: Description of department
*                            example: 'Human Resources'
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
*                  example: '/departments'
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
*                  example: '/departments'
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
*                  example: '/departments'
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
*                  example: '/departments'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
systemRoute.get('/departments', SystemController.fetchDepartmentsAsync);

/**
* @openapi
* '/api/system/departments':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - System Controller
*     summary: Create new department.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - description
*            properties:
*              description:
*                type: string
*                default: 'Accounting'
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
*                  example: '/departments'
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
*                    description:
*                      type: string
*                      default: 'Accounting'
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
*                  example: '/departments'
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
*                  example: '/departments'
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
*                  example: '/departments'
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
*                  example: '/departments'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
systemRoute.post('/departments', SystemController.registerNewDepartmentAsync);

/**
* @openapi
* '/api/system/events':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - System Controller
*     summary: Get list of events.
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
*                  example: '/events'
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
*                            description: Department id
*                            example: 2
*                          description:
*                            type: string
*                            description: Description of department
*                            example: 'Starting Work'
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
*                  example: '/events'
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
*                  example: '/events'
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
*                  example: '/events'
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
*                  example: '/events'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
systemRoute.get('/events', SystemController.fetchEventsAsync);

/**
* @openapi
* '/api/system/events':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - System Controller
*     summary: Create new event.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - description
*            properties:
*              description:
*                type: string
*                default: 'Starting Work'
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
*                  example: '/events'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                      id: 
*                        type: integer
*                        default: 1
*                      description:
*                        type: string
*                        default: 'Starting Work'
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
*                  example: '/events'
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
*                  example: '/events'
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
*                  example: '/events'
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
*                  example: '/events'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
systemRoute.post('/events', SystemController.registerNewEventAsync);

/**
* @openapi
* '/api/system/positions':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - System Controller
*     summary: Get list of positions.
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
*                  example: '/positions'
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
*                            description: Department id
*                            example: 2
*                          description:
*                            type: string
*                            description: Description of department
*                            example: 'Human Resources Senior Manager'
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
*                  example: '/positions'
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
*                  example: '/positions'
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
*                  example: '/positions'
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
*                  example: '/positions'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
systemRoute.get('/positions', SystemController.fetchPositionsAsync);

/**
* @openapi
* '/api/system/positions':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - System Controller
*     summary: Create new event.
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - description
*            properties:
*              description:
*                type: string
*                default: 'Human Resources Senior Manager'
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
*                  example: '/positions'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: object
*                  description: result of the request
*                  properties:
*                      id: 
*                        type: integer
*                        default: 1
*                      description:
*                        type: string
*                        default: 'Human Resources Senior Manager'
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
*                  example: '/positions'
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
*                  example: '/positions'
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
*                  example: '/positions'
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
*                  example: '/positions'
*                timestamp:
*                  type: string
*                  description: Timestamp the request was returned
*                  example: '2024-07-25T23:05:50.161Z'
*                content:
*                  type: string
*                  description: error message
*                  example: 'this is an example error message'
*/
systemRoute.post('/positions', SystemController.registerNewPositionAsync);

module.exports = systemRoute;