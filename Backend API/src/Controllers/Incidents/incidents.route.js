const express = require('express');
const { checkForAdminPrivileges } = require('../../Core/Filters/privilege-checks.filter');

const IncidentController = require('./incidents.controller');

const incidentsRouter = express.Router();

/**
* @openapi
* '/api/incidents/':
*  post:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Incidents Controller
*     summary: User can submit an incident to a supervisor
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - comment
*            properties:
*              comment:
*                type: string
*                default: 'I have a complaint to make'
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
*                    employeeId:
*                      type: integer
*                      description: Id of employee who submitted the incident
*                      default: 3
*                    supervisorId:
*                      type: integer
*                      default: 1
*                    status:
*                      type: integer
*                      default: 0
*                    createAt:
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
incidentsRouter.post('/', IncidentController.registerIncidentAsync);

/**
* @openapi
* '/api/incidents/':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Incidents Controller
*     summary: Get all submitted incidents.
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
*                          supervisorId:
*                            type: integer
*                            example: 1
*                          submittedOn:
*                            type: date
*                            example: '2024-07-25T23:05:50.161Z'
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
incidentsRouter.get('/', checkForAdminPrivileges, IncidentController.fetchIncidentsAsync)

/**
* @openapi
* '/api/incidents/{incidentId}':
*  get:
*     security:              
*     - bearerAuth: []
*     tags:
*     - Incidents Controller
*     summary: Get submitted incident.
*     parameters:
*       - in: path
*         name: incidentId
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
*                  example: '/{incidentId}'
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
*                      description: Employee that submitted the incident
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    comment:
*                      type: string
*                      default: 'I want to complain about something'
*                    submittedTo:
*                      type: object
*                      description: Supervisor responsible to resolve the incident
*                      properties:
*                        id:
*                          type: integer
*                          example: 1
*                        firstName:
*                          type: string
*                          example: 'John'
*                        lastName:
*                          type: string
*                          example: 'Doe'
*                    submittedOn:
*                      type: date
*                      default: '2024-07-25T23:05:50.161Z'
*                    status:
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
*                  example: '/{incidentId}'
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
*                  example: '/{incidentId}'
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
*                  example: '/{incidentId}'
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
*                  example: '/{incidentId}'
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
incidentsRouter.get('/:incidentId', IncidentController.fetchIncidentAsync);

module.exports = incidentsRouter;